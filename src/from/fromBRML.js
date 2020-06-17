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

  analysis.pushSpectrum(parsed.data, {
    dataType: parsed.info.dataType,
    xLabel: parsed.info.xUnits,
    yLabel: parsed.info.yUnits,
    title: parsed.info.title,
    meta: parsed.meta,
  });
  return analysis;
}
