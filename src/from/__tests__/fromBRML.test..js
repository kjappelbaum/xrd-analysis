import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBRML } from '../fromBRML';

test('fromBRML', async () => {
  let brml = readFileSync(join(__dirname, '../../../testFiles/test.brml'));
  let analysis = await fromBRML(brml);

  let spectrum = analysis.getSpectrum();

  expect(spectrum.x).toHaveLength(2443);
  expect(spectrum.y).toHaveLength(2443);
  expect(spectrum.xLabel).toStrictEqual('2ϴ [°]');
  expect(spectrum.yLabel).toStrictEqual('counts');
});
