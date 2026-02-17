import { buildNodeUrl } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { CTA } from "./index.jsx";

export type CTAProps = MixinCTAProps | { ctaType: "none" };

type MixinCTAProps =
  | {
      "ctaType": "internal";
      "j:linknode"?: JCRNodeWrapper;
      "ctaLabel"?: string;
      "ctaVariant"?: "primary" | "secondary";
    }
  | {
      "ctaType": "external";
      "j:url"?: string;
      "j:linkTitle"?: string;
      "ctaLabel"?: string;
      "ctaVariant"?: "primary" | "secondary";
    };

export const MixinCTA = ({
  cta,
  location,
  name,
}: {
  cta: MixinCTAProps;
  location: string;
  name: string;
}) => (
  <CTA
    href={
      cta.ctaType === "internal"
        ? cta["j:linknode"] && buildNodeUrl(cta["j:linknode"])
        : cta["j:url"]
    }
    title={cta.ctaType === "external" ? cta["j:linkTitle"] : undefined}
    icon
    secondary={cta.ctaVariant === "secondary"}
    location={location}
    name={name}
  >
    {cta.ctaLabel ||
      (cta.ctaType === "internal"
        ? (cta["j:linknode"]?.getDisplayableName() ?? "Internal link not defined")
        : cta["j:linkTitle"])}
  </CTA>
);
