import { jahiaComponent, Render, useJCRQuery } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

interface Props {
  parent?: JCRNodeWrapper;
  nodeType?: string;
  categoryFilters?: Array<JCRNodeWrapper | null>;
}

jahiaComponent(
  {
    componentType: "view",
    nodeType: "jahiacom:listChildren",
  },
  ({ parent, nodeType = "jnt:page", categoryFilters }: Props) => {
    if (!parent) return null;

    // Retrieve all direct and indirect children pages of `parent`
    const children = useJCRQuery({
      query: `
        SELECT * FROM [${nodeType}]
        WHERE ISDESCENDANTNODE(${JSON.stringify(parent.getPath())})
      `,
    });

    // Retrieve all used categories from the children
    const allUsedCategories = new Set<string>();
    for (const child of children) {
      if (!child.hasProperty("j:defaultCategory")) continue;
      for (const category of child.getProperty("j:defaultCategory").getValues()) {
        allUsedCategories.add(category.getNode().getIdentifier());
      }
    }

    const categories = new Map<JCRNodeWrapper, JCRNodeWrapper[]>(
      categoryFilters
        ?.filter((x) => x != null)
        .map((categoryFilter) => [
          categoryFilter,
          // Retrieve all nested categories under each category filter
          useJCRQuery({
            query: `
              SELECT * FROM [jnt:category]
              WHERE ISDESCENDANTNODE(${JSON.stringify(categoryFilter.getPath())})
            `,
          })
            // Keep only the categories that are used by at least one child
            .filter((category) => allUsedCategories.has(category.getIdentifier())),
        ]),
    );

    return (
      <>
        {categories.size > 0 && (
          <div>
            Filter:
            {[...categories].map(([categoryPicker, categoryList]) => {
              return (
                <select key={categoryPicker.getIdentifier()}>
                  <option value="">{categoryPicker.getDisplayableName()}</option>
                  {categoryList.map((category) => (
                    <option key={category.getIdentifier()} value={category.getName()}>
                      {category.getDisplayableName()}
                    </option>
                  ))}
                </select>
              );
            })}
          </div>
        )}

        {children.map((node) => (
          <Render key={node.getIdentifier()} node={node} />
        ))}
      </>
    );
  },
);
