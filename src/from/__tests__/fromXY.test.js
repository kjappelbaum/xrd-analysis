import { readFileSync } from 'fs';
import { join } from 'path';

import { fromXY } from '../fromXY';

describe('fromXY', () => {
  const xy = readFileSync(
    join(__dirname, '../../../testFiles/MG1-Cu2O-28_bg_subtracted.xy'),
    'utf8',
  );

  it('check the dictionary', () => {
    const analysis = fromXY(xy);
    let diffractogram = analysis.getSpectrum();
    expect(diffractogram.meta.userName).toBe('Lab Manager');
    expect(diffractogram.variables.x.data[0]).toStrictEqual(10);
    expect(diffractogram.variables.y.data[1]).toStrictEqual(
      -0.0755227112146954,
    );
    expect(diffractogram.variables.x.data[3448]).toStrictEqual(
      70.0050142705441,
    );
    expect(diffractogram.variables.y.data[3448]).toStrictEqual(0);
    expect(diffractogram.variables.x.data).toHaveLength(3449);
    expect(diffractogram.variables.y.data).toHaveLength(3449);
  });
});
