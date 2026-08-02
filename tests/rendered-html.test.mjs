import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Altair Tolesh/);
  assert.match(html, /design and build websites for real projects/);
  assert.match(html, /Tuesday Lounge Bar/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("server-renders each requested route", async () => {
  for (const path of ["/work", "/work/99-aktau", "/work/tuesday-lounge-bar", "/work/mangystau-trials", "/about", "/process", "/journey", "/contact", "/privacy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

test("legacy project routes redirect to Work", async () => {
  const workResponse = await render("/projects");
  assert.equal(workResponse.status, 307);
  assert.equal(workResponse.headers.get("location"), "http://localhost/work");

  const caseResponse = await render("/projects/99-aktau");
  assert.equal(caseResponse.status, 307);
  assert.equal(caseResponse.headers.get("location"), "http://localhost/work/99-aktau");
});
