import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import clsx from "clsx";

// @ts-expect-error Duplicate declaration issue
declare class Locale {
  constructor(lang: string, country: string);
  getDisplayCountry(locale: Locale): string;
}

// @ts-expect-error This is a Java class
const Locale = Java.type("java.util.Locale");

interface Props {
  "jcr:title": string;
  "certification": "silver" | "gold" | "diamond";
  "countries": string[];
  "description": string;
  "logo": JCRNodeWrapper;
  "website"?: string;
}

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:partner",
  },
  (
    { "jcr:title": title, certification, countries, description, logo, website }: Props,
    { currentNode },
  ) => (
    <article className={classes.card}>
      <img src={buildNodeUrl(logo)} alt={title} title={title} />
      <p className={clsx("_pack-1", classes.small)}>
        {
          {
            silver: (
              <>
                <span className={clsx("i-ri:triangle-fill", classes.silver)} /> Silver Partner
              </>
            ),
            gold: (
              <>
                <span className={clsx("i-ri:circle-fill", classes.gold)} /> Gold Partner
              </>
            ),
            diamond: (
              <>
                <span className={clsx("i-ri:vip-diamond-fill", classes.diamond)} /> Diamond Partner
              </>
            ),
          }[certification]
        }
      </p>
      <hr style={{ width: "100%" }} />
      <div
        className="_richtext"
        style={{ flex: 1 }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <footer className={classes.footer}>
        <p className="_pack-1">
          <span className="i-ri:map-pin-2-line" />
          {countries
            .map((code) => {
              const locale = new Locale(currentNode.getLanguage(), code);
              return locale.getDisplayCountry(locale);
            })
            .join(", ")}
        </p>
        {website && (
          <p>
            <a href={website} className="_pack-1" target="_blank" rel="noreferrer nofollow ugc">
              Visit Website
              <span className="i-ri:external-link-line" />
            </a>
          </p>
        )}
      </footer>
    </article>
  ),
);
