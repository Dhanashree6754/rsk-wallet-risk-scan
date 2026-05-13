import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
    child.on('error', reject);
  });
}

const repoRoot = process.cwd();
const tmpRoot = path.join(os.tmpdir(), `rsk-wallet-risk-scan-ci-${Date.now()}`);

if (process.platform === 'win32') {
  // Use robocopy to avoid long-path and locked-file edge cases.
  await run('cmd.exe', [
    '/c',
    `mkdir "${tmpRoot}" && robocopy "${repoRoot}" "${tmpRoot}" /E /XD node_modules .next .git /XF .env /NFL /NDL /NJH /NJS /NC /NS`,
  ]);
} else {
  await run('bash', [
    '-lc',
    `mkdir -p "${tmpRoot}" && rsync -a --delete --exclude node_modules --exclude .next --exclude .git --exclude .env "${repoRoot}/" "${tmpRoot}/"`,
  ]);
}

// Run the same strict gates in an isolated clean directory.
await run('npm', ['ci'], { cwd: tmpRoot });
await run('npm', ['audit', '--audit-level=low'], { cwd: tmpRoot });
await run('npm', ['run', 'build'], { cwd: tmpRoot });

