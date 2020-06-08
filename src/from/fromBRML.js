import { readBRML } from 'xrd';

import { Analysis } from '..';

/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {UInt8Array} blob - String containing the JCAMP data
 * @return {Analysis} - New class element with the given data
 */
export async function fromBRML(blob) {
  let parsed = await readBRML(blob);
  let analysis = new Analysis();
  analysis.set(parsed.data, {
    xLabel: parsed.metadata.xUnit,
    yLabel: parsed.metadata.yUnit,
    title: parsed.metadata.title,
    meta: parsed.metadata.info,
  });
  return analysis;
}
