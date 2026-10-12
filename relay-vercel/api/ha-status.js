const allowedOrigin = "https://www.obrien-ac.com";

function send(response, status, body) {
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Vary", "Origin");
  return response.status(status).json(body);
}

export default async function handler(request, response) {
  if (request.headers.origin !== allowedOrigin) return send(response, 403, { error: "Origin not allowed." });
  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader("Access-Control-Max-Age", "600");
    return response.status(204).end();
  }
  if (request.method !== "POST") return send(response, 405, { error: "Method not allowed." });

  const payload = request.body || {};
  let endpoint;
  try {
    endpoint = new URL(String(payload.url || ""));
  } catch {
    return send(response, 400, { error: "Invalid Home Assistant URL." });
  }
  if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".ui.nabu.casa")) {
    return send(response, 400, { error: "Only secure Home Assistant Cloud URLs are accepted." });
  }

  const token = String(payload.token || "");
  if (token.length < 40 || token.length > 1000) return send(response, 400, { error: "Invalid access token." });

  try {
    const homeAssistant = await fetch(new URL("/api/states", endpoint), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!homeAssistant.ok) {
      return send(response, homeAssistant.status === 401 ? 401 : 502, {
        error: `Home Assistant returned ${homeAssistant.status}.`,
      });
    }
    const states = await homeAssistant.json();
    const entities = Array.isArray(states)
      ? states.filter((entity) => String(entity?.entity_id || "").startsWith("climate."))
      : [];
    return send(response, 200, { entities });
  } catch {
    return send(response, 502, { error: "Home Assistant could not be reached." });
  }
}
