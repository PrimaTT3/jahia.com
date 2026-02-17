import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";

jahiaComponent(
  { componentType: "view", nodeType: "jahiacom:blogAuthor", name: "link" },
  ({ name }, { currentNode }) => (
    <a
      href={buildNodeUrl(currentNode)}
      data-element-url={buildNodeUrl(currentNode)}
      data-element-type="link"
      data-element-text={name}
      data-element-location="blog_section"
      data-element-name={currentNode.getName()}
    >
      {name}
    </a>
  ),
);
