import { Calculate } from 'xrd-calculate';

import { Analysis } from '..';

/**
 * Create Analysis with predicted XRD pattern
 * @export
 * @param {String} fileName - path to CIF
 * @param {Object} options - options for the XRD prediction
 * @returns Analysis
 */
export async function predictPattern(fileName, options) {
  const xrdCalc = new Calculate();
  let xrd = await xrdCalc.cifToXrd(fileName, options);
  let x = [];
  let y = [];
  for (let peak of xrd[0].data) {
    x.push(peak.x);
    y.push(peak.y);
  }

  let analysis = new Analysis();

  const variables = {
    x: {
      data: x,
      label: '2ϴ [°]',
    },
    y: {
      data: y,
      label: 'counts',
    },
  };

  analysis.pushSpectrum(variables, {
    title: 'Predicted XRD pattern',
    meta: {
      xUnits: '2ϴ [°]',
      fileName: xrd[0].filename,
      lambda: xrd[0].lambda,
      yUnits: 'counts',
      dataType: 'XRD pattern',
      origin: 'Pattern predicted from CIF using xrd-calculate',
    },
    dataType: 'XRD pattern',
  });

  return analysis;
}
