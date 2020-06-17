import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBRML, fromJcamp, toJcamp } from '..';

test('xrdAnalysis', async () => {
  let blob = readFileSync(join(__dirname, '../../testFiles/test.brml'));
  let analysis = await fromBRML(blob);

  let jcamp = toJcamp(analysis);

  let newAnalysis = fromJcamp(jcamp).getSpectrum();

  expect(newAnalysis.x).toHaveLength(2443);
  expect(newAnalysis.y).toHaveLength(2443);
  expect(newAnalysis.dataType).toBe('XRD pattern');
  expect(newAnalysis.xLabel).toBe('2ϴ [°]');
  expect(newAnalysis.yLabel).toBe('counts');
  expect(newAnalysis.meta.scanMode).toBe('PsdFastScan');
});
