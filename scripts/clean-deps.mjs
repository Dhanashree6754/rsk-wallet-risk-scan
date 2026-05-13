import { rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'ignore', shell: false });
    child.on('close', (code) => resolve(code ?? 0));
    child.on('error', () => resolve(0));
  });
}

function runCmd(command) {
  return new Promise((resolve) => {
    const child = spawn('cmd.exe', ['/c', command], { stdio: 'ignore', shell: false });
    child.on('close', (code) => resolve(code ?? 0));
    child.on('error', () => resolve(0));
  });
}

function runPowerShell(command) {
  return new Promise((resolve) => {
    const child = spawn(
      'powershell.exe',
      ['-NoProfile', '-Command', command],
      { stdio: 'ignore', shell: false }
    );
    child.on('close', (code) => resolve(code ?? 0));
    child.on('error', () => resolve(0));
  });
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function tryRm(path) {
  await rm(path, { recursive: true, force: true, maxRetries: 0 });
}

async function removeWithRetries(path) {
  if (!existsSync(path)) return;

  // Best-effort: stop common node processes that can lock native binaries on Windows.
  if (process.platform === 'win32') {
    // Stop other node processes (excluding this script) which can keep .node binaries locked.
    const pid = process.pid;
    await runPowerShell(
      `Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne ${pid} } | Stop-Process -Force -ErrorAction SilentlyContinue`
    );
  }

  // Retry to mitigate transient EPERM locks (AV/indexers/file handles).
  const maxAttempts = 8;
  let lastErr;
  let targetPath = path;
  let renamed = false;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (process.platform === 'win32') {
        // If something is locking files, try renaming the directory out of the way first.
        // This makes subsequent installs deterministic even if deletion lags.
        if (!renamed && path === 'node_modules') {
          const tomb = `node_modules._deleting_${Date.now()}`;
          const code = await runCmd(`if exist "node_modules" ren "node_modules" "${tomb}"`);
          if (code === 0 && existsSync(tomb)) {
            targetPath = tomb;
            renamed = true;
          }
        }

        // rmdir is often more reliable than fs.rm for Windows-native .node binaries.
        await runCmd(`if exist "${targetPath}" rmdir /s /q "${targetPath}"`);
      }
      await tryRm(targetPath);
      return;
    } catch (e) {
      lastErr = e;
      await sleep(250 * Math.pow(2, attempt));
    }
  }
  // If we managed to rename node_modules out of the way, treat cleanup as successful
  // (the directory no longer blocks a clean install).
  if (renamed && path === 'node_modules') return;
  throw lastErr;
}

try {
  await removeWithRetries('node_modules');
  await removeWithRetries('.next');
} catch (e) {
  // Ensure npm surfaces a useful error when cleanup fails.
  console.error('[clean:deps] Failed to remove dependencies cache:', e);
  process.exitCode = 1;
}

