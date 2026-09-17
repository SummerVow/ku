import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, openSync, closeSync, writeFileSync, readFileSync, unlinkSync, appendFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const url = "http://127.0.0.1:5173/";
const state = path.join(root, ".sites-runtime");
const lockPath = path.join(state, "portfolio-launcher.lock");
const logPath = path.join(state, "portfolio-launcher.log");
const noBrowser = process.argv.includes("--no-browser");
let child;
let ownsLock = false;
let stopped = false;

function cleanup() {
  if (stopped) return;
  stopped = true;
  if (child && child.exitCode === null && child.pid) {
    if (process.platform === "win32") {
      // Only terminate the process tree started by this launcher.
      spawnSync("taskkill.exe", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
    } else child.kill("SIGTERM");
  }
  if (ownsLock) {
    try { unlinkSync(lockPath); } catch { /* Already released. */ }
    ownsLock = false;
  }
}
process.on("SIGINT", () => { cleanup(); process.exit(0); });
process.on("SIGTERM", () => { cleanup(); process.exit(0); });
process.on("SIGHUP", () => { cleanup(); process.exit(0); });
process.on("exit", cleanup);

async function ready() {
  try {
    const marker = await fetch(new URL("portfolio-launcher.json", url), { signal: AbortSignal.timeout(2500) });
    if (!marker.ok || (await marker.json()).id !== "li-jiafu-portfolio-local") return false;
    const page = await fetch(url, { signal: AbortSignal.timeout(5000) });
    return page.ok && (await page.text()).includes('id="vibe-lab"');
  } catch { return false; }
}
function acquireLock() {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const fd = openSync(lockPath, "wx");
      writeFileSync(fd, JSON.stringify({ pid: process.pid }));
      closeSync(fd);
      ownsLock = true;
      return true;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      let pid;
      try { pid = JSON.parse(readFileSync(lockPath, "utf8")).pid; } catch { return false; }
      if (!Number.isInteger(pid) || pid <= 0) throw new Error(`启动记录损坏，请删除 ${lockPath} 后重试。`);
      try { process.kill(pid, 0); return false; }
      catch (error) {
        if (error.code !== "ESRCH") return false;
        try { unlinkSync(lockPath); } catch (error) { if (error.code !== "ENOENT") throw error; }
      }
    }
  }
  return false;
}
async function openWebsite() {
  console.log(`\n作品集已就绪：${url}`);
  if (noBrowser) return;
  const browser = spawn("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", `Start-Process '${url}'`], { windowsHide: true, stdio: "ignore" });
  await new Promise((resolve) => {
    browser.once("error", () => { console.log("浏览器未能自动打开，请复制上方网址访问。"); resolve(); });
    browser.once("exit", (code) => { if (code) console.log("请复制上方网址，在浏览器中打开。"); resolve(); });
  });
}

async function main() {
  const [major, minor] = process.versions.node.split(".").map(Number);
  if (major < 22 || (major === 22 && minor < 13)) throw new Error("需要 Node.js 22.13 或更新版本，请升级后重试。");
  if (!existsSync(path.join(root, "node_modules/vinext/dist/cli.js"))) throw new Error("缺少项目依赖。请先在项目目录运行 pnpm install，再双击启动。");
  mkdirSync(state, { recursive: true });
  console.log("正在准备作品集，请稍候……");
  if (await ready()) {
    console.log("检测到作品集已启动，直接打开已有页面。");
    await openWebsite();
    return;
  }
  if (acquireLock()) {
    writeFileSync(logPath, `Portfolio startup: ${new Date().toISOString()}\n`);
    child = spawn(process.execPath, ["--import", "./scripts/sites-env.mjs", "scripts/run-framework.mjs", "dev", "--hostname", "127.0.0.1"], {
      cwd: root, windowsHide: true, stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORTFOLIO_ONE_CLICK: "1", NO_COLOR: "1" },
    });
    child.stdout.on("data", (data) => appendFileSync(logPath, data));
    child.stderr.on("data", (data) => appendFileSync(logPath, data));
    child.once("error", (error) => appendFileSync(logPath, `${error.message}\n`));
  } else console.log("另一个启动窗口正在准备网页，将在就绪后自动打开。");

  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (await ready()) {
      await openWebsite();
      if (child && child.exitCode === null) {
        console.log("\n请保留这个窗口（可以最小化）。关闭此窗口或按 Ctrl+C 将停止网站。");
        console.log("电脑重启后，再次双击“启动作品集.cmd”即可。\n");
        const code = await new Promise((resolve) => child.once("exit", resolve));
        if (code) throw new Error(`服务已停止，请查看日志：${logPath}`);
      }
      return;
    }
    if (child && child.exitCode !== null) throw new Error(`服务启动失败（端口可能已被其他程序占用）。请查看日志：${logPath}`);
    await delay(900);
  }
  throw new Error(`网页启动超时，请重试。详细日志：${logPath}`);
}
main().catch((error) => { console.error(`\n${error.message}`); process.exitCode = 1; }).finally(cleanup);
