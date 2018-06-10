import * as fs from 'fs';
import * as path from 'path';

/**
 * Returns configuration data.
 */
export function getConfigSync () {
  try {
    const src = getPachageSrcSync();
    return JSON.parse(src).chainspin;
  } catch (e) {
    return {};
  }  
}
/**
 * Returns file source synchronously.
 * @param dest File path.
 */
function getFileSrcSync (dest) {
  try {
    return fs.readFileSync(dest).toString();
  } catch (e) {
    return null;
  }  
}

/**
 * Returns package.json file source synchronously. The method will search for the file in the
 * working directory first. If the file is not found then source of package's file is returned.
 */
function getPachageSrcSync () {
  return (
    getFileSrcSync(
      path.resolve(process.cwd(), 'package.json')
    ) || getFileSrcSync(
      path.resolve(__dirname, '../package.json')
    )
  );
}
