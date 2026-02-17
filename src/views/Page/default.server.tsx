import { buildNodeUrl, jahiaComponent, Render } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./styles.module.css";

interface Props {
  "jcr:title"?: string;
  "jcr:description"?: string;
  "j:defaultCategory"?: Array<JCRNodeWrapper | null>;
}

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jnt:page",
  },
  (
    { "jcr:title": title, "jcr:description": description, "j:defaultCategory": categories }: Props,
    { currentNode },
  ) => (
    <article className={classes.card}>
      <h3>
        <a
          href={buildNodeUrl(currentNode)}
          data-element-url={buildNodeUrl(currentNode)}
          data-element-type="link"
          data-element-text={title}
          data-element-location="resources_library_section"
          data-element-name={currentNode.getName()}
        >
          {title}
        </a>
      </h3>
      <p style={{ flex: 1 }}>{description}</p>
      <p className={classes.categories}>
        {categories?.map(
          (category) =>
            category && (
              <span key={category.getIdentifier()}>
                <Render node={category} view="title" />
              </span>
            ),
        )}
      </p>
    </article>
  ),
);
