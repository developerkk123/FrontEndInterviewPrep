export const ComponentList = {
  Container: ({ children, ...props }) => <div {...props}>{children}</div>,
  Text: ({ text }) => <p>{text}</p>,
  Button: ({ label }) => <button>{label}</button>,
};
export const schema = {
  id: "root",
  type: "Container",
  props: { className: "wrapper" },
  children: [
    {
      id: "1",
      type: "Text",
      props: { text: "text" },
      children: [],
    },
    {
      id: "2",
      type: "Container",
      props: {},
      children: [
        {
          id: "button",
          type: "Button",
          props: { className: "button", label: "Click Me" },
        },
      ],
    },
  ],
};
const NestedComponent = ({ node }) => {
  //   console.log(node, "node");
  const Component = ComponentList[node.type];
  if (!Component) return null;
  return (
    <Component {...node.props}>
      {node.children &&
        node.children.map((child) => (
          <NestedComponent key={child.id} node={child} />
        ))}
    </Component>
  );
};
export default NestedComponent;

{
  /* <NestedComponent node={schema} /> */
}
