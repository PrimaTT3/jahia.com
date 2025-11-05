import { jahiaComponent, RenderChildren } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
import clsx from "clsx";

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:partnerCategory",
  },
  ({ "jcr:title": title }: { "jcr:title": string }, { currentNode }) => (
    <section id={currentNode.getName()} className="_stack-4">
      <h3>{title}</h3>
      <div className={clsx(classes.grid, "_container")}>
        <RenderChildren />
      </div>
    </section>
  ),
);
