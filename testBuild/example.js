import { predictPattern } from '../dist/xrd-analysis.js';
async function main() {
  var cif = '/../../testFiles/FIBFUS_clean.cif';
  var pattern = await predictPattern(cif);
  var spectrum = pattern.getSpectrum();
  console.log(spectrum);
}

main();
