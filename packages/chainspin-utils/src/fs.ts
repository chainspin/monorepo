import * as path from 'path';
import { promises as fs } from 'fs';

/**
 * Returns `true` if the destination path exists and represents a directory.
 * @param dest Path to a directory.
 */
export async function isDirectory (dest: string) {
  return fs.stat(dest)
    .then((s) => s.isDirectory())
    .catch(() => false);
}

/**
 * Returns `true` if the destination path exists and represents a file.
 * @param dest Path to a file.
 */
export async function isFile (dest: string) {
  return fs.stat(dest)
    .then((s) => s.isFile())
    .catch(() => false);
}

/**
 * Creates a directory.
 * @param dest Directory path.
 */
export async function ensureDirectory (dest: string) {
  const exists = await isDirectory(dest);
  if (!exists) {
    await fs.mkdir(dest);
  }
}

/**
 * Creates a directory using recursion.
 * @param dest Directory path.
 */
export async function ensureDirectoryDeeply (dest: string) {
  const dirs = dest.replace(/\/$/, '').split('/');

  for (let i = 1; i <= dirs.length; i++) {
    const segment = dirs.slice(0, i).join('/');
    if (!segment) {
      continue;
    }
    const exists = await isDirectory(segment);
    if (!exists) {
      await ensureDirectory(segment);
    }
  }
}

/**
 * Returns a list of subdirectories as absolute paths.
 * @param dest Root directory.
 */
export async function getDirectories (dest: string) {
  return fs.readdir(dest).then((files) => {
    return Promise.all(
      files.map(async (f) => {
        const fp = path.join(dest, f);
        return await isDirectory(fp) ? fp : null
      })
    );
  }).then((files) => {
    return files.filter((f) => !!f);
  });
}

/**
 * Returns a list of subdirectories as absolute paths using recursion.
 * @param dest Root directory.
 */
export async function getDirectoriesDeeply (dest: string) {
  const dirs = await getDirectories(dest);

  await Promise.all(
    dirs.map((d) => {
      return getDirectoriesDeeply(d);
    })
  ).then((results) => {
    results.forEach((result) => dirs.push(...result));
  });

  return dirs;
}

/**
 * Returns a list of directory files as absolute paths.
 * @param dest Root directory.
 */
export async function getFiles (dest: string) {
  return fs.readdir(dest).then((files) => {
    return Promise.all(
      files.map(async (f) => {
        const fp = path.join(dest, f);
        return await isFile(fp) ? fp : null
      })
    );
  }).then((files) => {
    return files.filter((f) => !!f);
  });
}

/**
 * Returns a list of files as absolute paths using recursion.
 * @param dest Root directory.
 */
export async function getFilesDeeply (dest: string) {
  const dirs = await getDirectoriesDeeply(dest);
  const files = await getFiles(dest);
  await Promise.all(
    dirs.map((d) => getFiles(d))
  ).then((results) => {
    results.forEach((result) => files.push(...result));
  });
  return files.reduce((a, b) => a.concat(b), []);
}

/**
 * Returns file content.
 * @param dest File path.
 */
export async function readFile (dest: string) {
  return fs.readFile(dest);
}

/**
 * Writes content into a file.
 * @param dest File path.
 * @param data File content.
 */
export async function writeFile (dest: string, data: string) {
  return fs.writeFile(dest, data);
}
