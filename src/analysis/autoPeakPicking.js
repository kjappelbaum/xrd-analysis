import { gsd, optimizePeaks } from 'ml-gsd';

import { addPeak } from './addPeak';
import { getPFandFWHMScaling, addPeaksKey } from './utils';
/**
 *
 * @param {*} spectrum
 * @param {object} [options={}]
 * @param {number} [options.from2Theta=0] - Start 2 Theta Angle
 * @param {number} [options.to2Theta=60] - Stop 2 Theta Angle
 * @param {number} [options.noiseLevel=0.01] - Specify the level of the noise
 * @param {number} [options.minMaxRatio=0.05] - Threshold to determine if a given peak should be considered as a noise
 * @param {string} [options.profileFunc='lorentzian']
 * @param {boolean} [options.replaceExisting=true] - Replace existing peaks
 */

export function autoPeakPicking(spectrum, options = {}) {
  const {
    noiseLevel = 0.001,
    minMaxRatio = 0.05,
    from2Theta = 0,
    to2Theta = 70,
    replaceExisting = true,
    profileFunc = 'lorentzian',
  } = options;

  let peaks = gsd(spectrum.variables.x.data, spectrum.variables.y.data, {
    noiseLevel,
    minMaxRatio,
    realTopDetection: true,
    maxCriteria: true,
    smoothY: false,
    sgOptions: { windowSize: 7, polynomial: 3 },
  });

  addPeaksKey(spectrum);

  const pfSettings = getPFandFWHMScaling(profileFunc);

  peaks = optimizePeaks(
    peaks,
    spectrum.variables.x.data,
    spectrum.variables.y.data,
    {
      factorWidth: 1,
      functionName: pfSettings[0],
    },
  );

  peaks = peaks.filter((peak) => peak.x >= from2Theta && peak.x <= to2Theta);

  if (replaceExisting) {
    while (spectrum.peaks.length) {
      spectrum.peaks.pop();
    }
  }

  peakLoop: for (let peak of peaks) {
    for (let existing of spectrum.peaks) {
      if (Number(existing.x) === Number(peak.x)) continue peakLoop;
    }
    addPeak(spectrum, {
      x: peak.x,
      y: peak.y,
      fwhm: peak.width / pfSettings[1], // the factor depends on the lineshape, source: http://easyspin.org/easyspin/documentation/lineshapes.html
    });
  }
}
