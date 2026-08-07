import type { MDXComponents } from "mdx/types";
import {
  Callout,
  CardGrid,
  DocCard,
  Roles,
  Screenshot,
  Step,
  Steps,
  Summary,
  Where,
} from "@/components/docs/blocks";
import { proseComponents } from "@/components/docs/prose";

/**
 * Next looks this file up automatically for every compiled MDX file.
 *
 * The doc blocks are injected here rather than imported per article on purpose:
 * an article should be prose with a handful of tags, editable by someone who
 * has never opened a React file, with no import header to keep in sync.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...proseComponents,
    Callout,
    CardGrid,
    DocCard,
    Roles,
    Screenshot,
    Step,
    Steps,
    Summary,
    Where,
    ...components,
  };
}
