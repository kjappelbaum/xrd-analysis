import { CommonSpectrum } from 'common-spectrum';

export const {
  Analysis,
  AnalysesManager,
  fromJcamp,
  toJcamp,
  getJSGraph,
  getNormalizationAnnotations,
} = CommonSpectrum({
  dataType: 'XRD pattern',
  defaultFlavor: undefined,
});

export { fromBRML } from './from/fromBRML';
