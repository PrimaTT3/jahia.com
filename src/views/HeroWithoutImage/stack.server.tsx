import { jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
import type { Props } from "./types.js";
import { MixinCTA } from "../../mixins/CTA/server.jsx";
import clsx from "clsx";

export const HeroWithoutImage = jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:heroWithoutImage",
    name: "stack",
  },
  ({ theme, "jcr:title": title, subtitle, background, ...cta }: Props) => (
    <header
      className={clsx(classes.hero, classes.center, "_stack-4")}
      data-theme={theme}
      data-bg={background}
    >
      {title && <h1>{title}</h1>}
      {subtitle && <div className="_richtext" dangerouslySetInnerHTML={{ __html: subtitle }} />}
      {cta.ctaType !== "none" && (
        <p>
          <MixinCTA cta={cta} />
        </p>
      )}
    </header>
  ),
);
