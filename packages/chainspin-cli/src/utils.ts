import * as path from 'path';
import * as fs from '@chainspin/utils';

/**
 * Returns project configuration.
 */
export async function getConfig () {
  try {
    const dest = path.resolve(process.cwd(), 'package.json');
    const data = await fs.readFile(dest);
    return JSON.parse(data.toString()).chainspin;
  } catch (e) {
    return {};
  }
} 

/**
 * Returns project version.
 */
export async function getVersion (): Promise<string> {
  try {
    const dest = path.resolve(__dirname, '../package.json');
    const data = await fs.readFile(dest);
    return JSON.parse(data.toString()).version;
  } catch (e) {
    return 'unknown';
  }
} 
