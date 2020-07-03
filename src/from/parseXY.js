/**
 * Parse diffractograms saved in xy files that are generated with PowDLL
 * @export
 * @param {String} [text] Text containing the data
 * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
 */
export function parseXY(text) {
  let lines = text.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));
  const header = lines[0];
  lines.splice(0, 1); // remove header line
  let data = {
    x: [],
    y: [],
  };
  for (const line of lines) {
    let tmp = line.split(/\s+/);
    data.x.push(parseFloat(tmp[0].trim()));
    data.y.push(parseFloat(tmp[1].trim()));
  }
  let headerLines = header.split('" ');

  // try to make metadata consistent with Bruker
  let meta = {};
  meta.id = trimReplace(headerLines[0]);
  meta.comment = trimReplace(headerLines[1]);
  meta.userName = trimReplace(headerLines[2]);
  meta.anode = trimReplace(headerLines[3]);
  meta.scanType = trimReplace(headerLines[4]);
  // eslint-disable-next-line radix
  meta.timePerStep = parseInt(trimReplace(headerLines[5]));

  const diffractogram = {
    data: { x: data.x, y: data.y },
    info: {
      xUnits: '2ϴ [°]',
      yUnits: 'counts',
      dataType: 'XRD pattern',
      origin: 'Data converted from xy using convert-to-jcamp',
    },
    meta: meta,
  };

  return diffractogram;
}

function trimReplace(string) {
  return string.split(':')[1].replace('"', '').replace("'", '').trim();
}
