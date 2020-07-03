import { kAlpha1Angstrom } from '../constants/wavelengths';

/* eslint-disable no-empty-function */
/**
 * Calculate the crystallite size according to the Scherrer equation.
 * Please check the strong assumptions (e.g., grains smaller than 0.1 to 0.2 μm)
 * for this analysis (https://en.wikipedia.org/wiki/Scherrer_equation).
 * The Scherrer equation only provides a lower bound, there also might be instrument broadening
 * (http://prism.mit.edu/XRAY/oldsite/CrystalSizeAnalysis.pdf)
 * @export
 * @param {Number} k  shape factor. The shape factor has a typical value of about 0.9, but varies with the actual shape of the crystallite. For a discussion see J. Appl. Cryst. 11 (1978) p102-113
 * @param {Number} lambda X-ray wavelength (output will be of the same unit)
 * @param {Number} beta FWHM line broadening in degree
 * @param {Number} theta  Bragg angle in degree, i.e. theta and not 2 theta
 * @returns mean size of the ordered (crystalline) domains in the unit of lambda
 */
export function scherrer(k, lambda, beta, theta) {
  return (k * lambda) / (toRadians(beta) * Math.cos(toRadians(theta)));
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
/**
 * Computes the broadening accoding to the Scherrer equation for every reflex
 * in the diffractogram. Uses the anode metal deposited in the metadata to
 * get the wavelength and the peaks previosuly picked
 * @export
 * @param {*} spectrum -with anode metal as metadata and picked peaks with FWHM, all in 2 theta units
 * @param {Number} k shape factor
 * @returns {Array} broadings - array of objects with x in 2 theta and crystallite sizes in nm
 */
export function scherrerForSpectrum(spectrum, k = 0.94) {
  if (!('peaks' in spectrum)) {
    throw new Error('There must be peaks to calculate the scherrer broadening');
  }

  if (!('anode' in spectrum.meta)) {
    throw new Error(
      'The anode metal must be available in the metadata of the spectrum',
    );
  }

  let anodeMetal = spectrum.meta.anode.toLowerCase();
  if (!(anodeMetal in kAlpha1Angstrom)) {
    throw new Error(
      'The wavelength for the anode metal in the metadata is not defined',
    );
  }

  const lambda = kAlpha1Angstrom[anodeMetal];

  let broadenings = [];

  for (let peak of spectrum.peaks) {
    // ToDo: the fact that we assume two theta and that fwhm is defined is not so since
    broadenings.push({
      x: peak.x,
      crystalliteSize: scherrer(k, lambda, peak.fwhm, peak.x / 2) / 100,
    }); // divide by 100 to convert A to nm
  }

  return broadenings;
}
