import { join } from 'path';

import { predictPattern } from '../predict';

test('predictPattern', async () => {
  const cif = join(__dirname, '../../../testFiles/FIBFUS_clean.cif');
  let pattern = await predictPattern(cif);
  let spectrum = pattern.getSpectrum();
  expect(spectrum.meta.lambda).toStrictEqual(1.5406);
  expect(spectrum.variables.x.data).toHaveLength(2501);
});
