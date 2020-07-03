export function getPFandFWHMScaling(profileFunc) {
  let pf = profileFunc.toLowerCase();
  let fwhmScaling = Math.sqrt(3);
  switch (pf) {
    case 'lorentzian':
      break;
    case 'gaussian':
      fwhmScaling = Math.sqrt(2);
      break;
    default:
      pf = 'lorentzian';
  }

  return [pf, fwhmScaling];
}

export function addPeaksKey(spectrum) {
  if (!('peaks' in spectrum)) {
    spectrum.peaks = [];
  }
}
