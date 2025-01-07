import { readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import ejs from 'ejs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __rootname = process.cwd();

function generateBuildHash() {
  const buildId = readFileSync(join(__rootname, '.next/BUILD_ID'), 'utf-8');
  return buildId.trim();
}

// 递归遍历目录的函数
async function traverseDir(dir) {
  const files = [];

  // 读取目录内容
  const items = await readdir(dir);

  for (const item of items) {
    const fullPath = join(dir, item);

    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      // 如果是目录,递归遍历
      files.push(...(await traverseDir(fullPath)));
    } else {
      // 如果是文件,添加到结果数组
      files.push(
        `${fullPath.replace(__rootname, '').replace('/.next', '/_next')}`
      );
    }
  }

  return files;
}

(async () => {
  const staticPath = resolve(__rootname, '.next', 'static');
  const allFiles = await traverseDir(staticPath);

  const templatePath = join(__dirname, 'sw.ejs');
  const template = readFileSync(templatePath, 'utf-8');

  const renderedSw = ejs.render(template, {
    cacheList: JSON.stringify(['/', ...allFiles], null, 2),
    buildId: generateBuildHash(),
  });

  // 写入生成的 Service Worker 文件
  const outputPath = join(__rootname, 'public', `sw.js`);
  console.log(outputPath);
  writeFileSync(outputPath, renderedSw);
})();
