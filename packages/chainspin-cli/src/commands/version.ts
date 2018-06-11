import * as utils from '../utils';

/**
 * Displays package version.
 */
export default async function () {
  const version = await utils.getVersion();
  console.log(version);
}