// Supabase Edge Function: proxies a manual data-update request from the
// sports-calendar UI to a GitHub Actions workflow_dispatch on the
// my-public-database repo.
//
// Required Supabase secrets:
//   GH_PAT     — fine-grained PAT with repo + workflow scope
//   GH_OWNER   — repo owner (e.g. "cpsy8")
//   GH_REPO    — repo name (e.g. "my-public-database")
//   GH_WORKFLOW (optional) — workflow file name (default: update-data.yml)
//   GH_REF     (optional) — ref to dispatch on (default: main)
//
// Deploy:
//   supabase functions deploy trigger-data-update
//
// Set secrets:
//   supabase secrets set GH_PAT=... GH_OWNER=... GH_REPO=...

interface UpdateRequest {
  sport?: string;
  mode?: string;
  round?: string | number | null;
  season?: string;
  all?: boolean;
}

const ALLOWED_SPORTS = new Set(["f1", "football", "cricket", "all"]);
const ALLOWED_MODES = new Set(["jolpica", "daily", "weekly"]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "method not allowed" }, 405);
  }

  let body: UpdateRequest;
  try {
    body = (await req.json()) as UpdateRequest;
  } catch {
    return json({ error: "invalid json body" }, 400);
  }

  const sport = String(body.sport ?? "f1");
  const mode = String(body.mode ?? "jolpica");
  if (!ALLOWED_SPORTS.has(sport)) return json({ error: "invalid sport" }, 400);
  if (!ALLOWED_MODES.has(mode)) return json({ error: "invalid mode" }, 400);

  const inputs: Record<string, string> = { sport, mode };
  if (body.round !== undefined && body.round !== null && body.round !== "") {
    inputs.round = String(body.round);
  }
  if (body.season) inputs.season = String(body.season);

  const pat = Deno.env.get("GH_PAT");
  const owner = Deno.env.get("GH_OWNER");
  const repo = Deno.env.get("GH_REPO");
  const workflow = Deno.env.get("GH_WORKFLOW") ?? "update-data.yml";
  const ref = Deno.env.get("GH_REF") ?? "main";

  if (!pat || !owner || !repo) {
    return json({ error: "GH_PAT, GH_OWNER, GH_REPO must be set" }, 500);
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
  const ghResp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "content-type": "application/json",
    },
    body: JSON.stringify({ ref, inputs }),
  });

  if (ghResp.status === 204) {
    return json(
      {
        queued: true,
        workflow,
        inputs,
        actions_url: `https://github.com/${owner}/${repo}/actions/workflows/${workflow}`,
      },
      202,
    );
  }

  const text = await ghResp.text();
  return json({ error: "github dispatch failed", status: ghResp.status, body: text }, 502);
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "content-type": "application/json" },
  });
}
