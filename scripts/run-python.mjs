import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const explicit = process.env.PYTHON;
const bundledWindowsPython = path.join(
  os.homedir(),
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "python",
  "python.exe"
);
const executable = explicit || (process.platform === "win32" ? bundledWindowsPython : "python3");
const result = spawnSync(executable, process.argv.slice(2), {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit"
});

if (result.error) {
  console.error(`Unable to run Python via ${executable}: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
