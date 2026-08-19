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
  assert.match(body, /design and build/);
  assert.match(body, /99 AKTAU/);
  assert.match(body, /Tuesday Lounge Bar/);
  assert.doesNotMatch(body, /codex-preview|react-loading-skeleton/);
});

test("content is present in the HTML, not revealed by client JS", async () => {
  // Regression guard: reveal animations must never gate content on scripting.
  // The headline is composed of masked lines, so assert every line is in the
  // server HTML rather than assuming one text node.
  const body = await html("/");
  for (const line of ["I design and build", "websites that go", "into production."]) {
    assert.match(body, new RegExp(`<span>${line.replace(".", "\\.")}</span>`));
  }
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

test("case studies open on a real screenshot of the live site", async () => {
  const body = await html("/work/99-aktau");
  // Captured from the public pages of the deployed site, not a mockup.
  assert.match(body, /\/projects\/99-aktau\/desktop\.webp/);
  assert.match(body, /\/projects\/99-aktau\/mobile\.webp/);
  // Small screens must get the mobile capture, not a shrunken desktop one.
  assert.match(body, /media="\(max-width: 720px\)"/);
  // Every shipped capture needs a real description.
  assert.doesNotMatch(body, /alt=""/);
});

test("project screenshots exist on disk at the referenced paths", async () => {
  const { existsSync, statSync } = await import("node:fs");
  for (const slug of ["99-aktau", "tuesday", "mangystau"]) {
    for (const shot of ["desktop", "mobile"]) {
      const file = new URL(`../public/projects/${slug}/${shot}.webp`, import.meta.url);
      assert.ok(existsSync(file), `missing ${slug}/${shot}.webp`);
      // Guard against shipping an unoptimised capture by accident.
      assert.ok(statSync(file).size < 250_000, `${slug}/${shot}.webp is too heavy`);
    }
  }
});

test("the hero headline is server-rendered with its full accessible name", async () => {
  const body = await html("/");
  assert.match(body, /aria-label="I design and build websites that go into production\./);
  assert.match(body, /class="hero-line"/);
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

test("project hierarchy puts the client project first", async () => {
  // Phase 2 differentiates featured from supporting work by composition, so a
  // broken tier would silently promote the prototype.
  const body = await html("/work");
  const featured = body.indexOf("featured");
  const prototype = body.indexOf("Mangystau Trials");
  assert.ok(featured > -1, "featured treatment is rendered");
  assert.ok(
    body.indexOf("99 AKTAU") < prototype,
    "the commercial project appears before the hackathon prototype",
  );
  // The prototype must never be dressed up as finished work.
  assert.match(body, /Prototype, not a finished product/);
});
