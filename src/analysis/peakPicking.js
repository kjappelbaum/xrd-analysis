import { optimizePeaks } from 'ml-gsd';

import { addPeak } from './addPeak';
import { getPFandFWHMScaling, addPeaksKey } from './utils';

/**
 *
 * @param {Spectrum} spectrum
 * @param {number} targetX
 * @param {object} [options]
 * @param {number} [options.range=0] Search in a range around the targetX
 * @param {string} [options.profileFunc='lorentzian']
 * @param {number} [option.widthInit=0.1]
 * @param {boolean} [options.optimize=false] Search for the closest peak to the targetX
 */

export function peakPicking(spectrum, targetX, options = {}) {
  const {
    range = 0,
    optimize = false,
    profileFunc = 'lorentzian',
    widthInit = 3,
  } = options;

  // find the peak that is the closest to the click
  let bestPeak = getClosest(spectrum, targetX);
  addPeaksKey(spectrum);

  const pfSettings = getPFandFWHMScaling(profileFunc);

  if (optimize) {
    findClosest(spectrum, bestPeak);
  } else if (range) {
    bestInRange(spectrum, bestPeak, targetX, range);
  }

  bestPeak.width = widthInit;

  bestPeak = optimizePeaks(
    [bestPeak],
    spectrum.variables.x.data,
    spectrum.variables.y.data,
    {
      factorWidth: 1,
      // eslint-disable-next-line no-warning-comments
      functionName: pfSettings[0],
    },
  );

  return addPeak(spectrum, bestPeak[0]);
}

function getClosest(spectrum, targetX) {
  let bestPeak = {
    fwhm: 0.01,
    y: spectrum.variables.y.data[0],
    x: spectrum.variables.x.data[0],
    index: 0,
  };

  let error = Math.abs(targetX - bestPeak.x);
  for (let i = 1; i < spectrum.variables.x.data.length; i++) {
    let newError = Math.abs(targetX - spectrum.variables.x.data[i]);
    if (newError < error) {
      error = newError;
      setBestPeak(spectrum, bestPeak, i);
    }
  }
  return bestPeak;
}

function bestInRange(
  spectrum,
  bestPeak,
  targetX,
  range,
  greaterIsBetter = true, // to toggle between peaks in up/down direction
) {
  // we search the minimum based on x +/- range
  for (let i = 0; i < spectrum.variables.x.data.length; i++) {
    if (Math.abs(spectrum.variables.x.data[i] - targetX) <= range) {
      setGreaterPeak(spectrum, bestPeak, i, greaterIsBetter);
    }
  }
}

// eslint-disable-next-line no-warning-comments
// ToDo: Either implement this consitently or do not support this at all
function setGreaterPeak(spectrum, bestPeak, i, greaterIsBetter = true) {
  if (greaterIsBetter) {
    if (spectrum.variables.y.data[i] > bestPeak.y) {
      setBestPeak(spectrum, bestPeak, i);
    }
  } else {
    if (spectrum.variables.y.data[i] < bestPeak.y) {
      setBestPeak(spectrum, bestPeak, i);
    }
  }
}

function findClosest(spectrum, bestPeak) {
  let index = bestPeak.index;
  let previousIndex;
  while (index !== previousIndex) {
    previousIndex = index;
    if (index > 0 && spectrum.variables.y.data[index - 1] > bestPeak.y) {
      index--;
      setBestPeak(spectrum, bestPeak, index);
    } else if (
      index < spectrum.variables.x.length - 1 &&
      spectrum.y[index + 1] > bestPeak.y
    ) {
      index++;
      setBestPeak(spectrum, bestPeak, index);
    }
  }
}

function setBestPeak(spectrum, bestPeak, index) {
  bestPeak.index = index;
  bestPeak.x = spectrum.variables.x.data[index];
  bestPeak.y = spectrum.variables.y.data[index];
  bestPeak.fwhm = bestPeak.width;
}
