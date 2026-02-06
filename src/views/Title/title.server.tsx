import { jahiaComponent } from "@jahia/javascript-modules-library";

jahiaComponent(
  {
    componentType: "view",
    nodeType: "mix:title",
    name: "title",
  },
  ({ "jcr:title": title }: { "jcr:title"?: string }) => title,
);
