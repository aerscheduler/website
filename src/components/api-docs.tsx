import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  curlFor,
  statusLabel,
  typeLabel,
  type Endpoint,
  type HttpMethod,
  type Parameter,
} from "@/lib/openapi";

/**
 * The API reference renderer.
 *
 * Deliberately plain server-rendered HTML — no spec-viewer widget. Two reasons:
 * the endpoint text is the thing worth indexing, and a docs page that needs
 * JavaScript to show a URL is a worse docs page. It also means these render at
 * the site's own typography rather than an embedded iframe's.
 */

const METHOD_STYLES: Record<HttpMethod, string> = {
  get: "bg-sky-50 text-sky-700 ring-sky-600/20",
  post: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  patch: "bg-amber-50 text-amber-700 ring-amber-600/20",
  put: "bg-amber-50 text-amber-700 ring-amber-600/20",
  delete: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export function MethodBadge({ method, className }: { method: HttpMethod; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset",
        METHOD_STYLES[method],
        className
      )}
    >
      {method}
    </span>
  );
}

/** Path with `{params}` picked out, so the variable parts are obvious at a glance. */
export function EndpointPath({ path, className }: { path: string; className?: string }) {
  const parts = path.split(/(\{\w+\})/g).filter(Boolean);
  return (
    <code className={cn("font-mono text-sm text-foreground", className)}>
      {parts.map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </code>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-brand-surface">
      {label && (
        <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ParameterTable({ title, parameters }: { title: string; parameters: Parameter[] }) {
  if (!parameters.length) return null;
  return (
    <div className="mt-5">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h4>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.name} className="border-b border-border/70 last:border-0 align-top">
                <td className="w-48 py-2.5 pr-4">
                  <code className="font-mono text-[13px] font-medium text-foreground">{parameter.name}</code>
                  {parameter.required && <span className="ml-1.5 text-[11px] font-medium text-rose-600">required</span>}
                </td>
                <td className="w-32 py-2.5 pr-4">
                  <code className="font-mono text-xs text-muted-foreground">{typeLabel(parameter.schema)}</code>
                </td>
                <td className="py-2.5 text-muted-foreground">{renderInline(parameter.description ?? "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type BodySchema = {
  properties?: Record<string, Record<string, unknown>>;
  required?: string[];
  description?: string;
};

function RequestBody({ endpoint }: { endpoint: Endpoint }) {
  const schema = endpoint.requestBody?.content["application/json"]?.schema as BodySchema | undefined;
  const properties = schema?.properties ?? {};
  const names = Object.keys(properties);
  if (!names.length) return null;

  const required = new Set(schema?.required ?? []);

  return (
    <div className="mt-5">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Request body</h4>
      {schema?.description && (
        <p className="mt-1.5 text-sm text-muted-foreground">{renderInline(schema.description)}</p>
      )}
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <tbody>
            {names.map((name) => (
              <tr key={name} className="border-b border-border/70 last:border-0 align-top">
                <td className="w-48 py-2.5 pr-4">
                  <code className="font-mono text-[13px] font-medium text-foreground">{name}</code>
                  {required.has(name) && <span className="ml-1.5 text-[11px] font-medium text-rose-600">required</span>}
                </td>
                <td className="w-32 py-2.5 pr-4">
                  <code className="font-mono text-xs text-muted-foreground">{typeLabel(properties[name])}</code>
                </td>
                <td className="py-2.5 text-muted-foreground">{renderInline((properties[name]?.description as string) ?? "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Responses({ endpoint }: { endpoint: Endpoint }) {
  const codes = Object.keys(endpoint.responses).sort();
  return (
    <div className="mt-5">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Responses</h4>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <tbody>
            {codes.map((code) => {
              const response = endpoint.responses[code];
              const schema = response.content?.["application/json"]?.schema as
                | { properties?: { data?: Record<string, unknown> } }
                | undefined;
              const dataSchema = schema?.properties?.data;
              return (
                <tr key={code} className="border-b border-border/70 last:border-0 align-top">
                  <td className="w-20 py-2.5 pr-4">
                    <code
                      className={cn(
                        "font-mono text-[13px] font-semibold",
                        Number(code) < 300 ? "text-emerald-700" : Number(code) < 400 ? "text-sky-700" : "text-rose-700"
                      )}
                    >
                      {code}
                    </code>
                  </td>
                  <td className="w-28 py-2.5 pr-4 text-xs text-muted-foreground">{statusLabel(code)}</td>
                  <td className="py-2.5 text-muted-foreground">
                    {renderInline(response.description)}
                    {dataSchema && (
                      <span className="ml-1.5 whitespace-nowrap font-mono text-xs text-foreground/70">
                        → {`{ data: ${typeLabel(dataSchema)} }`}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EndpointSection({ endpoint }: { endpoint: Endpoint }) {
  const pathParams = (endpoint.parameters ?? []).filter((p) => p.in === "path");
  const queryParams = (endpoint.parameters ?? []).filter((p) => p.in === "query");
  const isPublic = Array.isArray(endpoint.security) && endpoint.security.length === 0;

  return (
    <section id={endpoint.slug} className="scroll-mt-24 border-t border-border py-10 first:border-t-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <MethodBadge method={endpoint.method} />
        <EndpointPath path={endpoint.path} />
        {isPublic && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            No auth required
          </span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-brand-surface">{endpoint.summary}</h3>

      {/* Descriptions are authored as short markdown; the only markup used is
          **bold**, `code`, and paragraph breaks, so they are rendered here
          rather than pulling in a markdown runtime for three constructs. */}
      <Prose text={endpoint.description} />

      <ParameterTable title="Path parameters" parameters={pathParams} />
      <ParameterTable title="Query parameters" parameters={queryParams} />
      <RequestBody endpoint={endpoint} />
      <Responses endpoint={endpoint} />

      <div className="mt-6">
        <CodeBlock label="Example request" code={curlFor(endpoint)} />
      </div>
    </section>
  );
}

/**
 * Minimal inline-markdown renderer for the spec's descriptions: paragraphs,
 * `**bold**`, and `` `code` ``. Deliberately not a markdown library — the spec
 * is authored knowing this is what renders it, and a full parser here would be
 * a dependency plus a sanitisation question for three constructs.
 */
export function Prose({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className={cn("mt-3 space-y-3", className)}>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
          {renderInline(paragraph)}
        </p>
      ))}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Bold first, then code inside it: the spec writes things like
  // **`startDate` and `endDate` are required**, and matching code first would
  // leave the surrounding asterisks stranded as literal text.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[13px] text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Compact endpoint row used on index pages. */
export function EndpointRow({ endpoint, href }: { endpoint: Endpoint; href: string }) {
  return (
    <li>
      <Link href={href} className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted">
        <MethodBadge method={endpoint.method} className="mt-0.5" />
        <span className="min-w-0">
          <EndpointPath path={endpoint.path} className="block truncate" />
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{endpoint.summary}</span>
        </span>
      </Link>
    </li>
  );
}

export { CodeBlock };
