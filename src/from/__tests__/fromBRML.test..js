import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBRML } from '../fromBRML';

test('fromBRML', async () => {
  let brml = readFileSync(join(__dirname, '../../../testFiles/test.brml'));
  let analysis = await fromBRML(brml);

  let spectrum = analysis.getSpectrum();

  expect(spectrum.variables.x.data).toHaveLength(2443);
  expect(spectrum.variables.y.data).toHaveLength(2443);
  expect(spectrum.variables.x.label).toStrictEqual('2ϴ [°]');
  expect(spectrum.variables.x.units).toStrictEqual('°');
  expect(spectrum.variables.y.label).toStrictEqual('counts');
  expect(spectrum.variables.y.units).toStrictEqual('counts');
});
