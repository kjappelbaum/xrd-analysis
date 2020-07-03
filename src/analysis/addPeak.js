import { addPeaksKey } from './utils';
/**
 *
 * @param {Spectrum} spectrum
 * @param {object} peak
 */

export function addPeak(spectrum, peak = {}) {
  if (!peak.x) {
    throw new Error('addPeak: peak must have x property');
  }
  if (!peak.y) {
    throw new Error('addPeak: peak must have y property');
  }
  const { x, y, fwhm } = peak;

  addPeaksKey(spectrum);
  for (let existing of spectrum.peaks) {
    if (Number(existing.x) === x) return existing;
  }
  spectrum.peaks.push({
    x: x,
    y: y,
    fwhm: fwhm,
  });
  return peak;
}
