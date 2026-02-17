export const handleReadFileName = async (req: Request, res: Response) => {
  const { type, fileName, spaceData } = req.body as {
    type: string;
    fileName: string;
    spaceData: {
      namespaceId?: string;
      configurationId?: string;
      applicationTypeId?: string;
    };
  };
  if (!type || !fileName) {
    return res.status(400).json({ error: "type and fileName are required" });
  }
  try {
    const typeLower = type?.toLowerCase();
    const settings = await readSettings();
    if (!settings || !settings[typeLower]) {
      return res.status(400).json({ error: `Invalid type: ${typeLower}` });
    }
    const { namespaceId, configurationId, applicationTypeId } = spaceData;
    let directoryPath;
    if (namespaceId) {
      if (configurationId) {
        if (applicationTypeId) {
          directoryPath = `${settings[typeLower]}/${namespaceId}/${configurationId}/${applicationTypeId}`;
        }
        if (!directoryPath) {
          directoryPath = `${settings[typeLower]}/${namespaceId}/${configurationId}`;
        }
      }
      if (!directoryPath) {
        directoryPath = `${settings[typeLower]}/${namespaceId}`;
      }
    }
    // use global base directory if no space details provided
    if (!directoryPath) {
      directoryPath = settings[typeLower];
    }
    if (directoryPath) {
      const filePath = path.join(directoryPath, `${fileName}.json`);
      if (!existsSync(filePath)) {
        return res.status(404).json({ error: `File not found: ${filePath}` });
      }
      const fileContent = readFileSync(filePath, "utf-8");
      let parsedContent: unknown;
      try {
        parsedContent = JSON.parse(fileContent);
      } catch (e) {
        return res
          .status(500)
          .json({ error: "Failed to parse file content as JSON" });
      }
      return res.json({ fileName, data: parsedContent });
    }
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = String((error as { message?: unknown }).message);
    }
    return res.status(500).json({ error: "Failed to read file", errorMessage });
  }
};
export const readFiles = async (directoryPath: string) => {
  const files = await fs.readdir(directoryPath);
  const fileContents: Array<{
    fileName: string;
    data: { id?: string; [key: string]: unknown } | null;
    error?: string;
  }> = (
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        try {
          const stat = await fs.stat(filePath);
          if (stat.isDirectory()) {
            // Recursively read files in subdirectories and flatten the result
            return await readFiles(filePath);
          }
          // Only process .json files
          if (!file.toLowerCase().endsWith(".json")) {
            return [];
          }
          const content = await fs.readFile(filePath, "utf-8");

          return [
            {
              fileName: file,
              data: JSON.parse(content),
            },
          ];
        } catch (err: unknown) {
          let errorMsg: string;
          if (err instanceof SyntaxError) {
            errorMsg = "Invalid JSON";
          } else if (
            err &&
            typeof err === "object" &&
            "message" in err &&
            typeof (err as { message: unknown }).message === "string"
          ) {
            errorMsg = (err as { message: string }).message;
          } else {
            errorMsg = "Unknown error";
          }
          // Only report errors for .json files
          if (!file.toLowerCase().endsWith(".json")) {
            return [];
          }
          return [
            {
              fileName: file,
              data: null,
              error: errorMsg,
            },
          ];
        }
      })
    )
  ).flat();
  return fileContents;
};
export const readSettings = () => {
  const settingsPath = path.join(
    _settingPathfull,
    "schema-editor-settings.json"
  );
  const content = fs.readFileSync(settingsPath, { encoding: "utf-8" });
  return JSON.parse(content);
};
