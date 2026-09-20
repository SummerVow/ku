// Run against `pnpm start`; verifies full HTTP responses without client routing.
import assert from "node:assert/strict";

const base = process.env.VIBE_TEST_URL || "http://127.0.0.1:8787";
const projects = ["ticket-routing", "midnight-press", "ai-project-pusher"];
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
      slug === "ticket-routing"
        ? /自主实践 \/ 模拟案例/
        : slug === "midnight-press"
          ? /自主实践 \/ 联调中/
          : /自主实践 \/ 本地原型/,
    );
    if (slug === "ticket-routing") {
      assert.doesNotMatch(html, /91\.4%|31\.7%|可信答案/);
      assert.match(html, /工单智能分流/);
    }
    assert.match(html, /href="\/#vibe-lab"/);
    assert.doesNotMatch(html, /href="#"/);
    if (slug === "ticket-routing") {
      assert.ok(html.includes('href="https://li-jiafu-ticket-demo.ggnb6666.chatgpt.site"'));
      if (!suffix) assert.match(html, /src="\/demos\/ticket-routing\.html"/);
      assert.doesNotMatch(html, /Demo 待接入/);
    } else if (slug === "midnight-press") {
      assert.ok(html.includes('href="https://li-jiafu-midnight-press.ggnb6666.chatgpt.site"'));
      assert.match(html, /午夜编辑室/);
      assert.doesNotMatch(html, /Demo 待接入/);
      if (!suffix) {
        assert.match(html, /src="\/demos\/midnight-press\/index\.html"/);
        assert.match(html, /真实生成闭环未通过/);
      }
    } else if (slug === "ai-project-pusher") {
      assert.match(html, /AI 项目推进助手/);
      assert.match(html, /六类事实/);
      // 本地原型已并入页面，独立线上地址尚未部署，因此“体验 Demo”按钮仍是待接入状态。
      assert.match(html, /<button[^>]*disabled[^>]*>Demo 待接入<\/button>/);
      if (!suffix) {
        assert.match(html, /src="\/demos\/ai-project-pusher\.html"/);
        assert.match(html, /用户价值假设既没被证实，也没被否定/);
        assert.match(html, /href="#prototype">体验本页原型/);
      }
    } else assert.match(html, /<button[^>]*disabled[^>]*>Demo 待接入<\/button>/);
    if (suffix) {
      assert.match(html, new RegExp(`href="${path}" aria-current="page"`));
    } else {
      assert.match(
        html,
        slug === "ticket-routing"
          ? /已接入交互 Demo/
          : slug === "midnight-press"
            ? /已接入午夜编辑室展示版/
            : /已接入本页原型/,
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
const press = await read("/demos/midnight-press/index.html");
assert.match(press, /午夜编辑室/);
for (const asset of press.matchAll(/(?:src|href)="(\.\/assets\/[^\"]+)"/g)) {
  await read(`/demos/midnight-press/${asset[1].slice(2)}`);
}
const pusher = await read("/demos/ai-project-pusher.html");
assert.match(pusher, /AI 项目推进助手/);
assert.match(pusher, /六类事实/);
assert.match(pusher, /<script>/);
assert.match(pusher, /tag-guard/);
assert.doesNotMatch(pusher, /file:\/\/\//);
for (const [alias, canonical] of [["trusted-answer", "ticket-routing"], ["controlled-generation", "midnight-press"]]) {
for (const suffix of ["", ...documents.map((document) => `/${document}`)]) {
  const response = await fetch(new URL(`/vibe/${alias}${suffix}`, base), {
    redirect: "manual",
  });
  assert.ok([307, 308].includes(response.status), "legacy route redirects");
  assert.equal(
    response.headers.get("location"),
    `/vibe/${canonical}${suffix}`,
  );
}
}
for (const path of ["/vibe/missing", "/vibe/ticket-routing/missing"]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, path);
}
console.log(
  "PASS: 18 case/document routes, metadata, direct repeat requests, empty Demo states, return anchors and 404s.",
);
