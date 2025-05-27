import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
import type { Props } from "./types.js";
import clsx from "clsx";
import { MixinCTA } from "../../mixins/CTA/server.jsx";
import type { JCRNodeWrapper } from "org.jahia.services.content";

const BackgroundImage = ({ image }: { image: JCRNodeWrapper }) => {
  const src = buildNodeUrl(image);
  const alt = image.getPropertyAsString("jcr:title");
  const width = image.getPropertyAsString("j:width");
  const height = image.getPropertyAsString("j:height");

  return (
    <img
      src={`${src}?w=400`}
      srcSet={`${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1600 1600w, ${src}?w=2400 2400w`}
      alt={alt}
      width={width}
      height={height}
      className={classes.background}
    />
  );
};

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:hero",
    name: "cover",
  },
  ({ theme, "jcr:title": title, subtitle, image, ...cta }: Props) => (
    <header className={classes.cover} data-theme={theme}>
      {image && <BackgroundImage image={image} />}
      <div className={clsx(classes.header, "_stack-4")}>
        <h1>{title || "Title not defined"}</h1>
        {subtitle && <p>{subtitle}</p>}
        {cta.ctaType !== "none" && (
          <p>
            <MixinCTA cta={cta} />
          </p>
        )}
      </div>
    </header>
  ),
);
