import { describe, it, expect, vi } from "vitest";
import * as fs from "fs";
import path from "path";
import { writeDefaultSpaceConfig, handleReadFileName } from "./fileController";
import * as settingsService from "../services/settingsService";
import * as fileService from "../services/fileService";
// mocking fs, which I need to do to mock existsSync/readFileSync/writeFileSync, breaks
// tests in the 1,400 line fileController.test.ts. To avoid that I just made a nother suite
describe("Default configuration", () => {
  vi.mock("fs");

  it("should write default configuration", () => {
    vi.mocked(fs.existsSync).mockImplementation(() => true);
    vi.mocked(fs.readFileSync).mockImplementation(() => "{}");
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});
    writeDefaultSpaceConfig("test-file", "a", "b", "c");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  describe("handleReadFileName", () => {
    let res: Partial<Response>;
    let jsonMock: ReturnType<typeof vi.fn>;
    let statusMock: ReturnType<typeof vi.fn>;
    const viMock = vi.fn();
    let readFileMock: MockInstance;
    let readFileSyncMock: ReturnType<typeof vi.fn>;
    beforeEach(() => {
      readFileMock = vi.spyOn(fs.promises, "readFile").mockResolvedValue(
        JSON.stringify({
          id: "old-id",
          componentName: "compA",
          componentId: "compA",
          version: 1,
        })
      );
      readFileSyncMock = vi.spyOn(fs, "readFileSync");
      jsonMock = vi.fn();
      statusMock = vi.fn(() => ({ json: jsonMock }));
      res = {
        json: jsonMock,
        status: statusMock,
      };
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("returns file content if file exists and JSON is valid", async () => {
      const req = {
        body: {
          type: "component",
          fileName: "abc",
          spaceData: {
            namespaceId: "ns",
            configurationId: "cfg",
            applicationTypeId: "app",
          },
        },
      } as Request;

      const mockFile = {
        fileName: "abc.json",
        data: {
          id: "id",
          componentName: "component1",
        },
      };

      vi.spyOn(settingsService, "readSettings").mockResolvedValue({
        component: "/tmp/component",
      });

      vi.spyOn(path, "join").mockImplementation((...args) => args.join("/"));

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockFile));

      await handleReadFileName(req, res as Response);

      expect(jsonMock).toHaveBeenCalledWith({
        fileName: "abc",
        data: mockFile.data,
      });
    });
  });
});
