import assert from "node:assert/strict";
import test from "node:test";

const ROUTES = [
  "/",
  "/work",
  "/work/99-aktau",
  "/work/tuesday-lounge-bar",
  "/work/mangystau-trials",
  "/about",
  "/contact",
  "/privacy",
];

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function html(path) {
  const response = await render(path);
  assert.equal(response.status, 200, path);
  return response.text();
}

test("the homepage server-renders its identity and its work", async () => {
  const body = await html("/");
  assert.match(body, /Altair Tolesh/);
  assert.match(body, /design and build websites/);
  assert.match(body, /99 AKTAU/);
  assert.match(body, /TUESDAY/);
  assert.doesNotMatch(body, /codex-preview|react-loading-skeleton/);
});

test("content is present in the HTML, not revealed by client JS", async () => {
  // Regression guard: no entrance may gate content on scripting. The wordmark
  // is cut into one masked element per letter, so assert every letter is in
  // the server HTML and that the whole name is still one accessible string.
  const body = await html("/");
  for (const letter of ["A", "L", "T", "I", "R"]) {
    assert.match(body, new RegExp(`<span class="wordmark-glyph">${letter}</span>`));
  }
  assert.match(body, /aria-label="Altair Tolesh"/);
  assert.doesNotMatch(body, /data-motion="on"/);
});

test("every route server-renders", async () => {
  for (const path of ROUTES.slice(1)) {
    await html(path);
  }
});

test("case studies carry verifiable links and decisions", async () => {
  const body = await html("/work/99-aktau");
  assert.match(body, /https:\/\/99-aktau\.vercel\.app/);
  assert.match(body, /github\.com\/nerfalmiralti-max\/99-Aktau/);
  assert.match(body, /rel="noopener noreferrer"/);
  assert.match(body, /Key decisions/);
  assert.match(body, /Architecture/);
});

test("project visuals are drawn, never captured", async () => {
  // Every project visual is an SVG the page draws from the project's own
  // structure. A screenshot, a photograph, or a raster asset of any kind
  // reappearing here is a regression.
  for (const path of ["/", "/work", ...ROUTES.slice(2, 5)]) {
    const body = await html(path);
    assert.doesNotMatch(body, /\.(webp|png|jpg|jpeg|avif)\b/i, path);
    assert.doesNotMatch(body, /<img\b/i, path);
    assert.doesNotMatch(body, /<picture\b/i, path);
  }

  const home = await html("/");
  assert.match(home, /class="sys-canvas"/);
  assert.match(home, /role="img" aria-label="System diagram/);
});

test("project schematics contain no invented product data", async () => {
  // No fake booking IDs, distances, prices, or times may appear in a visual.
  for (const path of ROUTES.slice(2, 5)) {
    const body = await html(path);
    assert.doesNotMatch(body, /Request #\d/);
    assert.doesNotMatch(body, /\d+ km/);
    assert.doesNotMatch(body, /\d\d:\d\d/);
  }
});

test("no page exposes where the author lives, studies, or is right now", async () => {
  // The public site describes the work. It does not place the person: no city,
  // no country, no campus, no timezone, no coordinates, no study plans.
  const forbidden = [
    /Kazakhstan/i,
    /Nazarbayev/i,
    /Intellectual School/i,
    /\bUTC\s*\+?\s*5\b/i,
    /\bin Aktau\b/i,
    /\bfrom Aktau\b/i,
    /\bBased in\b/i,
    /\bStudying at\b/i,
    /\bStanford\b/i,
    /\d{1,3}\.\d+°\s*[NEWS]\b/,
    /homeLocation/,
    /alumniOf/,
    /og\.png/,
  ];

  for (const path of ROUTES) {
    const body = await html(path);
    for (const pattern of forbidden) {
      assert.doesNotMatch(body, pattern, `${pattern} appears on ${path}`);
    }
  }
});

test("merged pages keep their old URLs working", async () => {
  const cases = [
    ["/projects", "http://localhost/work"],
    ["/projects/99-aktau", "http://localhost/work/99-aktau"],
    ["/process", "http://localhost/about#process"],
    ["/journey", "http://localhost/about#lessons"],
  ];

  for (const [from, to] of cases) {
    const response = await render(from);
    assert.equal(response.status, 307, from);
    assert.equal(response.headers.get("location"), to, from);
  }
});

test("the work index keeps the client project first", async () => {
  const body = await html("/work");
  const client = body.indexOf("99 AKTAU");
  const prototype = body.indexOf("MANGYSTAU");
  assert.ok(client > -1, "the commercial project is in the index");
  assert.ok(
    client < prototype,
    "the commercial project appears before the hackathon prototype",
  );
  // The prototype must never be dressed up as finished work.
  assert.match(body, /Prototype, not a finished product/);
});
