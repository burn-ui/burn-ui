// Based on similar script in Material UI
//
// https://github.com/mui-org/material-ui/blob/2ee33c17c9b74166e35632f9c99a5bb1fbeee9ca/scripts/copy-files.js

// /* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src/components');

async function copyFiles() {
  try {
    const packageData = await createPackageFile();

    // Files to be added in root build folder
    await Promise.all(['README.md', 'LICENSE'].map(includeFileInBuild));

    // Files with LICENSE in header
    await addHeaderLicense(packageData);
    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Dropdown from '@burn-ui/core/Dropdown' are tree-shakeable.
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob
    .sync('*/index.js', { cwd: from })
    .map(path.dirname);

  await Promise.all(
    directoryPackages.map(async directoryPackage => {
      const packageJson = {
        sideEffects: false,
        module: path.join('../esm', directoryPackage, 'index.js'),
      };

      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      await fse.writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );

      return packageJsonPath;
    })
  );
}

async function createPackageFile() {
  const data = await fse.readFile(
    path.resolve(packagePath, './package.json'),
    'utf8'
  );

  const { scripts, devDependencies, workspaces, ...rest } = JSON.parse(data);

  const packageFile = {
    ...rest,
    private: false,
    main: './index.js',
    module: './esm/index.js',
  };

  const pkgPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(pkgPath, JSON.stringify(packageFile, null, 2), 'utf8');
  console.log(`Created package.json in ${pkgPath}`);

  return packageFile;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addHeaderLicense(packageData) {
  const license = `/** @icense Burn UI v${packageData.version}
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
`;

  await Promise.all(
    [
      './index.js',
      './esm/index.js',
      './umd/burn-ui.development.js',
      './umd/burn-ui.production.min.js',
    ].map(async file => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    })
  );
}

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

copyFiles();
