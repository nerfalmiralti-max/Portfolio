import assert from "node:assert/strict";
import test from "node:test";

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

test("the homepage server-renders its headline and evidence", async () => {
  const body = await html("/");
  assert.match(body, /Altair Tolesh/);
  assert.match(body, /design and build websites for real projects/);
  assert.match(body, /99 AKTAU/);
  assert.match(body, /Tuesday Lounge Bar/);
  assert.doesNotMatch(body, /codex-preview|react-loading-skeleton/);
});

test("content is present in the HTML, not revealed by client JS", async () => {
  // Regression guard: reveal animations must never gate content on scripting.
  const body = await html("/");
  assert.match(body, /<h1[^>]*>I design and build websites for real projects\.<\/h1>/);
  assert.doesNotMatch(body, /data-motion="on"/);
});

test("every route server-renders", async () => {
  for (const path of [
    "/work",
    "/work/99-aktau",
    "/work/tuesday-lounge-bar",
    "/work/mangystau-trials",
    "/about",
    "/contact",
    "/privacy",
  ]) {
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

test("project schematics contain no invented product data", async () => {
  // The old visuals showed fake booking IDs, times, and trip distances.
  for (const path of [
    "/work/99-aktau",
    "/work/tuesday-lounge-bar",
    "/work/mangystau-trials",
  ]) {
    const body = await html(path);
    assert.doesNotMatch(body, /Request #\d/);
    assert.doesNotMatch(body, /\d+ km/);
    assert.doesNotMatch(body, /\d\d:\d\d/);
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
