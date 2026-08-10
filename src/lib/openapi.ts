/**
 * Reads the OpenAPI document into the shapes the docs pages render.
 *
 * `src/content/openapi.json` is refreshed from the DEPLOYED API by
 * `scripts/sync-openapi.mjs` at the start of every build, so these pages cannot
 * drift from what the API actually serves. The file stays committed only as the
 * fallback for a build that cannot reach the API: it is no longer the source.
 *
 * It used to be, on the theory that regenerating it was a step in shipping a
 * server change. It is written by the server's generator into a different git
 * repo, so that step was silently skippable, and got skipped. See the script.
 *
 * Everything here runs at build time. The reference pages are static HTML with
 * the real endpoint text in them: which is the point. A client-rendered spec
 * viewer would give search engines an empty div, and "how do I book an aircraft
 * over an API" is exactly the query these pages should answer.
 */
import spec from "@/content/openapi.json";

export type HttpMethod = "get" | "post" | "patch" | "put" | "delete";

export const HTTP_METHODS: HttpMethod[] = ["get", "post", "patch", "put", "delete"];

export type Parameter = {
  name: string;
  in: "path" | "query" | "header";
  required?: boolean;
  description?: string;
  schema?: Record<string, unknown>;
};

export type MediaType = { schema?: Record<string, unknown> };

export type Response = {
  description: string;
  content?: Record<string, MediaType>;
};

export type Operation = {
  operationId: string;
  summary: string;
  description: string;
  tags: string[];
  parameters?: Parameter[];
  requestBody?: { required?: boolean; content: Record<string, MediaType> };
  responses: Record<string, Response>;
  security?: unknown[];
};

export type Endpoint = Operation & {
  method: HttpMethod;
  path: string;
  /** Stable anchor/slug for deep-linking a single endpoint. */
  slug: string;
};

export type TagDoc = {
  name: string;
  slug: string;
  description: string;
  endpoints: Endpoint[];
};

const document = spec as unknown as {
  info: { title: string; version: string; summary: string; description: string };
  servers: { url: string; description: string }[];
  tags: { name: string; description: string }[];
  paths: Record<string, Record<string, Operation>>;
  components: { schemas: Record<string, Record<string, unknown>> };
};

export const API_TITLE = document.info.title;
export const API_VERSION = document.info.version;
export const API_SUMMARY = document.info.summary;
export const API_DESCRIPTION = document.info.description;
export const API_BASE_URL = document.servers[0]?.url ?? "https://api.aerscheduler.com";

/**
 * How callers authenticate, straight from the spec's security scheme.
 *
 * Read from the document rather than restated in the page, because restating it
 * is exactly how this went wrong: the hub page kept its own hand-written
 * "sign in with your email and password" copy after the API moved to keys, and
 * the two disagreed for a day. Anything the docs say about auth should come from
 * here.
 */
export const AUTH_SCHEME = (
  document as unknown as {
    components: { securitySchemes?: Record<string, { description?: string; bearerFormat?: string }> };
  }
).components.securitySchemes?.bearerAuth ?? {};

/** Short label for the auth mechanism, e.g. for a summary tile. */
export const AUTH_SUMMARY = AUTH_SCHEME.bearerFormat ?? "API key";

/** `Authentication` -> `authentication`; used for both the route and the anchor. */
export const slugifyTag = (tag: string): string =>
  tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** A per-endpoint anchor that stays stable as the spec grows. */
const endpointSlug = (method: string, path: string): string =>
  `${method}-${path}`
    .toLowerCase()
    .replace(/[{}]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let cached: TagDoc[] | null = null;

/** Every documented endpoint, grouped by tag, in the order the spec declares tags. */
export function getTagDocs(): TagDoc[] {
  if (cached) return cached;

  const byTag = new Map<string, Endpoint[]>();

  for (const [path, item] of Object.entries(document.paths)) {
    for (const method of HTTP_METHODS) {
      const operation = item[method];
      if (!operation) continue;

      const endpoint: Endpoint = {
        ...operation,
        method,
        path,
        slug: endpointSlug(method, path),
      };

      for (const tag of operation.tags ?? []) {
        const list = byTag.get(tag) ?? [];
        list.push(endpoint);
        byTag.set(tag, list);
      }
    }
  }

  cached = document.tags
    .map((tag) => ({
      name: tag.name,
      slug: slugifyTag(tag.name),
      description: tag.description,
      // Collections before their items, and reads before writes within a path,
      // which is the order somebody learning the API wants to read them in,
      // rather than the arbitrary order they appear in the document.
      endpoints: (byTag.get(tag.name) ?? []).sort((a, b) => {
        const depth = a.path.split("/").length - b.path.split("/").length;
        if (depth !== 0) return depth;
        if (a.path !== b.path) return a.path.localeCompare(b.path);
        return HTTP_METHODS.indexOf(a.method) - HTTP_METHODS.indexOf(b.method);
      }),
    }))
    .filter((tag) => tag.endpoints.length > 0);

  return cached;
}

export function getTagDoc(slug: string): TagDoc | undefined {
  return getTagDocs().find((tag) => tag.slug === slug);
}

export function getSchemas(): Record<string, Record<string, unknown>> {
  return document.components.schemas;
}

export const endpointCount = (): number =>
  getTagDocs().reduce((total, tag) => total + tag.endpoints.length, 0);

/**
 * A runnable curl for one endpoint.
 *
 * Path parameters become obvious placeholders rather than a plausible-looking
 * id: somebody copying this should be made to substitute their own, not have it
 * 404 mysteriously against a number that happened to be in the docs.
 */
export function curlFor(endpoint: Endpoint): string {
  const path = endpoint.path.replace(/\{(\w+)\}/g, (_, name) => `:${name}`);
  const query = (endpoint.parameters ?? []).filter((p) => p.in === "query" && p.required);
  const queryString = query.length ? `?${query.map((p) => `${p.name}=…`).join("&")}` : "";

  const lines = [`curl ${endpoint.method === "get" ? "" : `-X ${endpoint.method.toUpperCase()} `}${API_BASE_URL}${path}${queryString} \\`];
  lines.push(`  -H "Authorization: Bearer $AERSCHEDULER_KEY"`);

  if (endpoint.requestBody) {
    const schema = endpoint.requestBody.content["application/json"]?.schema as
      | { properties?: Record<string, { type?: string; example?: unknown; enum?: string[] }>; required?: string[] }
      | undefined;
    const properties = schema?.properties ?? {};
    const required = schema?.required ?? [];
    // Show the required fields, or the first couple if nothing is required, so
    // the example is a starting point rather than an exhaustive dump.
    const keys = (required.length ? required : Object.keys(properties).slice(0, 2)).filter((k) => properties[k]);

    if (keys.length) {
      lines[lines.length - 1] += " \\";
      lines.push(`  -H "Content-Type: application/json" \\`);
      const body = Object.fromEntries(keys.map((key) => [key, exampleValue(properties[key])]));
      lines.push(`  -d '${JSON.stringify(body)}'`);
    }
  }

  return lines.join("\n");
}

function exampleValue(property: { type?: string | string[]; example?: unknown; enum?: string[]; format?: string }): unknown {
  if (property?.example !== undefined) return property.example;
  if (property?.enum?.length) return property.enum[0];
  const type = Array.isArray(property?.type) ? property.type[0] : property?.type;
  if (property?.format === "date-time") return "2026-08-04T15:00:00-06:00";
  if (property?.format === "email") return "you@yourschool.com";
  switch (type) {
    case "integer":
      return 1;
    case "number":
      return 1;
    case "boolean":
      return true;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "…";
  }
}

/** Human label for a status code, used in the responses table. */
export const statusLabel = (code: string): string =>
  ({
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "204": "No Content",
    "302": "Found",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "429": "Too Many Requests",
    "500": "Server Error",
  })[code] ?? "";

/** Renders a schema reference or inline type into a short human string. */
export function typeLabel(schema: Record<string, unknown> | undefined): string {
  if (!schema) return "–";
  const ref = schema.$ref as string | undefined;
  if (ref) return ref.replace("#/components/schemas/", "");

  const type = schema.type as string | string[] | undefined;
  if (Array.isArray(type)) {
    const withoutNull = type.filter((t) => t !== "null");
    return `${withoutNull.join(" | ")}${type.includes("null") ? " | null" : ""}`;
  }
  if (type === "array") {
    const items = schema.items as Record<string, unknown> | undefined;
    return `${typeLabel(items)}[]`;
  }
  if (schema.enum) return (schema.enum as string[]).map((v) => `"${v}"`).join(" | ");
  return type ?? "object";
}
