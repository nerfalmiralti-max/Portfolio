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
  assert.match(html, /prepare it for real use/);
  assert.match(html, /Tuesday Lounge Bar/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("server-renders each requested route", async () => {
  for (const path of ["/projects", "/projects/99-aktau", "/projects/tuesday-lounge-bar", "/projects/mangystau-trials", "/about", "/journey", "/contact", "/privacy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});
