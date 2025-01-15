import webfontsGenerator from '@vusion/webfonts-generator';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';
import * as R from 'ramda';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __rootname = process.cwd();
console.log('__dirname', __dirname);

const srcDir = resolve(__rootname, 'webfonts');

function scanFiles(srcDir) {
  const files = [];

  try {
    const items = readdirSync(srcDir);

    for (const item of items) {
      const stat = statSync(resolve(srcDir, item));
      if (stat.isDirectory()) {
        files.push(...scanFiles(resolve(srcDir, item)));
      } else {
        files.push(resolve(srcDir, item));
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', error);
  }

  return files;
}

function generateFonts(files) {
  webfontsGenerator(
    {
      files: files,
      dest: resolve(__rootname, 'public/iconfont'),
      html: true,
      templateOptions: {
        classPrefix: 'icon-',
        baseSelector: '.icon',
        cssSelector: 'icon',
      },
    },
    function (error) {
      if (error) {
        console.error('Font generation failed:', error.message);
        if (error.stack) {
          console.error('Stack trace:', error.stack);
        }
        reject(error);
      } else {
        resolve();
      }
    }
  );
}

const main = R.pipe(scanFiles, generateFonts);
main(srcDir);
