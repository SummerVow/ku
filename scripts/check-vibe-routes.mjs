// Run against `pnpm start`; verifies full HTTP responses without client routing.
import assert from "node:assert/strict";

const base = process.env.VIBE_TEST_URL || "http://127.0.0.1:8787";
const projects = ["ticket-routing", "controlled-generation", "visible-agent"];
const documents = [
  "product-teardown",
  "competitor-analysis",
  "requirements",
  "prd",
  "validation",
];
const seenTitles = new Set();
const seenDescriptions = new Set();
async function read(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: HTTP response`);
  return response.text();
}
const home = await read("/");
assert.match(home, /id="vibe-lab"/);
assert.match(home, /AIGC 生成工作台/);
assert.match(home, /制度问答机器人/);
assert.equal((home.match(/class="vibe-card vibe-/g) || []).length, 3);
for (const slug of projects) {
  for (const suffix of ["", ...documents.map((document) => `/${document}`)]) {
    const path = `/vibe/${slug}${suffix}`;
    const html = await read(path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(
      /<meta name="description" content="([^"]+)"/i,
    )?.[1];
    assert.ok(title && !seenTitles.has(title), `${path}: unique title`);
    assert.ok(
      description && !seenDescriptions.has(description),
      `${path}: unique description`,
    );
    seenTitles.add(title);
    seenDescriptions.add(description);
    assert.match(
      html,
      slug === "ticket-routing" ? /自主实践 \/ 模拟案例/ : /示例内容 \/ 待替换/,
    );
    if (slug === "ticket-routing") {
      assert.doesNotMatch(html, /91\.4%|31\.7%|可信答案/);
      assert.match(html, /工单智能分流/);
    }
    assert.match(html, /href="\/#vibe-lab"/);
    assert.doesNotMatch(html, /href="#"/);
    if (slug === "ticket-routing") {
      assert.match(html, /href="\/demos\/ticket-routing\.html"/);
      assert.doesNotMatch(html, /Demo 待接入/);
    } else
      assert.match(html, /<button[^>]*disabled[^>]*>Demo 待接入<\/button>/);
    if (suffix) {
      assert.match(html, new RegExp(`href="${path}" aria-current="page"`));
    } else {
      assert.match(
        html,
        slug === "ticket-routing"
          ? /已接入交互 Demo/
          : /当前为前端交互原型，尚未接入真实 AI 服务。/,
      );
      for (const document of documents)
        assert.ok(html.includes(`href="/vibe/${slug}/${document}"`));
    }
    // A second full request checks server resolution independently of navigation history.
    const refreshed = await read(path);
    assert.ok(refreshed.includes(`<title>${title}</title>`));
    console.log(`PASS ${path}`);
  }
}
const demo = await read("/demos/ticket-routing.html");
assert.match(demo, /迅联 · 工单智能分流/);
assert.match(demo, /<script>/);
assert.doesNotMatch(demo, /file:\/\/\//);
for (const suffix of ["", ...documents.map((document) => `/${document}`)]) {
  const response = await fetch(new URL(`/vibe/trusted-answer${suffix}`, base), {
    redirect: "manual",
  });
  assert.ok([307, 308].includes(response.status), "legacy route redirects");
  assert.equal(
    response.headers.get("location"),
    `/vibe/ticket-routing${suffix}`,
  );
}
for (const path of ["/vibe/missing", "/vibe/ticket-routing/missing"]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, path);
}
console.log(
  "PASS: 18 case/document routes, metadata, direct repeat requests, empty Demo states, return anchors and 404s.",
);
