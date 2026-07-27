import { visit } from "unist-util-visit";
import type { Root } from "hast";

/**
 * GitHub-flavored Markdown task list checkboxes (`- [ ] foo`) render as bare
 * `<input type="checkbox" disabled>` with no accessible name -- screen
 * readers have nothing to announce for them. Label each one with its
 * checked state so the information conveyed visually isn't lost.
 */
export function rehypeTaskListA11y() {
  return (tree: Root) => {
    visit(tree, "element", node => {
      if (node.tagName !== "input" || node.properties?.type !== "checkbox") {
        return;
      }
      node.properties.ariaLabel = node.properties.checked
        ? "Completed task"
        : "Incomplete task";
    });
  };
}
