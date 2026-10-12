const allowedOrigin = "https://www.obrien-ac.com";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": allowedOrigin,
      vary: "Origin",
    },
  });

export async function onRequestPost({ request }) {
  if (request.headers.get("origin") !== allowedOrigin) return json({ error: "Origin not allowed." }, 403);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  let endpoint;
  try {
    endpoint = new URL(payload.url);
  } catch {
    return json({ error: "Invalid Home Assistant URL." }, 400);
  }

  if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".ui.nabu.casa")) {
    return json({ error: "Only secure Home Assistant Cloud URLs are accepted." }, 400);
  }

  const token = String(payload.token || "");
  if (token.length < 40 || token.length > 1000) return json({ error: "Invalid access token." }, 400);

  try {
    const response = await fetch(new URL("/api/states", endpoint), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    if (!response.ok) return json({ error: `Home Assistant returned ${response.status}.` }, response.status === 401 ? 401 : 502);
    const states = await response.json();
    const climate = Array.isArray(states)
      ? states.filter((entity) => String(entity.entity_id || "").startsWith("climate."))
      : [];
    return json({ entities: climate });
  } catch {
    return json({ error: "Home Assistant could not be reached." }, 502);
  }
}

export function onRequestOptions({ request }) {
  if (request.headers.get("origin") !== allowedOrigin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": allowedOrigin,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "600",
    },
  });
}
