import {
  buildModuleFileUrl,
  buildNodeUrl,
  getChildNodes,
  Island,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { JCRSiteNode } from "org.jahia.services.content.decorator";
import jahia from "./jahia-light.svg?no-inline";
import NavBarClient, { type Entry } from "./NavBar.client.jsx";

const getEntries = (root: JCRNodeWrapper, current: string): Entry[] =>
  getChildNodes(
    root,
    -1,
    0,
    (node) =>
      node.isNodeType("jnt:page") ||
      node.isNodeType("jnt:navMenuText") ||
      node.isNodeType("jnt:nodeLink") ||
      node.isNodeType("jnt:externalLink"),
  )
    .map((node) => {
      // If the node is a menu entry, recursively get its children
      if (node.isNodeType("jnt:navMenuText")) {
        return {
          title: node.getDisplayableName(),
          children: getEntries(node, current),
        };
      }

      if (node.isNodeType("jnt:externalLink")) {
        return {
          title: node.getDisplayableName(),
          href: node.hasProperty("j:url") ? node.getPropertyAsString("j:url") : "",
          current: false,
        };
      }

      // The node may be a page or a link to another node
      const target = node.isNodeType("jnt:nodeLink")
        ? node.hasProperty("j:node") && node.getProperty("j:node")?.getValue()?.getNode()
        : node;

      if (!target) return null;

      return {
        title: node.getDisplayableName(),
        href: buildNodeUrl(target)
          // Jahia only rewrites static HTML links in edit mode, fix the menu links
          // to work in edit mode as well
          .replace("/cms/edit/", "/cms/editframe/"),
        current: current === target.getIdentifier(),
      };
    })
    .filter((entry) => entry !== null);

export default function NavBar({
  site,
  root,
  current,
}: {
  site: JCRSiteNode;
  root: JCRNodeWrapper;
  current: JCRNodeWrapper;
}) {
  const primaryCTALink =
    site.hasProperty("primaryCTALink") && site.getProperty("primaryCTALink").getValue().getNode();
  const secondaryCTALink =
    site.hasProperty("secondaryCTALink") &&
    site.getProperty("secondaryCTALink").getValue().getNode();

  return (
    <Island
      component={NavBarClient}
      props={{
        // Menu CTAs
        primaryCTA: primaryCTALink && {
          href: buildNodeUrl(primaryCTALink),
          label: site.getPropertyAsString("primaryCTALabel") || primaryCTALink.getDisplayableName(),
        },
        secondaryCTA: secondaryCTALink && {
          href: buildNodeUrl(secondaryCTALink),
          label:
            site.getPropertyAsString("secondaryCTALabel") || secondaryCTALink.getDisplayableName(),
        },
        // This can quickly get out of hand, if there are too many pages in the menu we need
        // to rethink the implementation
        entries: getEntries(root, current.getIdentifier()),
      }}
    >
      <a
        href={buildNodeUrl(root)}
        aria-current={current.getIdentifier() === root.getIdentifier() ? "page" : undefined}
        data-element-url={buildNodeUrl(root)}
        data-element-type="image"
        data-element-text="Jahia Logo"
        data-element-location="header"
        data-element-name={`nav/logo`}
      >
        <img src={buildModuleFileUrl(jahia)} alt="Jahia" width="90" height="40" />
      </a>
    </Island>
  );
}
