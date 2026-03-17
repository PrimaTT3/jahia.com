import {
  AbsoluteArea,
  buildNodeUrl,
  jahiaComponent,
  RenderChildren,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { MixinCTA, type CTAProps } from "../mixins/CTA/server.jsx";
import classes from "./footer.module.css";
import clsx from "clsx";

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:pageFooter",
  },
  (
    {
      "jcr:title": title,
      bottomLinks,
      ...cta
    }: { "jcr:title"?: string; "bottomLinks"?: Array<JCRNodeWrapper | null> } & CTAProps,
    { currentNode, renderContext },
  ) => (
    <footer className={classes.footer} data-theme="night">
      <div className={classes.wrapper}>
        <div className={classes.card}>
          <p className={classes.big}>{title || "(title missing!)"}</p>
          {cta.ctaType !== "none" && (
            <p>
              <MixinCTA cta={cta} location="footer" name={currentNode.getName()} />
            </p>
          )}
        </div>
        <div>
          <AbsoluteArea parent={currentNode} name="columns" nodeType="jahiacom:footerColumns" />
          <hr />
          <div className={renderContext.isEditMode() ? classes.padded : classes.icons}>
            <AbsoluteArea parent={currentNode} name="iconsLeft" nodeType="jahiacom:footerIcons" />
            <AbsoluteArea parent={currentNode} name="iconsRight" nodeType="jahiacom:footerIcons" />
          </div>
          <hr />
          <div className={clsx("_row-2", classes.padded)}>
            {bottomLinks
              ?.filter((node) => node !== null)
              .map((node) => (
                <a
                  href={buildNodeUrl(node)}
                  key={node.getIdentifier()}
                  data-element-url={buildNodeUrl(currentNode)}
                  data-element-type="link"
                  data-element-text={node.getPropertyAsString("jcr:title")}
                  data-element-location="footer"
                  data-element-name={node.getName()}
                >
                  {node.getPropertyAsString("jcr:title")}
                </a>
              )) || <em>Add links here!</em>}
          </div>
        </div>
      </div>
    </footer>
  ),
);

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:footerColumns",
  },
  () => (
    <div className={classes.columns}>
      <RenderChildren />
    </div>
  ),
);

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:footerColumn",
  },
  ({
    "jcr:title": title,
    links,
  }: {
    "jcr:title"?: string;
    "links"?: Array<JCRNodeWrapper | null>;
  }) => (
    <div className="_stack-2">
      <strong>{title}</strong>
      {links
        ?.filter((node) => node !== null)
        .map((node) => (
          <a
            href={buildNodeUrl(node)}
            key={node.getIdentifier()}
            data-element-url={buildNodeUrl(node)}
            data-element-type="link"
            data-element-text={node.getPropertyAsString("jcr:title")}
            data-element-location="footer"
            data-element-name={node.getName()}
          >
            {node.getPropertyAsString("jcr:title")}
          </a>
        ))}
    </div>
  ),
);

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:footerIcons",
  },
  (_, { renderContext }) => (
    <div className={renderContext.isEditMode() ? "_stack-2" : "_row-2"}>
      <RenderChildren />
    </div>
  ),
);

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:footerIcon",
  },
  (
    {
      "jcr:title": title,
      icon,
      href,
    }: { "jcr:title"?: string; "icon"?: JCRNodeWrapper; "href"?: string },
    { renderContext, currentNode },
  ) => {
    if (renderContext.isEditMode()) {
      return (
        <span className="_pack-2">
          {icon && (
            <img
              loading="lazy"
              src={buildNodeUrl(icon)}
              alt={title}
              style={{ maxHeight: "4rem" }}
            />
          )}
          {title || "(title missing!)"}
        </span>
      );
    }

    return href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        data-element-url={href}
        data-element-type="image"
        data-element-text={`${title} image`}
        data-element-location="footer"
        data-element-name={currentNode.getName()}
      >
        {icon && (
          <img loading="lazy" src={buildNodeUrl(icon)} alt={title} style={{ maxHeight: "7rem" }} />
        )}
      </a>
    ) : icon ? (
      <img loading="lazy" src={buildNodeUrl(icon)} alt={title} style={{ maxHeight: "7rem" }} />
    ) : (
      <del>{title}</del>
    );
  },
);
