import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBRML } from '../fromBRML';

test('fromBRML', async () => {
  let brml = readFileSync(join(__dirname, '../../../testFiles/test.brml'));
  let analysis = await fromBRML(brml);

  expect(analysis.get().x).toHaveLength(2443);
  expect(analysis.get().y).toHaveLength(2443);
  expect(analysis.get().xLabel).toStrictEqual('TwoTheta / Degree [°]');
  expect(analysis.get().yLabel).toStrictEqual('counts');
});
