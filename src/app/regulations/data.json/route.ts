import { regData } from "@/lib/regulations";

/**
 * Every plain-English summary and citation as JSON, the regulations library's
 * counterpart to the AD library's open data. Built at deploy time.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(regData(), {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" },
  });
}
