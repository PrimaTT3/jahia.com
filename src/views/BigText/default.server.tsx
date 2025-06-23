import { jahiaComponent } from "@jahia/javascript-modules-library";
import { useId } from "react";

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jnt:bigText",
    priority: 1,
  },
  ({ text, css }) => {
    if (css) {
      const id = useId();
      return (
        <>
          <style children={`#${id}{${css}}`}></style>
          <div id={id} className="_richtext" dangerouslySetInnerHTML={{ __html: text }}></div>
        </>
      );
    }

    return <div className="_richtext" dangerouslySetInnerHTML={{ __html: text }}></div>;
  },
);
