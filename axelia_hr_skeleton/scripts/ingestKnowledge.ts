import { cody } from '../src/services/codyClient';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';

async function main() {
  const { filePath, namespace } = yargs(process.argv.slice(2))
    .option('filePath', { type: 'string', demandOption: true })
    .option('namespace', { type: 'string', default: 'hr' })
    .parseSync();

  const stats = fs.statSync(filePath);
  const targets: string[] = [];
  if (stats.isDirectory()) {
    for (const f of fs.readdirSync(filePath)) {
      targets.push(path.join(filePath, f));
    }
  } else {
    targets.push(filePath);
  }
  for (const f of targets) {
    console.log('Uploading', f);
    const res = await cody.uploadFile(f, namespace as string);
    console.log(res);
  }
}
main().catch(err => {
  console.error(err);
  process.exit(1);
});
