import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = "https://www.obrien-ac.com";

const reply = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });

export async function OPTIONS(request: NextRequest) {
  if (request.headers.get("origin") !== allowedOrigin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Max-Age": "600",
    },
  });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== allowedOrigin) return reply({ error: "Origin not allowed." }, 403);

  let payload: { url?: string; token?: string };
  try {
    payload = await request.json();
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }

  let endpoint: URL;
  try {
    endpoint = new URL(String(payload.url || ""));
  } catch {
    return reply({ error: "Invalid Home Assistant URL." }, 400);
  }

  if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".ui.nabu.casa")) {
    return reply({ error: "Only secure Home Assistant Cloud URLs are accepted." }, 400);
  }

  const token = String(payload.token || "");
  if (token.length < 40 || token.length > 1000) return reply({ error: "Invalid access token." }, 400);

  try {
    const response = await fetch(new URL("/api/states", endpoint), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return reply({ error: `Home Assistant returned ${response.status}.` }, response.status === 401 ? 401 : 502);
    const states = await response.json();
    const entities = Array.isArray(states)
      ? states.filter((entity) => String(entity?.entity_id || "").startsWith("climate."))
      : [];
    return reply({ entities });
  } catch {
    return reply({ error: "Home Assistant could not be reached." }, 502);
  }
}
