import { buildNodeUrl } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
import type { JCRNodeWrapper } from "org.jahia.services.content";

export type CTAProps =
  | { "ctaType": "internal"; "j:linknode": JCRNodeWrapper; "ctaLabel"?: string }
  | { "ctaType": "external"; "j:url": string; "j:linkTitle": string; "ctaLabel"?: string };

export const CTA = ({ cta }: { cta: CTAProps }) => (
  <a
    className={classes.cta}
    href={cta.ctaType === "internal" ? buildNodeUrl(cta["j:linknode"]) : cta["j:url"]}
    title={cta.ctaType === "external" ? cta["j:linkTitle"] : undefined}
  >
    {cta.ctaLabel ||
      (cta.ctaType === "internal"
        ? cta["j:linknode"].getPropertyAsString("jcr:title")
        : cta["j:linkTitle"])}
    <span className={classes.ctaLine} />
    <span className="i-ri:arrow-right-wide-line" />
  </a>
);
