/**
 * xrd-analysis
 * @version v0.1.0
 * @link https://github.com/cheminfo/xrd-analysis#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.XRDAnalysis = {}));
}(this, (function (exports) { 'use strict';

  class AnalysesManager {
    constructor() {
      this.analyses = [];
    }

    addAnalysis(analysis) {
      let index = this.getAnalysisIndex(analysis.id);

      if (index === undefined) {
        this.analyses.push(analysis);
      } else {
        this.analyses[index] = analysis;
      }
    }

    getAnalyses(options = {}) {
      const {
        ids
      } = options;
      let analyses = [];

      for (const analysis of this.analyses) {
        if (!ids || ids.includes(analysis.id)) {
          analyses.push(analysis);
        }
      }

      return analyses;
    }
    /**
     * Remove the analysis from the AnalysesManager for the specified id
     * @param {string} id
     */


    removeAnalysis(id) {
      let index = this.getAnalysisIndex(id);
      if (index === undefined) return undefined;
      return this.analyses.splice(index, 1);
    }
    /**
     * Returns the index of the analysis in the analyses array
     * @param {string} id
     * @returns {number}
     */


    getAnalysisIndex(id) {
      if (!id) return undefined;

      for (let i = 0; i < this.analyses.length; i++) {
        let analysis = this.analyses[i];
        if (analysis.id === id) return i;
      }

      return undefined;
    }
    /**
     * Checks if the ID of an analysis exists in the AnalysesManager
     * @param {string} id
     */


    includes(id) {
      return !isNaN(this.getAnalysisIndex(id));
    }

  }

  const toString = Object.prototype.toString;
  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  const toString$1 = Object.prototype.toString;
  function isAnyArray$1(object) {
    return toString$1.call(object).endsWith('Array]');
  }

  const toString$2 = Object.prototype.toString;

  function isAnyArray$2(object) {
    return toString$2.call(object).endsWith('Array]');
  }

  var src = isAnyArray$2;

  /**
   * Computes the maximum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function max(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var maxValue = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] > maxValue) maxValue = input[i];
    }

    return maxValue;
  }

  /**
   * Computes the mean of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function sum(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += input[i];
    }

    return sumValue;
  }

  /**
   * Computes the norm of the given values
   * @param {Array<number>} input
   * @param {object} [options={}]
   * @param {string} [options.algorithm='absolute'] absolute, sum or max
   * @param {number} [options.maxValue=1] new max value for algo max
   * @param {number} [options.sumValue=1] new max value for algo absolute and sum
   * @param {Array} [options.output=[]] specify the output array, can be the input array for in place modification
   * @return {number}
   */

  function norm(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$algorithm = options.algorithm,
        algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm,
        _options$sumValue = options.sumValue,
        sumValue = _options$sumValue === void 0 ? 1 : _options$sumValue,
        _options$maxValue = options.maxValue,
        maxValue = _options$maxValue === void 0 ? 1 : _options$maxValue;

    if (!isAnyArray$1(input)) {
      throw new Error('input must be an array');
    }

    var output;

    if (options.output !== undefined) {
      if (!isAnyArray$1(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    if (input.length === 0) {
      throw new Error('input must not be empty');
    }

    switch (algorithm.toLowerCase()) {
      case 'absolute':
        {
          var absoluteSumValue = absoluteSum(input) / sumValue;
          if (absoluteSumValue === 0) return input.slice(0);

          for (var i = 0; i < input.length; i++) {
            output[i] = input[i] / absoluteSumValue;
          }

          return output;
        }

      case 'max':
        {
          var currentMaxValue = max(input);
          if (currentMaxValue === 0) return input.slice(0);
          var factor = maxValue / currentMaxValue;

          for (var _i = 0; _i < input.length; _i++) {
            output[_i] = input[_i] * factor;
          }

          return output;
        }

      case 'sum':
        {
          var sumFactor = sum(input) / sumValue;
          if (sumFactor === 0) return input.slice(0);

          for (var _i2 = 0; _i2 < input.length; _i2++) {
            output[_i2] = input[_i2] / sumFactor;
          }

          return output;
        }

      default:
        throw new Error("norm: unknown algorithm: ".concat(algorithm));
    }
  }

  function absoluteSum(input) {
    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += Math.abs(input[i]);
    }

    return sumValue;
  }

  /**
   * Computes the minimum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function min(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var minValue = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] < minValue) minValue = input[i];
    }

    return minValue;
  }

  /**
   *
   * @param {Array} input
   * @param {object} [options={}]
   * @param {Array} [options.output=[]] specify the output array, can be the input array for in place modification
   */

  function rescale(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!src(input)) {
      throw new TypeError('input must be an array');
    } else if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var output;

    if (options.output !== undefined) {
      if (!src(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    var currentMin = min(input);
    var currentMax = max(input);

    if (currentMin === currentMax) {
      throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
    }

    var _options$min = options.min,
        minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
        _options$max = options.max,
        maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

    if (minValue >= maxValue) {
      throw new RangeError('min option must be smaller than max option');
    }

    var factor = (maxValue - minValue) / (currentMax - currentMin);

    for (var i = 0; i < input.length; i++) {
      output[i] = (input[i] - currentMin) * factor + minValue;
    }

    return output;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  /**
   * Fill an array with sequential numbers
   * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
   * @param {object} [options={}]
   * @param {number} [options.from=0] - first value in the array
   * @param {number} [options.to=10] - last value in the array
   * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
   * @param {number} [options.step] - if not provided calculated from size
   * @return {Array<number>}
   */


  function sequentialFill() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (_typeof(input) === 'object' && !src(input)) {
      options = input;
      input = [];
    }

    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    var _options = options,
        _options$from = _options.from,
        from = _options$from === void 0 ? 0 : _options$from,
        _options$to = _options.to,
        to = _options$to === void 0 ? 10 : _options$to,
        _options$size = _options.size,
        size = _options$size === void 0 ? input.length : _options$size,
        step = _options.step;

    if (size && step) {
      throw new Error('step is defined by the array size');
    }

    if (!size) {
      if (step) {
        size = Math.floor((to - from) / step) + 1;
      } else {
        size = to - from + 1;
      }
    }

    if (!step && size) {
      step = (to - from) / (size - 1);
    }

    if (Array.isArray(input)) {
      input.length = 0; // only works with normal array

      for (var i = 0; i < size; i++) {
        input.push(from);
        from += step;
      }
    } else {
      if (input.length !== size) {
        throw new Error('sequentialFill typed array must have the correct length');
      }

      for (var _i = 0; _i < size; _i++) {
        input[_i] = from;
        from += step;
      }
    }

    return input;
  }

  /**
   * Normalize an array of zones:
   * - ensure than from < to
   * - merge overlapping zones
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [zones=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */
  function normalize(zones = [], options = {}) {
    if (zones.length === 0) return [];
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    zones = JSON.parse(JSON.stringify(zones)).map(zone => zone.from > zone.to ? {
      from: zone.to,
      to: zone.from
    } : zone);
    zones = zones.sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });
    zones.forEach(zone => {
      if (from > zone.from) zone.from = from;
      if (to < zone.to) zone.to = to;
    });
    zones = zones.filter(zone => zone.from <= zone.to);
    if (zones.length === 0) return [];
    let currentZone = zones[0];
    let result = [currentZone];

    for (let i = 1; i < zones.length; i++) {
      let zone = zones[i];

      if (zone.from <= currentZone.to) {
        currentZone.to = zone.to;
      } else {
        currentZone = zone;
        result.push(currentZone);
      }
    }

    return result;
  }

  /**
   * Convert an array of exclusions and keep only from / to
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [exclusions=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of zones (after inversion)
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of zones (after inversion)
   */

  function invert(exclusions = [], options = {}) {
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    exclusions = normalize(exclusions, {
      from,
      to
    });
    if (exclusions.length === 0) return [{
      from,
      to
    }];
    let zones = [];

    for (let i = 0; i < exclusions.length; i++) {
      let exclusion = exclusions[i];
      let nextExclusion = exclusions[i + 1];

      if (i === 0) {
        if (exclusion.from > from) {
          zones.push({
            from,
            to: exclusion.from
          });
        }
      }

      if (i === exclusions.length - 1) {
        if (exclusion.to < to) {
          zones.push({
            from: exclusion.to,
            to
          });
        }
      } else {
        zones.push({
          from: exclusion.to,
          to: nextExclusion.from
        });
      }
    }

    return zones;
  }

  /**
   * Add the number of points per zone to reach a specified total
   * @param {Array} [zones=[]]
   * @param {number} [numberOfPoints] Total number of points to distribute between zones
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */

  function zonesWithPoints(zones, numberOfPoints, options = {}) {
    if (zones.length === 0) return zones;
    zones = normalize(zones, options);
    const totalSize = zones.reduce((previous, current) => {
      return previous + (current.to - current.from);
    }, 0);
    let unitsPerPoint = totalSize / numberOfPoints;
    let currentTotal = 0;

    for (let i = 0; i < zones.length - 1; i++) {
      let zone = zones[i];
      zone.numberOfPoints = Math.min(Math.round((zone.to - zone.from) / unitsPerPoint), numberOfPoints - currentTotal);
      currentTotal += zone.numberOfPoints;
    }

    zones[zones.length - 1].numberOfPoints = numberOfPoints - currentTotal;
    return zones;
  }

  /**
   * Function that calculates the integral of the line between two
   * x-coordinates, given the slope and intercept of the line.
   * @param {number} x0
   * @param {number} x1
   * @param {number} slope
   * @param {number} intercept
   * @return {number} integral value.
   */
  function integral(x0, x1, slope, intercept) {
    return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "smooth"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "smooth"
   */

  function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints - 1);
    let halfStep = step / 2;
    let output = new Array(numberOfPoints);
    let initialOriginalStep = x[1] - x[0];
    let lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

    let min = from - halfStep;
    let max = from + halfStep;
    let previousX = Number.MIN_VALUE;
    let previousY = 0;
    let nextX = x[0] - initialOriginalStep;
    let nextY = 0;
    let currentValue = 0;
    let slope = 0;
    let intercept = 0;
    let sumAtMin = 0;
    let sumAtMax = 0;
    let i = 0; // index of input

    let j = 0; // index of output

    function getSlope(x0, y0, x1, y1) {
      return (y1 - y0) / (x1 - x0);
    }

    let add = 0;

    main: while (true) {
      if (previousX <= min && min <= nextX) {
        add = integral(0, min - previousX, slope, previousY);
        sumAtMin = currentValue + add;
      }

      while (nextX - max >= 0) {
        // no overlap with original point, just consume current value
        add = integral(0, max - previousX, slope, previousY);
        sumAtMax = currentValue + add;
        output[j++] = (sumAtMax - sumAtMin) / step;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        sumAtMin = sumAtMax;
      }

      currentValue += integral(previousX, nextX, slope, intercept);
      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else if (i === xLength) {
        nextX += lastOriginalStep;
        nextY = 0;
      }

      slope = getSlope(previousX, previousY, nextX, nextY);
      intercept = -slope * previousX + previousY;
    }

    return output;
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "slot"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "slot"
   */
  function equallySpacedSlot(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints - 1);
    let halfStep = step / 2;
    let lastStep = x[x.length - 1] - x[x.length - 2];
    let start = from - halfStep;
    let output = new Array(numberOfPoints); // Init main variables

    let min = start;
    let max = start + step;
    let previousX = -Number.MAX_VALUE;
    let previousY = 0;
    let nextX = x[0];
    let nextY = y[0];
    let frontOutsideSpectra = 0;
    let backOutsideSpectra = true;
    let currentValue = 0; // for slot algorithm

    let currentPoints = 0;
    let i = 1; // index of input

    let j = 0; // index of output

    main: while (true) {
      if (previousX >= nextX) throw new Error('x must be an increasing serie');

      while (previousX - max > 0) {
        // no overlap with original point, just consume current value
        if (backOutsideSpectra) {
          currentPoints++;
          backOutsideSpectra = false;
        }

        output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
        j++;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        currentValue = 0;
        currentPoints = 0;
      }

      if (previousX > min) {
        currentValue += previousY;
        currentPoints++;
      }

      if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
        currentPoints--;
      }

      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else {
        nextX += lastStep;
        nextY = 0;
        frontOutsideSpectra++;
      }
    }

    return output;
  }

  /**
   * Function that returns a Number array of equally spaced numberOfPoints
   * containing a representation of intensities of the spectra arguments x
   * and y.
   *
   * The options parameter contains an object in the following form:
   * from: starting point
   * to: last point
   * numberOfPoints: number of points between from and to
   * variant: "slot" or "smooth" - smooth is the default option
   *
   * The slot variant consist that each point in the new array is calculated
   * averaging the existing points between the slot that belongs to the current
   * value. The smooth variant is the same but takes the integral of the range
   * of the slot and divide by the step size between two points in the new array.
   *
   * If exclusions zone are present, zones are ignored !
   * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
   * @param {object} [options={}]
   * @param {number} [options.from=x[0]]
   * @param {number} [options.to=x[x.length-1]]
   * @param {string} [options.variant='smooth']
   * @param {number} [options.numberOfPoints=100]
   * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
   * @param {Array} [options.zones=[]] array of from / to that should be kept
   * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
   */

  function equallySpaced(arrayXY = {}, options = {}) {
    let {
      x,
      y
    } = arrayXY;
    let xLength = x.length;
    let reverse = false;

    if (x.length > 1 && x[0] > x[1]) {
      x = x.slice().reverse();
      y = y.slice().reverse();
      reverse = true;
    }

    let {
      from = x[0],
      to = x[xLength - 1],
      variant = 'smooth',
      numberOfPoints = 100,
      exclusions = [],
      zones = []
    } = options;

    if (xLength !== y.length) {
      throw new RangeError("the x and y vector doesn't have the same size.");
    }

    if (typeof from !== 'number' || isNaN(from)) {
      throw new RangeError("'from' option must be a number");
    }

    if (typeof to !== 'number' || isNaN(to)) {
      throw new RangeError("'to' option must be a number");
    }

    if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
      throw new RangeError("'numberOfPoints' option must be a number");
    }

    if (numberOfPoints < 2) {
      throw new RangeError("'numberOfPoints' option must be greater than 1");
    }

    if (zones.length === 0) {
      zones = invert(exclusions, {
        from,
        to
      });
    }

    zones = zonesWithPoints(zones, numberOfPoints, {
      from,
      to
    });
    let xResult = [];
    let yResult = [];

    for (let zone of zones) {
      let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant);
      xResult = xResult.concat(zoneResult.x);
      yResult = yResult.concat(zoneResult.y);
    }

    if (reverse) {
      if (from < to) {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      } else {
        return {
          x: xResult,
          y: yResult
        };
      }
    } else {
      if (from < to) {
        return {
          x: xResult,
          y: yResult
        };
      } else {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      }
    }
  }

  function processZone(x, y, from, to, numberOfPoints, variant) {
    if (numberOfPoints < 1) {
      throw new RangeError('the number of points must be at least 1');
    }

    let output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
    return {
      x: sequentialFill({
        from,
        to,
        size: numberOfPoints
      }),
      y: output
    };
  }

  function getZones(from, to, exclusions = []) {
    if (from > to) {
      [from, to] = [to, from];
    } // in exclusions from and to have to be defined


    exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
    exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

    exclusions.forEach(exclusion => {
      if (exclusion.from > exclusion.to) {
        [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
      }
    });
    exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

    exclusions.forEach(exclusion => {
      if (exclusion.from < from) exclusion.from = from;
      if (exclusion.to > to) exclusion.to = to;
    });

    for (let i = 0; i < exclusions.length - 1; i++) {
      if (exclusions[i].to > exclusions[i + 1].from) {
        exclusions[i].to = exclusions[i + 1].from;
      }
    }

    exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

    if (!exclusions || exclusions.length === 0) {
      return [{
        from,
        to
      }];
    }

    let zones = [];
    let currentFrom = from;

    for (let exclusion of exclusions) {
      if (currentFrom < exclusion.from) {
        zones.push({
          from: currentFrom,
          to: exclusion.from
        });
      }

      currentFrom = exclusion.to;
    }

    if (currentFrom < to) {
      zones.push({
        from: currentFrom,
        to: to
      });
    }

    return zones;
  }

  /**
   * Filter an array x/y based on various criteria
   * x points are expected to be sorted
   *
   * @param {object} points
   * @param {object} [options={}]
   * @param {array} [options.from]
   * @param {array} [options.to]
   * @param {array} [options.exclusions=[]]
   * @return {{x: Array<number>, y: Array<number>}}
   */

  function filterX(points, options = {}) {
    const {
      x,
      y
    } = points;
    const {
      from = x[0],
      to = x[x.length - 1],
      exclusions = []
    } = options;
    let zones = getZones(from, to, exclusions);
    let currentZoneIndex = 0;
    let newX = [];
    let newY = [];
    let position = 0;

    while (position < x.length) {
      if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
        newX.push(x[position]);
        newY.push(y[position]);
      } else {
        if (x[position] > zones[currentZoneIndex].to) {
          currentZoneIndex++;
          if (!zones[currentZoneIndex]) break;
        }
      }

      position++;
    }

    return {
      x: newX,
      y: newY
    };
  }

  const indent = ' '.repeat(2);
  const indentData = ' '.repeat(4);
  function inspectMatrix() {
    return inspectMatrixWithOptions(this);
  }
  function inspectMatrixWithOptions(matrix, options = {}) {
    const {
      maxRows = 15,
      maxColumns = 10,
      maxNumSize = 8
    } = options;
    return `${matrix.constructor.name} {
${indent}[
${indentData}${inspectData(matrix, maxRows, maxColumns, maxNumSize)}
${indent}]
${indent}rows: ${matrix.rows}
${indent}columns: ${matrix.columns}
}`;
  }

  function inspectData(matrix, maxRows, maxColumns, maxNumSize) {
    const {
      rows,
      columns
    } = matrix;
    const maxI = Math.min(rows, maxRows);
    const maxJ = Math.min(columns, maxColumns);
    const result = [];

    for (let i = 0; i < maxI; i++) {
      let line = [];

      for (let j = 0; j < maxJ; j++) {
        line.push(formatNumber(matrix.get(i, j), maxNumSize));
      }

      result.push(`${line.join(' ')}`);
    }

    if (maxJ !== columns) {
      result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
    }

    if (maxI !== rows) {
      result.push(`... ${rows - maxRows} more rows`);
    }

    return result.join(`\n${indentData}`);
  }

  function formatNumber(num, maxNumSize) {
    const numStr = String(num);

    if (numStr.length <= maxNumSize) {
      return numStr.padEnd(maxNumSize, ' ');
    }

    const precise = num.toPrecision(maxNumSize - 2);

    if (precise.length <= maxNumSize) {
      return precise;
    }

    const exponential = num.toExponential(maxNumSize - 2);
    const eIndex = exponential.indexOf('e');
    const e = exponential.slice(eIndex);
    return exponential.slice(0, maxNumSize - e.length) + e;
  }

  function installMathOperations(AbstractMatrix, Matrix) {
    AbstractMatrix.prototype.add = function add(value) {
      if (typeof value === 'number') return this.addS(value);
      return this.addM(value);
    };

    AbstractMatrix.prototype.addS = function addS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.addM = function addM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.add = function add(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.add(value);
    };

    AbstractMatrix.prototype.sub = function sub(value) {
      if (typeof value === 'number') return this.subS(value);
      return this.subM(value);
    };

    AbstractMatrix.prototype.subS = function subS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.subM = function subM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.sub = function sub(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sub(value);
    };

    AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
    AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
    AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
    AbstractMatrix.subtract = AbstractMatrix.sub;

    AbstractMatrix.prototype.mul = function mul(value) {
      if (typeof value === 'number') return this.mulS(value);
      return this.mulM(value);
    };

    AbstractMatrix.prototype.mulS = function mulS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.mulM = function mulM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mul = function mul(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mul(value);
    };

    AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
    AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
    AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
    AbstractMatrix.multiply = AbstractMatrix.mul;

    AbstractMatrix.prototype.div = function div(value) {
      if (typeof value === 'number') return this.divS(value);
      return this.divM(value);
    };

    AbstractMatrix.prototype.divS = function divS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.divM = function divM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.div = function div(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.div(value);
    };

    AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
    AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
    AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
    AbstractMatrix.divide = AbstractMatrix.div;

    AbstractMatrix.prototype.mod = function mod(value) {
      if (typeof value === 'number') return this.modS(value);
      return this.modM(value);
    };

    AbstractMatrix.prototype.modS = function modS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.modM = function modM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mod = function mod(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mod(value);
    };

    AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
    AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
    AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
    AbstractMatrix.modulus = AbstractMatrix.mod;

    AbstractMatrix.prototype.and = function and(value) {
      if (typeof value === 'number') return this.andS(value);
      return this.andM(value);
    };

    AbstractMatrix.prototype.andS = function andS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.andM = function andM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.and = function and(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.and(value);
    };

    AbstractMatrix.prototype.or = function or(value) {
      if (typeof value === 'number') return this.orS(value);
      return this.orM(value);
    };

    AbstractMatrix.prototype.orS = function orS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.orM = function orM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.or = function or(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.or(value);
    };

    AbstractMatrix.prototype.xor = function xor(value) {
      if (typeof value === 'number') return this.xorS(value);
      return this.xorM(value);
    };

    AbstractMatrix.prototype.xorS = function xorS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.xorM = function xorM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.xor = function xor(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.xor(value);
    };

    AbstractMatrix.prototype.leftShift = function leftShift(value) {
      if (typeof value === 'number') return this.leftShiftS(value);
      return this.leftShiftM(value);
    };

    AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.leftShift = function leftShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.leftShift(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
      if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
      return this.signPropagatingRightShiftM(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.signPropagatingRightShift(value);
    };

    AbstractMatrix.prototype.rightShift = function rightShift(value) {
      if (typeof value === 'number') return this.rightShiftS(value);
      return this.rightShiftM(value);
    };

    AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.rightShift = function rightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.rightShift(value);
    };

    AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
    AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
    AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
    AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

    AbstractMatrix.prototype.not = function not() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, ~this.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.not = function not(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.not();
    };

    AbstractMatrix.prototype.abs = function abs() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.abs(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.abs = function abs(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.abs();
    };

    AbstractMatrix.prototype.acos = function acos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acos = function acos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acos();
    };

    AbstractMatrix.prototype.acosh = function acosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acosh = function acosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acosh();
    };

    AbstractMatrix.prototype.asin = function asin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asin = function asin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asin();
    };

    AbstractMatrix.prototype.asinh = function asinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asinh = function asinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asinh();
    };

    AbstractMatrix.prototype.atan = function atan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atan = function atan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atan();
    };

    AbstractMatrix.prototype.atanh = function atanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atanh = function atanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atanh();
    };

    AbstractMatrix.prototype.cbrt = function cbrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cbrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cbrt = function cbrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cbrt();
    };

    AbstractMatrix.prototype.ceil = function ceil() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.ceil(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.ceil = function ceil(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.ceil();
    };

    AbstractMatrix.prototype.clz32 = function clz32() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.clz32(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.clz32 = function clz32(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.clz32();
    };

    AbstractMatrix.prototype.cos = function cos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cos = function cos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cos();
    };

    AbstractMatrix.prototype.cosh = function cosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cosh = function cosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cosh();
    };

    AbstractMatrix.prototype.exp = function exp() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.exp(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.exp = function exp(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.exp();
    };

    AbstractMatrix.prototype.expm1 = function expm1() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.expm1(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.expm1 = function expm1(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.expm1();
    };

    AbstractMatrix.prototype.floor = function floor() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.floor(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.floor = function floor(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.floor();
    };

    AbstractMatrix.prototype.fround = function fround() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.fround(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.fround = function fround(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.fround();
    };

    AbstractMatrix.prototype.log = function log() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log = function log(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log();
    };

    AbstractMatrix.prototype.log1p = function log1p() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log1p(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log1p = function log1p(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log1p();
    };

    AbstractMatrix.prototype.log10 = function log10() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log10(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log10 = function log10(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log10();
    };

    AbstractMatrix.prototype.log2 = function log2() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log2(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log2 = function log2(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log2();
    };

    AbstractMatrix.prototype.round = function round() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.round(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.round = function round(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.round();
    };

    AbstractMatrix.prototype.sign = function sign() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sign(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sign = function sign(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sign();
    };

    AbstractMatrix.prototype.sin = function sin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sin = function sin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sin();
    };

    AbstractMatrix.prototype.sinh = function sinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sinh = function sinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sinh();
    };

    AbstractMatrix.prototype.sqrt = function sqrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sqrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sqrt = function sqrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sqrt();
    };

    AbstractMatrix.prototype.tan = function tan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tan = function tan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tan();
    };

    AbstractMatrix.prototype.tanh = function tanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tanh = function tanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tanh();
    };

    AbstractMatrix.prototype.trunc = function trunc() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.trunc(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.trunc = function trunc(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.trunc();
    };

    AbstractMatrix.pow = function pow(matrix, arg0) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.pow(arg0);
    };

    AbstractMatrix.prototype.pow = function pow(value) {
      if (typeof value === 'number') return this.powS(value);
      return this.powM(value);
    };

    AbstractMatrix.prototype.powS = function powS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), value));
        }
      }

      return this;
    };

    AbstractMatrix.prototype.powM = function powM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
        }
      }

      return this;
    };
  }

  /**
   * @private
   * Check that a row index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */
  function checkRowIndex(matrix, index, outer) {
    let max = outer ? matrix.rows : matrix.rows - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Row index out of range');
    }
  }
  /**
   * @private
   * Check that a column index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */

  function checkColumnIndex(matrix, index, outer) {
    let max = outer ? matrix.columns : matrix.columns - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Column index out of range');
    }
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkRowVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.columns) {
      throw new RangeError('vector size must be the same as the number of columns');
    }

    return vector;
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkColumnVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.rows) {
      throw new RangeError('vector size must be the same as the number of rows');
    }

    return vector;
  }
  function checkIndices(matrix, rowIndices, columnIndices) {
    return {
      row: checkRowIndices(matrix, rowIndices),
      column: checkColumnIndices(matrix, columnIndices)
    };
  }
  function checkRowIndices(matrix, rowIndices) {
    if (typeof rowIndices !== 'object') {
      throw new TypeError('unexpected type for row indices');
    }

    let rowOut = rowIndices.some(r => {
      return r < 0 || r >= matrix.rows;
    });

    if (rowOut) {
      throw new RangeError('row indices are out of range');
    }

    if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
    return rowIndices;
  }
  function checkColumnIndices(matrix, columnIndices) {
    if (typeof columnIndices !== 'object') {
      throw new TypeError('unexpected type for column indices');
    }

    let columnOut = columnIndices.some(c => {
      return c < 0 || c >= matrix.columns;
    });

    if (columnOut) {
      throw new RangeError('column indices are out of range');
    }

    if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
    return columnIndices;
  }
  function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
    if (arguments.length !== 5) {
      throw new RangeError('expected 4 arguments');
    }

    checkNumber('startRow', startRow);
    checkNumber('endRow', endRow);
    checkNumber('startColumn', startColumn);
    checkNumber('endColumn', endColumn);

    if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
      throw new RangeError('Submatrix indices are out of range');
    }
  }
  function newArray(length, value = 0) {
    let array = [];

    for (let i = 0; i < length; i++) {
      array.push(value);
    }

    return array;
  }

  function checkNumber(name, value) {
    if (typeof value !== 'number') {
      throw new TypeError(`${name} must be a number`);
    }
  }

  function sumByRow(matrix) {
    let sum = newArray(matrix.rows);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumByColumn(matrix) {
    let sum = newArray(matrix.columns);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumAll(matrix) {
    let v = 0;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v += matrix.get(i, j);
      }
    }

    return v;
  }
  function productByRow(matrix) {
    let sum = newArray(matrix.rows, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productByColumn(matrix) {
    let sum = newArray(matrix.columns, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productAll(matrix) {
    let v = 1;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v *= matrix.get(i, j);
      }
    }

    return v;
  }
  function varianceByRow(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let i = 0; i < rows; i++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean[i];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / cols) / cols);
      }
    }

    return variance;
  }
  function varianceByColumn(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let j = 0; j < cols; j++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let i = 0; i < rows; i++) {
        x = matrix.get(i, j) - mean[j];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / rows) / rows);
      }
    }

    return variance;
  }
  function varianceAll(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const size = rows * cols;
    let sum1 = 0;
    let sum2 = 0;
    let x = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean;
        sum1 += x;
        sum2 += x * x;
      }
    }

    if (unbiased) {
      return (sum2 - sum1 * sum1 / size) / (size - 1);
    } else {
      return (sum2 - sum1 * sum1 / size) / size;
    }
  }
  function centerByRow(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[i]);
      }
    }
  }
  function centerByColumn(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[j]);
      }
    }
  }
  function centerAll(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean);
      }
    }
  }
  function getScaleByRow(matrix) {
    const scale = [];

    for (let i = 0; i < matrix.rows; i++) {
      let sum = 0;

      for (let j = 0; j < matrix.columns; j++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByRow(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[i]);
      }
    }
  }
  function getScaleByColumn(matrix) {
    const scale = [];

    for (let j = 0; j < matrix.columns; j++) {
      let sum = 0;

      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByColumn(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[j]);
      }
    }
  }
  function getScaleAll(matrix) {
    const divider = matrix.size - 1;
    let sum = 0;

    for (let j = 0; j < matrix.columns; j++) {
      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / divider;
      }
    }

    return Math.sqrt(sum);
  }
  function scaleAll(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale);
      }
    }
  }

  class AbstractMatrix {
    static from1DArray(newRows, newColumns, newData) {
      let length = newRows * newColumns;

      if (length !== newData.length) {
        throw new RangeError('data length does not match given dimensions');
      }

      let newMatrix = new Matrix(newRows, newColumns);

      for (let row = 0; row < newRows; row++) {
        for (let column = 0; column < newColumns; column++) {
          newMatrix.set(row, column, newData[row * newColumns + column]);
        }
      }

      return newMatrix;
    }

    static rowVector(newData) {
      let vector = new Matrix(1, newData.length);

      for (let i = 0; i < newData.length; i++) {
        vector.set(0, i, newData[i]);
      }

      return vector;
    }

    static columnVector(newData) {
      let vector = new Matrix(newData.length, 1);

      for (let i = 0; i < newData.length; i++) {
        vector.set(i, 0, newData[i]);
      }

      return vector;
    }

    static zeros(rows, columns) {
      return new Matrix(rows, columns);
    }

    static ones(rows, columns) {
      return new Matrix(rows, columns).fill(1);
    }

    static rand(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        random = Math.random
      } = options;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.set(i, j, random());
        }
      }

      return matrix;
    }

    static randInt(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1000,
        random = Math.random
      } = options;
      if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
      if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let interval = max - min;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let value = min + Math.round(random() * interval);
          matrix.set(i, j, value);
        }
      }

      return matrix;
    }

    static eye(rows, columns, value) {
      if (columns === undefined) columns = rows;
      if (value === undefined) value = 1;
      let min = Math.min(rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, value);
      }

      return matrix;
    }

    static diag(data, rows, columns) {
      let l = data.length;
      if (rows === undefined) rows = l;
      if (columns === undefined) columns = rows;
      let min = Math.min(l, rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, data[i]);
      }

      return matrix;
    }

    static min(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static max(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new this(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static checkMatrix(value) {
      return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
    }

    static isMatrix(value) {
      return value != null && value.klass === 'Matrix';
    }

    get size() {
      return this.rows * this.columns;
    }

    apply(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          callback.call(this, i, j);
        }
      }

      return this;
    }

    to1DArray() {
      let array = [];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          array.push(this.get(i, j));
        }
      }

      return array;
    }

    to2DArray() {
      let copy = [];

      for (let i = 0; i < this.rows; i++) {
        copy.push([]);

        for (let j = 0; j < this.columns; j++) {
          copy[i].push(this.get(i, j));
        }
      }

      return copy;
    }

    toJSON() {
      return this.to2DArray();
    }

    isRowVector() {
      return this.rows === 1;
    }

    isColumnVector() {
      return this.columns === 1;
    }

    isVector() {
      return this.rows === 1 || this.columns === 1;
    }

    isSquare() {
      return this.rows === this.columns;
    }

    isSymmetric() {
      if (this.isSquare()) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j <= i; j++) {
            if (this.get(i, j) !== this.get(j, i)) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }

    isEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isEchelonForm = true;
      let checked = false;

      while (i < this.rows && isEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isEchelonForm = false;
            checked = true;
          }
        }

        i++;
      }

      return isEchelonForm;
    }

    isReducedEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isReducedEchelonForm = true;
      let checked = false;

      while (i < this.rows && isReducedEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isReducedEchelonForm = false;
            checked = true;
          }
        }

        for (let k = j + 1; k < this.rows; k++) {
          if (this.get(i, k) !== 0) {
            isReducedEchelonForm = false;
          }
        }

        i++;
      }

      return isReducedEchelonForm;
    }

    echelonForm() {
      let result = this.clone();
      let h = 0;
      let k = 0;

      while (h < result.rows && k < result.columns) {
        let iMax = h;

        for (let i = h; i < result.rows; i++) {
          if (result.get(i, k) > result.get(iMax, k)) {
            iMax = i;
          }
        }

        if (result.get(iMax, k) === 0) {
          k++;
        } else {
          result.swapRows(h, iMax);
          let tmp = result.get(h, k);

          for (let j = k; j < result.columns; j++) {
            result.set(h, j, result.get(h, j) / tmp);
          }

          for (let i = h + 1; i < result.rows; i++) {
            let factor = result.get(i, k) / result.get(h, k);
            result.set(i, k, 0);

            for (let j = k + 1; j < result.columns; j++) {
              result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
            }
          }

          h++;
          k++;
        }
      }

      return result;
    }

    reducedEchelonForm() {
      let result = this.echelonForm();
      let m = result.columns;
      let n = result.rows;
      let h = n - 1;

      while (h >= 0) {
        if (result.maxRow(h) === 0) {
          h--;
        } else {
          let p = 0;
          let pivot = false;

          while (p < n && pivot === false) {
            if (result.get(h, p) === 1) {
              pivot = true;
            } else {
              p++;
            }
          }

          for (let i = 0; i < h; i++) {
            let factor = result.get(i, p);

            for (let j = p; j < m; j++) {
              let tmp = result.get(i, j) - factor * result.get(h, j);
              result.set(i, j, tmp);
            }
          }

          h--;
        }
      }

      return result;
    }

    set() {
      throw new Error('set method is unimplemented');
    }

    get() {
      throw new Error('get method is unimplemented');
    }

    repeat(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        rows = 1,
        columns = 1
      } = options;

      if (!Number.isInteger(rows) || rows <= 0) {
        throw new TypeError('rows must be a positive integer');
      }

      if (!Number.isInteger(columns) || columns <= 0) {
        throw new TypeError('columns must be a positive integer');
      }

      let matrix = new Matrix(this.rows * rows, this.columns * columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.setSubMatrix(this, this.rows * i, this.columns * j);
        }
      }

      return matrix;
    }

    fill(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, value);
        }
      }

      return this;
    }

    neg() {
      return this.mulS(-1);
    }

    getRow(index) {
      checkRowIndex(this, index);
      let row = [];

      for (let i = 0; i < this.columns; i++) {
        row.push(this.get(index, i));
      }

      return row;
    }

    getRowVector(index) {
      return Matrix.rowVector(this.getRow(index));
    }

    setRow(index, array) {
      checkRowIndex(this, index);
      array = checkRowVector(this, array);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, array[i]);
      }

      return this;
    }

    swapRows(row1, row2) {
      checkRowIndex(this, row1);
      checkRowIndex(this, row2);

      for (let i = 0; i < this.columns; i++) {
        let temp = this.get(row1, i);
        this.set(row1, i, this.get(row2, i));
        this.set(row2, i, temp);
      }

      return this;
    }

    getColumn(index) {
      checkColumnIndex(this, index);
      let column = [];

      for (let i = 0; i < this.rows; i++) {
        column.push(this.get(i, index));
      }

      return column;
    }

    getColumnVector(index) {
      return Matrix.columnVector(this.getColumn(index));
    }

    setColumn(index, array) {
      checkColumnIndex(this, index);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, array[i]);
      }

      return this;
    }

    swapColumns(column1, column2) {
      checkColumnIndex(this, column1);
      checkColumnIndex(this, column2);

      for (let i = 0; i < this.rows; i++) {
        let temp = this.get(i, column1);
        this.set(i, column1, this.get(i, column2));
        this.set(i, column2, temp);
      }

      return this;
    }

    addRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[j]);
        }
      }

      return this;
    }

    subRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[j]);
        }
      }

      return this;
    }

    mulRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[j]);
        }
      }

      return this;
    }

    divRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[j]);
        }
      }

      return this;
    }

    addColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[i]);
        }
      }

      return this;
    }

    subColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[i]);
        }
      }

      return this;
    }

    mulColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[i]);
        }
      }

      return this;
    }

    divColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[i]);
        }
      }

      return this;
    }

    mulRow(index, value) {
      checkRowIndex(this, index);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, this.get(index, i) * value);
      }

      return this;
    }

    mulColumn(index, value) {
      checkColumnIndex(this, index);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, this.get(i, index) * value);
      }

      return this;
    }

    max() {
      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    maxIndex() {
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    min() {
      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    minIndex() {
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    maxRow(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    maxRowIndex(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    minRow(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    minRowIndex(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    maxColumn(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    maxColumnIndex(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    minColumn(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    minColumnIndex(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    diag() {
      let min = Math.min(this.rows, this.columns);
      let diag = [];

      for (let i = 0; i < min; i++) {
        diag.push(this.get(i, i));
      }

      return diag;
    }

    norm(type = 'frobenius') {
      let result = 0;

      if (type === 'max') {
        return this.max();
      } else if (type === 'frobenius') {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            result = result + this.get(i, j) * this.get(i, j);
          }
        }

        return Math.sqrt(result);
      } else {
        throw new RangeError(`unknown norm type: ${type}`);
      }
    }

    cumulativeSum() {
      let sum = 0;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          sum += this.get(i, j);
          this.set(i, j, sum);
        }
      }

      return this;
    }

    dot(vector2) {
      if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
      let vector1 = this.to1DArray();

      if (vector1.length !== vector2.length) {
        throw new RangeError('vectors do not have the same size');
      }

      let dot = 0;

      for (let i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
      }

      return dot;
    }

    mmul(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.columns;
      let result = new Matrix(m, p);
      let Bcolj = new Float64Array(n);

      for (let j = 0; j < p; j++) {
        for (let k = 0; k < n; k++) {
          Bcolj[k] = other.get(k, j);
        }

        for (let i = 0; i < m; i++) {
          let s = 0;

          for (let k = 0; k < n; k++) {
            s += this.get(i, k) * Bcolj[k];
          }

          result.set(i, j, s);
        }
      }

      return result;
    }

    strassen2x2(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(2, 2);
      const a11 = this.get(0, 0);
      const b11 = other.get(0, 0);
      const a12 = this.get(0, 1);
      const b12 = other.get(0, 1);
      const a21 = this.get(1, 0);
      const b21 = other.get(1, 0);
      const a22 = this.get(1, 1);
      const b22 = other.get(1, 1); // Compute intermediate values.

      const m1 = (a11 + a22) * (b11 + b22);
      const m2 = (a21 + a22) * b11;
      const m3 = a11 * (b12 - b22);
      const m4 = a22 * (b21 - b11);
      const m5 = (a11 + a12) * b22;
      const m6 = (a21 - a11) * (b11 + b12);
      const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

      const c00 = m1 + m4 - m5 + m7;
      const c01 = m3 + m5;
      const c10 = m2 + m4;
      const c11 = m1 - m2 + m3 + m6;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      return result;
    }

    strassen3x3(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(3, 3);
      const a00 = this.get(0, 0);
      const a01 = this.get(0, 1);
      const a02 = this.get(0, 2);
      const a10 = this.get(1, 0);
      const a11 = this.get(1, 1);
      const a12 = this.get(1, 2);
      const a20 = this.get(2, 0);
      const a21 = this.get(2, 1);
      const a22 = this.get(2, 2);
      const b00 = other.get(0, 0);
      const b01 = other.get(0, 1);
      const b02 = other.get(0, 2);
      const b10 = other.get(1, 0);
      const b11 = other.get(1, 1);
      const b12 = other.get(1, 2);
      const b20 = other.get(2, 0);
      const b21 = other.get(2, 1);
      const b22 = other.get(2, 2);
      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
      const m2 = (a00 - a10) * (-b01 + b11);
      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
      const m5 = (a10 + a11) * (-b00 + b01);
      const m6 = a00 * b00;
      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
      const m8 = (-a00 + a20) * (b02 - b12);
      const m9 = (a20 + a21) * (-b00 + b02);
      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
      const m13 = (a02 - a22) * (b11 - b21);
      const m14 = a02 * b20;
      const m15 = (a21 + a22) * (-b20 + b21);
      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
      const m17 = (a02 - a12) * (b12 - b22);
      const m18 = (a11 + a12) * (-b20 + b22);
      const m19 = a01 * b10;
      const m20 = a12 * b21;
      const m21 = a10 * b02;
      const m22 = a20 * b01;
      const m23 = a22 * b22;
      const c00 = m6 + m14 + m19;
      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
      const c11 = m2 + m4 + m5 + m6 + m20;
      const c12 = m14 + m16 + m17 + m18 + m21;
      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
      const c21 = m12 + m13 + m14 + m15 + m22;
      const c22 = m6 + m7 + m8 + m9 + m23;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(0, 2, c02);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      result.set(1, 2, c12);
      result.set(2, 0, c20);
      result.set(2, 1, c21);
      result.set(2, 2, c22);
      return result;
    }

    mmulStrassen(y) {
      y = Matrix.checkMatrix(y);
      let x = this.clone();
      let r1 = x.rows;
      let c1 = x.columns;
      let r2 = y.rows;
      let c2 = y.columns;

      if (c1 !== r2) {
        // eslint-disable-next-line no-console
        console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
      } // Put a matrix into the top left of a matrix of zeros.
      // `rows` and `cols` are the dimensions of the output matrix.


      function embed(mat, rows, cols) {
        let r = mat.rows;
        let c = mat.columns;

        if (r === rows && c === cols) {
          return mat;
        } else {
          let resultat = AbstractMatrix.zeros(rows, cols);
          resultat = resultat.setSubMatrix(mat, 0, 0);
          return resultat;
        }
      } // Make sure both matrices are the same size.
      // This is exclusively for simplicity:
      // this algorithm can be implemented with matrices of different sizes.


      let r = Math.max(r1, r2);
      let c = Math.max(c1, c2);
      x = embed(x, r, c);
      y = embed(y, r, c); // Our recursive multiplication function.

      function blockMult(a, b, rows, cols) {
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512) {
          return a.mmul(b); // a is equivalent to this
        } // Apply dynamic padding.


        if (rows % 2 === 1 && cols % 2 === 1) {
          a = embed(a, rows + 1, cols + 1);
          b = embed(b, rows + 1, cols + 1);
        } else if (rows % 2 === 1) {
          a = embed(a, rows + 1, cols);
          b = embed(b, rows + 1, cols);
        } else if (cols % 2 === 1) {
          a = embed(a, rows, cols + 1);
          b = embed(b, rows, cols + 1);
        }

        let halfRows = parseInt(a.rows / 2, 10);
        let halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

        let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
        let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
        let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
        let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
        let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
        let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

        let m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
        let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
        let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
        let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
        let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
        let m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
        let m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

        let c11 = AbstractMatrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        let c12 = AbstractMatrix.add(m3, m5);
        let c21 = AbstractMatrix.add(m2, m4);
        let c22 = AbstractMatrix.sub(m1, m2);
        c22.add(m3);
        c22.add(m6); // Crop output to the desired size (undo dynamic padding).

        let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0);
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
      }

      return blockMult(x, y, r, c);
    }

    scaleRows(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.rows; i++) {
        const row = this.getRow(i);
        rescale(row, {
          min,
          max,
          output: row
        });
        newMatrix.setRow(i, row);
      }

      return newMatrix;
    }

    scaleColumns(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.columns; i++) {
        const column = this.getColumn(i);
        rescale(column, {
          min: min,
          max: max,
          output: column
        });
        newMatrix.setColumn(i, column);
      }

      return newMatrix;
    }

    flipRows() {
      const middle = Math.ceil(this.columns / 2);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < middle; j++) {
          let first = this.get(i, j);
          let last = this.get(i, this.columns - 1 - j);
          this.set(i, j, last);
          this.set(i, this.columns - 1 - j, first);
        }
      }

      return this;
    }

    flipColumns() {
      const middle = Math.ceil(this.rows / 2);

      for (let j = 0; j < this.columns; j++) {
        for (let i = 0; i < middle; i++) {
          let first = this.get(i, j);
          let last = this.get(this.rows - 1 - i, j);
          this.set(i, j, last);
          this.set(this.rows - 1 - i, j, first);
        }
      }

      return this;
    }

    kroneckerProduct(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.rows;
      let q = other.columns;
      let result = new Matrix(m * p, n * q);

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          for (let k = 0; k < p; k++) {
            for (let l = 0; l < q; l++) {
              result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
            }
          }
        }
      }

      return result;
    }

    transpose() {
      let result = new Matrix(this.columns, this.rows);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          result.set(j, i, this.get(i, j));
        }
      }

      return result;
    }

    sortRows(compareFunction = compareNumbers) {
      for (let i = 0; i < this.rows; i++) {
        this.setRow(i, this.getRow(i).sort(compareFunction));
      }

      return this;
    }

    sortColumns(compareFunction = compareNumbers) {
      for (let i = 0; i < this.columns; i++) {
        this.setColumn(i, this.getColumn(i).sort(compareFunction));
      }

      return this;
    }

    subMatrix(startRow, endRow, startColumn, endColumn) {
      checkRange(this, startRow, endRow, startColumn, endColumn);
      let newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);

      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
        }
      }

      return newMatrix;
    }

    subMatrixRow(indices, startColumn, endColumn) {
      if (startColumn === undefined) startColumn = 0;
      if (endColumn === undefined) endColumn = this.columns - 1;

      if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          if (indices[i] < 0 || indices[i] >= this.rows) {
            throw new RangeError(`Row index out of range: ${indices[i]}`);
          }

          newMatrix.set(i, j - startColumn, this.get(indices[i], j));
        }
      }

      return newMatrix;
    }

    subMatrixColumn(indices, startRow, endRow) {
      if (startRow === undefined) startRow = 0;
      if (endRow === undefined) endRow = this.rows - 1;

      if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(endRow - startRow + 1, indices.length);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startRow; j <= endRow; j++) {
          if (indices[i] < 0 || indices[i] >= this.columns) {
            throw new RangeError(`Column index out of range: ${indices[i]}`);
          }

          newMatrix.set(j - startRow, i, this.get(j, indices[i]));
        }
      }

      return newMatrix;
    }

    setSubMatrix(matrix, startRow, startColumn) {
      matrix = Matrix.checkMatrix(matrix);
      let endRow = startRow + matrix.rows - 1;
      let endColumn = startColumn + matrix.columns - 1;
      checkRange(this, startRow, endRow, startColumn, endColumn);

      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          this.set(startRow + i, startColumn + j, matrix.get(i, j));
        }
      }

      return this;
    }

    selection(rowIndices, columnIndices) {
      let indices = checkIndices(this, rowIndices, columnIndices);
      let newMatrix = new Matrix(rowIndices.length, columnIndices.length);

      for (let i = 0; i < indices.row.length; i++) {
        let rowIndex = indices.row[i];

        for (let j = 0; j < indices.column.length; j++) {
          let columnIndex = indices.column[j];
          newMatrix.set(i, j, this.get(rowIndex, columnIndex));
        }
      }

      return newMatrix;
    }

    trace() {
      let min = Math.min(this.rows, this.columns);
      let trace = 0;

      for (let i = 0; i < min; i++) {
        trace += this.get(i, i);
      }

      return trace;
    }

    clone() {
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let row = 0; row < this.rows; row++) {
        for (let column = 0; column < this.columns; column++) {
          newMatrix.set(row, column, this.get(row, column));
        }
      }

      return newMatrix;
    }

    sum(by) {
      switch (by) {
        case 'row':
          return sumByRow(this);

        case 'column':
          return sumByColumn(this);

        case undefined:
          return sumAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    product(by) {
      switch (by) {
        case 'row':
          return productByRow(this);

        case 'column':
          return productByColumn(this);

        case undefined:
          return productAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    mean(by) {
      const sum = this.sum(by);

      switch (by) {
        case 'row':
          {
            for (let i = 0; i < this.rows; i++) {
              sum[i] /= this.columns;
            }

            return sum;
          }

        case 'column':
          {
            for (let i = 0; i < this.columns; i++) {
              sum[i] /= this.rows;
            }

            return sum;
          }

        case undefined:
          return sum / this.size;

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    variance(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        unbiased = true,
        mean = this.mean(by)
      } = options;

      if (typeof unbiased !== 'boolean') {
        throw new TypeError('unbiased must be a boolean');
      }

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByRow(this, unbiased, mean);
          }

        case 'column':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByColumn(this, unbiased, mean);
          }

        case undefined:
          {
            if (typeof mean !== 'number') {
              throw new TypeError('mean must be a number');
            }

            return varianceAll(this, unbiased, mean);
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    standardDeviation(by, options) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      const variance = this.variance(by, options);

      if (by === undefined) {
        return Math.sqrt(variance);
      } else {
        for (let i = 0; i < variance.length; i++) {
          variance[i] = Math.sqrt(variance[i]);
        }

        return variance;
      }
    }

    center(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        center = this.mean(by)
      } = options;

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByRow(this, center);
            return this;
          }

        case 'column':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByColumn(this, center);
            return this;
          }

        case undefined:
          {
            if (typeof center !== 'number') {
              throw new TypeError('center must be a number');
            }

            centerAll(this, center);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    scale(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      let scale = options.scale;

      switch (by) {
        case 'row':
          {
            if (scale === undefined) {
              scale = getScaleByRow(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByRow(this, scale);
            return this;
          }

        case 'column':
          {
            if (scale === undefined) {
              scale = getScaleByColumn(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByColumn(this, scale);
            return this;
          }

        case undefined:
          {
            if (scale === undefined) {
              scale = getScaleAll(this);
            } else if (typeof scale !== 'number') {
              throw new TypeError('scale must be a number');
            }

            scaleAll(this, scale);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    toString(options) {
      return inspectMatrixWithOptions(this, options);
    }

  }
  AbstractMatrix.prototype.klass = 'Matrix';

  if (typeof Symbol !== 'undefined') {
    AbstractMatrix.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspectMatrix;
  }

  function compareNumbers(a, b) {
    return a - b;
  } // Synonyms


  AbstractMatrix.random = AbstractMatrix.rand;
  AbstractMatrix.randomInt = AbstractMatrix.randInt;
  AbstractMatrix.diagonal = AbstractMatrix.diag;
  AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
  AbstractMatrix.identity = AbstractMatrix.eye;
  AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
  AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
  class Matrix extends AbstractMatrix {
    constructor(nRows, nColumns) {
      super();

      if (Matrix.isMatrix(nRows)) {
        return nRows.clone();
      } else if (Number.isInteger(nRows) && nRows > 0) {
        // Create an empty matrix
        this.data = [];

        if (Number.isInteger(nColumns) && nColumns > 0) {
          for (let i = 0; i < nRows; i++) {
            this.data.push(new Float64Array(nColumns));
          }
        } else {
          throw new TypeError('nColumns must be a positive integer');
        }
      } else if (Array.isArray(nRows)) {
        // Copy the values from the 2D array
        const arrayData = nRows;
        nRows = arrayData.length;
        nColumns = arrayData[0].length;

        if (typeof nColumns !== 'number' || nColumns === 0) {
          throw new TypeError('Data must be a 2D array with at least one element');
        }

        this.data = [];

        for (let i = 0; i < nRows; i++) {
          if (arrayData[i].length !== nColumns) {
            throw new RangeError('Inconsistent array dimensions');
          }

          this.data.push(Float64Array.from(arrayData[i]));
        }
      } else {
        throw new TypeError('First argument must be a positive number or an array');
      }

      this.rows = nRows;
      this.columns = nColumns;
      return this;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

    removeRow(index) {
      checkRowIndex(this, index);

      if (this.rows === 1) {
        throw new RangeError('A matrix cannot have less than one row');
      }

      this.data.splice(index, 1);
      this.rows -= 1;
      return this;
    }

    addRow(index, array) {
      if (array === undefined) {
        array = index;
        index = this.rows;
      }

      checkRowIndex(this, index, true);
      array = Float64Array.from(checkRowVector(this, array));
      this.data.splice(index, 0, array);
      this.rows += 1;
      return this;
    }

    removeColumn(index) {
      checkColumnIndex(this, index);

      if (this.columns === 1) {
        throw new RangeError('A matrix cannot have less than one column');
      }

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns - 1);

        for (let j = 0; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        for (let j = index + 1; j < this.columns; j++) {
          newRow[j - 1] = this.data[i][j];
        }

        this.data[i] = newRow;
      }

      this.columns -= 1;
      return this;
    }

    addColumn(index, array) {
      if (typeof array === 'undefined') {
        array = index;
        index = this.columns;
      }

      checkColumnIndex(this, index, true);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns + 1);
        let j = 0;

        for (; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        newRow[j++] = array[i];

        for (; j < this.columns + 1; j++) {
          newRow[j] = this.data[i][j - 1];
        }

        this.data[i] = newRow;
      }

      this.columns += 1;
      return this;
    }

  }
  installMathOperations(AbstractMatrix, Matrix);

  class BaseView extends AbstractMatrix {
    constructor(matrix, rows, columns) {
      super();
      this.matrix = matrix;
      this.rows = rows;
      this.columns = columns;
    }

  }

  class MatrixTransposeView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.columns, matrix.rows);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(columnIndex, rowIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(columnIndex, rowIndex);
    }

  }

  class WrapperMatrix2D extends AbstractMatrix {
    constructor(data) {
      super();
      this.data = data;
      this.rows = data.length;
      this.columns = data[0].length;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

  }

  class LuDecomposition {
    constructor(matrix) {
      matrix = WrapperMatrix2D.checkMatrix(matrix);
      let lu = matrix.clone();
      let rows = lu.rows;
      let columns = lu.columns;
      let pivotVector = new Float64Array(rows);
      let pivotSign = 1;
      let i, j, k, p, s, t, v;
      let LUcolj, kmax;

      for (i = 0; i < rows; i++) {
        pivotVector[i] = i;
      }

      LUcolj = new Float64Array(rows);

      for (j = 0; j < columns; j++) {
        for (i = 0; i < rows; i++) {
          LUcolj[i] = lu.get(i, j);
        }

        for (i = 0; i < rows; i++) {
          kmax = Math.min(i, j);
          s = 0;

          for (k = 0; k < kmax; k++) {
            s += lu.get(i, k) * LUcolj[k];
          }

          LUcolj[i] -= s;
          lu.set(i, j, LUcolj[i]);
        }

        p = j;

        for (i = j + 1; i < rows; i++) {
          if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
            p = i;
          }
        }

        if (p !== j) {
          for (k = 0; k < columns; k++) {
            t = lu.get(p, k);
            lu.set(p, k, lu.get(j, k));
            lu.set(j, k, t);
          }

          v = pivotVector[p];
          pivotVector[p] = pivotVector[j];
          pivotVector[j] = v;
          pivotSign = -pivotSign;
        }

        if (j < rows && lu.get(j, j) !== 0) {
          for (i = j + 1; i < rows; i++) {
            lu.set(i, j, lu.get(i, j) / lu.get(j, j));
          }
        }
      }

      this.LU = lu;
      this.pivotVector = pivotVector;
      this.pivotSign = pivotSign;
    }

    isSingular() {
      let data = this.LU;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        if (data.get(j, j) === 0) {
          return true;
        }
      }

      return false;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let lu = this.LU;
      let rows = lu.rows;

      if (rows !== value.rows) {
        throw new Error('Invalid matrix dimensions');
      }

      if (this.isSingular()) {
        throw new Error('LU matrix is singular');
      }

      let count = value.columns;
      let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
      let columns = lu.columns;
      let i, j, k;

      for (k = 0; k < columns; k++) {
        for (i = k + 1; i < columns; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      for (k = columns - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / lu.get(k, k));
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      return X;
    }

    get determinant() {
      let data = this.LU;

      if (!data.isSquare()) {
        throw new Error('Matrix must be square');
      }

      let determinant = this.pivotSign;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        determinant *= data.get(j, j);
      }

      return determinant;
    }

    get lowerTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i > j) {
            X.set(i, j, data.get(i, j));
          } else if (i === j) {
            X.set(i, j, 1);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get upperTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i <= j) {
            X.set(i, j, data.get(i, j));
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }

  }

  function hypotenuse(a, b) {
    let r = 0;

    if (Math.abs(a) > Math.abs(b)) {
      r = b / a;
      return Math.abs(a) * Math.sqrt(1 + r * r);
    }

    if (b !== 0) {
      r = a / b;
      return Math.abs(b) * Math.sqrt(1 + r * r);
    }

    return 0;
  }

  class QrDecomposition {
    constructor(value) {
      value = WrapperMatrix2D.checkMatrix(value);
      let qr = value.clone();
      let m = value.rows;
      let n = value.columns;
      let rdiag = new Float64Array(n);
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        let nrm = 0;

        for (i = k; i < m; i++) {
          nrm = hypotenuse(nrm, qr.get(i, k));
        }

        if (nrm !== 0) {
          if (qr.get(k, k) < 0) {
            nrm = -nrm;
          }

          for (i = k; i < m; i++) {
            qr.set(i, k, qr.get(i, k) / nrm);
          }

          qr.set(k, k, qr.get(k, k) + 1);

          for (j = k + 1; j < n; j++) {
            s = 0;

            for (i = k; i < m; i++) {
              s += qr.get(i, k) * qr.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < m; i++) {
              qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
            }
          }
        }

        rdiag[k] = -nrm;
      }

      this.QR = qr;
      this.Rdiag = rdiag;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let qr = this.QR;
      let m = qr.rows;

      if (value.rows !== m) {
        throw new Error('Matrix row dimensions must agree');
      }

      if (!this.isFullRank()) {
        throw new Error('Matrix is rank deficient');
      }

      let count = value.columns;
      let X = value.clone();
      let n = qr.columns;
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        for (j = 0; j < count; j++) {
          s = 0;

          for (i = k; i < m; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < m; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }

      for (k = n - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / this.Rdiag[k]);
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
          }
        }
      }

      return X.subMatrix(0, n - 1, 0, count - 1);
    }

    isFullRank() {
      let columns = this.QR.columns;

      for (let i = 0; i < columns; i++) {
        if (this.Rdiag[i] === 0) {
          return false;
        }
      }

      return true;
    }

    get upperTriangularMatrix() {
      let qr = this.QR;
      let n = qr.columns;
      let X = new Matrix(n, n);
      let i, j;

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i < j) {
            X.set(i, j, qr.get(i, j));
          } else if (i === j) {
            X.set(i, j, this.Rdiag[i]);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get orthogonalMatrix() {
      let qr = this.QR;
      let rows = qr.rows;
      let columns = qr.columns;
      let X = new Matrix(rows, columns);
      let i, j, k, s;

      for (k = columns - 1; k >= 0; k--) {
        for (i = 0; i < rows; i++) {
          X.set(i, k, 0);
        }

        X.set(k, k, 1);

        for (j = k; j < columns; j++) {
          if (qr.get(k, k) !== 0) {
            s = 0;

            for (i = k; i < rows; i++) {
              s += qr.get(i, k) * X.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < rows; i++) {
              X.set(i, j, X.get(i, j) + s * qr.get(i, k));
            }
          }
        }
      }

      return X;
    }

  }

  class SingularValueDecomposition {
    constructor(value, options = {}) {
      value = WrapperMatrix2D.checkMatrix(value);
      let m = value.rows;
      let n = value.columns;
      const {
        computeLeftSingularVectors = true,
        computeRightSingularVectors = true,
        autoTranspose = false
      } = options;
      let wantu = Boolean(computeLeftSingularVectors);
      let wantv = Boolean(computeRightSingularVectors);
      let swapped = false;
      let a;

      if (m < n) {
        if (!autoTranspose) {
          a = value.clone(); // eslint-disable-next-line no-console

          console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
        } else {
          a = value.transpose();
          m = a.rows;
          n = a.columns;
          swapped = true;
          let aux = wantu;
          wantu = wantv;
          wantv = aux;
        }
      } else {
        a = value.clone();
      }

      let nu = Math.min(m, n);
      let ni = Math.min(m + 1, n);
      let s = new Float64Array(ni);
      let U = new Matrix(m, nu);
      let V = new Matrix(n, n);
      let e = new Float64Array(n);
      let work = new Float64Array(m);
      let si = new Float64Array(ni);

      for (let i = 0; i < ni; i++) si[i] = i;

      let nct = Math.min(m - 1, n);
      let nrt = Math.max(0, Math.min(n - 2, m));
      let mrc = Math.max(nct, nrt);

      for (let k = 0; k < mrc; k++) {
        if (k < nct) {
          s[k] = 0;

          for (let i = k; i < m; i++) {
            s[k] = hypotenuse(s[k], a.get(i, k));
          }

          if (s[k] !== 0) {
            if (a.get(k, k) < 0) {
              s[k] = -s[k];
            }

            for (let i = k; i < m; i++) {
              a.set(i, k, a.get(i, k) / s[k]);
            }

            a.set(k, k, a.get(k, k) + 1);
          }

          s[k] = -s[k];
        }

        for (let j = k + 1; j < n; j++) {
          if (k < nct && s[k] !== 0) {
            let t = 0;

            for (let i = k; i < m; i++) {
              t += a.get(i, k) * a.get(i, j);
            }

            t = -t / a.get(k, k);

            for (let i = k; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * a.get(i, k));
            }
          }

          e[j] = a.get(k, j);
        }

        if (wantu && k < nct) {
          for (let i = k; i < m; i++) {
            U.set(i, k, a.get(i, k));
          }
        }

        if (k < nrt) {
          e[k] = 0;

          for (let i = k + 1; i < n; i++) {
            e[k] = hypotenuse(e[k], e[i]);
          }

          if (e[k] !== 0) {
            if (e[k + 1] < 0) {
              e[k] = 0 - e[k];
            }

            for (let i = k + 1; i < n; i++) {
              e[i] /= e[k];
            }

            e[k + 1] += 1;
          }

          e[k] = -e[k];

          if (k + 1 < m && e[k] !== 0) {
            for (let i = k + 1; i < m; i++) {
              work[i] = 0;
            }

            for (let i = k + 1; i < m; i++) {
              for (let j = k + 1; j < n; j++) {
                work[i] += e[j] * a.get(i, j);
              }
            }

            for (let j = k + 1; j < n; j++) {
              let t = -e[j] / e[k + 1];

              for (let i = k + 1; i < m; i++) {
                a.set(i, j, a.get(i, j) + t * work[i]);
              }
            }
          }

          if (wantv) {
            for (let i = k + 1; i < n; i++) {
              V.set(i, k, e[i]);
            }
          }
        }
      }

      let p = Math.min(n, m + 1);

      if (nct < n) {
        s[nct] = a.get(nct, nct);
      }

      if (m < p) {
        s[p - 1] = 0;
      }

      if (nrt + 1 < p) {
        e[nrt] = a.get(nrt, p - 1);
      }

      e[p - 1] = 0;

      if (wantu) {
        for (let j = nct; j < nu; j++) {
          for (let i = 0; i < m; i++) {
            U.set(i, j, 0);
          }

          U.set(j, j, 1);
        }

        for (let k = nct - 1; k >= 0; k--) {
          if (s[k] !== 0) {
            for (let j = k + 1; j < nu; j++) {
              let t = 0;

              for (let i = k; i < m; i++) {
                t += U.get(i, k) * U.get(i, j);
              }

              t = -t / U.get(k, k);

              for (let i = k; i < m; i++) {
                U.set(i, j, U.get(i, j) + t * U.get(i, k));
              }
            }

            for (let i = k; i < m; i++) {
              U.set(i, k, -U.get(i, k));
            }

            U.set(k, k, 1 + U.get(k, k));

            for (let i = 0; i < k - 1; i++) {
              U.set(i, k, 0);
            }
          } else {
            for (let i = 0; i < m; i++) {
              U.set(i, k, 0);
            }

            U.set(k, k, 1);
          }
        }
      }

      if (wantv) {
        for (let k = n - 1; k >= 0; k--) {
          if (k < nrt && e[k] !== 0) {
            for (let j = k + 1; j < n; j++) {
              let t = 0;

              for (let i = k + 1; i < n; i++) {
                t += V.get(i, k) * V.get(i, j);
              }

              t = -t / V.get(k + 1, k);

              for (let i = k + 1; i < n; i++) {
                V.set(i, j, V.get(i, j) + t * V.get(i, k));
              }
            }
          }

          for (let i = 0; i < n; i++) {
            V.set(i, k, 0);
          }

          V.set(k, k, 1);
        }
      }

      let pp = p - 1;
      let eps = Number.EPSILON;

      while (p > 0) {
        let k, kase;

        for (k = p - 2; k >= -1; k--) {
          if (k === -1) {
            break;
          }

          const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));

          if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
            e[k] = 0;
            break;
          }
        }

        if (k === p - 2) {
          kase = 4;
        } else {
          let ks;

          for (ks = p - 1; ks >= k; ks--) {
            if (ks === k) {
              break;
            }

            let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);

            if (Math.abs(s[ks]) <= eps * t) {
              s[ks] = 0;
              break;
            }
          }

          if (ks === k) {
            kase = 3;
          } else if (ks === p - 1) {
            kase = 1;
          } else {
            kase = 2;
            k = ks;
          }
        }

        k++;

        switch (kase) {
          case 1:
            {
              let f = e[p - 2];
              e[p - 2] = 0;

              for (let j = p - 2; j >= k; j--) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;

                if (j !== k) {
                  f = -sn * e[j - 1];
                  e[j - 1] = cs * e[j - 1];
                }

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                    V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                    V.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 2:
            {
              let f = e[k - 1];
              e[k - 1] = 0;

              for (let j = k; j < p; j++) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                f = -sn * e[j];
                e[j] = cs * e[j];

                if (wantu) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                    U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                    U.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 3:
            {
              const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
              const sp = s[p - 1] / scale;
              const spm1 = s[p - 2] / scale;
              const epm1 = e[p - 2] / scale;
              const sk = s[k] / scale;
              const ek = e[k] / scale;
              const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
              const c = sp * epm1 * (sp * epm1);
              let shift = 0;

              if (b !== 0 || c !== 0) {
                if (b < 0) {
                  shift = 0 - Math.sqrt(b * b + c);
                } else {
                  shift = Math.sqrt(b * b + c);
                }

                shift = c / (b + shift);
              }

              let f = (sk + sp) * (sk - sp) + shift;
              let g = sk * ek;

              for (let j = k; j < p - 1; j++) {
                let t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                let cs = f / t;
                let sn = g / t;

                if (j !== k) {
                  e[j - 1] = t;
                }

                f = cs * s[j] + sn * e[j];
                e[j] = cs * e[j] - sn * s[j];
                g = sn * s[j + 1];
                s[j + 1] = cs * s[j + 1];

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                    V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                    V.set(i, j, t);
                  }
                }

                t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                cs = f / t;
                sn = g / t;
                s[j] = t;
                f = cs * e[j] + sn * s[j + 1];
                s[j + 1] = -sn * e[j] + cs * s[j + 1];
                g = sn * e[j + 1];
                e[j + 1] = cs * e[j + 1];

                if (wantu && j < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                    U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                    U.set(i, j, t);
                  }
                }
              }

              e[p - 2] = f;
              break;
            }

          case 4:
            {
              if (s[k] <= 0) {
                s[k] = s[k] < 0 ? -s[k] : 0;

                if (wantv) {
                  for (let i = 0; i <= pp; i++) {
                    V.set(i, k, -V.get(i, k));
                  }
                }
              }

              while (k < pp) {
                if (s[k] >= s[k + 1]) {
                  break;
                }

                let t = s[k];
                s[k] = s[k + 1];
                s[k + 1] = t;

                if (wantv && k < n - 1) {
                  for (let i = 0; i < n; i++) {
                    t = V.get(i, k + 1);
                    V.set(i, k + 1, V.get(i, k));
                    V.set(i, k, t);
                  }
                }

                if (wantu && k < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = U.get(i, k + 1);
                    U.set(i, k + 1, U.get(i, k));
                    U.set(i, k, t);
                  }
                }

                k++;
              }
              p--;
              break;
            }
          // no default
        }
      }

      if (swapped) {
        let tmp = V;
        V = U;
        U = tmp;
      }

      this.m = m;
      this.n = n;
      this.s = s;
      this.U = U;
      this.V = V;
    }

    solve(value) {
      let Y = value;
      let e = this.threshold;
      let scols = this.s.length;
      let Ls = Matrix.zeros(scols, scols);

      for (let i = 0; i < scols; i++) {
        if (Math.abs(this.s[i]) <= e) {
          Ls.set(i, i, 0);
        } else {
          Ls.set(i, i, 1 / this.s[i]);
        }
      }

      let U = this.U;
      let V = this.rightSingularVectors;
      let VL = V.mmul(Ls);
      let vrows = V.rows;
      let urows = U.rows;
      let VLU = Matrix.zeros(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < scols; k++) {
            sum += VL.get(i, k) * U.get(j, k);
          }

          VLU.set(i, j, sum);
        }
      }

      return VLU.mmul(Y);
    }

    solveForDiagonal(value) {
      return this.solve(Matrix.diag(value));
    }

    inverse() {
      let V = this.V;
      let e = this.threshold;
      let vrows = V.rows;
      let vcols = V.columns;
      let X = new Matrix(vrows, this.s.length);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < vcols; j++) {
          if (Math.abs(this.s[j]) > e) {
            X.set(i, j, V.get(i, j) / this.s[j]);
          }
        }
      }

      let U = this.U;
      let urows = U.rows;
      let ucols = U.columns;
      let Y = new Matrix(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < ucols; k++) {
            sum += X.get(i, k) * U.get(j, k);
          }

          Y.set(i, j, sum);
        }
      }

      return Y;
    }

    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }

    get norm2() {
      return this.s[0];
    }

    get rank() {
      let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
      let r = 0;
      let s = this.s;

      for (let i = 0, ii = s.length; i < ii; i++) {
        if (s[i] > tol) {
          r++;
        }
      }

      return r;
    }

    get diagonal() {
      return Array.from(this.s);
    }

    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }

    get leftSingularVectors() {
      return this.U;
    }

    get rightSingularVectors() {
      return this.V;
    }

    get diagonalMatrix() {
      return Matrix.diag(this.s);
    }

  }

  function inverse(matrix, useSVD = false) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);

    if (useSVD) {
      return new SingularValueDecomposition(matrix).inverse();
    } else {
      return solve(matrix, Matrix.eye(matrix.rows));
    }
  }
  function solve(leftHandSide, rightHandSide, useSVD = false) {
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);

    if (useSVD) {
      return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
      return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
  }

  var defaultOptions = {
    size: 1,
    value: 0
  };
  /**
   * Case when the entry is an array
   * @param data
   * @param options
   * @returns {Array}
   */

  function arrayCase(data, options) {
    var len = data.length;

    if (typeof options.size === 'number') {
      options.size = [options.size, options.size];
    }

    var cond = len + options.size[0] + options.size[1];
    var output;

    if (options.output) {
      if (options.output.length !== cond) {
        throw new RangeError('Wrong output size');
      }

      output = options.output;
    } else {
      output = new Array(cond);
    }

    var i;

    if (options.value === 'circular') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) {
          output[i] = data[(len - options.size[0] % len + i) % len];
        } else if (i < options.size[0] + len) {
          output[i] = data[i - options.size[0]];
        } else {
          output[i] = data[(i - options.size[0]) % len];
        }
      }
    } else if (options.value === 'replicate') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[0];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[len - 1];
      }
    } else if (options.value === 'symmetric') {
      if (options.size[0] > len || options.size[1] > len) {
        throw new RangeError('expanded value should not be bigger than the data length');
      }

      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[2 * len + options.size[0] - i - 1];
      }
    } else {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = options.value;else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = options.value;
      }
    }

    return output;
  }
  /**
   * Case when the entry is a matrix
   * @param data
   * @param options
   * @returns {Array}
   */


  function matrixCase(data, options) {
    // var row = data.length;
    // var col = data[0].length;
    if (options.size[0] === undefined) {
      options.size = [options.size, options.size, options.size, options.size];
    }

    throw new Error('matrix not supported yet, sorry');
  }
  /**
   * Pads and array
   * @param {Array <number>} data
   * @param {object} options
   */


  function padArray(data, options) {
    options = Object.assign({}, defaultOptions, options);

    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) return matrixCase(data, options);else return arrayCase(data, options);
    } else {
      throw new TypeError('data should be an array');
    }
  }

  var src$1 = padArray;

  /**
   * Factorial of a number
   * @ignore
   * @param n
   * @return {number}
   */

  function factorial(n) {
    let r = 1;

    while (n > 0) r *= n--;

    return r;
  }

  const defaultOptions$1 = {
    windowSize: 5,
    derivative: 1,
    polynomial: 2,
    pad: 'none',
    padValue: 'replicate'
  };
  /**
   * Savitzky-Golay filter
   * @param {Array <number>} data
   * @param {number} h
   * @param {Object} options
   * @returns {Array}
   */

  function savitzkyGolay(data, h, options) {
    options = Object.assign({}, defaultOptions$1, options);

    if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) {
      throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    }

    if (options.derivative < 0 || !Number.isInteger(options.derivative)) {
      throw new RangeError('Derivative should be a positive integer');
    }

    if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) {
      throw new RangeError('Polynomial should be a positive integer');
    }

    let C, norm;
    let step = Math.floor(options.windowSize / 2);

    if (options.pad === 'pre') {
      data = src$1(data, {
        size: step,
        value: options.padValue
      });
    }

    let ans = new Array(data.length - 2 * step);

    if (options.windowSize === 5 && options.polynomial === 2 && (options.derivative === 1 || options.derivative === 2)) {
      if (options.derivative === 1) {
        C = [-2, -1, 0, 1, 2];
        norm = 10;
      } else {
        C = [2, -1, -2, -1, 2];
        norm = 7;
      }
    } else {
      let J = Matrix.ones(options.windowSize, options.polynomial + 1);
      let inic = -(options.windowSize - 1) / 2;

      for (let i = 0; i < J.rows; i++) {
        for (let j = 0; j < J.columns; j++) {
          if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
        }
      }

      let Jtranspose = new MatrixTransposeView(J);
      let Jinv = inverse(Jtranspose.mmul(J));
      C = Jinv.mmul(Jtranspose);
      C = C.getRow(options.derivative);
      norm = 1 / factorial(options.derivative);
    }

    let det = norm * Math.pow(h, options.derivative);

    for (let k = step; k < data.length - step; k++) {
      let d = 0;

      for (let l = 0; l < C.length; l++) d += C[l] * data[l + k - step] / det;

      ans[k - step] = d;
    }

    if (options.pad === 'post') {
      ans = src$1(ans, {
        size: step,
        value: options.padValue
      });
    }

    return ans;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var medianQuickselect_min = createCommonjsModule(function (module) {
    (function () {
      function a(d) {
        for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
          if (f <= e) return d[j];
          if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

          for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
            do h++; while (d[e] > d[h]);

            do i--; while (d[i] > d[e]);

            if (i < h) break;
            b(d, h, i);
          }

          b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
        }
      }

      var b = function b(d, e, f) {
        var _ref;

        return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
      },
          c = function c(d, e) {
        return ~~((d + e) / 2);
      };

       module.exports ? module.exports = a : window.median = a;
    })();
  });

  /**
   * Computes the median of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function median(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    return medianQuickselect_min(input.slice());
  }

  /**

  /**
   * This function divide the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array<Number>|Number} array2
   * @return {Array}
   */
  function xDivide(array1, array2) {
    let isConstant = false;
    let constant;

    if (Array.isArray(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / array2[i];
      }
    }

    return array3;
  }

  var toStr = Object.prototype.toString;

  var isArguments = function isArguments(value) {
    var str = toStr.call(value);
    var isArgs = str === '[object Arguments]';

    if (!isArgs) {
      isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
    }

    return isArgs;
  };

  var keysShim;

  if (!Object.keys) {
    // modified from https://github.com/es-shims/es5-shim
    var has = Object.prototype.hasOwnProperty;
    var toStr$1 = Object.prototype.toString;
    var isArgs = isArguments; // eslint-disable-line global-require

    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({
      toString: null
    }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

    var equalsConstructorPrototype = function (o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };

    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };

    var hasAutomationEqualityBug = function () {
      /* global window */
      if (typeof window === 'undefined') {
        return false;
      }

      for (var k in window) {
        try {
          if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }

      return false;
    }();

    var equalsConstructorPrototypeIfNotBuggy = function (o) {
      /* global window */
      if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }

      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };

    keysShim = function keys(object) {
      var isObject = object !== null && typeof object === 'object';
      var isFunction = toStr$1.call(object) === '[object Function]';
      var isArguments = isArgs(object);
      var isString = isObject && toStr$1.call(object) === '[object String]';
      var theKeys = [];

      if (!isObject && !isFunction && !isArguments) {
        throw new TypeError('Object.keys called on a non-object');
      }

      var skipProto = hasProtoEnumBug && isFunction;

      if (isString && object.length > 0 && !has.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }

      if (isArguments && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === 'prototype') && has.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }

      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }

      return theKeys;
    };
  }

  var implementation = keysShim;

  var slice = Array.prototype.slice;
  var origKeys = Object.keys;
  var keysShim$1 = origKeys ? function keys(o) {
    return origKeys(o);
  } : implementation;
  var originalKeys = Object.keys;

  keysShim$1.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = function () {
        // Safari 5.0 bug
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      }(1, 2);

      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          // eslint-disable-line func-name-matching
          if (isArguments(object)) {
            return originalKeys(slice.call(object));
          }

          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim$1;
    }

    return Object.keys || keysShim$1;
  };

  var objectKeys = keysShim$1;

  var getKeys = objectKeys.shim(); // COPY ERROR //

  // TYPED ARRAY FUNCTIONS //

  /**
  * Create functions for copying typed arrays.
  */


  var typedArrays = {
    'Int8Array': null,
    'Uint8Array': null,
    'Uint8ClampedArray': null,
    'Int16Array': null,
    'Uint16Array': null,
    'Int32Array': null,
    'Uint32Array': null,
    'Float32Array': null,
    'Float64Array': null
  };

  (function createTypedArrayFcns() {
    /* jshint evil:true */
    var keys = objectKeys(typedArrays);
    var len = keys.length;
    var key;
    var i;

    for (i = 0; i < len; i++) {
      key = keys[i];
      typedArrays[key] = new Function('arr', 'return new ' + key + '( arr );');
    }
  })(); // EXPORTS //

  var d3Array = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       factory(exports) ;
    })(commonjsGlobal, function (exports) {

      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }

      function bisector(compare) {
        if (compare.length === 1) compare = ascendingComparator(compare);
        return {
          left: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
            }

            return lo;
          },
          right: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
            }

            return lo;
          }
        };
      }

      function ascendingComparator(f) {
        return function (d, x) {
          return ascending(f(d), x);
        };
      }

      var ascendingBisect = bisector(ascending);
      var bisectRight = ascendingBisect.right;
      var bisectLeft = ascendingBisect.left;

      function descending(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }

      function number$1(x) {
        return x === null ? NaN : +x;
      }

      function variance(array, f) {
        var n = array.length,
            m = 0,
            a,
            d,
            s = 0,
            i = -1,
            j = 0;

        if (f == null) {
          while (++i < n) {
            if (!isNaN(a = number$1(array[i]))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        } else {
          while (++i < n) {
            if (!isNaN(a = number$1(f(array[i], i, array)))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        }

        if (j > 1) return s / (j - 1);
      }

      function deviation(array, f) {
        var v = variance(array, f);
        return v ? Math.sqrt(v) : v;
      }

      function extent(array, f) {
        var i = -1,
            n = array.length,
            a,
            b,
            c;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        }

        return [a, c];
      }

      function constant(x) {
        return function () {
          return x;
        };
      }

      function identity(x) {
        return x;
      }

      function range(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1,
            n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
            range = new Array(n);

        while (++i < n) {
          range[i] = start + i * step;
        }

        return range;
      }

      var e10 = Math.sqrt(50);
      var e5 = Math.sqrt(10);
      var e2 = Math.sqrt(2);

      function ticks(start, stop, count) {
        var step = tickStep(start, stop, count);
        return range(Math.ceil(start / step) * step, Math.floor(stop / step) * step + step / 2, // inclusive
        step);
      }

      function tickStep(start, stop, count) {
        var step0 = Math.abs(stop - start) / Math.max(0, count),
            step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
            error = step0 / step1;
        if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
        return stop < start ? -step1 : step1;
      }

      function sturges(values) {
        return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
      }

      function number(x) {
        return +x;
      }

      function histogram() {
        var value = identity,
            domain = extent,
            threshold = sturges;

        function histogram(data) {
          var i,
              n = data.length,
              x,
              values = new Array(n); // Coerce values to numbers.

          for (i = 0; i < n; ++i) {
            values[i] = +value(data[i], i, data);
          }

          var xz = domain(values),
              x0 = +xz[0],
              x1 = +xz[1],
              tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

          if (!Array.isArray(tz)) tz = ticks(x0, x1, +tz); // Coerce thresholds to numbers, ignoring any outside the domain.

          var m = tz.length;

          for (i = 0; i < m; ++i) tz[i] = +tz[i];

          while (tz[0] <= x0) tz.shift(), --m;

          while (tz[m - 1] >= x1) tz.pop(), --m;

          var bins = new Array(m + 1),
              bin; // Initialize bins.

          for (i = 0; i <= m; ++i) {
            bin = bins[i] = [];
            bin.x0 = i > 0 ? tz[i - 1] : x0;
            bin.x1 = i < m ? tz[i] : x1;
          } // Assign data to bins by value, ignoring any outside the domain.


          for (i = 0; i < n; ++i) {
            x = values[i];

            if (x0 <= x && x <= x1) {
              bins[bisectRight(tz, x, 0, m)].push(data[i]);
            }
          }

          return bins;
        }

        histogram.value = function (_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram) : value;
        };

        histogram.domain = function (_) {
          return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram) : domain;
        };

        histogram.thresholds = function (_) {
          if (!arguments.length) return threshold;
          threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(Array.prototype.map.call(_, number)) : constant(+_);
          return histogram;
        };

        return histogram;
      }

      function quantile(array, p, f) {
        if (f == null) f = number$1;
        if (!(n = array.length)) return;
        if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
        if (p >= 1) return +f(array[n - 1], n - 1, array);
        var n,
            h = (n - 1) * p,
            i = Math.floor(h),
            a = +f(array[i], i, array),
            b = +f(array[i + 1], i + 1, array);
        return a + (b - a) * (h - i);
      }

      function freedmanDiaconis(values, min, max) {
        values.sort(ascending);
        return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
      }

      function scott(values, min, max) {
        return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
      }

      function max(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && b > a) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
        }

        return a;
      }

      function mean(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1,
            j = n;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) s += a;else --j;
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) s += a;else --j;
        }

        if (j) return s / j;
      }

      function median(array, f) {
        var numbers = [],
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) numbers.push(a);
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) numbers.push(a);
        }

        return quantile(numbers.sort(ascending), 0.5);
      }

      function merge(arrays) {
        var n = arrays.length,
            m,
            i = -1,
            j = 0,
            merged,
            array;

        while (++i < n) j += arrays[i].length;

        merged = new Array(j);

        while (--n >= 0) {
          array = arrays[n];
          m = array.length;

          while (--m >= 0) {
            merged[--j] = array[m];
          }
        }

        return merged;
      }

      function min(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && a > b) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
        }

        return a;
      }

      function pairs(array) {
        var i = 0,
            n = array.length - 1,
            p = array[0],
            pairs = new Array(n < 0 ? 0 : n);

        while (i < n) pairs[i] = [p, p = array[++i]];

        return pairs;
      }

      function permute(array, indexes) {
        var i = indexes.length,
            permutes = new Array(i);

        while (i--) permutes[i] = array[indexes[i]];

        return permutes;
      }

      function scan(array, compare) {
        if (!(n = array.length)) return;
        var i = 0,
            n,
            j = 0,
            xi,
            xj = array[j];
        if (!compare) compare = ascending;

        while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

        if (compare(xj, xj) === 0) return j;
      }

      function shuffle(array, i0, i1) {
        var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
            t,
            i;

        while (m) {
          i = Math.random() * m-- | 0;
          t = array[m + i0];
          array[m + i0] = array[i + i0];
          array[i + i0] = t;
        }

        return array;
      }

      function sum(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.

        } else {
          while (++i < n) if (a = +f(array[i], i, array)) s += a;
        }

        return s;
      }

      function transpose(matrix) {
        if (!(n = matrix.length)) return [];

        for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
          for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
            row[j] = matrix[j][i];
          }
        }

        return transpose;
      }

      function length(d) {
        return d.length;
      }

      function zip() {
        return transpose(arguments);
      }

      var version = "0.7.1";
      exports.version = version;
      exports.bisect = bisectRight;
      exports.bisectRight = bisectRight;
      exports.bisectLeft = bisectLeft;
      exports.ascending = ascending;
      exports.bisector = bisector;
      exports.descending = descending;
      exports.deviation = deviation;
      exports.extent = extent;
      exports.histogram = histogram;
      exports.thresholdFreedmanDiaconis = freedmanDiaconis;
      exports.thresholdScott = scott;
      exports.thresholdSturges = sturges;
      exports.max = max;
      exports.mean = mean;
      exports.median = median;
      exports.merge = merge;
      exports.min = min;
      exports.pairs = pairs;
      exports.permute = permute;
      exports.quantile = quantile;
      exports.range = range;
      exports.scan = scan;
      exports.shuffle = shuffle;
      exports.sum = sum;
      exports.ticks = ticks;
      exports.tickStep = tickStep;
      exports.transpose = transpose;
      exports.variance = variance;
      exports.zip = zip;
    });
  });

  /**
   * This function xSubtract the first array by the second array or a constant value from each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */
  function xSubtract(array1, array2) {
    let isConstant = false;
    let constant;

    if (Array.isArray(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - array2[i];
      }
    }

    return array3;
  }

  var array = createCommonjsModule(function (module, exports) {

    function compareNumbers(a, b) {
      return a - b;
    }
    /**
     * Computes the sum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.sum = function sum(values) {
      var sum = 0;

      for (var i = 0; i < values.length; i++) {
        sum += values[i];
      }

      return sum;
    };
    /**
     * Computes the maximum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.max = function max(values) {
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] > max) max = values[i];
      }

      return max;
    };
    /**
     * Computes the minimum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.min = function min(values) {
      var min = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
      }

      return min;
    };
    /**
     * Computes the min and max of the given values
     * @param {Array} values
     * @returns {{min: number, max: number}}
     */


    exports.minMax = function minMax(values) {
      var min = values[0];
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
        if (values[i] > max) max = values[i];
      }

      return {
        min: min,
        max: max
      };
    };
    /**
     * Computes the arithmetic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.arithmeticMean = function arithmeticMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        sum += values[i];
      }

      return sum / l;
    };
    /**
     * {@link arithmeticMean}
     */


    exports.mean = exports.arithmeticMean;
    /**
     * Computes the geometric mean of the given values
     * @param {Array} values
     * @returns {number}
     */

    exports.geometricMean = function geometricMean(values) {
      var mul = 1;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        mul *= values[i];
      }

      return Math.pow(mul, 1 / l);
    };
    /**
     * Computes the mean of the log of the given values
     * If the return value is exponentiated, it gives the same result as the
     * geometric mean.
     * @param {Array} values
     * @returns {number}
     */


    exports.logMean = function logMean(values) {
      var lnsum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        lnsum += Math.log(values[i]);
      }

      return lnsum / l;
    };
    /**
     * Computes the weighted grand mean for a list of means and sample sizes
     * @param {Array} means - Mean values for each set of samples
     * @param {Array} samples - Number of original values for each set of samples
     * @returns {number}
     */


    exports.grandMean = function grandMean(means, samples) {
      var sum = 0;
      var n = 0;
      var l = means.length;

      for (var i = 0; i < l; i++) {
        sum += samples[i] * means[i];
        n += samples[i];
      }

      return sum / n;
    };
    /**
     * Computes the truncated mean of the given values using a given percentage
     * @param {Array} values
     * @param {number} percent - The percentage of values to keep (range: [0,1])
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var k = Math.floor(l * percent);
      var sum = 0;

      for (var i = k; i < l - k; i++) {
        sum += values[i];
      }

      return sum / (l - 2 * k);
    };
    /**
     * Computes the harmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.harmonicMean = function harmonicMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        if (values[i] === 0) {
          throw new RangeError('value at index ' + i + 'is zero');
        }

        sum += 1 / values[i];
      }

      return l / sum;
    };
    /**
     * Computes the contraharmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.contraHarmonicMean = function contraHarmonicMean(values) {
      var r1 = 0;
      var r2 = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        r1 += values[i] * values[i];
        r2 += values[i];
      }

      if (r2 < 0) {
        throw new RangeError('sum of values is negative');
      }

      return r1 / r2;
    };
    /**
     * Computes the median of the given values
     * @param {Array} values
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.median = function median(values, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var half = Math.floor(l / 2);

      if (l % 2 === 0) {
        return (values[half - 1] + values[half]) * 0.5;
      } else {
        return values[half];
      }
    };
    /**
     * Computes the variance of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.variance = function variance(values, unbiased) {
      if (unbiased === undefined) unbiased = true;
      var theMean = exports.mean(values);
      var theVariance = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        var x = values[i] - theMean;
        theVariance += x * x;
      }

      if (unbiased) {
        return theVariance / (l - 1);
      } else {
        return theVariance / l;
      }
    };
    /**
     * Computes the standard deviation of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.standardDeviation = function standardDeviation(values, unbiased) {
      return Math.sqrt(exports.variance(values, unbiased));
    };

    exports.standardError = function standardError(values) {
      return exports.standardDeviation(values) / Math.sqrt(values.length);
    };
    /**
     * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
     * Calculate the standard deviation via the Median of the absolute deviation
     *  The formula for the standard deviation only holds for Gaussian random variables.
     * @returns {{mean: number, stdev: number}}
     */


    exports.robustMeanAndStdev = function robustMeanAndStdev(y) {
      var mean = 0,
          stdev = 0;
      var length = y.length,
          i = 0;

      for (i = 0; i < length; i++) {
        mean += y[i];
      }

      mean /= length;
      var averageDeviations = new Array(length);

      for (i = 0; i < length; i++) averageDeviations[i] = Math.abs(y[i] - mean);

      averageDeviations.sort(compareNumbers);

      if (length % 2 === 1) {
        stdev = averageDeviations[(length - 1) / 2] / 0.6745;
      } else {
        stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
      }

      return {
        mean: mean,
        stdev: stdev
      };
    };

    exports.quartiles = function quartiles(values, alreadySorted) {
      if (typeof alreadySorted === 'undefined') alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var quart = values.length / 4;
      var q1 = values[Math.ceil(quart) - 1];
      var q2 = exports.median(values, true);
      var q3 = values[Math.ceil(quart * 3) - 1];
      return {
        q1: q1,
        q2: q2,
        q3: q3
      };
    };

    exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
      return Math.sqrt(exports.pooledVariance(samples, unbiased));
    };

    exports.pooledVariance = function pooledVariance(samples, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var sum = 0;
      var length = 0,
          l = samples.length;

      for (var i = 0; i < l; i++) {
        var values = samples[i];
        var vari = exports.variance(values);
        sum += (values.length - 1) * vari;
        if (unbiased) length += values.length - 1;else length += values.length;
      }

      return sum / length;
    };

    exports.mode = function mode(values) {
      var l = values.length,
          itemCount = new Array(l),
          i;

      for (i = 0; i < l; i++) {
        itemCount[i] = 0;
      }

      var itemArray = new Array(l);
      var count = 0;

      for (i = 0; i < l; i++) {
        var index = itemArray.indexOf(values[i]);
        if (index >= 0) itemCount[index]++;else {
          itemArray[count] = values[i];
          itemCount[count] = 1;
          count++;
        }
      }

      var maxValue = 0,
          maxIndex = 0;

      for (i = 0; i < count; i++) {
        if (itemCount[i] > maxValue) {
          maxValue = itemCount[i];
          maxIndex = i;
        }
      }

      return itemArray[maxIndex];
    };

    exports.covariance = function covariance(vector1, vector2, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var mean1 = exports.mean(vector1);
      var mean2 = exports.mean(vector2);
      if (vector1.length !== vector2.length) throw 'Vectors do not have the same dimensions';
      var cov = 0,
          l = vector1.length;

      for (var i = 0; i < l; i++) {
        var x = vector1[i] - mean1;
        var y = vector2[i] - mean2;
        cov += x * y;
      }

      if (unbiased) return cov / (l - 1);else return cov / l;
    };

    exports.skewness = function skewness(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var s2 = 0,
          s3 = 0,
          l = values.length;

      for (var i = 0; i < l; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s3 += dev * dev * dev;
      }

      var m2 = s2 / l;
      var m3 = s3 / l;
      var g = m3 / Math.pow(m2, 3 / 2.0);

      if (unbiased) {
        var a = Math.sqrt(l * (l - 1));
        var b = l - 2;
        return a / b * g;
      } else {
        return g;
      }
    };

    exports.kurtosis = function kurtosis(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var n = values.length,
          s2 = 0,
          s4 = 0;

      for (var i = 0; i < n; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s4 += dev * dev * dev * dev;
      }

      var m2 = s2 / n;
      var m4 = s4 / n;

      if (unbiased) {
        var v = s2 / (n - 1);
        var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
        var b = s4 / (v * v);
        var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
        return a * b - 3 * c;
      } else {
        return m4 / (m2 * m2) - 3;
      }
    };

    exports.entropy = function entropy(values, eps) {
      if (typeof eps === 'undefined') eps = 0;
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * Math.log(values[i] + eps);

      return -sum;
    };

    exports.weightedMean = function weightedMean(values, weights) {
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * weights[i];

      return sum;
    };

    exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
      return Math.sqrt(exports.weightedVariance(values, weights));
    };

    exports.weightedVariance = function weightedVariance(values, weights) {
      var theMean = exports.weightedMean(values, weights);
      var vari = 0,
          l = values.length;
      var a = 0,
          b = 0;

      for (var i = 0; i < l; i++) {
        var z = values[i] - theMean;
        var w = weights[i];
        vari += w * (z * z);
        b += w;
        a += w * w;
      }

      return vari * (b / (b * b - a));
    };

    exports.center = function center(values, inPlace) {
      if (typeof inPlace === 'undefined') inPlace = false;
      var result = values;
      if (!inPlace) result = [].concat(values);
      var theMean = exports.mean(result),
          l = result.length;

      for (var i = 0; i < l; i++) result[i] -= theMean;
    };

    exports.standardize = function standardize(values, standardDev, inPlace) {
      if (typeof standardDev === 'undefined') standardDev = exports.standardDeviation(values);
      if (typeof inPlace === 'undefined') inPlace = false;
      var l = values.length;
      var result = inPlace ? values : new Array(l);

      for (var i = 0; i < l; i++) result[i] = values[i] / standardDev;

      return result;
    };

    exports.cumulativeSum = function cumulativeSum(array) {
      var l = array.length;
      var result = new Array(l);
      result[0] = array[0];

      for (var i = 1; i < l; i++) result[i] = result[i - 1] + array[i];

      return result;
    };
  });

  /**
   *
   * @private
   * @param {object} spectrum
   * @param {object} [options={}]
   * @param {number} [options.from=spectrum.x[0]]
   * @param {number} [options.to=spectrum.x[spectrum.x.length-1]]
   * @param {number} [options.numberOfPoints]
   * @param {Array} [options.filters=[]] Array of object containing 'name' (centerMean, divideSD, normalize, rescale) and 'options'
   * @param {Array} [options.exclusions=[]]
   * @returns {DataXY}
   */

  function getNormalizedData(spectrum, options = {}) {
    let data = {
      x: spectrum.variables.x.data,
      y: spectrum.variables.y.data
    };
    let {
      from = data.x[0],
      to = data.x[data.x.length - 1],
      numberOfPoints,
      filters = [],
      exclusions = [],
      processing = ''
    } = options;
    let {
      x,
      y
    } = filterX(data, {
      from,
      to
    });

    switch (processing) {
      case 'firstDerivative':
        if (options.processing) {
          y = savitzkyGolay(y, 1, {
            derivative: 1,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;

      case 'secondDerivative':
        if (options.processing) {
          y = savitzkyGolay(y, 1, {
            derivative: 2,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;
    }

    for (let filter of filters) {
      let filterOptions = filter.options || {};

      switch (filter.name.toLowerCase()) {
        case 'centermean':
          {
            let mean = array.mean(y);
            y = xSubtract(y, mean);
            break;
          }

        case 'dividebysd':
          {
            let std = array.standardDeviation(y);
            y = xDivide(y, std);
            break;
          }

        case 'normalize':
          {
            // should be an integration in fact
            y = norm(y, {
              sumValue: filterOptions.value ? Number(filterOptions.value) : 1,
              algorithm: 'absolute'
            });
            break;
          }

        case 'rescale':
          {
            y = rescale(y, {
              min: filterOptions.min ? Number(filter.options.min) : 0,
              max: filterOptions.max ? Number(filter.options.max) : 1
            });
            break;
          }

        case '':
        case undefined:
          break;

        default:
          throw new Error(`Unknown process kind: ${process.kind}`);
      }
    }

    if (!numberOfPoints) {
      return filterX({
        x,
        y
      }, {
        from,
        to,
        exclusions
      });
    }

    return equallySpaced({
      x,
      y
    }, {
      from,
      to,
      numberOfPoints,
      exclusions
    });
  }

  /**
   * Class allowing to store and manipulate an analysis.
   * An analysis may contain one or more spectra that are identified
   * by a 'flavor'
   * @class Analysis
   * @param {object} [options={}]
   * @param {string} [options.id=randomString] unique identifier
   * @param {string} [options.label=options.id] human redeable label
   */

  class Analysis {
    constructor(options = {}) {
      this.id = options.id || Math.random().toString(36).substring(2, 10);
      this.label = options.label || this.id;
      this.spectra = [];
    }
    /**
     * Set a spectrum for a specific flavor
     * @param {object} [variables]
     * @param {object} [variables.x]
     * @param {array} [variables.x.data]
     * @param {array} [variables.x.units='x']
     * @param {array} [variables.x.label='x']
     * @param {object} [variables.y]
     * @param {array} [variables.y.data]
     * @param {array} [variables.y.units='y']
     * @param {array} [variables.y.label='y']
     * @param {object} [options={}]
     * @param {string} [options.dataType='']
     * @param {string} [options.title='']
     * @param {object} [options.flavor={}]
     *
     */


    pushSpectrum(variables, options = {}) {
      this.spectra.push(standardizeData(variables, options));
    }
    /**
     * Retrieve a Spectrum based on a flavor
     * @param {object} [selector={}]
     * @param {string} [selector.index]
     * @param {string} [selector.flavor]
     * @returns {Spectrum}
     */


    getSpectrum(selector = {}) {
      let spectra = this.getSpectra(selector);
      return spectra ? spectra[0] : undefined;
    }
    /**
     * Retrieve a Spectrum based on a flavor
     * @param {object} [selector={}]
     * @param {string} [selector.index]
     * @param {string} [selector.flavor]
     * @returns {Spectrum}
     */


    getSpectra(selector = {}) {
      const {
        index,
        flavor
      } = selector;

      if (index !== undefined) {
        return this.spectra[index] ? [this.spectra[index]] : undefined;
      }

      if (flavor === undefined || flavor === '') return this.spectra;
      return this.spectra.filter(spectrum => spectrum.flavor === flavor);
    }
    /**
     * Return the data object for a specific flavor with possibly some
     * normalization options
     * @param {object} [options={}]
     * @param {object} [options.selector]
     * @param {string} [options.selector.index]
     * @param {string} [options.selector.flavor]
     * @param {object} [options.normalization]
     *
     */


    getNormalizedData(options = {}) {
      const {
        normalization,
        selector
      } = options;
      const spectrum = this.getSpectrum(selector);
      if (!spectrum) return undefined;
      return getNormalizedData(spectrum, normalization);
    }

    getXLabel(selector) {
      return this.getSpectrum(selector).variables.x.label;
    }

    getYLabel(selector) {
      return this.getSpectrum(selector).variables.y.label;
    }

  }
  /**
   * Internal function that ensure the order of x / y array
   * @param {DataXY} [variables]
   * @param {object} [options={}]
   * @return {Spectrum}
   */

  function standardizeData(variables, options = {}) {
    let {
      meta = {},
      dataType = '',
      title = ''
    } = options;
    let xVariable = variables.x;
    let yVariable = variables.y;

    if (!xVariable || !yVariable) {
      throw Error('A spectrum must contain at least x and y variables');
    }

    if (!isAnyArray(xVariable.data) || !isAnyArray(yVariable.data)) {
      throw Error('x and y variables must contain an array data');
    }

    let x = xVariable.data;
    let reverse = x && x.length > 1 && x[0] > x[x.length - 1];

    for (let key in variables) {
      let variable = variables[key];
      if (reverse) variable.data = variable.data.reverse();
      variable.label = variable.label || key;
      variable.units = variable.units || variable.label.replace(/^.*[([](.*)[)\]].*$/, '$1');
    }

    return {
      variables,
      title,
      dataType,
      meta,
      flavor: `${yVariable.units} vs ${xVariable.units}`
    };
  }

  const GC_MS_FIELDS = ['TIC', '.RIC', 'SCANNUMBER'];
  function complexChromatogram(result) {
    let spectra = result.spectra;
    let length = spectra.length;
    let chromatogram = {
      times: new Array(length),
      series: {
        ms: {
          dimension: 2,
          data: new Array(length)
        }
      }
    };
    let existingGCMSFields = [];

    for (let i = 0; i < GC_MS_FIELDS.length; i++) {
      let label = convertMSFieldToLabel(GC_MS_FIELDS[i]);

      if (spectra[0][label]) {
        existingGCMSFields.push(label);
        chromatogram.series[label] = {
          dimension: 1,
          data: new Array(length)
        };
      }
    }

    for (let i = 0; i < length; i++) {
      let spectrum = spectra[i];
      chromatogram.times[i] = spectrum.pageValue;

      for (let j = 0; j < existingGCMSFields.length; j++) {
        chromatogram.series[existingGCMSFields[j]].data[i] = parseFloat(spectrum[existingGCMSFields[j]]);
      }

      if (spectrum.data) {
        chromatogram.series.ms.data[i] = [spectrum.data.x, spectrum.data.y];
      }
    }

    result.chromatogram = chromatogram;
  }
  function isMSField(canonicDataLabel) {
    return GC_MS_FIELDS.indexOf(canonicDataLabel) !== -1;
  }
  function convertMSFieldToLabel(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function convertToFloatArray(stringArray) {
    let floatArray = [];

    for (let i = 0; i < stringArray.length; i++) {
      floatArray.push(parseFloat(stringArray[i]));
    }

    return floatArray;
  }

  function fastParseXYData(spectrum, value) {
    // TODO need to deal with result
    //  console.log(value);
    // we check if deltaX is defined otherwise we calculate it
    let yFactor = spectrum.yFactor;
    let deltaX = spectrum.deltaX;
    spectrum.isXYdata = true;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let currentX = spectrum.firstX;
    let currentY = spectrum.firstY; // we skip the first line
    //

    let endLine = false;
    let ascii;
    let i = 0;

    for (; i < value.length; i++) {
      ascii = value.charCodeAt(i);

      if (ascii === 13 || ascii === 10) {
        endLine = true;
      } else {
        if (endLine) break;
      }
    } // we proceed taking the i after the first line


    let newLine = true;
    let isDifference = false;
    let isLastDifference = false;
    let lastDifference = 0;
    let isDuplicate = false;
    let inComment = false;
    let currentValue = 0; // can be a difference or a duplicate

    let lastValue = 0; // must be the real last value

    let isNegative = false;
    let inValue = false;
    let skipFirstValue = false;
    let decimalPosition = 0;

    for (; i <= value.length; i++) {
      if (i === value.length) ascii = 13;else ascii = value.charCodeAt(i);

      if (inComment) {
        // we should ignore the text if we are after $$
        if (ascii === 13 || ascii === 10) {
          newLine = true;
          inComment = false;
        }
      } else {
        // when is it a new value ?
        // when it is not a digit, . or comma
        // it is a number that is either new or we continue
        if (ascii <= 57 && ascii >= 48) {
          // a number
          inValue = true;

          if (decimalPosition > 0) {
            currentValue += (ascii - 48) / Math.pow(10, decimalPosition++);
          } else {
            currentValue *= 10;
            currentValue += ascii - 48;
          }
        } else if (ascii === 44 || ascii === 46) {
          // a "," or "."
          inValue = true;
          decimalPosition++;
        } else {
          if (inValue) {
            // need to process the previous value
            if (newLine) {
              newLine = false; // we don't check the X value
              // console.log("NEW LINE",isDifference, lastDifference);
              // if new line and lastDifference, the first value is just a check !
              // that we don't check ...

              if (isLastDifference) skipFirstValue = true;
            } else {
              // need to deal with duplicate and differences
              if (skipFirstValue) {
                skipFirstValue = false;
              } else {
                if (isDifference) {
                  lastDifference = isNegative ? 0 - currentValue : currentValue;
                  isLastDifference = true;
                  isDifference = false;
                } else if (!isDuplicate) {
                  lastValue = isNegative ? 0 - currentValue : currentValue;
                }

                let duplicate = isDuplicate ? currentValue - 1 : 1;

                for (let j = 0; j < duplicate; j++) {
                  if (isLastDifference) {
                    currentY += lastDifference;
                  } else {
                    currentY = lastValue;
                  }

                  currentData.x.push(currentX);
                  currentData.y.push(currentY * yFactor);
                  currentX += deltaX;
                }
              }
            }

            isNegative = false;
            currentValue = 0;
            decimalPosition = 0;
            inValue = false;
            isDuplicate = false;
          } // positive SQZ digits @ A B C D E F G H I (ascii 64-73)


          if (ascii < 74 && ascii > 63) {
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 64;
          } else if (ascii > 96 && ascii < 106) {
            // negative SQZ digits a b c d e f g h i (ascii 97-105)
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 96;
            isNegative = true;
          } else if (ascii === 115) {
            // DUP digits S T U V W X Y Z s (ascii 83-90, 115)
            inValue = true;
            isDuplicate = true;
            currentValue = 9;
          } else if (ascii > 82 && ascii < 91) {
            inValue = true;
            isDuplicate = true;
            currentValue = ascii - 82;
          } else if (ascii > 73 && ascii < 83) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 73;
          } else if (ascii > 105 && ascii < 115) {
            // negative DIF digits j k l m n o p q r (ascii 106-114)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 105;
            isNegative = true;
          } else if (ascii === 36 && value.charCodeAt(i + 1) === 36) {
            // $ sign, we need to check the next one
            inValue = true;
            inComment = true;
          } else if (ascii === 37) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = 0;
            isNegative = false;
          } else if (ascii === 45) {
            // a "-"
            // check if after there is a number, decimal or comma
            let ascii2 = value.charCodeAt(i + 1);

            if (ascii2 >= 48 && ascii2 <= 57 || ascii2 === 44 || ascii2 === 46) {
              inValue = true;
              if (!newLine) isLastDifference = false;
              isNegative = true;
            }
          } else if (ascii === 13 || ascii === 10) {
            newLine = true;
            inComment = false;
          } // and now analyse the details ... space or tabulation
          // if "+" we just don't care

        }
      }
    }
  }

  const removeCommentRegExp = /\$\$.*/;
  const peakTableSplitRegExp = /[,\t ]+/;
  function parsePeakTable(spectrum, value, result) {
    spectrum.isPeaktable = true;

    if (!spectrum.variables || Object.keys(spectrum.variables) === 2) {
      parseXY(spectrum, value, result);
    } else {
      parseXYZ(spectrum, value, result);
    } // we will add the data in the variables


    if (spectrum.variables) {
      for (let key in spectrum.variables) {
        spectrum.variables[key].data = spectrum.data[key];
      }
    }
  }

  function parseXY(spectrum, value, result) {
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % 2 === 0) {
        for (let j = 0; j < values.length; j = j + 2) {
          // takes around 40% of the time to add and parse the 2 values nearly exclusively because of parseFloat
          currentData.x.push(parseFloat(values[j]) * spectrum.xFactor);
          currentData.y.push(parseFloat(values[j + 1]) * spectrum.yFactor);
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYZ(spectrum, value, result) {
    let currentData = {};
    let variables = Object.keys(spectrum.variables);
    let numberOfVariables = variables.length;
    variables.forEach(variable => currentData[variable] = []);
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % numberOfVariables === 0) {
        for (let j = 0; j < values.length; j++) {
          // todo should try to find a xFactor (y, ...)
          currentData[variables[j % numberOfVariables]].push(parseFloat(values[j]));
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYA(spectrum, value) {
    let removeSymbolRegExp = /(\(+|\)+|<+|>+|\s+)/g;
    spectrum.isXYAdata = true;
    let values;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      values = lines[i].trim().replace(removeSymbolRegExp, '').split(',');
      currentData.x.push(parseFloat(values[0]));
      currentData.y.push(parseFloat(values[1]));
    }
  }

  function convertTo3DZ(spectra) {
    let minZ = spectra[0].data.y[0];
    let maxZ = minZ;
    let ySize = spectra.length;
    let xSize = spectra[0].data.x.length;
    let z = new Array(ySize);

    for (let i = 0; i < ySize; i++) {
      z[i] = spectra[i].data.y;

      for (let j = 0; j < xSize; j++) {
        let value = z[i][j];
        if (value < minZ) minZ = value;
        if (value > maxZ) maxZ = value;
      }
    }

    const firstX = spectra[0].data.x[0];
    const lastX = spectra[0].data.x[spectra[0].data.x.length - 1]; // has to be -2 because it is a 1D array [x,y,x,y,...]

    const firstY = spectra[0].pageValue;
    const lastY = spectra[ySize - 1].pageValue; // Because the min / max value are the only information about the matrix if we invert
    // min and max we need to invert the array

    if (firstX > lastX) {
      for (let spectrum of z) {
        spectrum.reverse();
      }
    }

    if (firstY > lastY) {
      z.reverse();
    }

    return {
      z: z,
      minX: Math.min(firstX, lastX),
      maxX: Math.max(firstX, lastX),
      minY: Math.min(firstY, lastY),
      maxY: Math.max(firstY, lastY),
      minZ: minZ,
      maxZ: maxZ,
      noise: median(z[0].map(Math.abs))
    };
  }

  function generateContourLines(zData, options) {
    let noise = zData.noise;
    let z = zData.z;
    let povarHeight0, povarHeight1, povarHeight2, povarHeight3;
    let isOver0, isOver1, isOver2, isOver3;
    let nbSubSpectra = z.length;
    let nbPovars = z[0].length;
    let pAx, pAy, pBx, pBy;
    let x0 = zData.minX;
    let xN = zData.maxX;
    let dx = (xN - x0) / (nbPovars - 1);
    let y0 = zData.minY;
    let yN = zData.maxY;
    let dy = (yN - y0) / (nbSubSpectra - 1);
    let minZ = zData.minZ;
    let maxZ = zData.maxZ; // System.out.prvarln('y0 '+y0+' yN '+yN);
    // -------------------------
    // Povars attribution
    //
    // 0----1
    // |  / |
    // | /  |
    // 2----3
    //
    // ---------------------d------

    let iter = options.nbContourLevels * 2;
    let contourLevels = new Array(iter);
    let lineZValue;

    for (let level = 0; level < iter; level++) {
      // multiply by 2 for positif and negatif
      let contourLevel = {};
      contourLevels[level] = contourLevel;
      let side = level % 2;
      let factor = (maxZ - options.noiseMultiplier * noise) * Math.exp((level >> 1) - options.nbContourLevels);

      if (side === 0) {
        lineZValue = factor + options.noiseMultiplier * noise;
      } else {
        lineZValue = 0 - factor - options.noiseMultiplier * noise;
      }

      let lines = [];
      contourLevel.zValue = lineZValue;
      contourLevel.lines = lines;
      if (lineZValue <= minZ || lineZValue >= maxZ) continue;

      for (let iSubSpectra = 0; iSubSpectra < nbSubSpectra - 1; iSubSpectra++) {
        let subSpectra = z[iSubSpectra];
        let subSpectraAfter = z[iSubSpectra + 1];

        for (let povar = 0; povar < nbPovars - 1; povar++) {
          povarHeight0 = subSpectra[povar];
          povarHeight1 = subSpectra[povar + 1];
          povarHeight2 = subSpectraAfter[povar];
          povarHeight3 = subSpectraAfter[povar + 1];
          isOver0 = povarHeight0 > lineZValue;
          isOver1 = povarHeight1 > lineZValue;
          isOver2 = povarHeight2 > lineZValue;
          isOver3 = povarHeight3 > lineZValue; // Example povar0 is over the plane and povar1 and
          // povar2 are below, we find the varersections and add
          // the segment

          if (isOver0 !== isOver1 && isOver0 !== isOver2) {
            pAx = povar + (lineZValue - povarHeight0) / (povarHeight1 - povarHeight0);
            pAy = iSubSpectra;
            pBx = povar;
            pBy = iSubSpectra + (lineZValue - povarHeight0) / (povarHeight2 - povarHeight0);
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // remove push does not help !!!!


          if (isOver3 !== isOver1 && isOver3 !== isOver2) {
            pAx = povar + 1;
            pAy = iSubSpectra + 1 - (lineZValue - povarHeight3) / (povarHeight1 - povarHeight3);
            pBx = povar + 1 - (lineZValue - povarHeight3) / (povarHeight2 - povarHeight3);
            pBy = iSubSpectra + 1;
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // test around the diagonal


          if (isOver1 !== isOver2) {
            pAx = (povar + 1 - (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dx + x0;
            pAy = (iSubSpectra + (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dy + y0;

            if (isOver1 !== isOver0) {
              pBx = povar + 1 - (lineZValue - povarHeight1) / (povarHeight0 - povarHeight1);
              pBy = iSubSpectra;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver0) {
              pBx = povar;
              pBy = iSubSpectra + 1 - (lineZValue - povarHeight2) / (povarHeight0 - povarHeight2);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver1 !== isOver3) {
              pBx = povar + 1;
              pBy = iSubSpectra + (lineZValue - povarHeight1) / (povarHeight3 - povarHeight1);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver3) {
              pBx = povar + (lineZValue - povarHeight2) / (povarHeight3 - povarHeight2);
              pBy = iSubSpectra + 1;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }
          }
        }
      }
    }

    return {
      minX: zData.minX,
      maxX: zData.maxX,
      minY: zData.minY,
      maxY: zData.maxY,
      segments: contourLevels
    };
  }

  function add2D(result, options) {
    let zData = convertTo3DZ(result.spectra);

    if (!options.noContour) {
      result.contourLines = generateContourLines(zData, options);
      delete zData.z;
    }

    result.minMax = zData;
  }

  var fftlib = createCommonjsModule(function (module, exports) {
    /**
     * Fast Fourier Transform module
     * 1D-FFT/IFFT, 2D-FFT/IFFT (radix-2)
     */
    var FFT = function () {
      var FFT;

      {
        FFT = exports; // for CommonJS
      }

      var version = {
        release: '0.3.0',
        date: '2013-03'
      };

      FFT.toString = function () {
        return "version " + version.release + ", released " + version.date;
      }; // core operations


      var _n = 0,
          // order
      _bitrev = null,
          // bit reversal table
      _cstb = null; // sin/cos table

      var core = {
        init: function (n) {
          if (n !== 0 && (n & n - 1) === 0) {
            _n = n;

            core._initArray();

            core._makeBitReversalTable();

            core._makeCosSinTable();
          } else {
            throw new Error("init: radix-2 required");
          }
        },
        // 1D-FFT
        fft1d: function (re, im) {
          core.fft(re, im, 1);
        },
        // 1D-IFFT
        ifft1d: function (re, im) {
          var n = 1 / _n;
          core.fft(re, im, -1);

          for (var i = 0; i < _n; i++) {
            re[i] *= n;
            im[i] *= n;
          }
        },
        // 1D-IFFT
        bt1d: function (re, im) {
          core.fft(re, im, -1);
        },
        // 2D-FFT Not very useful if the number of rows have to be equal to cols
        fft2d: function (re, im) {
          var tre = [],
              tim = [],
              i = 0; // x-axis

          for (var y = 0; y < _n; y++) {
            i = y * _n;

            for (var x1 = 0; x1 < _n; x1++) {
              tre[x1] = re[x1 + i];
              tim[x1] = im[x1 + i];
            }

            core.fft1d(tre, tim);

            for (var x2 = 0; x2 < _n; x2++) {
              re[x2 + i] = tre[x2];
              im[x2 + i] = tim[x2];
            }
          } // y-axis


          for (var x = 0; x < _n; x++) {
            for (var y1 = 0; y1 < _n; y1++) {
              i = x + y1 * _n;
              tre[y1] = re[i];
              tim[y1] = im[i];
            }

            core.fft1d(tre, tim);

            for (var y2 = 0; y2 < _n; y2++) {
              i = x + y2 * _n;
              re[i] = tre[y2];
              im[i] = tim[y2];
            }
          }
        },
        // 2D-IFFT
        ifft2d: function (re, im) {
          var tre = [],
              tim = [],
              i = 0; // x-axis

          for (var y = 0; y < _n; y++) {
            i = y * _n;

            for (var x1 = 0; x1 < _n; x1++) {
              tre[x1] = re[x1 + i];
              tim[x1] = im[x1 + i];
            }

            core.ifft1d(tre, tim);

            for (var x2 = 0; x2 < _n; x2++) {
              re[x2 + i] = tre[x2];
              im[x2 + i] = tim[x2];
            }
          } // y-axis


          for (var x = 0; x < _n; x++) {
            for (var y1 = 0; y1 < _n; y1++) {
              i = x + y1 * _n;
              tre[y1] = re[i];
              tim[y1] = im[i];
            }

            core.ifft1d(tre, tim);

            for (var y2 = 0; y2 < _n; y2++) {
              i = x + y2 * _n;
              re[i] = tre[y2];
              im[i] = tim[y2];
            }
          }
        },
        // core operation of FFT
        fft: function (re, im, inv) {
          var d,
              h,
              ik,
              m,
              tmp,
              wr,
              wi,
              xr,
              xi,
              n4 = _n >> 2; // bit reversal

          for (var l = 0; l < _n; l++) {
            m = _bitrev[l];

            if (l < m) {
              tmp = re[l];
              re[l] = re[m];
              re[m] = tmp;
              tmp = im[l];
              im[l] = im[m];
              im[m] = tmp;
            }
          } // butterfly operation


          for (var k = 1; k < _n; k <<= 1) {
            h = 0;
            d = _n / (k << 1);

            for (var j = 0; j < k; j++) {
              wr = _cstb[h + n4];
              wi = inv * _cstb[h];

              for (var i = j; i < _n; i += k << 1) {
                ik = i + k;
                xr = wr * re[ik] + wi * im[ik];
                xi = wr * im[ik] - wi * re[ik];
                re[ik] = re[i] - xr;
                re[i] += xr;
                im[ik] = im[i] - xi;
                im[i] += xi;
              }

              h += d;
            }
          }
        },
        // initialize the array (supports TypedArray)
        _initArray: function () {
          if (typeof Uint32Array !== 'undefined') {
            _bitrev = new Uint32Array(_n);
          } else {
            _bitrev = [];
          }

          if (typeof Float64Array !== 'undefined') {
            _cstb = new Float64Array(_n * 1.25);
          } else {
            _cstb = [];
          }
        },
        // zero padding
        _paddingZero: function () {// TODO
        },
        // makes bit reversal table
        _makeBitReversalTable: function () {
          var i = 0,
              j = 0,
              k = 0;
          _bitrev[0] = 0;

          while (++i < _n) {
            k = _n >> 1;

            while (k <= j) {
              j -= k;
              k >>= 1;
            }

            j += k;
            _bitrev[i] = j;
          }
        },
        // makes trigonometiric function table
        _makeCosSinTable: function () {
          var n2 = _n >> 1,
              n4 = _n >> 2,
              n8 = _n >> 3,
              n2p4 = n2 + n4,
              t = Math.sin(Math.PI / _n),
              dc = 2 * t * t,
              ds = Math.sqrt(dc * (2 - dc)),
              c = _cstb[n4] = 1,
              s = _cstb[0] = 0;
          t = 2 * dc;

          for (var i = 1; i < n8; i++) {
            c -= dc;
            dc += t * c;
            s += ds;
            ds -= t * s;
            _cstb[i] = s;
            _cstb[n4 - i] = c;
          }

          if (n8 !== 0) {
            _cstb[n8] = Math.sqrt(0.5);
          }

          for (var j = 0; j < n4; j++) {
            _cstb[n2 - j] = _cstb[j];
          }

          for (var k = 0; k < n2p4; k++) {
            _cstb[k + n2] = -_cstb[k];
          }
        }
      }; // aliases (public APIs)

      var apis = ['init', 'fft1d', 'ifft1d', 'fft2d', 'ifft2d'];

      for (var i = 0; i < apis.length; i++) {
        FFT[apis[i]] = core[apis[i]];
      }

      FFT.bt = core.bt1d;
      FFT.fft = core.fft1d;
      FFT.ifft = core.ifft1d;
      return FFT;
    }.call(commonjsGlobal);
  });

  // source: https://en.wikipedia.org/wiki/Gyromagnetic_ratio
  const gyromagneticRatio = {
    '1H': 267.52218744e6,
    '2H': 41.065e6,
    '3H': 285.3508e6,
    '3He': -203.789e6,
    '7Li': 103.962e6,
    '13C': 67.28284e6,
    '14N': 19.331e6,
    '15N': -27.116e6,
    '17O': -36.264e6,
    '19F': 251.662e6,
    '23Na': 70.761e6,
    '27Al': 69.763e6,
    '29Si': -53.19e6,
    '31P': 108.291e6,
    '57Fe': 8.681e6,
    '63Cu': 71.118e6,
    '67Zn': 16.767e6,
    '129Xe': -73.997e6
  };

  function postProcessingNMR(entriesFlat) {
    // specific NMR functions
    let observeFrequency = 0;
    let shiftOffsetVal = 0;

    for (let entry of entriesFlat) {
      for (let spectrum of entry.spectra) {
        if (entry.ntuples && entry.ntuples.symbol) {
          if (!observeFrequency && spectrum.observeFrequency) {
            observeFrequency = spectrum.observeFrequency;
          }

          if (!shiftOffsetVal && spectrum.shiftOffsetVal) {
            shiftOffsetVal = spectrum.shiftOffsetVal;
          }
        } else {
          observeFrequency = spectrum.observeFrequency;
          shiftOffsetVal = spectrum.shiftOffsetVal;
        }

        if (observeFrequency) {
          if (spectrum.xUnits && spectrum.xUnits.toUpperCase().includes('HZ')) {
            spectrum.xUnits = 'PPM';
            spectrum.xFactor = spectrum.xFactor / observeFrequency;
            spectrum.firstX = spectrum.firstX / observeFrequency;
            spectrum.lastX = spectrum.lastX / observeFrequency;
            spectrum.deltaX = spectrum.deltaX / observeFrequency;

            for (let i = 0; i < spectrum.data.x.length; i++) {
              spectrum.data.x[i] /= observeFrequency;
            }
          }
        }

        if (shiftOffsetVal) {
          let shift = spectrum.firstX - shiftOffsetVal;
          spectrum.firstX = spectrum.firstX - shift;
          spectrum.lastX = spectrum.lastX - shift;

          for (let i = 0; i < spectrum.data.x.length; i++) {
            spectrum.data.x[i] -= shift;
          }
        }

        if (observeFrequency && entry.ntuples && entry.ntuples.symbol && entry.ntuples.nucleus) {
          let unit = '';
          let pageSymbolIndex = entry.ntuples.symbol.indexOf(spectrum.pageSymbol);

          if (entry.ntuples.units && entry.ntuples.units[pageSymbolIndex]) {
            unit = entry.ntuples.units[pageSymbolIndex];
          }

          if (unit !== 'PPM') {
            if (pageSymbolIndex !== 0) {
              throw Error('Not sure about this ntuples format');
            }

            let ratio0 = gyromagneticRatio[entry.ntuples.nucleus[0]];
            let ratio1 = gyromagneticRatio[entry.ntuples.nucleus[1]];

            if (!ratio0 || !ratio1) {
              throw Error('Problem with determination of gyromagnetic ratio');
            }

            let ratio = ratio0 / ratio1 * observeFrequency;
            spectrum.pageValue /= ratio;
          }
        }
      }
    }
  }

  function profiling(result, action, options) {
    if (result.profiling) {
      result.profiling.push({
        action,
        time: Date.now() - options.start
      });
    }
  }

  function simpleChromatogram(result) {
    let data = result.spectra[0].data;
    result.chromatogram = {
      times: data.x.slice(),
      series: {
        intensity: {
          dimension: 1,
          data: data.y.slice()
        }
      }
    };
  }

  function postProcessing(entriesFlat, result, options) {
    // converting Hz to ppm
    postProcessingNMR(entriesFlat);

    for (let entry of entriesFlat) {
      if (Object.keys(entry.ntuples).length > 0) {
        let newNtuples = [];
        let keys = Object.keys(entry.ntuples);

        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          let values = entry.ntuples[key];

          for (let j = 0; j < values.length; j++) {
            if (!newNtuples[j]) newNtuples[j] = {};
            newNtuples[j][key] = values[j];
          }
        }

        entry.ntuples = newNtuples;
      }

      if (entry.twoD && options.wantXY) {
        add2D(entry, options);
        profiling(result, 'Finished countour plot calculation', options);

        if (!options.keepSpectra) {
          delete entry.spectra;
        }
      } // maybe it is a GC (HPLC) / MS. In this case we add a new format


      if (options.chromatogram) {
        if (entry.spectra.length > 1) {
          complexChromatogram(entry);
        } else {
          simpleChromatogram(entry);
        }

        profiling(result, 'Finished chromatogram calculation', options);
      }
    }
  }

  function prepareNtuplesDatatable(currentEntry, spectrum, kind) {
    let xIndex = -1;
    let yIndex = -1;
    let firstVariable = '';
    let secondVariable = '';

    if (kind.indexOf('++') > 0) {
      firstVariable = kind.replace(/.*\(([a-zA-Z0-9]+)\+\+.*/, '$1');
      secondVariable = kind.replace(/.*\.\.([a-zA-Z0-9]+).*/, '$1');
    } else {
      kind = kind.replace(/[^a-zA-Z]/g, '');
      firstVariable = kind.charAt(0);
      secondVariable = kind.charAt(1);
      spectrum.variables = {};

      for (let symbol of kind) {
        let lowerCaseSymbol = symbol.toLowerCase();
        let index = currentEntry.ntuples.symbol.indexOf(symbol);
        if (index === -1) throw Error(`Symbol undefined: ${symbol}`);
        spectrum.variables[lowerCaseSymbol] = {};

        for (let key in currentEntry.ntuples) {
          if (currentEntry.ntuples[key][index]) {
            spectrum.variables[lowerCaseSymbol][key.replace(/^var/, '')] = currentEntry.ntuples[key][index];
          }
        }
      }
    }

    xIndex = currentEntry.ntuples.symbol.indexOf(firstVariable);
    yIndex = currentEntry.ntuples.symbol.indexOf(secondVariable);
    if (xIndex === -1) xIndex = 0;
    if (yIndex === -1) yIndex = 0;

    if (currentEntry.ntuples.first) {
      if (currentEntry.ntuples.first.length > xIndex) {
        spectrum.firstX = currentEntry.ntuples.first[xIndex];
      }

      if (currentEntry.ntuples.first.length > yIndex) {
        spectrum.firstY = currentEntry.ntuples.first[yIndex];
      }
    }

    if (currentEntry.ntuples.last) {
      if (currentEntry.ntuples.last.length > xIndex) {
        spectrum.lastX = currentEntry.ntuples.last[xIndex];
      }

      if (currentEntry.ntuples.last.length > yIndex) {
        spectrum.lastY = currentEntry.ntuples.last[yIndex];
      }
    }

    if (currentEntry.ntuples.vardim && currentEntry.ntuples.vardim.length > xIndex) {
      spectrum.nbPoints = currentEntry.ntuples.vardim[xIndex];
    }

    if (currentEntry.ntuples.factor) {
      if (currentEntry.ntuples.factor.length > xIndex) {
        spectrum.xFactor = currentEntry.ntuples.factor[xIndex];
      }

      if (currentEntry.ntuples.factor.length > yIndex) {
        spectrum.yFactor = currentEntry.ntuples.factor[yIndex];
      }
    }

    if (currentEntry.ntuples.units) {
      if (currentEntry.ntuples.units.length > xIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[xIndex]) {
          spectrum.xUnits = `${currentEntry.ntuples.varname[xIndex]} [${currentEntry.ntuples.units[xIndex]}]`;
        } else {
          spectrum.xUnits = currentEntry.ntuples.units[xIndex];
        }
      }

      if (currentEntry.ntuples.units.length > yIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[yIndex]) {
          spectrum.yUnits = `${currentEntry.ntuples.varname[yIndex]} [${currentEntry.ntuples.units[yIndex]}]`;
        } else {
          spectrum.yUnits = currentEntry.ntuples.units[yIndex];
        }
      }
    }
  }

  function prepareSpectrum(spectrum) {
    if (!spectrum.xFactor) spectrum.xFactor = 1;
    if (!spectrum.yFactor) spectrum.yFactor = 1;
  }

  const ntuplesSeparator = /[ \t]*,[ \t]*/;

  class Spectrum {}

  const defaultOptions$2 = {
    keepRecordsRegExp: /^$/,
    canonicDataLabels: true,
    canonicMetadataLabels: false,
    dynamicTyping: true,
    withoutXY: false,
    chromatogram: false,
    keepSpectra: false,
    noContour: false,
    nbContourLevels: 7,
    noiseMultiplier: 5,
    profiling: false
  };
  /**
   *
   * @param {text} jcamp
   * @param {object} [options]
   * @param {number} [options.keepRecordsRegExp=/^$/] By default we don't keep meta information
   * @param {number} [options.canonicDataLabels=true] Canonize the Labels (uppercase without symbol)
   * @param {number} [options.canonicMetadataLabels=false] Canonize the metadata Labels (uppercase without symbol)
   * @param {number} [options.dynamicTyping=false] Convert numbers to Number
   * @param {number} [options.withoutXY=false] Remove the XY data
   * @param {number} [options.chromatogram=false] Special post-processing for GC / HPLC / MS
   * @param {number} [options.keepSpectra=false] Force to keep the spectra in case of 2D
   * @param {number} [options.noContour=false] Don't calculate countour in case of 2D
   * @param {number} [options.nbContourLevels=7] Number of positive / negative contour levels to calculate
   * @param {number} [options.noiseMultiplier=5] Define for 2D the level as 5 times the median as default
   * @param {number} [options.profiling=false] Add profiling information
   */

  function convert(jcamp, options = {}) {
    options = Object.assign({}, defaultOptions$2, options);
    options.wantXY = !options.withoutXY;
    options.start = Date.now();
    let entriesFlat = [];
    let result = {
      profiling: options.profiling ? [] : false,
      logs: [],
      entries: []
    };
    let tmpResult = {
      children: []
    };
    let currentEntry = tmpResult;
    let parentsStack = [];
    let spectrum = new Spectrum();

    if (typeof jcamp !== 'string') {
      throw new TypeError('the JCAMP should be a string');
    }

    profiling(result, 'Before split to LDRS', options);
    let ldrs = jcamp.replace(/[\r\n]+##/g, '\n##').split('\n##');
    profiling(result, 'Split to LDRS', options);
    if (ldrs[0]) ldrs[0] = ldrs[0].replace(/^[\r\n ]*##/, '');

    for (let ldr of ldrs) {
      // This is a new LDR
      let position = ldr.indexOf('=');
      let dataLabel = position > 0 ? ldr.substring(0, position) : ldr;
      let dataValue = position > 0 ? ldr.substring(position + 1).trim() : '';
      let canonicDataLabel = dataLabel.replace(/[_ -]/g, '').toUpperCase();

      if (canonicDataLabel === 'DATATABLE') {
        let endLine = dataValue.indexOf('\n');
        if (endLine === -1) endLine = dataValue.indexOf('\r');

        if (endLine > 0) {
          // ##DATA TABLE= (X++(I..I)), XYDATA
          // We need to find the variables
          let infos = dataValue.substring(0, endLine).split(/[ ,;\t]+/);
          prepareNtuplesDatatable(currentEntry, spectrum, infos[0]);
          spectrum.datatable = infos[0];

          if (infos[1] && infos[1].indexOf('PEAKS') > -1) {
            canonicDataLabel = 'PEAKTABLE';
          } else if (infos[1] && (infos[1].indexOf('XYDATA') || infos[0].indexOf('++') > 0)) {
            canonicDataLabel = 'XYDATA';
            spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
          }
        }
      }

      if (canonicDataLabel === 'XYDATA') {
        if (options.wantXY) {
          prepareSpectrum(spectrum); // well apparently we should still consider it is a PEAK TABLE if there are no '++' after

          if (dataValue.match(/.*\+\+.*/)) {
            // ex: (X++(Y..Y))
            if (!spectrum.deltaX) {
              spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
            }

            fastParseXYData(spectrum, dataValue);
          } else {
            parsePeakTable(spectrum, dataValue, result);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      } else if (canonicDataLabel === 'PEAKTABLE') {
        if (options.wantXY) {
          prepareSpectrum(spectrum);
          parsePeakTable(spectrum, dataValue, result);
          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'PEAKASSIGNMENTS') {
        if (options.wantXY) {
          if (dataValue.match(/.*(XYA).*/)) {
            // ex: (XYA)
            parseXYA(spectrum, dataValue);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'TITLE') {
        let parentEntry = currentEntry;

        if (!parentEntry.children) {
          parentEntry.children = [];
        }

        currentEntry = {
          spectra: [],
          ntuples: {},
          info: {},
          meta: {}
        };
        parentEntry.children.push(currentEntry);
        parentsStack.push(parentEntry);
        entriesFlat.push(currentEntry);
        currentEntry.title = dataValue;
      } else if (canonicDataLabel === 'DATATYPE') {
        currentEntry.dataType = dataValue;

        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'NTUPLES') {
        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'DATACLASS') {
        currentEntry.dataClass = dataValue;
      } else if (canonicDataLabel === 'XUNITS') {
        spectrum.xUnits = dataValue;
      } else if (canonicDataLabel === 'YUNITS') {
        spectrum.yUnits = dataValue;
      } else if (canonicDataLabel === 'FIRSTX') {
        spectrum.firstX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTX') {
        spectrum.lastX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'FIRSTY') {
        spectrum.firstY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTY') {
        spectrum.lastY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'NPOINTS') {
        spectrum.nbPoints = parseFloat(dataValue);
      } else if (canonicDataLabel === 'XFACTOR') {
        spectrum.xFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'YFACTOR') {
        spectrum.yFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXX') {
        spectrum.maxX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINX') {
        spectrum.minX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXY') {
        spectrum.maxY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINY') {
        spectrum.minY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'DELTAX') {
        spectrum.deltaX = parseFloat(dataValue);
      } else if (canonicDataLabel === '.OBSERVEFREQUENCY' || canonicDataLabel === '$SFO1') {
        if (!spectrum.observeFrequency) {
          spectrum.observeFrequency = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '.OBSERVENUCLEUS') {
        if (!spectrum.xType) {
          currentEntry.xType = dataValue.replace(/[^a-zA-Z0-9]/g, '');
        }
      } else if (canonicDataLabel === '$OFFSET') {
        // OFFSET for Bruker spectra
        currentEntry.shiftOffsetNum = 0;

        if (!spectrum.shiftOffsetVal) {
          spectrum.shiftOffsetVal = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '$REFERENCEPOINT') ; else if (canonicDataLabel === 'VARNAME') {
        currentEntry.ntuples.varname = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'SYMBOL') {
        currentEntry.ntuples.symbol = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARTYPE') {
        currentEntry.ntuples.vartype = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARFORM') {
        currentEntry.ntuples.varform = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARDIM') {
        currentEntry.ntuples.vardim = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'UNITS') {
        currentEntry.ntuples.units = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'FACTOR') {
        currentEntry.ntuples.factor = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'FIRST') {
        currentEntry.ntuples.first = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'LAST') {
        currentEntry.ntuples.last = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'MIN') {
        currentEntry.ntuples.min = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'MAX') {
        currentEntry.ntuples.max = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === '.NUCLEUS') {
        if (currentEntry.ntuples) {
          currentEntry.ntuples.nucleus = dataValue.split(ntuplesSeparator);
        }

        if (currentEntry.twoD) {
          currentEntry.yType = dataValue.split(ntuplesSeparator)[0];
        }
      } else if (canonicDataLabel === 'PAGE') {
        spectrum.page = dataValue.trim();
        spectrum.pageValue = parseFloat(dataValue.replace(/^.*=/, ''));
        spectrum.pageSymbol = spectrum.page.replace(/[=].*/, '');
      } else if (canonicDataLabel === 'RETENTIONTIME') {
        spectrum.pageValue = parseFloat(dataValue);
      } else if (isMSField(canonicDataLabel)) {
        spectrum[convertMSFieldToLabel(canonicDataLabel)] = dataValue;
      } else if (canonicDataLabel === 'SAMPLEDESCRIPTION') {
        spectrum.sampleDescription = dataValue;
      } else if (canonicDataLabel === 'END') {
        currentEntry = parentsStack.pop();
      }

      if (currentEntry && currentEntry.info && currentEntry.meta && canonicDataLabel.match(options.keepRecordsRegExp)) {
        let value = dataValue.trim();
        let target, label;

        if (dataLabel.startsWith('$')) {
          label = options.canonicMetadataLabels ? canonicDataLabel.substring(1) : dataLabel.substring(1);
          target = currentEntry.meta;
        } else {
          label = options.canonicDataLabels ? canonicDataLabel : dataLabel;
          target = currentEntry.info;
        }

        if (options.dynamicTyping) {
          let parsedValue = Number.parseFloat(value);
          if (!Number.isNaN(parsedValue)) value = parsedValue;
        }

        if (target[label]) {
          if (!Array.isArray(target[label])) {
            target[label] = [target[label]];
          }

          target[label].push(value);
        } else {
          target[label] = value;
        }
      }
    }

    profiling(result, 'Finished parsing', options);
    postProcessing(entriesFlat, result, options);
    profiling(result, 'Total time', options);
    /*
    if (result.children && result.children.length>0) {
      result = { ...result, ...result.children[0] };
    }
    */

    result.entries = tmpResult.children;
    result.flatten = entriesFlat;
    return result;
  }

  /**
   * Creates a new Analysis from a JCAMP string
   * @param {string} jcamp - String containing the JCAMP data
   * @param {object} [options={}]
   * @param {object} [options.id=Math.random()]
   * @param {string} [options.label=options.id] human redeable label
   * @return {Analysis} - New class element with the given data
   */

  function fromJcamp(jcamp, options = {}) {
    let analysis = new Analysis(options);
    addJcamp(analysis, jcamp);
    return analysis;
  }

  function addJcamp(analysis, jcamp) {
    let converted = convert(jcamp, {
      keepRecordsRegExp: /.*/
    });

    for (let entry of converted.flatten) {
      let currentSpectrum = entry.spectra[0]; // we ensure variables

      if (!currentSpectrum.variables) {
        const variables = {};
        currentSpectrum.variables = variables;
        variables.x = {
          label: currentSpectrum.xUnits,
          symbol: 'X',
          data: currentSpectrum.data.x || currentSpectrum.data.X
        };
        variables.y = {
          label: currentSpectrum.yUnits,
          symbol: 'Y',
          data: currentSpectrum.data.y || currentSpectrum.data.Y
        };
      } else {
        for (let key in currentSpectrum.variables) {
          const variable = currentSpectrum.variables[key];
          if (variable.label) continue;
          variable.label = variable.name || variable.symbol || key;

          if (variable.units && !variable.label.includes(variable.units)) {
            variable.label += ` [${variable.units}]`;
          }
        }
      }

      analysis.pushSpectrum(currentSpectrum.variables, {
        dataType: entry.dataType,
        title: entry.title,
        meta: entry.meta
      });
    }
  }

  function addStyle(serie, spectrum, options = {}) {
    const {
      color = 'darkgrey'
    } = options;
    serie.style = [{
      name: 'unselected',
      style: {
        line: {
          color,
          width: 1,
          dash: 1
        }
      }
    }, {
      name: 'selected',
      style: {
        line: {
          color,
          width: 3,
          dash: 1
        }
      }
    }];
    serie.name = spectrum.label || spectrum.id;
  }

  const COLORS = ['#FFB300', '#803E75', '#FF6800', '#A6BDD7', '#C10020', '#CEA262', '#817066', '#007D34', '#F6768E', '#00538A', '#FF7A5C', '#53377A', '#FF8E00', '#B32851', '#F4C800', '#7F180D', '#93AA00', '#593315', '#F13A13', '#232C16'];

  /**
   * Generate a jsgraph chart format from an array of Analysis
   * @param {Array<Analysis>} analyses
   * @param {object} [options={}]
   * @param {Array} [options.ids] List of spectra ids, by all
   * @param {Array} [options.colors] List of colors
   * @param {object} [options.selector={}]
   * @param {object} [options.normalization]
   */

  function getJSGraph(analyses, options = {}) {
    const {
      colors = COLORS,
      selector,
      normalization
    } = options;
    let series = [];
    let xLabel = '';
    let yLabel = '';

    for (let i = 0; i < analyses.length; i++) {
      const analysis = analyses[i];
      let serie = {};
      let currentData = analysis.getNormalizedData({
        selector,
        normalization
      });
      if (!currentData) continue;
      if (!xLabel) xLabel = analysis.getXLabel(selector);
      if (!yLabel) yLabel = analysis.getYLabel(selector);
      addStyle(serie, analysis, {
        color: colors[i]
      });
      serie.data = currentData;
      series.push(serie);
    }

    return {
      axes: {
        x: {
          label: xLabel,
          unit: '',
          unitWrapperBefore: '',
          unitWrapperAfter: '',
          flipped: false,
          display: true
        },
        y: {
          label: yLabel,
          unit: '',
          unitWrapperBefore: '',
          unitWrapperAfter: '',
          flipped: false,
          display: true
        }
      },
      series
    };
  }

  function getNormalizationAnnotations(filter = {}, boundary) {
    let {
      exclusions = []
    } = filter;
    let annotations = [];
    exclusions = exclusions.filter(exclusion => !exclusion.ignore);
    annotations = exclusions.map(exclusion => {
      let annotation = {
        type: 'rect',
        position: [{
          x: exclusion.from,
          y: boundary.y.min
        }, {
          x: exclusion.to,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      };
      return annotation;
    });

    if (filter.from !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: Number.MIN_SAFE_INTEGER,
          y: boundary.y.min
        }, {
          x: filter.from,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    if (filter.to !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: filter.to,
          y: boundary.y.min
        }, {
          x: Number.MAX_SAFE_INTEGER,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    return annotations;
  }

  /**
   * Parse from a xyxy data array
   * @param {Array<Array<number>>} variables
   * @param {object} [meta] - same metadata object format that the fromText
   * @return {string} JCAMP of the input
   */

  function creatorNtuples(variables, options) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = ''
    } = info;
    const symbol = [];
    const varName = [];
    const varType = [];
    const varDim = [];
    const units = [];
    const first = [];
    const last = [];
    const min$1 = [];
    const max$1 = [];
    const keys = Object.keys(variables);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let variable = variables[key];
      let name = variable.label && variable.label.replace(/ *\[.*/, '');
      let unit = variable.label && variable.label.replace(/.*\[(.*)\].*/, '$1');
      symbol.push(variable.symbol || key);
      varName.push(variable.name || name || key);
      varDim.push(variables[key].data.length);
      varType.push(i === 0 ? 'INDEPENDENT' : 'DEPENDENT');
      units.push(variable.units || unit || '');
      first.push(variables[key][0]);
      last.push(variables[key][variables[key].length - 1]);
      min$1.push(min(variables[key].data));
      max$1.push(max(variables[key].data));
    }

    let header = `##TITLE=${title}
##JCAMP-DX=6.00
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    }

    header += `##NTUPLES= ${dataType}
##VAR_NAME=  ${varName.join()}
##SYMBOL=    ${symbol.join()}
##VAR_TYPE=  ${varType.join()}
##VAR_DIM=   ${varDim.join()}
##UNITS=     ${units.join()}
##PAGE= N=1\n`;
    header += `##DATA TABLE= (${symbol.join('')}..${symbol.join('')}), PEAKS\n`;

    for (let i = 0; i < variables[keys[0]].data.length; i++) {
      let point = [];

      for (let key of keys) {
        point.push(variables[key].data[i]);
      }

      header += `${point.join('\t')}\n`;
    }

    header += '##END';
    return header;
  }

  /**
   * Create a jcamp
   * @param {object} data - object of array
   * @param {object} [options={}] - metadata object
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {string} [options.info.xUnits = ''] - units for the x axis for variables===undefined
   * @param {string} [options.info.yUnits = ''] - units for the y axis for variables===undefined
   * @param {object} [options.meta = {}] - comments to add to the file

   * @return {string} JCAMP of the input
   */
  function fromJSON(data, options = {}) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = '',
      xUnits = '',
      yUnits = ''
    } = info;
    let firstX = Number.POSITIVE_INFINITY;
    let lastX = Number.NEGATIVE_INFINITY;
    let firstY = Number.POSITIVE_INFINITY;
    let lastY = Number.NEGATIVE_INFINITY;
    let points = [];

    for (let i = 0; i < data.x.length; i++) {
      let x = data.x[i];
      let y = data.y[i];

      if (firstX > x) {
        firstX = x;
      }

      if (lastX < x) {
        lastX = x;
      }

      if (firstY > y) {
        firstY = y;
      }

      if (lastY < y) {
        lastY = y;
      }

      points.push(`${x} ${y}`);
    }

    let header = `##TITLE=${title}
##JCAMP-DX=4.24
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}
##XUNITS=${xUnits}
##YUNITS=${yUnits}
##FIRSTX=${firstX}
##LASTX=${lastX}
##FIRSTY=${firstY}
##LASTY=${lastY}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    } // we leave the header and utf8 fonts ${header.replace(/[^\t\r\n\x20-\x7F]/g, '')


    return `${header}##NPOINTS=${points.length}
##PEAK TABLE=(XY..XY)
${points.join('\n')}
##END`;
  }

  /**
   * Create a jcamp from variables
   * @param {Array<Variable} [variables={}] - object of variables
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {object} [options.meta = {}] - comments to add to the file
   * @param {object} [options.forceNtuples = false] - force the ntuples format even if there is only x and y variables
   */

  function fromVariables(variables = {}, options = {}) {
    const {
      info,
      meta,
      forceNtuples
    } = options;
    let jcampOptions = {
      info,
      meta
    };
    let keys = Object.keys(variables).map(key => key.toLowerCase());

    if (keys.length === 2 && keys.includes('x') && keys.includes('y') && !forceNtuples) {
      let x = variables.x;
      let xLabel = x.label || x.name || 'x';
      jcampOptions.info.xUnits = xLabel.includes(variables.x.units) ? xLabel : `${xLabel} [${variables.x.units}]`;
      let y = variables.y;
      let yLabel = y.label || y.name || 'y';
      jcampOptions.info.yUnits = yLabel.includes(variables.y.units) ? yLabel : `${yLabel} [${variables.y.units}]`;
      return fromJSON({
        x: variables.x.data,
        y: variables.y.data
      }, jcampOptions);
    } else {
      return creatorNtuples(variables, options);
    }
  }

  function toJcamp(analysis, options = {}) {
    let jcamps = [];

    for (let spectrum of analysis.spectra) {
      jcamps.push(getJcamp(spectrum, options));
    }

    return jcamps.join('\n');
  }

  function getJcamp(spectrum, options) {
    const {
      info = {},
      meta = {}
    } = options;
    let jcampOptions = {
      options: {},
      info: {
        title: spectrum.title,
        dataType: spectrum.dataType,
        ...info
      },
      meta: { ...spectrum.meta,
        ...meta
      }
    };
    return fromVariables(spectrum.variables, jcampOptions);
  }

  var util = createCommonjsModule(function (module, exports) {

    const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
    const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
    const regexName = new RegExp('^' + nameRegexp + '$');

    const getAllMatches = function (string, regex) {
      const matches = [];
      let match = regex.exec(string);

      while (match) {
        const allmatches = [];
        const len = match.length;

        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }

        matches.push(allmatches);
        match = regex.exec(string);
      }

      return matches;
    };

    const isName = function (string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === 'undefined');
    };

    exports.isExist = function (v) {
      return typeof v !== 'undefined';
    };

    exports.isEmptyObject = function (obj) {
      return Object.keys(obj).length === 0;
    };
    /**
     * Copy all the properties of a into b.
     * @param {*} target
     * @param {*} a
     */


    exports.merge = function (target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a); // will return an array of own properties

        const len = keys.length; //don't make it inline

        for (let i = 0; i < len; i++) {
          if (arrayMode === 'strict') {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    /* exports.merge =function (b,a){
      return Object.assign(b,a);
    } */


    exports.getValue = function (v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return '';
      }
    }; // const fakeCall = function(a) {return a;};
    // const fakeCallNoReturn = function() {};


    exports.buildOptions = function (options, defaultOptions, props) {
      var newOptions = {};

      if (!options) {
        return defaultOptions; //if there are not options
      }

      for (let i = 0; i < props.length; i++) {
        if (options[props[i]] !== undefined) {
          newOptions[props[i]] = options[props[i]];
        } else {
          newOptions[props[i]] = defaultOptions[props[i]];
        }
      }

      return newOptions;
    };

    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  });

  const convertToJson = function (node, options) {
    const jObj = {}; //when no child node or attr is present

    if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
      return util.isExist(node.val) ? node.val : '';
    } else {
      //otherwise create a textnode if node has some text
      if (util.isExist(node.val)) {
        if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
          if (options.arrayMode === "strict") {
            jObj[options.textNodeName] = [node.val];
          } else {
            jObj[options.textNodeName] = node.val;
          }
        }
      }
    }

    util.merge(jObj, node.attrsMap, options.arrayMode);
    const keys = Object.keys(node.child);

    for (let index = 0; index < keys.length; index++) {
      var tagname = keys[index];

      if (node.child[tagname] && node.child[tagname].length > 1) {
        jObj[tagname] = [];

        for (var tag in node.child[tagname]) {
          jObj[tagname].push(convertToJson(node.child[tagname][tag], options));
        }
      } else {
        if (options.arrayMode === true) {
          const result = convertToJson(node.child[tagname][0], options);
          if (typeof result === 'object') jObj[tagname] = [result];else jObj[tagname] = result;
        } else if (options.arrayMode === "strict") {
          jObj[tagname] = [convertToJson(node.child[tagname][0], options)];
        } else {
          jObj[tagname] = convertToJson(node.child[tagname][0], options);
        }
      }
    } //add value


    return jObj;
  };

  var convertToJson_1 = convertToJson;
  var node2json = {
    convertToJson: convertToJson_1
  };

  var xmlNode = function (tagname, parent, val) {
    this.tagname = tagname;
    this.parent = parent;
    this.child = {}; //child tags

    this.attrsMap = {}; //attributes map

    this.val = val; //text only

    this.addChild = function (child) {
      if (Array.isArray(this.child[child.tagname])) {
        //already presents
        this.child[child.tagname].push(child);
      } else {
        this.child[child.tagname] = [child];
      }
    };
  };

  const buildOptions = util.buildOptions;
  const regx = '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(/NAME/g, util.nameRegexp); //const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
  //const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");
  //polyfill

  if (!Number.parseInt && window.parseInt) {
    Number.parseInt = window.parseInt;
  }

  if (!Number.parseFloat && window.parseFloat) {
    Number.parseFloat = window.parseFloat;
  }

  const defaultOptions$3 = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseNodeValue: true,
    parseAttributeValue: false,
    arrayMode: false,
    trimValues: true,
    //Trim string values of tag and attributes
    cdataTagName: false,
    cdataPositionChar: '\\c',
    tagValueProcessor: function (a, tagName) {
      return a;
    },
    attrValueProcessor: function (a, attrName) {
      return a;
    },
    stopNodes: [] //decodeStrict: false,

  };
  var defaultOptions_1 = defaultOptions$3;
  const props = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'ignoreNameSpace', 'allowBooleanAttributes', 'parseNodeValue', 'parseAttributeValue', 'arrayMode', 'trimValues', 'cdataTagName', 'cdataPositionChar', 'tagValueProcessor', 'attrValueProcessor', 'parseTrueNumberOnly', 'stopNodes'];
  var props_1 = props;
  /**
   * Trim -> valueProcessor -> parse value
   * @param {string} tagName
   * @param {string} val
   * @param {object} options
   */

  function processTagValue(tagName, val, options) {
    if (val) {
      if (options.trimValues) {
        val = val.trim();
      }

      val = options.tagValueProcessor(val, tagName);
      val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
    }

    return val;
  }

  function resolveNameSpace(tagname, options) {
    if (options.ignoreNameSpace) {
      const tags = tagname.split(':');
      const prefix = tagname.charAt(0) === '/' ? '/' : '';

      if (tags[0] === 'xmlns') {
        return '';
      }

      if (tags.length === 2) {
        tagname = prefix + tags[1];
      }
    }

    return tagname;
  }

  function parseValue(val, shouldParse, parseTrueNumberOnly) {
    if (shouldParse && typeof val === 'string') {
      let parsed;

      if (val.trim() === '' || isNaN(val)) {
        parsed = val === 'true' ? true : val === 'false' ? false : val;
      } else {
        if (val.indexOf('0x') !== -1) {
          //support hexa decimal
          parsed = Number.parseInt(val, 16);
        } else if (val.indexOf('.') !== -1) {
          parsed = Number.parseFloat(val);
          val = val.replace(/\.?0+$/, "");
        } else {
          parsed = Number.parseInt(val, 10);
        }

        if (parseTrueNumberOnly) {
          parsed = String(parsed) === val ? parsed : val;
        }
      }

      return parsed;
    } else {
      if (util.isExist(val)) {
        return val;
      } else {
        return '';
      }
    }
  } //TODO: change regex to capture NS
  //const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");


  const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

  function buildAttributesMap(attrStr, options) {
    if (!options.ignoreAttributes && typeof attrStr === 'string') {
      attrStr = attrStr.replace(/\r?\n/g, ' '); //attrStr = attrStr || attrStr.trim();

      const matches = util.getAllMatches(attrStr, attrsRegx);
      const len = matches.length; //don't make it inline

      const attrs = {};

      for (let i = 0; i < len; i++) {
        const attrName = resolveNameSpace(matches[i][1], options);

        if (attrName.length) {
          if (matches[i][4] !== undefined) {
            if (options.trimValues) {
              matches[i][4] = matches[i][4].trim();
            }

            matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
            attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue, options.parseTrueNumberOnly);
          } else if (options.allowBooleanAttributes) {
            attrs[options.attributeNamePrefix + attrName] = true;
          }
        }
      }

      if (!Object.keys(attrs).length) {
        return;
      }

      if (options.attrNodeName) {
        const attrCollection = {};
        attrCollection[options.attrNodeName] = attrs;
        return attrCollection;
      }

      return attrs;
    }
  }

  const getTraversalObj = function (xmlData, options) {
    xmlData = xmlData.replace(/(\r\n)|\n/, " ");
    options = buildOptions(options, defaultOptions$3, props);
    const xmlObj = new xmlNode('!xml');
    let currentNode = xmlObj;
    let textData = ""; //function match(xmlData){

    for (let i = 0; i < xmlData.length; i++) {
      const ch = xmlData[i];

      if (ch === '<') {
        if (xmlData[i + 1] === '/') {
          //Closing Tag
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i + 2, closeIndex).trim();

          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");

            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          }
          /* if (currentNode.parent) {
            currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
          } */


          if (currentNode) {
            if (currentNode.val) {
              currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tagName, textData, options);
            } else {
              currentNode.val = processTagValue(tagName, textData, options);
            }
          }

          if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
            currentNode.child = [];

            if (currentNode.attrsMap == undefined) {
              currentNode.attrsMap = {};
            }

            currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1);
          }

          currentNode = currentNode.parent;
          textData = "";
          i = closeIndex;
        } else if (xmlData[i + 1] === '?') {
          i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.");
        } else if (xmlData.substr(i + 1, 3) === '!--') {
          i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.");
        } else if (xmlData.substr(i + 1, 2) === '!D') {
          const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.");
          const tagExp = xmlData.substring(i, closeIndex);

          if (tagExp.indexOf("[") >= 0) {
            i = xmlData.indexOf("]>", i) + 1;
          } else {
            i = closeIndex;
          }
        } else if (xmlData.substr(i + 1, 2) === '![') {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9, closeIndex); //considerations
          //1. CDATA will always have parent node
          //2. A tag with CDATA is not a leaf node so it's value would be string type.

          if (textData) {
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
            textData = "";
          }

          if (options.cdataTagName) {
            //add cdata node
            const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
            currentNode.addChild(childNode); //for backtracking

            currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar; //add rest value to parent node

            if (tagExp) {
              childNode.val = tagExp;
            }
          } else {
            currentNode.val = (currentNode.val || '') + (tagExp || '');
          }

          i = closeIndex + 2;
        } else {
          //Opening tag
          const result = closingIndexForOpeningTag(xmlData, i + 1);
          let tagExp = result.data;
          const closeIndex = result.index;
          const separatorIndex = tagExp.indexOf(" ");
          let tagName = tagExp;

          if (separatorIndex !== -1) {
            tagName = tagExp.substr(0, separatorIndex).trimRight();
            tagExp = tagExp.substr(separatorIndex + 1);
          }

          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");

            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          } //save text to parent node


          if (currentNode && textData) {
            if (currentNode.tagname !== '!xml') {
              currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
            }
          }

          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            //selfClosing tag
            if (tagName[tagName.length - 1] === "/") {
              //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }

            const childNode = new xmlNode(tagName, currentNode, '');

            if (tagName !== tagExp) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }

            currentNode.addChild(childNode);
          } else {
            //opening tag
            const childNode = new xmlNode(tagName, currentNode);

            if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
              childNode.startIndex = closeIndex;
            }

            if (tagName !== tagExp) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }

            currentNode.addChild(childNode);
            currentNode = childNode;
          }

          textData = "";
          i = closeIndex;
        }
      } else {
        textData += xmlData[i];
      }
    }

    return xmlObj;
  };

  function closingIndexForOpeningTag(data, i) {
    let attrBoundary;
    let tagExp = "";

    for (let index = i; index < data.length; index++) {
      let ch = data[index];

      if (attrBoundary) {
        if (ch === attrBoundary) attrBoundary = ""; //reset
      } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
      } else if (ch === '>') {
        return {
          data: tagExp,
          index: index
        };
      } else if (ch === '\t') {
        ch = " ";
      }

      tagExp += ch;
    }
  }

  function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);

    if (closingIndex === -1) {
      throw new Error(errMsg);
    } else {
      return closingIndex + str.length - 1;
    }
  }

  var getTraversalObj_1 = getTraversalObj;
  var xmlstr2xmlnode = {
    defaultOptions: defaultOptions_1,
    props: props_1,
    getTraversalObj: getTraversalObj_1
  };

  const defaultOptions$4 = {
    allowBooleanAttributes: false //A tag can have attributes without any value

  };
  const props$1 = ['allowBooleanAttributes']; //const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");

  var validate = function (xmlData, options) {
    options = util.buildOptions(options, defaultOptions$4, props$1); //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE

    const tags = [];
    let tagFound = false; //indicates that the root tag has been closed (aka. depth 0 has been reached)

    let reachedRoot = false;

    if (xmlData[0] === '\ufeff') {
      // check for byte order mark (BOM)
      xmlData = xmlData.substr(1);
    }

    for (let i = 0; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        //starting of tag
        //read until you reach to '>' avoiding any '>' in attribute value
        i++;

        if (xmlData[i] === '?') {
          i = readPI(xmlData, ++i);

          if (i.err) {
            return i;
          }
        } else if (xmlData[i] === '!') {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;

          if (xmlData[i] === '/') {
            //closing tag
            closingTag = true;
            i++;
          } //read tagname


          let tagName = '';

          for (; i < xmlData.length && xmlData[i] !== '>' && xmlData[i] !== ' ' && xmlData[i] !== '\t' && xmlData[i] !== '\n' && xmlData[i] !== '\r'; i++) {
            tagName += xmlData[i];
          }

          tagName = tagName.trim(); //console.log(tagName);

          if (tagName[tagName.length - 1] === '/') {
            //self closing tag without attributes
            tagName = tagName.substring(0, tagName.length - 1); //continue;

            i--;
          }

          if (!validateTagName(tagName)) {
            let msg;

            if (tagName.trim().length === 0) {
              msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
            } else {
              msg = "Tag '" + tagName + "' is an invalid name.";
            }

            return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
          }

          const result = readAttributeStr(xmlData, i);

          if (result === false) {
            return getErrorObject('InvalidAttr', "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
          }

          let attrStr = result.value;
          i = result.index;

          if (attrStr[attrStr.length - 1] === '/') {
            //self closing tag
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);

            if (isValid === true) {
              tagFound = true; //continue; //text may presents after self closing tag
            } else {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
            } else {
              const otg = tags.pop();

              if (tagName !== otg) {
                return getErrorObject('InvalidTag', "Closing tag '" + otg + "' is expected inplace of '" + tagName + "'.", getLineNumberForPosition(xmlData, i));
              } //when there are no more tags, we reached the root level.


              if (tags.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);

            if (isValid !== true) {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            } //if the root level has been reached before ...


            if (reachedRoot === true) {
              return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
            } else {
              tags.push(tagName);
            }

            tagFound = true;
          } //skip tag text value
          //It may include comments and CDATA value


          for (i++; i < xmlData.length; i++) {
            if (xmlData[i] === '<') {
              if (xmlData[i + 1] === '!') {
                //comment or CADATA
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else {
                break;
              }
            } else if (xmlData[i] === '&') {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1) return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            }
          } //end of reading tag text value


          if (xmlData[i] === '<') {
            i--;
          }
        }
      } else {
        if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
          continue;
        }

        return getErrorObject('InvalidChar', "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }

    if (!tagFound) {
      return getErrorObject('InvalidXml', 'Start tag expected.', 1);
    } else if (tags.length > 0) {
      return getErrorObject('InvalidXml', "Invalid '" + JSON.stringify(tags, null, 4).replace(/\r?\n/g, '') + "' found.", 1);
    }

    return true;
  };
  /**
   * Read Processing insstructions and skip
   * @param {*} xmlData
   * @param {*} i
   */


  function readPI(xmlData, i) {
    var start = i;

    for (; i < xmlData.length; i++) {
      if (xmlData[i] == '?' || xmlData[i] == ' ') {
        //tagname
        var tagname = xmlData.substr(start, i - start);

        if (i > 5 && tagname === 'xml') {
          return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
          //check if valid attribut string
          i++;
          break;
        } else {
          continue;
        }
      }
    }

    return i;
  }

  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
      //comment
      for (i += 3; i < xmlData.length; i++) {
        if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === 'D' && xmlData[i + 2] === 'O' && xmlData[i + 3] === 'C' && xmlData[i + 4] === 'T' && xmlData[i + 5] === 'Y' && xmlData[i + 6] === 'P' && xmlData[i + 7] === 'E') {
      let angleBracketsCount = 1;

      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === '<') {
          angleBracketsCount++;
        } else if (xmlData[i] === '>') {
          angleBracketsCount--;

          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === '[' && xmlData[i + 2] === 'C' && xmlData[i + 3] === 'D' && xmlData[i + 4] === 'A' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'A' && xmlData[i + 7] === '[') {
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    }

    return i;
  }

  var doubleQuote = '"';
  var singleQuote = "'";
  /**
   * Keep reading xmlData until '<' is found outside the attribute value.
   * @param {string} xmlData
   * @param {number} i
   */

  function readAttributeStr(xmlData, i) {
    let attrStr = '';
    let startChar = '';
    let tagClosed = false;

    for (; i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === '') {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i]) {
          //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
          continue;
        } else {
          startChar = '';
        }
      } else if (xmlData[i] === '>') {
        if (startChar === '') {
          tagClosed = true;
          break;
        }
      }

      attrStr += xmlData[i];
    }

    if (startChar !== '') {
      return false;
    }

    return {
      value: attrStr,
      index: i,
      tagClosed: tagClosed
    };
  }
  /**
   * Select all the attributes whether valid or invalid.
   */


  const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g'); //attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

  function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");
    //if(attrStr.trim().length === 0) return true; //empty string
    const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};

    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        //nospace before attribute name: a="sd"b="saf"
        return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]));
      } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
        //independent attribute: ab
        return getErrorObject('InvalidAttr', "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
      }
      /* else if(matches[i][6] === undefined){//attribute without value: ab=
                      return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                  } */


      const attrName = matches[i][2];

      if (!validateAttrName(attrName)) {
        return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
      }

      if (!attrNames.hasOwnProperty(attrName)) {
        //check for duplicate attribute.
        attrNames[attrName] = 1;
      } else {
        return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
      }
    }

    return true;
  }

  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;

    if (xmlData[i] === 'x') {
      i++;
      re = /[\da-fA-F]/;
    }

    for (; i < xmlData.length; i++) {
      if (xmlData[i] === ';') return i;
      if (!xmlData[i].match(re)) break;
    }

    return -1;
  }

  function validateAmpersand(xmlData, i) {
    // https://www.w3.org/TR/xml/#dt-charref
    i++;
    if (xmlData[i] === ';') return -1;

    if (xmlData[i] === '#') {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }

    let count = 0;

    for (; i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20) continue;
      if (xmlData[i] === ';') break;
      return -1;
    }

    return i;
  }

  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code: code,
        msg: message,
        line: lineNumber
      }
    };
  }

  function validateAttrName(attrName) {
    return util.isName(attrName);
  } // const startsWithXML = /^xml/i;


  function validateTagName(tagname) {
    return util.isName(tagname)
    /* && !tagname.match(startsWithXML) */
    ;
  } //this function returns the line number for the character at the given index


  function getLineNumberForPosition(xmlData, index) {
    var lines = xmlData.substring(0, index).split(/\r?\n/);
    return lines.length;
  } //this function returns the position of the last character of match within attrStr


  function getPositionFromMatch(attrStr, match) {
    return attrStr.indexOf(match) + match.length;
  }

  var validator = {
    validate: validate
  };

  const char = function (a) {
    return String.fromCharCode(a);
  };

  const chars = {
    nilChar: char(176),
    missingChar: char(201),
    nilPremitive: char(175),
    missingPremitive: char(200),
    emptyChar: char(178),
    emptyValue: char(177),
    //empty Premitive
    boundryChar: char(179),
    objStart: char(198),
    arrStart: char(204),
    arrayEnd: char(185)
  };
  const charsArr = [chars.nilChar, chars.nilPremitive, chars.missingChar, chars.missingPremitive, chars.boundryChar, chars.emptyChar, chars.emptyValue, chars.arrayEnd, chars.objStart, chars.arrStart];

  const _e = function (node, e_schema, options) {
    if (typeof e_schema === 'string') {
      //premitive
      if (node && node[0] && node[0].val !== undefined) {
        return getValue(node[0].val);
      } else {
        return getValue(node);
      }
    } else {
      const hasValidData = hasData(node);

      if (hasValidData === true) {
        let str = '';

        if (Array.isArray(e_schema)) {
          //attributes can't be repeated. hence check in children tags only
          str += chars.arrStart;
          const itemSchema = e_schema[0]; //var itemSchemaType = itemSchema;

          const arr_len = node.length;

          if (typeof itemSchema === 'string') {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = getValue(node[arr_i].val);
              str = processValue(str, r);
            }
          } else {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = _e(node[arr_i], itemSchema, options);

              str = processValue(str, r);
            }
          }

          str += chars.arrayEnd; //indicates that next item is not array item
        } else {
          //object
          str += chars.objStart;
          const keys = Object.keys(e_schema);

          if (Array.isArray(node)) {
            node = node[0];
          }

          for (let i in keys) {
            const key = keys[i]; //a property defined in schema can be present either in attrsMap or children tags
            //options.textNodeName will not present in both maps, take it's value from val
            //options.attrNodeName will be present in attrsMap

            let r;

            if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
              r = _e(node.attrsMap[key], e_schema[key], options);
            } else if (key === options.textNodeName) {
              r = _e(node.val, e_schema[key], options);
            } else {
              r = _e(node.child[key], e_schema[key], options);
            }

            str = processValue(str, r);
          }
        }

        return str;
      } else {
        return hasValidData;
      }
    }
  };

  const getValue = function (a
  /*, type*/
  ) {
    switch (a) {
      case undefined:
        return chars.missingPremitive;

      case null:
        return chars.nilPremitive;

      case '':
        return chars.emptyValue;

      default:
        return a;
    }
  };

  const processValue = function (str, r) {
    if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
      str += chars.boundryChar;
    }

    return str + r;
  };

  const isAppChar = function (ch) {
    return charsArr.indexOf(ch) !== -1;
  };

  function hasData(jObj) {
    if (jObj === undefined) {
      return chars.missingChar;
    } else if (jObj === null) {
      return chars.nilChar;
    } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
      return chars.emptyChar;
    } else {
      return true;
    }
  }

  const buildOptions$1 = util.buildOptions;

  const convert2nimn = function (node, e_schema, options) {
    options = buildOptions$1(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
    return _e(node, e_schema, options);
  };

  var convert2nimn_1 = convert2nimn;
  var nimndata = {
    convert2nimn: convert2nimn_1
  };

  const buildOptions$2 = util.buildOptions; //TODO: do it later

  const convertToJsonString = function (node, options) {
    options = buildOptions$2(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
    options.indentBy = options.indentBy || '';
    return _cToJsonStr(node, options);
  };

  const _cToJsonStr = function (node, options, level) {
    let jObj = '{'; //traver through all the children

    const keys = Object.keys(node.child);

    for (let index = 0; index < keys.length; index++) {
      var tagname = keys[index];

      if (node.child[tagname] && node.child[tagname].length > 1) {
        jObj += '"' + tagname + '" : [ ';

        for (var tag in node.child[tagname]) {
          jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
        }

        jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
      } else {
        jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
      }
    }

    util.merge(jObj, node.attrsMap); //add attrsMap as new children

    if (util.isEmptyObject(jObj)) {
      return util.isExist(node.val) ? node.val : '';
    } else {
      if (util.isExist(node.val)) {
        if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
          jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
        }
      }
    } //add value


    if (jObj[jObj.length - 1] === ',') {
      jObj = jObj.substr(0, jObj.length - 2);
    }

    return jObj + '}';
  };

  function stringval(v) {
    if (v === true || v === false || !isNaN(v)) {
      return v;
    } else {
      return '"' + v + '"';
    }
  }

  var convertToJsonString_1 = convertToJsonString;
  var node2json_str = {
    convertToJsonString: convertToJsonString_1
  };

  const buildOptions$3 = util.buildOptions;
  const defaultOptions$5 = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    cdataTagName: false,
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false,
    tagValueProcessor: function (a) {
      return a;
    },
    attrValueProcessor: function (a) {
      return a;
    }
  };
  const props$2 = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'cdataTagName', 'cdataPositionChar', 'format', 'indentBy', 'supressEmptyNode', 'tagValueProcessor', 'attrValueProcessor'];

  function Parser(options) {
    this.options = buildOptions$3(options, defaultOptions$5, props$2);

    if (this.options.ignoreAttributes || this.options.attrNodeName) {
      this.isAttribute = function ()
      /*a*/
      {
        return false;
      };
    } else {
      this.attrPrefixLen = this.options.attributeNamePrefix.length;
      this.isAttribute = isAttribute;
    }

    if (this.options.cdataTagName) {
      this.isCDATA = isCDATA;
    } else {
      this.isCDATA = function ()
      /*a*/
      {
        return false;
      };
    }

    this.replaceCDATAstr = replaceCDATAstr;
    this.replaceCDATAarr = replaceCDATAarr;

    if (this.options.format) {
      this.indentate = indentate;
      this.tagEndChar = '>\n';
      this.newLine = '\n';
    } else {
      this.indentate = function () {
        return '';
      };

      this.tagEndChar = '>';
      this.newLine = '';
    }

    if (this.options.supressEmptyNode) {
      this.buildTextNode = buildEmptyTextNode;
      this.buildObjNode = buildEmptyObjNode;
    } else {
      this.buildTextNode = buildTextValNode;
      this.buildObjNode = buildObjectNode;
    }

    this.buildTextValNode = buildTextValNode;
    this.buildObjectNode = buildObjectNode;
  }

  Parser.prototype.parse = function (jObj) {
    return this.j2x(jObj, 0).val;
  };

  Parser.prototype.j2x = function (jObj, level) {
    let attrStr = '';
    let val = '';
    const keys = Object.keys(jObj);
    const len = keys.length;

    for (let i = 0; i < len; i++) {
      const key = keys[i];

      if (typeof jObj[key] === 'undefined') ; else if (jObj[key] === null) {
        val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
      } else if (jObj[key] instanceof Date) {
        val += this.buildTextNode(jObj[key], key, '', level);
      } else if (typeof jObj[key] !== 'object') {
        //premitive type
        const attr = this.isAttribute(key);

        if (attr) {
          attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
        } else if (this.isCDATA(key)) {
          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAstr('', jObj[key]);
          }
        } else {
          //tag value
          if (key === this.options.textNodeName) {
            if (jObj[this.options.cdataTagName]) ; else {
              val += this.options.tagValueProcessor('' + jObj[key]);
            }
          } else {
            val += this.buildTextNode(jObj[key], key, '', level);
          }
        }
      } else if (Array.isArray(jObj[key])) {
        //repeated nodes
        if (this.isCDATA(key)) {
          val += this.indentate(level);

          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAarr('', jObj[key]);
          }
        } else {
          //nested nodes
          const arrLen = jObj[key].length;

          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];

            if (typeof item === 'undefined') ; else if (item === null) {
              val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
            } else if (typeof item === 'object') {
              const result = this.j2x(item, level + 1);
              val += this.buildObjNode(result.val, key, result.attrStr, level);
            } else {
              val += this.buildTextNode(item, key, '', level);
            }
          }
        }
      } else {
        //nested node
        if (this.options.attrNodeName && key === this.options.attrNodeName) {
          const Ks = Object.keys(jObj[key]);
          const L = Ks.length;

          for (let j = 0; j < L; j++) {
            attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
          }
        } else {
          const result = this.j2x(jObj[key], level + 1);
          val += this.buildObjNode(result.val, key, result.attrStr, level);
        }
      }
    }

    return {
      attrStr: attrStr,
      val: val
    };
  };

  function replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);

    if (this.options.cdataPositionChar === '' || str === '') {
      return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
    } else {
      return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
    }
  }

  function replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);

    if (this.options.cdataPositionChar === '' || str === '') {
      return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
    } else {
      for (let v in cdata) {
        str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
      }

      return str + this.newLine;
    }
  }

  function buildObjectNode(val, key, attrStr, level) {
    if (attrStr && !val.includes('<')) {
      return this.indentate(level) + '<' + key + attrStr + '>' + val + //+ this.newLine
      // + this.indentate(level)
      '</' + key + this.tagEndChar;
    } else {
      return this.indentate(level) + '<' + key + attrStr + this.tagEndChar + val + //+ this.newLine
      this.indentate(level) + '</' + key + this.tagEndChar;
    }
  }

  function buildEmptyObjNode(val, key, attrStr, level) {
    if (val !== '') {
      return this.buildObjectNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar; //+ this.newLine
    }
  }

  function buildTextValNode(val, key, attrStr, level) {
    return this.indentate(level) + '<' + key + attrStr + '>' + this.options.tagValueProcessor(val) + '</' + key + this.tagEndChar;
  }

  function buildEmptyTextNode(val, key, attrStr, level) {
    if (val !== '') {
      return this.buildTextValNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    }
  }

  function indentate(level) {
    return this.options.indentBy.repeat(level);
  }

  function isAttribute(name
  /*, options*/
  ) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
      return name.substr(this.attrPrefixLen);
    } else {
      return false;
    }
  }

  function isCDATA(name) {
    return name === this.options.cdataTagName;
  } //formatting
  //indentation
  //\n after each closing or self closing tag


  var json2xml = Parser;

  var parser = createCommonjsModule(function (module, exports) {

    const x2xmlnode = xmlstr2xmlnode;
    const buildOptions = util.buildOptions;

    exports.parse = function (xmlData, options, validationOption) {
      if (validationOption) {
        if (validationOption === true) validationOption = {};
        const result = validator.validate(xmlData, validationOption);

        if (result !== true) {
          throw Error(result.err.msg);
        }
      }

      options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
      const traversableObj = xmlstr2xmlnode.getTraversalObj(xmlData, options); //print(traversableObj, "  ");

      return node2json.convertToJson(traversableObj, options);
    };

    exports.convertTonimn = nimndata.convert2nimn;
    exports.getTraversalObj = xmlstr2xmlnode.getTraversalObj;
    exports.convertToJson = node2json.convertToJson;
    exports.convertToJsonString = node2json_str.convertToJsonString;
    exports.validate = validator.validate;
    exports.j2xParser = json2xml;

    exports.parseToNimn = function (xmlData, schema, options) {
      return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
    };
  });

  var jszip_min = createCommonjsModule(function (module, exports) {
    /*!
    
    JSZip v3.5.0 - A JavaScript class for generating and reading zip files
    <http://stuartk.com/jszip>
    
    (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
    Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.
    
    JSZip uses the library pako released under the MIT license :
    https://github.com/nodeca/pako/blob/master/LICENSE
    */
    !function (t) {
      module.exports = t();
    }(function () {
      return function s(a, o, h) {
        function u(r, t) {
          if (!o[r]) {
            if (!a[r]) {
              var e = "function" == typeof commonjsRequire && commonjsRequire;
              if (!t && e) return e(r, !0);
              if (l) return l(r, !0);
              var i = new Error("Cannot find module '" + r + "'");
              throw i.code = "MODULE_NOT_FOUND", i;
            }

            var n = o[r] = {
              exports: {}
            };
            a[r][0].call(n.exports, function (t) {
              var e = a[r][1][t];
              return u(e || t);
            }, n, n.exports, s, a, o, h);
          }

          return o[r].exports;
        }

        for (var l = "function" == typeof commonjsRequire && commonjsRequire, t = 0; t < h.length; t++) u(h[t]);

        return u;
      }({
        1: [function (t, e, r) {

          var c = t("./utils"),
              d = t("./support"),
              p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function (t) {
            for (var e, r, i, n, s, a, o, h = [], u = 0, l = t.length, f = l, d = "string" !== c.getTypeOf(t); u < t.length;) f = l - u, i = d ? (e = t[u++], r = u < l ? t[u++] : 0, u < l ? t[u++] : 0) : (e = t.charCodeAt(u++), r = u < l ? t.charCodeAt(u++) : 0, u < l ? t.charCodeAt(u++) : 0), n = e >> 2, s = (3 & e) << 4 | r >> 4, a = 1 < f ? (15 & r) << 2 | i >> 6 : 64, o = 2 < f ? 63 & i : 64, h.push(p.charAt(n) + p.charAt(s) + p.charAt(a) + p.charAt(o));

            return h.join("");
          }, r.decode = function (t) {
            var e,
                r,
                i,
                n,
                s,
                a,
                o = 0,
                h = 0,
                u = "data:";
            if (t.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l,
                f = 3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
            if (t.charAt(t.length - 1) === p.charAt(64) && f--, t.charAt(t.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");

            for (l = d.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < t.length;) e = p.indexOf(t.charAt(o++)) << 2 | (n = p.indexOf(t.charAt(o++))) >> 4, r = (15 & n) << 4 | (s = p.indexOf(t.charAt(o++))) >> 2, i = (3 & s) << 6 | (a = p.indexOf(t.charAt(o++))), l[h++] = e, 64 !== s && (l[h++] = r), 64 !== a && (l[h++] = i);

            return l;
          };
        }, {
          "./support": 30,
          "./utils": 32
        }],
        2: [function (t, e, r) {

          var i = t("./external"),
              n = t("./stream/DataWorker"),
              s = t("./stream/DataLengthProbe"),
              a = t("./stream/Crc32Probe");
          s = t("./stream/DataLengthProbe");

          function o(t, e, r, i, n) {
            this.compressedSize = t, this.uncompressedSize = e, this.crc32 = r, this.compression = i, this.compressedContent = n;
          }

          o.prototype = {
            getContentWorker: function () {
              var t = new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),
                  e = this;
              return t.on("end", function () {
                if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
              }), t;
            },
            getCompressedWorker: function () {
              return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
            }
          }, o.createWorkerFrom = function (t, e, r) {
            return t.pipe(new a()).pipe(new s("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new s("compressedSize")).withStreamInfo("compression", e);
          }, e.exports = o;
        }, {
          "./external": 6,
          "./stream/Crc32Probe": 25,
          "./stream/DataLengthProbe": 26,
          "./stream/DataWorker": 27
        }],
        3: [function (t, e, r) {

          var i = t("./stream/GenericWorker");
          r.STORE = {
            magic: "\0\0",
            compressWorker: function (t) {
              return new i("STORE compression");
            },
            uncompressWorker: function () {
              return new i("STORE decompression");
            }
          }, r.DEFLATE = t("./flate");
        }, {
          "./flate": 7,
          "./stream/GenericWorker": 28
        }],
        4: [function (t, e, r) {

          var i = t("./utils");

          var o = function () {
            for (var t, e = [], r = 0; r < 256; r++) {
              t = r;

              for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;

              e[r] = t;
            }

            return e;
          }();

          e.exports = function (t, e) {
            return void 0 !== t && t.length ? "string" !== i.getTypeOf(t) ? function (t, e, r, i) {
              var n = o,
                  s = i + r;
              t ^= -1;

              for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e[a])];

              return -1 ^ t;
            }(0 | e, t, t.length, 0) : function (t, e, r, i) {
              var n = o,
                  s = i + r;
              t ^= -1;

              for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e.charCodeAt(a))];

              return -1 ^ t;
            }(0 | e, t, t.length, 0) : 0;
          };
        }, {
          "./utils": 32
        }],
        5: [function (t, e, r) {

          r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}],
        6: [function (t, e, r) {

          var i = null;
          i = "undefined" != typeof Promise ? Promise : t("lie"), e.exports = {
            Promise: i
          };
        }, {
          lie: 37
        }],
        7: [function (t, e, r) {

          var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
              n = t("pako"),
              s = t("./utils"),
              a = t("./stream/GenericWorker"),
              o = i ? "uint8array" : "array";

          function h(t, e) {
            a.call(this, "FlateWorker/" + t), this._pako = null, this._pakoAction = t, this._pakoOptions = e, this.meta = {};
          }

          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function (t) {
            this.meta = t.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, t.data), !1);
          }, h.prototype.flush = function () {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
          }, h.prototype.cleanUp = function () {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function () {
            this._pako = new n[this._pakoAction]({
              raw: !0,
              level: this._pakoOptions.level || -1
            });
            var e = this;

            this._pako.onData = function (t) {
              e.push({
                data: t,
                meta: e.meta
              });
            };
          }, r.compressWorker = function (t) {
            return new h("Deflate", t);
          }, r.uncompressWorker = function () {
            return new h("Inflate", {});
          };
        }, {
          "./stream/GenericWorker": 28,
          "./utils": 32,
          pako: 38
        }],
        8: [function (t, e, r) {

          function A(t, e) {
            var r,
                i = "";

            for (r = 0; r < e; r++) i += String.fromCharCode(255 & t), t >>>= 8;

            return i;
          }

          function i(t, e, r, i, n, s) {
            var a,
                o,
                h = t.file,
                u = t.compression,
                l = s !== O.utf8encode,
                f = I.transformTo("string", s(h.name)),
                d = I.transformTo("string", O.utf8encode(h.name)),
                c = h.comment,
                p = I.transformTo("string", s(c)),
                m = I.transformTo("string", O.utf8encode(c)),
                _ = d.length !== h.name.length,
                g = m.length !== c.length,
                b = "",
                v = "",
                y = "",
                w = h.dir,
                k = h.date,
                x = {
              crc32: 0,
              compressedSize: 0,
              uncompressedSize: 0
            };

            e && !r || (x.crc32 = t.crc32, x.compressedSize = t.compressedSize, x.uncompressedSize = t.uncompressedSize);
            var S = 0;
            e && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0,
                C = 0;
            w && (z |= 16), "UNIX" === n ? (C = 798, z |= function (t, e) {
              var r = t;
              return t || (r = e ? 16893 : 33204), (65535 & r) << 16;
            }(h.unixPermissions, w)) : (C = 20, z |= function (t) {
              return 63 & (t || 0);
            }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + d, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), {
              fileRecord: R.LOCAL_FILE_HEADER + E + f + b,
              dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(i, 4) + f + b + p
            };
          }

          var I = t("../utils"),
              n = t("../stream/GenericWorker"),
              O = t("../utf8"),
              B = t("../crc32"),
              R = t("../signature");

          function s(t, e, r, i) {
            n.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e, this.zipPlatform = r, this.encodeFileName = i, this.streamFiles = t, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }

          I.inherits(s, n), s.prototype.push = function (t) {
            var e = t.meta.percent || 0,
                r = this.entriesCount,
                i = this._sources.length;
            this.accumulate ? this.contentBuffer.push(t) : (this.bytesWritten += t.data.length, n.prototype.push.call(this, {
              data: t.data,
              meta: {
                currentFile: this.currentFile,
                percent: r ? (e + 100 * (r - i - 1)) / r : 100
              }
            }));
          }, s.prototype.openedSource = function (t) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = t.file.name;
            var e = this.streamFiles && !t.file.dir;

            if (e) {
              var r = i(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({
                data: r.fileRecord,
                meta: {
                  percent: 0
                }
              });
            } else this.accumulate = !0;
          }, s.prototype.closedSource = function (t) {
            this.accumulate = !1;
            var e = this.streamFiles && !t.file.dir,
                r = i(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r.dirRecord), e) this.push({
              data: function (t) {
                return R.DATA_DESCRIPTOR + A(t.crc32, 4) + A(t.compressedSize, 4) + A(t.uncompressedSize, 4);
              }(t),
              meta: {
                percent: 100
              }
            });else for (this.push({
              data: r.fileRecord,
              meta: {
                percent: 0
              }
            }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function () {
            for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({
              data: this.dirRecords[e],
              meta: {
                percent: 100
              }
            });

            var r = this.bytesWritten - t,
                i = function (t, e, r, i, n) {
              var s = I.transformTo("string", n(i));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(t, 2) + A(t, 2) + A(e, 4) + A(r, 4) + A(s.length, 2) + s;
            }(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName);

            this.push({
              data: i,
              meta: {
                percent: 100
              }
            });
          }, s.prototype.prepareNextSource = function () {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function (t) {
            this._sources.push(t);

            var e = this;
            return t.on("data", function (t) {
              e.processChunk(t);
            }), t.on("end", function () {
              e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end();
            }), t.on("error", function (t) {
              e.error(t);
            }), this;
          }, s.prototype.resume = function () {
            return !!n.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
          }, s.prototype.error = function (t) {
            var e = this._sources;
            if (!n.prototype.error.call(this, t)) return !1;

            for (var r = 0; r < e.length; r++) try {
              e[r].error(t);
            } catch (t) {}

            return !0;
          }, s.prototype.lock = function () {
            n.prototype.lock.call(this);

            for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock();
          }, e.exports = s;
        }, {
          "../crc32": 4,
          "../signature": 23,
          "../stream/GenericWorker": 28,
          "../utf8": 31,
          "../utils": 32
        }],
        9: [function (t, e, r) {

          var u = t("../compressions"),
              i = t("./ZipFileWorker");

          r.generateWorker = function (t, a, e) {
            var o = new i(a.streamFiles, e, a.platform, a.encodeFileName),
                h = 0;

            try {
              t.forEach(function (t, e) {
                h++;

                var r = function (t, e) {
                  var r = t || e,
                      i = u[r];
                  if (!i) throw new Error(r + " is not a valid compression method !");
                  return i;
                }(e.options.compression, a.compression),
                    i = e.options.compressionOptions || a.compressionOptions || {},
                    n = e.dir,
                    s = e.date;

                e._compressWorker(r, i).withStreamInfo("file", {
                  name: t,
                  dir: n,
                  date: s,
                  comment: e.comment || "",
                  unixPermissions: e.unixPermissions,
                  dosPermissions: e.dosPermissions
                }).pipe(o);
              }), o.entriesCount = h;
            } catch (t) {
              o.error(t);
            }

            return o;
          };
        }, {
          "../compressions": 3,
          "./ZipFileWorker": 8
        }],
        10: [function (t, e, r) {

          function i() {
            if (!(this instanceof i)) return new i();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = {}, this.comment = null, this.root = "", this.clone = function () {
              var t = new i();

              for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);

              return t;
            };
          }

          (i.prototype = t("./object")).loadAsync = t("./load"), i.support = t("./support"), i.defaults = t("./defaults"), i.version = "3.5.0", i.loadAsync = function (t, e) {
            return new i().loadAsync(t, e);
          }, i.external = t("./external"), e.exports = i;
        }, {
          "./defaults": 5,
          "./external": 6,
          "./load": 11,
          "./object": 15,
          "./support": 30
        }],
        11: [function (t, e, r) {

          var i = t("./utils"),
              n = t("./external"),
              o = t("./utf8"),
              h = (i = t("./utils"), t("./zipEntries")),
              s = t("./stream/Crc32Probe"),
              u = t("./nodejsUtils");

          function l(i) {
            return new n.Promise(function (t, e) {
              var r = i.decompressed.getContentWorker().pipe(new s());
              r.on("error", function (t) {
                e(t);
              }).on("end", function () {
                r.streamInfo.crc32 !== i.decompressed.crc32 ? e(new Error("Corrupted zip : CRC32 mismatch")) : t();
              }).resume();
            });
          }

          e.exports = function (t, s) {
            var a = this;
            return s = i.extend(s || {}, {
              base64: !1,
              checkCRC32: !1,
              optimizedBinaryString: !1,
              createFolders: !1,
              decodeFileName: o.utf8decode
            }), u.isNode && u.isStream(t) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t, !0, s.optimizedBinaryString, s.base64).then(function (t) {
              var e = new h(s);
              return e.load(t), e;
            }).then(function (t) {
              var e = [n.Promise.resolve(t)],
                  r = t.files;
              if (s.checkCRC32) for (var i = 0; i < r.length; i++) e.push(l(r[i]));
              return n.Promise.all(e);
            }).then(function (t) {
              for (var e = t.shift(), r = e.files, i = 0; i < r.length; i++) {
                var n = r[i];
                a.file(n.fileNameStr, n.decompressed, {
                  binary: !0,
                  optimizedBinaryString: !0,
                  date: n.date,
                  dir: n.dir,
                  comment: n.fileCommentStr.length ? n.fileCommentStr : null,
                  unixPermissions: n.unixPermissions,
                  dosPermissions: n.dosPermissions,
                  createFolders: s.createFolders
                });
              }

              return e.zipComment.length && (a.comment = e.zipComment), a;
            });
          };
        }, {
          "./external": 6,
          "./nodejsUtils": 14,
          "./stream/Crc32Probe": 25,
          "./utf8": 31,
          "./utils": 32,
          "./zipEntries": 33
        }],
        12: [function (t, e, r) {

          var i = t("../utils"),
              n = t("../stream/GenericWorker");

          function s(t, e) {
            n.call(this, "Nodejs stream input adapter for " + t), this._upstreamEnded = !1, this._bindStream(e);
          }

          i.inherits(s, n), s.prototype._bindStream = function (t) {
            var e = this;
            (this._stream = t).pause(), t.on("data", function (t) {
              e.push({
                data: t,
                meta: {
                  percent: 0
                }
              });
            }).on("error", function (t) {
              e.isPaused ? this.generatedError = t : e.error(t);
            }).on("end", function () {
              e.isPaused ? e._upstreamEnded = !0 : e.end();
            });
          }, s.prototype.pause = function () {
            return !!n.prototype.pause.call(this) && (this._stream.pause(), !0);
          }, s.prototype.resume = function () {
            return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
          }, e.exports = s;
        }, {
          "../stream/GenericWorker": 28,
          "../utils": 32
        }],
        13: [function (t, e, r) {

          var n = t("readable-stream").Readable;

          function i(t, e, r) {
            n.call(this, e), this._helper = t;
            var i = this;
            t.on("data", function (t, e) {
              i.push(t) || i._helper.pause(), r && r(e);
            }).on("error", function (t) {
              i.emit("error", t);
            }).on("end", function () {
              i.push(null);
            });
          }

          t("../utils").inherits(i, n), i.prototype._read = function () {
            this._helper.resume();
          }, e.exports = i;
        }, {
          "../utils": 32,
          "readable-stream": 16
        }],
        14: [function (t, e, r) {

          e.exports = {
            isNode: "undefined" != typeof Buffer,
            newBufferFrom: function (t, e) {
              if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(t, e);
              if ("number" == typeof t) throw new Error('The "data" argument must not be a number');
              return new Buffer(t, e);
            },
            allocBuffer: function (t) {
              if (Buffer.alloc) return Buffer.alloc(t);
              var e = new Buffer(t);
              return e.fill(0), e;
            },
            isBuffer: function (t) {
              return Buffer.isBuffer(t);
            },
            isStream: function (t) {
              return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume;
            }
          };
        }, {}],
        15: [function (t, e, r) {

          function s(t, e, r) {
            var i,
                n = u.getTypeOf(e),
                s = u.extend(r || {}, f);
            s.date = s.date || new Date(), null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (t = g(t)), s.createFolders && (i = _(t)) && b.call(this, i, !0);
            var a = "string" === n && !1 === s.binary && !1 === s.base64;
            r && void 0 !== r.binary || (s.binary = !a), (e instanceof d && 0 === e.uncompressedSize || s.dir || !e || 0 === e.length) && (s.base64 = !1, s.binary = !0, e = "", s.compression = "STORE", n = "string");
            var o = null;
            o = e instanceof d || e instanceof l ? e : p.isNode && p.isStream(e) ? new m(t, e) : u.prepareContent(t, e, s.binary, s.optimizedBinaryString, s.base64);
            var h = new c(t, o, s);
            this.files[t] = h;
          }

          var n = t("./utf8"),
              u = t("./utils"),
              l = t("./stream/GenericWorker"),
              a = t("./stream/StreamHelper"),
              f = t("./defaults"),
              d = t("./compressedObject"),
              c = t("./zipObject"),
              o = t("./generate"),
              p = t("./nodejsUtils"),
              m = t("./nodejs/NodejsStreamInputAdapter"),
              _ = function (t) {
            "/" === t.slice(-1) && (t = t.substring(0, t.length - 1));
            var e = t.lastIndexOf("/");
            return 0 < e ? t.substring(0, e) : "";
          },
              g = function (t) {
            return "/" !== t.slice(-1) && (t += "/"), t;
          },
              b = function (t, e) {
            return e = void 0 !== e ? e : f.createFolders, t = g(t), this.files[t] || s.call(this, t, null, {
              dir: !0,
              createFolders: e
            }), this.files[t];
          };

          function h(t) {
            return "[object RegExp]" === Object.prototype.toString.call(t);
          }

          var i = {
            load: function () {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            },
            forEach: function (t) {
              var e, r, i;

              for (e in this.files) this.files.hasOwnProperty(e) && (i = this.files[e], (r = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(r, i));
            },
            filter: function (r) {
              var i = [];
              return this.forEach(function (t, e) {
                r(t, e) && i.push(e);
              }), i;
            },
            file: function (t, e, r) {
              if (1 !== arguments.length) return t = this.root + t, s.call(this, t, e, r), this;

              if (h(t)) {
                var i = t;
                return this.filter(function (t, e) {
                  return !e.dir && i.test(t);
                });
              }

              var n = this.files[this.root + t];
              return n && !n.dir ? n : null;
            },
            folder: function (r) {
              if (!r) return this;
              if (h(r)) return this.filter(function (t, e) {
                return e.dir && r.test(t);
              });
              var t = this.root + r,
                  e = b.call(this, t),
                  i = this.clone();
              return i.root = e.name, i;
            },
            remove: function (r) {
              r = this.root + r;
              var t = this.files[r];
              if (t || ("/" !== r.slice(-1) && (r += "/"), t = this.files[r]), t && !t.dir) delete this.files[r];else for (var e = this.filter(function (t, e) {
                return e.name.slice(0, r.length) === r;
              }), i = 0; i < e.length; i++) delete this.files[e[i].name];
              return this;
            },
            generate: function (t) {
              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
            },
            generateInternalStream: function (t) {
              var e,
                  r = {};

              try {
                if ((r = u.extend(t || {}, {
                  streamFiles: !1,
                  compression: "STORE",
                  compressionOptions: null,
                  type: "",
                  platform: "DOS",
                  comment: null,
                  mimeType: "application/zip",
                  encodeFileName: n.utf8encode
                })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
                u.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
                var i = r.comment || this.comment || "";
                e = o.generateWorker(this, r, i);
              } catch (t) {
                (e = new l("error")).error(t);
              }

              return new a(e, r.type || "string", r.mimeType);
            },
            generateAsync: function (t, e) {
              return this.generateInternalStream(t).accumulate(e);
            },
            generateNodeStream: function (t, e) {
              return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e);
            }
          };
          e.exports = i;
        }, {
          "./compressedObject": 2,
          "./defaults": 5,
          "./generate": 9,
          "./nodejs/NodejsStreamInputAdapter": 12,
          "./nodejsUtils": 14,
          "./stream/GenericWorker": 28,
          "./stream/StreamHelper": 29,
          "./utf8": 31,
          "./utils": 32,
          "./zipObject": 35
        }],
        16: [function (t, e, r) {
          e.exports = t("stream");
        }, {
          stream: void 0
        }],
        17: [function (t, e, r) {

          var i = t("./DataReader");

          function n(t) {
            i.call(this, t);

            for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e];
          }

          t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
            return this.data[this.zero + t];
          }, n.prototype.lastIndexOfSignature = function (t) {
            for (var e = t.charCodeAt(0), r = t.charCodeAt(1), i = t.charCodeAt(2), n = t.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === e && this.data[s + 1] === r && this.data[s + 2] === i && this.data[s + 3] === n) return s - this.zero;

            return -1;
          }, n.prototype.readAndCheckSignature = function (t) {
            var e = t.charCodeAt(0),
                r = t.charCodeAt(1),
                i = t.charCodeAt(2),
                n = t.charCodeAt(3),
                s = this.readData(4);
            return e === s[0] && r === s[1] && i === s[2] && n === s[3];
          }, n.prototype.readData = function (t) {
            if (this.checkOffset(t), 0 === t) return [];
            var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
            return this.index += t, e;
          }, e.exports = n;
        }, {
          "../utils": 32,
          "./DataReader": 18
        }],
        18: [function (t, e, r) {

          var i = t("../utils");

          function n(t) {
            this.data = t, this.length = t.length, this.index = 0, this.zero = 0;
          }

          n.prototype = {
            checkOffset: function (t) {
              this.checkIndex(this.index + t);
            },
            checkIndex: function (t) {
              if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?");
            },
            setIndex: function (t) {
              this.checkIndex(t), this.index = t;
            },
            skip: function (t) {
              this.setIndex(this.index + t);
            },
            byteAt: function (t) {},
            readInt: function (t) {
              var e,
                  r = 0;

              for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) r = (r << 8) + this.byteAt(e);

              return this.index += t, r;
            },
            readString: function (t) {
              return i.transformTo("string", this.readData(t));
            },
            readData: function (t) {},
            lastIndexOfSignature: function (t) {},
            readAndCheckSignature: function (t) {},
            readDate: function () {
              var t = this.readInt(4);
              return new Date(Date.UTC(1980 + (t >> 25 & 127), (t >> 21 & 15) - 1, t >> 16 & 31, t >> 11 & 31, t >> 5 & 63, (31 & t) << 1));
            }
          }, e.exports = n;
        }, {
          "../utils": 32
        }],
        19: [function (t, e, r) {

          var i = t("./Uint8ArrayReader");

          function n(t) {
            i.call(this, t);
          }

          t("../utils").inherits(n, i), n.prototype.readData = function (t) {
            this.checkOffset(t);
            var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
            return this.index += t, e;
          }, e.exports = n;
        }, {
          "../utils": 32,
          "./Uint8ArrayReader": 21
        }],
        20: [function (t, e, r) {

          var i = t("./DataReader");

          function n(t) {
            i.call(this, t);
          }

          t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
            return this.data.charCodeAt(this.zero + t);
          }, n.prototype.lastIndexOfSignature = function (t) {
            return this.data.lastIndexOf(t) - this.zero;
          }, n.prototype.readAndCheckSignature = function (t) {
            return t === this.readData(4);
          }, n.prototype.readData = function (t) {
            this.checkOffset(t);
            var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
            return this.index += t, e;
          }, e.exports = n;
        }, {
          "../utils": 32,
          "./DataReader": 18
        }],
        21: [function (t, e, r) {

          var i = t("./ArrayReader");

          function n(t) {
            i.call(this, t);
          }

          t("../utils").inherits(n, i), n.prototype.readData = function (t) {
            if (this.checkOffset(t), 0 === t) return new Uint8Array(0);
            var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t);
            return this.index += t, e;
          }, e.exports = n;
        }, {
          "../utils": 32,
          "./ArrayReader": 17
        }],
        22: [function (t, e, r) {

          var i = t("../utils"),
              n = t("../support"),
              s = t("./ArrayReader"),
              a = t("./StringReader"),
              o = t("./NodeBufferReader"),
              h = t("./Uint8ArrayReader");

          e.exports = function (t) {
            var e = i.getTypeOf(t);
            return i.checkSupport(e), "string" !== e || n.uint8array ? "nodebuffer" === e ? new o(t) : n.uint8array ? new h(i.transformTo("uint8array", t)) : new s(i.transformTo("array", t)) : new a(t);
          };
        }, {
          "../support": 30,
          "../utils": 32,
          "./ArrayReader": 17,
          "./NodeBufferReader": 19,
          "./StringReader": 20,
          "./Uint8ArrayReader": 21
        }],
        23: [function (t, e, r) {

          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b";
        }, {}],
        24: [function (t, e, r) {

          var i = t("./GenericWorker"),
              n = t("../utils");

          function s(t) {
            i.call(this, "ConvertWorker to " + t), this.destType = t;
          }

          n.inherits(s, i), s.prototype.processChunk = function (t) {
            this.push({
              data: n.transformTo(this.destType, t.data),
              meta: t.meta
            });
          }, e.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        25: [function (t, e, r) {

          var i = t("./GenericWorker"),
              n = t("../crc32");

          function s() {
            i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }

          t("../utils").inherits(s, i), s.prototype.processChunk = function (t) {
            this.streamInfo.crc32 = n(t.data, this.streamInfo.crc32 || 0), this.push(t);
          }, e.exports = s;
        }, {
          "../crc32": 4,
          "../utils": 32,
          "./GenericWorker": 28
        }],
        26: [function (t, e, r) {

          var i = t("../utils"),
              n = t("./GenericWorker");

          function s(t) {
            n.call(this, "DataLengthProbe for " + t), this.propName = t, this.withStreamInfo(t, 0);
          }

          i.inherits(s, n), s.prototype.processChunk = function (t) {
            if (t) {
              var e = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = e + t.data.length;
            }

            n.prototype.processChunk.call(this, t);
          }, e.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        27: [function (t, e, r) {

          var i = t("../utils"),
              n = t("./GenericWorker");

          function s(t) {
            n.call(this, "DataWorker");
            var e = this;
            this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, t.then(function (t) {
              e.dataIsReady = !0, e.data = t, e.max = t && t.length || 0, e.type = i.getTypeOf(t), e.isPaused || e._tickAndRepeat();
            }, function (t) {
              e.error(t);
            });
          }

          i.inherits(s, n), s.prototype.cleanUp = function () {
            n.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function () {
            return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
          }, s.prototype._tickAndRepeat = function () {
            this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
          }, s.prototype._tick = function () {
            if (this.isPaused || this.isFinished) return !1;
            var t = null,
                e = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();

            switch (this.type) {
              case "string":
                t = this.data.substring(this.index, e);
                break;

              case "uint8array":
                t = this.data.subarray(this.index, e);
                break;

              case "array":
              case "nodebuffer":
                t = this.data.slice(this.index, e);
            }

            return this.index = e, this.push({
              data: t,
              meta: {
                percent: this.max ? this.index / this.max * 100 : 0
              }
            });
          }, e.exports = s;
        }, {
          "../utils": 32,
          "./GenericWorker": 28
        }],
        28: [function (t, e, r) {

          function i(t) {
            this.name = t || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
              data: [],
              end: [],
              error: []
            }, this.previous = null;
          }

          i.prototype = {
            push: function (t) {
              this.emit("data", t);
            },
            end: function () {
              if (this.isFinished) return !1;
              this.flush();

              try {
                this.emit("end"), this.cleanUp(), this.isFinished = !0;
              } catch (t) {
                this.emit("error", t);
              }

              return !0;
            },
            error: function (t) {
              return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0);
            },
            on: function (t, e) {
              return this._listeners[t].push(e), this;
            },
            cleanUp: function () {
              this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
            },
            emit: function (t, e) {
              if (this._listeners[t]) for (var r = 0; r < this._listeners[t].length; r++) this._listeners[t][r].call(this, e);
            },
            pipe: function (t) {
              return t.registerPrevious(this);
            },
            registerPrevious: function (t) {
              if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
              this.streamInfo = t.streamInfo, this.mergeStreamInfo(), this.previous = t;
              var e = this;
              return t.on("data", function (t) {
                e.processChunk(t);
              }), t.on("end", function () {
                e.end();
              }), t.on("error", function (t) {
                e.error(t);
              }), this;
            },
            pause: function () {
              return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
            },
            resume: function () {
              if (!this.isPaused || this.isFinished) return !1;
              var t = this.isPaused = !1;
              return this.generatedError && (this.error(this.generatedError), t = !0), this.previous && this.previous.resume(), !t;
            },
            flush: function () {},
            processChunk: function (t) {
              this.push(t);
            },
            withStreamInfo: function (t, e) {
              return this.extraStreamInfo[t] = e, this.mergeStreamInfo(), this;
            },
            mergeStreamInfo: function () {
              for (var t in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(t) && (this.streamInfo[t] = this.extraStreamInfo[t]);
            },
            lock: function () {
              if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
              this.isLocked = !0, this.previous && this.previous.lock();
            },
            toString: function () {
              var t = "Worker " + this.name;
              return this.previous ? this.previous + " -> " + t : t;
            }
          }, e.exports = i;
        }, {}],
        29: [function (t, e, r) {

          var h = t("../utils"),
              n = t("./ConvertWorker"),
              s = t("./GenericWorker"),
              u = t("../base64"),
              i = t("../support"),
              a = t("../external"),
              o = null;
          if (i.nodestream) try {
            o = t("../nodejs/NodejsStreamOutputAdapter");
          } catch (t) {}

          function l(t, o) {
            return new a.Promise(function (e, r) {
              var i = [],
                  n = t._internalType,
                  s = t._outputType,
                  a = t._mimeType;
              t.on("data", function (t, e) {
                i.push(t), o && o(e);
              }).on("error", function (t) {
                i = [], r(t);
              }).on("end", function () {
                try {
                  var t = function (t, e, r) {
                    switch (t) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", e), r);

                      case "base64":
                        return u.encode(e);

                      default:
                        return h.transformTo(t, e);
                    }
                  }(s, function (t, e) {
                    var r,
                        i = 0,
                        n = null,
                        s = 0;

                    for (r = 0; r < e.length; r++) s += e[r].length;

                    switch (t) {
                      case "string":
                        return e.join("");

                      case "array":
                        return Array.prototype.concat.apply([], e);

                      case "uint8array":
                        for (n = new Uint8Array(s), r = 0; r < e.length; r++) n.set(e[r], i), i += e[r].length;

                        return n;

                      case "nodebuffer":
                        return Buffer.concat(e);

                      default:
                        throw new Error("concat : unsupported type '" + t + "'");
                    }
                  }(n, i), a);

                  e(t);
                } catch (t) {
                  r(t);
                }

                i = [];
              }).resume();
            });
          }

          function f(t, e, r) {
            var i = e;

            switch (e) {
              case "blob":
              case "arraybuffer":
                i = "uint8array";
                break;

              case "base64":
                i = "string";
            }

            try {
              this._internalType = i, this._outputType = e, this._mimeType = r, h.checkSupport(i), this._worker = t.pipe(new n(i)), t.lock();
            } catch (t) {
              this._worker = new s("error"), this._worker.error(t);
            }
          }

          f.prototype = {
            accumulate: function (t) {
              return l(this, t);
            },
            on: function (t, e) {
              var r = this;
              return "data" === t ? this._worker.on(t, function (t) {
                e.call(r, t.data, t.meta);
              }) : this._worker.on(t, function () {
                h.delay(e, arguments, r);
              }), this;
            },
            resume: function () {
              return h.delay(this._worker.resume, [], this._worker), this;
            },
            pause: function () {
              return this._worker.pause(), this;
            },
            toNodejsStream: function (t) {
              if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
              return new o(this, {
                objectMode: "nodebuffer" !== this._outputType
              }, t);
            }
          }, e.exports = f;
        }, {
          "../base64": 1,
          "../external": 6,
          "../nodejs/NodejsStreamOutputAdapter": 13,
          "../support": 30,
          "../utils": 32,
          "./ConvertWorker": 24,
          "./GenericWorker": 28
        }],
        30: [function (t, e, r) {

          if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1;else {
            var i = new ArrayBuffer(0);

            try {
              r.blob = 0 === new Blob([i], {
                type: "application/zip"
              }).size;
            } catch (t) {
              try {
                var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                n.append(i), r.blob = 0 === n.getBlob("application/zip").size;
              } catch (t) {
                r.blob = !1;
              }
            }
          }

          try {
            r.nodestream = !!t("readable-stream").Readable;
          } catch (t) {
            r.nodestream = !1;
          }
        }, {
          "readable-stream": 16
        }],
        31: [function (t, e, s) {

          for (var o = t("./utils"), h = t("./support"), r = t("./nodejsUtils"), i = t("./stream/GenericWorker"), u = new Array(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;

          u[254] = u[254] = 1;

          function a() {
            i.call(this, "utf-8 decode"), this.leftOver = null;
          }

          function l() {
            i.call(this, "utf-8 encode");
          }

          s.utf8encode = function (t) {
            return h.nodebuffer ? r.newBufferFrom(t, "utf-8") : function (t) {
              var e,
                  r,
                  i,
                  n,
                  s,
                  a = t.length,
                  o = 0;

              for (n = 0; n < a; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

              for (e = h.uint8array ? new Uint8Array(o) : new Array(o), n = s = 0; s < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), r < 128 ? e[s++] = r : (r < 2048 ? e[s++] = 192 | r >>> 6 : (r < 65536 ? e[s++] = 224 | r >>> 12 : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63), e[s++] = 128 | r >>> 6 & 63), e[s++] = 128 | 63 & r);

              return e;
            }(t);
          }, s.utf8decode = function (t) {
            return h.nodebuffer ? o.transformTo("nodebuffer", t).toString("utf-8") : function (t) {
              var e,
                  r,
                  i,
                  n,
                  s = t.length,
                  a = new Array(2 * s);

              for (e = r = 0; e < s;) if ((i = t[e++]) < 128) a[r++] = i;else if (4 < (n = u[i])) a[r++] = 65533, e += n - 1;else {
                for (i &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && e < s;) i = i << 6 | 63 & t[e++], n--;

                1 < n ? a[r++] = 65533 : i < 65536 ? a[r++] = i : (i -= 65536, a[r++] = 55296 | i >> 10 & 1023, a[r++] = 56320 | 1023 & i);
              }

              return a.length !== r && (a.subarray ? a = a.subarray(0, r) : a.length = r), o.applyFromCharCode(a);
            }(t = o.transformTo(h.uint8array ? "uint8array" : "array", t));
          }, o.inherits(a, i), a.prototype.processChunk = function (t) {
            var e = o.transformTo(h.uint8array ? "uint8array" : "array", t.data);

            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r = e;
                (e = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), e.set(r, this.leftOver.length);
              } else e = this.leftOver.concat(e);

              this.leftOver = null;
            }

            var i = function (t, e) {
              var r;

              for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;

              return r < 0 ? e : 0 === r ? e : r + u[t[r]] > e ? r : e;
            }(e),
                n = e;

            i !== e.length && (h.uint8array ? (n = e.subarray(0, i), this.leftOver = e.subarray(i, e.length)) : (n = e.slice(0, i), this.leftOver = e.slice(i, e.length))), this.push({
              data: s.utf8decode(n),
              meta: t.meta
            });
          }, a.prototype.flush = function () {
            this.leftOver && this.leftOver.length && (this.push({
              data: s.utf8decode(this.leftOver),
              meta: {}
            }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, i), l.prototype.processChunk = function (t) {
            this.push({
              data: s.utf8encode(t.data),
              meta: t.meta
            });
          }, s.Utf8EncodeWorker = l;
        }, {
          "./nodejsUtils": 14,
          "./stream/GenericWorker": 28,
          "./support": 30,
          "./utils": 32
        }],
        32: [function (t, e, a) {

          var o = t("./support"),
              h = t("./base64"),
              r = t("./nodejsUtils"),
              i = t("set-immediate-shim"),
              u = t("./external");

          function n(t) {
            return t;
          }

          function l(t, e) {
            for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r);

            return e;
          }

          a.newBlob = function (e, r) {
            a.checkSupport("blob");

            try {
              return new Blob([e], {
                type: r
              });
            } catch (t) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return i.append(e), i.getBlob(r);
              } catch (t) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };

          var s = {
            stringifyByChunk: function (t, e, r) {
              var i = [],
                  n = 0,
                  s = t.length;
              if (s <= r) return String.fromCharCode.apply(null, t);

              for (; n < s;) "array" === e || "nodebuffer" === e ? i.push(String.fromCharCode.apply(null, t.slice(n, Math.min(n + r, s)))) : i.push(String.fromCharCode.apply(null, t.subarray(n, Math.min(n + r, s)))), n += r;

              return i.join("");
            },
            stringifyByChar: function (t) {
              for (var e = "", r = 0; r < t.length; r++) e += String.fromCharCode(t[r]);

              return e;
            },
            applyCanBeUsed: {
              uint8array: function () {
                try {
                  return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
                } catch (t) {
                  return !1;
                }
              }(),
              nodebuffer: function () {
                try {
                  return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
                } catch (t) {
                  return !1;
                }
              }()
            }
          };

          function f(t) {
            var e = 65536,
                r = a.getTypeOf(t),
                i = !0;
            if ("uint8array" === r ? i = s.applyCanBeUsed.uint8array : "nodebuffer" === r && (i = s.applyCanBeUsed.nodebuffer), i) for (; 1 < e;) try {
              return s.stringifyByChunk(t, r, e);
            } catch (t) {
              e = Math.floor(e / 2);
            }
            return s.stringifyByChar(t);
          }

          function d(t, e) {
            for (var r = 0; r < t.length; r++) e[r] = t[r];

            return e;
          }

          a.applyFromCharCode = f;
          var c = {};
          c.string = {
            string: n,
            array: function (t) {
              return l(t, new Array(t.length));
            },
            arraybuffer: function (t) {
              return c.string.uint8array(t).buffer;
            },
            uint8array: function (t) {
              return l(t, new Uint8Array(t.length));
            },
            nodebuffer: function (t) {
              return l(t, r.allocBuffer(t.length));
            }
          }, c.array = {
            string: f,
            array: n,
            arraybuffer: function (t) {
              return new Uint8Array(t).buffer;
            },
            uint8array: function (t) {
              return new Uint8Array(t);
            },
            nodebuffer: function (t) {
              return r.newBufferFrom(t);
            }
          }, c.arraybuffer = {
            string: function (t) {
              return f(new Uint8Array(t));
            },
            array: function (t) {
              return d(new Uint8Array(t), new Array(t.byteLength));
            },
            arraybuffer: n,
            uint8array: function (t) {
              return new Uint8Array(t);
            },
            nodebuffer: function (t) {
              return r.newBufferFrom(new Uint8Array(t));
            }
          }, c.uint8array = {
            string: f,
            array: function (t) {
              return d(t, new Array(t.length));
            },
            arraybuffer: function (t) {
              return t.buffer;
            },
            uint8array: n,
            nodebuffer: function (t) {
              return r.newBufferFrom(t);
            }
          }, c.nodebuffer = {
            string: f,
            array: function (t) {
              return d(t, new Array(t.length));
            },
            arraybuffer: function (t) {
              return c.nodebuffer.uint8array(t).buffer;
            },
            uint8array: function (t) {
              return d(t, new Uint8Array(t.length));
            },
            nodebuffer: n
          }, a.transformTo = function (t, e) {
            if (e = e || "", !t) return e;
            a.checkSupport(t);
            var r = a.getTypeOf(e);
            return c[r][t](e);
          }, a.getTypeOf = function (t) {
            return "string" == typeof t ? "string" : "[object Array]" === Object.prototype.toString.call(t) ? "array" : o.nodebuffer && r.isBuffer(t) ? "nodebuffer" : o.uint8array && t instanceof Uint8Array ? "uint8array" : o.arraybuffer && t instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function (t) {
            if (!o[t.toLowerCase()]) throw new Error(t + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function (t) {
            var e,
                r,
                i = "";

            for (r = 0; r < (t || "").length; r++) i += "\\x" + ((e = t.charCodeAt(r)) < 16 ? "0" : "") + e.toString(16).toUpperCase();

            return i;
          }, a.delay = function (t, e, r) {
            i(function () {
              t.apply(r || null, e || []);
            });
          }, a.inherits = function (t, e) {
            function r() {}

            r.prototype = e.prototype, t.prototype = new r();
          }, a.extend = function () {
            var t,
                e,
                r = {};

            for (t = 0; t < arguments.length; t++) for (e in arguments[t]) arguments[t].hasOwnProperty(e) && void 0 === r[e] && (r[e] = arguments[t][e]);

            return r;
          }, a.prepareContent = function (r, t, i, n, s) {
            return u.Promise.resolve(t).then(function (i) {
              return o.blob && (i instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(i))) && "undefined" != typeof FileReader ? new u.Promise(function (e, r) {
                var t = new FileReader();
                t.onload = function (t) {
                  e(t.target.result);
                }, t.onerror = function (t) {
                  r(t.target.error);
                }, t.readAsArrayBuffer(i);
              }) : i;
            }).then(function (t) {
              var e = a.getTypeOf(t);
              return e ? ("arraybuffer" === e ? t = a.transformTo("uint8array", t) : "string" === e && (s ? t = h.decode(t) : i && !0 !== n && (t = function (t) {
                return l(t, o.uint8array ? new Uint8Array(t.length) : new Array(t.length));
              }(t))), t) : u.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, {
          "./base64": 1,
          "./external": 6,
          "./nodejsUtils": 14,
          "./support": 30,
          "set-immediate-shim": 54
        }],
        33: [function (t, e, r) {

          var i = t("./reader/readerFor"),
              n = t("./utils"),
              s = t("./signature"),
              a = t("./zipEntry"),
              o = (t("./utf8"), t("./support"));

          function h(t) {
            this.files = [], this.loadOptions = t;
          }

          h.prototype = {
            checkSignature: function (t) {
              if (!this.reader.readAndCheckSignature(t)) {
                this.reader.index -= 4;
                var e = this.reader.readString(4);
                throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e) + ", expected " + n.pretty(t) + ")");
              }
            },
            isSignature: function (t, e) {
              var r = this.reader.index;
              this.reader.setIndex(t);
              var i = this.reader.readString(4) === e;
              return this.reader.setIndex(r), i;
            },
            readBlockEndOfCentral: function () {
              this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
              var t = this.reader.readData(this.zipCommentLength),
                  e = o.uint8array ? "uint8array" : "array",
                  r = n.transformTo(e, t);
              this.zipComment = this.loadOptions.decodeFileName(r);
            },
            readBlockZip64EndOfCentral: function () {
              this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};

              for (var t, e, r, i = this.zip64EndOfCentralSize - 44; 0 < i;) t = this.reader.readInt(2), e = this.reader.readInt(4), r = this.reader.readData(e), this.zip64ExtensibleData[t] = {
                id: t,
                length: e,
                value: r
              };
            },
            readBlockZip64EndOfCentralLocator: function () {
              if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
            },
            readLocalFiles: function () {
              var t, e;

              for (t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes();
            },
            readCentralDir: function () {
              var t;

              for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (t = new a({
                zip64: this.zip64
              }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t);

              if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            },
            readEndOfCentral: function () {
              var t = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
              if (t < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
              this.reader.setIndex(t);
              var e = t;

              if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
                if (this.zip64 = !0, (t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                if (this.reader.setIndex(t), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
              }

              var r = this.centralDirOffset + this.centralDirSize;
              this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
              var i = e - r;
              if (0 < i) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i);else if (i < 0) throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
            },
            prepareReader: function (t) {
              this.reader = i(t);
            },
            load: function (t) {
              this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
            }
          }, e.exports = h;
        }, {
          "./reader/readerFor": 22,
          "./signature": 23,
          "./support": 30,
          "./utf8": 31,
          "./utils": 32,
          "./zipEntry": 34
        }],
        34: [function (t, e, r) {

          var i = t("./reader/readerFor"),
              s = t("./utils"),
              n = t("./compressedObject"),
              a = t("./crc32"),
              o = t("./utf8"),
              h = t("./compressions"),
              u = t("./support");

          function l(t, e) {
            this.options = t, this.loadOptions = e;
          }

          l.prototype = {
            isEncrypted: function () {
              return 1 == (1 & this.bitFlag);
            },
            useUTF8: function () {
              return 2048 == (2048 & this.bitFlag);
            },
            readLocalPart: function (t) {
              var e, r;
              if (t.skip(22), this.fileNameLength = t.readInt(2), r = t.readInt(2), this.fileName = t.readData(this.fileNameLength), t.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
              if (null === (e = function (t) {
                for (var e in h) if (h.hasOwnProperty(e) && h[e].magic === t) return h[e];

                return null;
              }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
              this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize));
            },
            readCentralPart: function (t) {
              this.versionMadeBy = t.readInt(2), t.skip(2), this.bitFlag = t.readInt(2), this.compressionMethod = t.readString(2), this.date = t.readDate(), this.crc32 = t.readInt(4), this.compressedSize = t.readInt(4), this.uncompressedSize = t.readInt(4);
              var e = t.readInt(2);
              if (this.extraFieldsLength = t.readInt(2), this.fileCommentLength = t.readInt(2), this.diskNumberStart = t.readInt(2), this.internalFileAttributes = t.readInt(2), this.externalFileAttributes = t.readInt(4), this.localHeaderOffset = t.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
              t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), this.fileComment = t.readData(this.fileCommentLength);
            },
            processAttributes: function () {
              this.unixPermissions = null, this.dosPermissions = null;
              var t = this.versionMadeBy >> 8;
              this.dir = !!(16 & this.externalFileAttributes), 0 == t && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == t && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
            },
            parseZIP64ExtraField: function (t) {
              if (this.extraFields[1]) {
                var e = i(this.extraFields[1].value);
                this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
              }
            },
            readExtraFields: function (t) {
              var e,
                  r,
                  i,
                  n = t.index + this.extraFieldsLength;

              for (this.extraFields || (this.extraFields = {}); t.index + 4 < n;) e = t.readInt(2), r = t.readInt(2), i = t.readData(r), this.extraFields[e] = {
                id: e,
                length: r,
                value: i
              };

              t.setIndex(n);
            },
            handleUTF8: function () {
              var t = u.uint8array ? "uint8array" : "array";
              if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);else {
                var e = this.findExtraFieldUnicodePath();
                if (null !== e) this.fileNameStr = e;else {
                  var r = s.transformTo(t, this.fileName);
                  this.fileNameStr = this.loadOptions.decodeFileName(r);
                }
                var i = this.findExtraFieldUnicodeComment();
                if (null !== i) this.fileCommentStr = i;else {
                  var n = s.transformTo(t, this.fileComment);
                  this.fileCommentStr = this.loadOptions.decodeFileName(n);
                }
              }
            },
            findExtraFieldUnicodePath: function () {
              var t = this.extraFields[28789];

              if (t) {
                var e = i(t.value);
                return 1 !== e.readInt(1) ? null : a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
              }

              return null;
            },
            findExtraFieldUnicodeComment: function () {
              var t = this.extraFields[25461];

              if (t) {
                var e = i(t.value);
                return 1 !== e.readInt(1) ? null : a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
              }

              return null;
            }
          }, e.exports = l;
        }, {
          "./compressedObject": 2,
          "./compressions": 3,
          "./crc32": 4,
          "./reader/readerFor": 22,
          "./support": 30,
          "./utf8": 31,
          "./utils": 32
        }],
        35: [function (t, e, r) {

          function i(t, e, r) {
            this.name = t, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = e, this._dataBinary = r.binary, this.options = {
              compression: r.compression,
              compressionOptions: r.compressionOptions
            };
          }

          var s = t("./stream/StreamHelper"),
              n = t("./stream/DataWorker"),
              a = t("./utf8"),
              o = t("./compressedObject"),
              h = t("./stream/GenericWorker");
          i.prototype = {
            internalStream: function (t) {
              var e = null,
                  r = "string";

              try {
                if (!t) throw new Error("No output type specified.");
                var i = "string" === (r = t.toLowerCase()) || "text" === r;
                "binarystring" !== r && "text" !== r || (r = "string"), e = this._decompressWorker();
                var n = !this._dataBinary;
                n && !i && (e = e.pipe(new a.Utf8EncodeWorker())), !n && i && (e = e.pipe(new a.Utf8DecodeWorker()));
              } catch (t) {
                (e = new h("error")).error(t);
              }

              return new s(e, r, "");
            },
            async: function (t, e) {
              return this.internalStream(t).accumulate(e);
            },
            nodeStream: function (t, e) {
              return this.internalStream(t || "nodebuffer").toNodejsStream(e);
            },
            _compressWorker: function (t, e) {
              if (this._data instanceof o && this._data.compression.magic === t.magic) return this._data.getCompressedWorker();

              var r = this._decompressWorker();

              return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r, t, e);
            },
            _decompressWorker: function () {
              return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new n(this._data);
            }
          };

          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function () {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) i.prototype[u[f]] = l;

          e.exports = i;
        }, {
          "./compressedObject": 2,
          "./stream/DataWorker": 27,
          "./stream/GenericWorker": 28,
          "./stream/StreamHelper": 29,
          "./utf8": 31
        }],
        36: [function (t, l, e) {
          (function (e) {

            var r,
                i,
                t = e.MutationObserver || e.WebKitMutationObserver;

            if (t) {
              var n = 0,
                  s = new t(u),
                  a = e.document.createTextNode("");
              s.observe(a, {
                characterData: !0
              }), r = function () {
                a.data = n = ++n % 2;
              };
            } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
              var t = e.document.createElement("script");
              t.onreadystatechange = function () {
                u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
              }, e.document.documentElement.appendChild(t);
            } : function () {
              setTimeout(u, 0);
            };else {
              var o = new e.MessageChannel();
              o.port1.onmessage = u, r = function () {
                o.port2.postMessage(0);
              };
            }

            var h = [];

            function u() {
              var t, e;
              i = !0;

              for (var r = h.length; r;) {
                for (e = h, h = [], t = -1; ++t < r;) e[t]();

                r = h.length;
              }

              i = !1;
            }

            l.exports = function (t) {
              1 !== h.push(t) || i || r();
            };
          }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}],
        37: [function (t, e, r) {

          var n = t("immediate");

          function u() {}

          var l = {},
              s = ["REJECTED"],
              a = ["FULFILLED"],
              i = ["PENDING"];

          function o(t) {
            if ("function" != typeof t) throw new TypeError("resolver must be a function");
            this.state = i, this.queue = [], this.outcome = void 0, t !== u && c(this, t);
          }

          function h(t, e, r) {
            this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected);
          }

          function f(e, r, i) {
            n(function () {
              var t;

              try {
                t = r(i);
              } catch (t) {
                return l.reject(e, t);
              }

              t === e ? l.reject(e, new TypeError("Cannot resolve promise with itself")) : l.resolve(e, t);
            });
          }

          function d(t) {
            var e = t && t.then;
            if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function () {
              e.apply(t, arguments);
            };
          }

          function c(e, t) {
            var r = !1;

            function i(t) {
              r || (r = !0, l.reject(e, t));
            }

            function n(t) {
              r || (r = !0, l.resolve(e, t));
            }

            var s = p(function () {
              t(n, i);
            });
            "error" === s.status && i(s.value);
          }

          function p(t, e) {
            var r = {};

            try {
              r.value = t(e), r.status = "success";
            } catch (t) {
              r.status = "error", r.value = t;
            }

            return r;
          }

          (e.exports = o).prototype.finally = function (e) {
            if ("function" != typeof e) return this;
            var r = this.constructor;
            return this.then(function (t) {
              return r.resolve(e()).then(function () {
                return t;
              });
            }, function (t) {
              return r.resolve(e()).then(function () {
                throw t;
              });
            });
          }, o.prototype.catch = function (t) {
            return this.then(null, t);
          }, o.prototype.then = function (t, e) {
            if ("function" != typeof t && this.state === a || "function" != typeof e && this.state === s) return this;
            var r = new this.constructor(u);
            this.state !== i ? f(r, this.state === a ? t : e, this.outcome) : this.queue.push(new h(r, t, e));
            return r;
          }, h.prototype.callFulfilled = function (t) {
            l.resolve(this.promise, t);
          }, h.prototype.otherCallFulfilled = function (t) {
            f(this.promise, this.onFulfilled, t);
          }, h.prototype.callRejected = function (t) {
            l.reject(this.promise, t);
          }, h.prototype.otherCallRejected = function (t) {
            f(this.promise, this.onRejected, t);
          }, l.resolve = function (t, e) {
            var r = p(d, e);
            if ("error" === r.status) return l.reject(t, r.value);
            var i = r.value;
            if (i) c(t, i);else {
              t.state = a, t.outcome = e;

              for (var n = -1, s = t.queue.length; ++n < s;) t.queue[n].callFulfilled(e);
            }
            return t;
          }, l.reject = function (t, e) {
            t.state = s, t.outcome = e;

            for (var r = -1, i = t.queue.length; ++r < i;) t.queue[r].callRejected(e);

            return t;
          }, o.resolve = function (t) {
            if (t instanceof this) return t;
            return l.resolve(new this(u), t);
          }, o.reject = function (t) {
            var e = new this(u);
            return l.reject(e, t);
          }, o.all = function (t) {
            var r = this;
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var i = t.length,
                n = !1;
            if (!i) return this.resolve([]);
            var s = new Array(i),
                a = 0,
                e = -1,
                o = new this(u);

            for (; ++e < i;) h(t[e], e);

            return o;

            function h(t, e) {
              r.resolve(t).then(function (t) {
                s[e] = t, ++a !== i || n || (n = !0, l.resolve(o, s));
              }, function (t) {
                n || (n = !0, l.reject(o, t));
              });
            }
          }, o.race = function (t) {
            var e = this;
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var r = t.length,
                i = !1;
            if (!r) return this.resolve([]);
            var n = -1,
                s = new this(u);

            for (; ++n < r;) a = t[n], e.resolve(a).then(function (t) {
              i || (i = !0, l.resolve(s, t));
            }, function (t) {
              i || (i = !0, l.reject(s, t));
            });

            var a;
            return s;
          };
        }, {
          immediate: 36
        }],
        38: [function (t, e, r) {

          var i = {};
          (0, t("./lib/utils/common").assign)(i, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), e.exports = i;
        }, {
          "./lib/deflate": 39,
          "./lib/inflate": 40,
          "./lib/utils/common": 41,
          "./lib/zlib/constants": 44
        }],
        39: [function (t, e, r) {

          var a = t("./zlib/deflate"),
              o = t("./utils/common"),
              h = t("./utils/strings"),
              n = t("./zlib/messages"),
              s = t("./zlib/zstream"),
              u = Object.prototype.toString,
              l = 0,
              f = -1,
              d = 0,
              c = 8;

          function p(t) {
            if (!(this instanceof p)) return new p(t);
            this.options = o.assign({
              level: f,
              method: c,
              chunkSize: 16384,
              windowBits: 15,
              memLevel: 8,
              strategy: d,
              to: ""
            }, t || {});
            var e = this.options;
            e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r = a.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
            if (r !== l) throw new Error(n[r]);

            if (e.header && a.deflateSetHeader(this.strm, e.header), e.dictionary) {
              var i;
              if (i = "string" == typeof e.dictionary ? h.string2buf(e.dictionary) : "[object ArrayBuffer]" === u.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, (r = a.deflateSetDictionary(this.strm, i)) !== l) throw new Error(n[r]);
              this._dict_set = !0;
            }
          }

          function i(t, e) {
            var r = new p(e);
            if (r.push(t, !0), r.err) throw r.msg || n[r.err];
            return r.result;
          }

          p.prototype.push = function (t, e) {
            var r,
                i,
                n = this.strm,
                s = this.options.chunkSize;
            if (this.ended) return !1;
            i = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? n.input = h.string2buf(t) : "[object ArrayBuffer]" === u.call(t) ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length;

            do {
              if (0 === n.avail_out && (n.output = new o.Buf8(s), n.next_out = 0, n.avail_out = s), 1 !== (r = a.deflate(n, i)) && r !== l) return this.onEnd(r), !(this.ended = !0);
              0 !== n.avail_out && (0 !== n.avail_in || 4 !== i && 2 !== i) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(n.output, n.next_out))) : this.onData(o.shrinkBuf(n.output, n.next_out)));
            } while ((0 < n.avail_in || 0 === n.avail_out) && 1 !== r);

            return 4 === i ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l) : 2 !== i || (this.onEnd(l), !(n.avail_out = 0));
          }, p.prototype.onData = function (t) {
            this.chunks.push(t);
          }, p.prototype.onEnd = function (t) {
            t === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = i, r.deflateRaw = function (t, e) {
            return (e = e || {}).raw = !0, i(t, e);
          }, r.gzip = function (t, e) {
            return (e = e || {}).gzip = !0, i(t, e);
          };
        }, {
          "./utils/common": 41,
          "./utils/strings": 42,
          "./zlib/deflate": 46,
          "./zlib/messages": 51,
          "./zlib/zstream": 53
        }],
        40: [function (t, e, r) {

          var d = t("./zlib/inflate"),
              c = t("./utils/common"),
              p = t("./utils/strings"),
              m = t("./zlib/constants"),
              i = t("./zlib/messages"),
              n = t("./zlib/zstream"),
              s = t("./zlib/gzheader"),
              _ = Object.prototype.toString;

          function a(t) {
            if (!(this instanceof a)) return new a(t);
            this.options = c.assign({
              chunkSize: 16384,
              windowBits: 0,
              to: ""
            }, t || {});
            var e = this.options;
            e.raw && 0 <= e.windowBits && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(0 <= e.windowBits && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), 15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
            var r = d.inflateInit2(this.strm, e.windowBits);
            if (r !== m.Z_OK) throw new Error(i[r]);
            this.header = new s(), d.inflateGetHeader(this.strm, this.header);
          }

          function o(t, e) {
            var r = new a(e);
            if (r.push(t, !0), r.err) throw r.msg || i[r.err];
            return r.result;
          }

          a.prototype.push = function (t, e) {
            var r,
                i,
                n,
                s,
                a,
                o,
                h = this.strm,
                u = this.options.chunkSize,
                l = this.options.dictionary,
                f = !1;
            if (this.ended) return !1;
            i = e === ~~e ? e : !0 === e ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof t ? h.input = p.binstring2buf(t) : "[object ArrayBuffer]" === _.call(t) ? h.input = new Uint8Array(t) : h.input = t, h.next_in = 0, h.avail_in = h.input.length;

            do {
              if (0 === h.avail_out && (h.output = new c.Buf8(u), h.next_out = 0, h.avail_out = u), (r = d.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r = d.inflateSetDictionary(this.strm, o)), r === m.Z_BUF_ERROR && !0 === f && (r = m.Z_OK, f = !1), r !== m.Z_STREAM_END && r !== m.Z_OK) return this.onEnd(r), !(this.ended = !0);
              h.next_out && (0 !== h.avail_out && r !== m.Z_STREAM_END && (0 !== h.avail_in || i !== m.Z_FINISH && i !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (n = p.utf8border(h.output, h.next_out), s = h.next_out - n, a = p.buf2string(h.output, n), h.next_out = s, h.avail_out = u - s, s && c.arraySet(h.output, h.output, n, s, 0), this.onData(a)) : this.onData(c.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = !0);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r !== m.Z_STREAM_END);

            return r === m.Z_STREAM_END && (i = m.Z_FINISH), i === m.Z_FINISH ? (r = d.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === m.Z_OK) : i !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function (t) {
            this.chunks.push(t);
          }, a.prototype.onEnd = function (t) {
            t === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function (t, e) {
            return (e = e || {}).raw = !0, o(t, e);
          }, r.ungzip = o;
        }, {
          "./utils/common": 41,
          "./utils/strings": 42,
          "./zlib/constants": 44,
          "./zlib/gzheader": 47,
          "./zlib/inflate": 49,
          "./zlib/messages": 51,
          "./zlib/zstream": 53
        }],
        41: [function (t, e, r) {

          var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function (t) {
            for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
              var r = e.shift();

              if (r) {
                if ("object" != typeof r) throw new TypeError(r + "must be non-object");

                for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i]);
              }
            }

            return t;
          }, r.shrinkBuf = function (t, e) {
            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
          };
          var n = {
            arraySet: function (t, e, r, i, n) {
              if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), n);else for (var s = 0; s < i; s++) t[n + s] = e[r + s];
            },
            flattenChunks: function (t) {
              var e, r, i, n, s, a;

              for (e = i = 0, r = t.length; e < r; e++) i += t[e].length;

              for (a = new Uint8Array(i), e = n = 0, r = t.length; e < r; e++) s = t[e], a.set(s, n), n += s.length;

              return a;
            }
          },
              s = {
            arraySet: function (t, e, r, i, n) {
              for (var s = 0; s < i; s++) t[n + s] = e[r + s];
            },
            flattenChunks: function (t) {
              return [].concat.apply([], t);
            }
          };
          r.setTyped = function (t) {
            t ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, n)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(i);
        }, {}],
        42: [function (t, e, r) {

          var h = t("./common"),
              n = !0,
              s = !0;

          try {
            String.fromCharCode.apply(null, [0]);
          } catch (t) {
            n = !1;
          }

          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (t) {
            s = !1;
          }

          for (var u = new h.Buf8(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;

          function l(t, e) {
            if (e < 65537 && (t.subarray && s || !t.subarray && n)) return String.fromCharCode.apply(null, h.shrinkBuf(t, e));

            for (var r = "", i = 0; i < e; i++) r += String.fromCharCode(t[i]);

            return r;
          }

          u[254] = u[254] = 1, r.string2buf = function (t) {
            var e,
                r,
                i,
                n,
                s,
                a = t.length,
                o = 0;

            for (n = 0; n < a; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

            for (e = new h.Buf8(o), n = s = 0; s < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), r < 128 ? e[s++] = r : (r < 2048 ? e[s++] = 192 | r >>> 6 : (r < 65536 ? e[s++] = 224 | r >>> 12 : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63), e[s++] = 128 | r >>> 6 & 63), e[s++] = 128 | 63 & r);

            return e;
          }, r.buf2binstring = function (t) {
            return l(t, t.length);
          }, r.binstring2buf = function (t) {
            for (var e = new h.Buf8(t.length), r = 0, i = e.length; r < i; r++) e[r] = t.charCodeAt(r);

            return e;
          }, r.buf2string = function (t, e) {
            var r,
                i,
                n,
                s,
                a = e || t.length,
                o = new Array(2 * a);

            for (r = i = 0; r < a;) if ((n = t[r++]) < 128) o[i++] = n;else if (4 < (s = u[n])) o[i++] = 65533, r += s - 1;else {
              for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a;) n = n << 6 | 63 & t[r++], s--;

              1 < s ? o[i++] = 65533 : n < 65536 ? o[i++] = n : (n -= 65536, o[i++] = 55296 | n >> 10 & 1023, o[i++] = 56320 | 1023 & n);
            }

            return l(o, i);
          }, r.utf8border = function (t, e) {
            var r;

            for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;

            return r < 0 ? e : 0 === r ? e : r + u[t[r]] > e ? r : e;
          };
        }, {
          "./common": 41
        }],
        43: [function (t, e, r) {

          e.exports = function (t, e, r, i) {
            for (var n = 65535 & t | 0, s = t >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
              for (r -= a = 2e3 < r ? 2e3 : r; s = s + (n = n + e[i++] | 0) | 0, --a;);

              n %= 65521, s %= 65521;
            }

            return n | s << 16 | 0;
          };
        }, {}],
        44: [function (t, e, r) {

          e.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
          };
        }, {}],
        45: [function (t, e, r) {

          var o = function () {
            for (var t, e = [], r = 0; r < 256; r++) {
              t = r;

              for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;

              e[r] = t;
            }

            return e;
          }();

          e.exports = function (t, e, r, i) {
            var n = o,
                s = i + r;
            t ^= -1;

            for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e[a])];

            return -1 ^ t;
          };
        }, {}],
        46: [function (t, e, r) {

          var h,
              d = t("../utils/common"),
              u = t("./trees"),
              c = t("./adler32"),
              p = t("./crc32"),
              i = t("./messages"),
              l = 0,
              f = 4,
              m = 0,
              _ = -2,
              g = -1,
              b = 4,
              n = 2,
              v = 8,
              y = 9,
              s = 286,
              a = 30,
              o = 19,
              w = 2 * s + 1,
              k = 15,
              x = 3,
              S = 258,
              z = S + x + 1,
              C = 42,
              E = 113,
              A = 1,
              I = 2,
              O = 3,
              B = 4;

          function R(t, e) {
            return t.msg = i[e], e;
          }

          function T(t) {
            return (t << 1) - (4 < t ? 9 : 0);
          }

          function D(t) {
            for (var e = t.length; 0 <= --e;) t[e] = 0;
          }

          function F(t) {
            var e = t.state,
                r = e.pending;
            r > t.avail_out && (r = t.avail_out), 0 !== r && (d.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0));
          }

          function N(t, e) {
            u._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, F(t.strm);
          }

          function U(t, e) {
            t.pending_buf[t.pending++] = e;
          }

          function P(t, e) {
            t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
          }

          function L(t, e) {
            var r,
                i,
                n = t.max_chain_length,
                s = t.strstart,
                a = t.prev_length,
                o = t.nice_match,
                h = t.strstart > t.w_size - z ? t.strstart - (t.w_size - z) : 0,
                u = t.window,
                l = t.w_mask,
                f = t.prev,
                d = t.strstart + S,
                c = u[s + a - 1],
                p = u[s + a];
            t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);

            do {
              if (u[(r = e) + a] === p && u[r + a - 1] === c && u[r] === u[s] && u[++r] === u[s + 1]) {
                s += 2, r++;

                do {} while (u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && s < d);

                if (i = S - (d - s), s = d - S, a < i) {
                  if (t.match_start = e, o <= (a = i)) break;
                  c = u[s + a - 1], p = u[s + a];
                }
              }
            } while ((e = f[e & l]) > h && 0 != --n);

            return a <= t.lookahead ? a : t.lookahead;
          }

          function j(t) {
            var e,
                r,
                i,
                n,
                s,
                a,
                o,
                h,
                u,
                l,
                f = t.w_size;

            do {
              if (n = t.window_size - t.lookahead - t.strstart, t.strstart >= f + (f - z)) {
                for (d.arraySet(t.window, t.window, f, f, 0), t.match_start -= f, t.strstart -= f, t.block_start -= f, e = r = t.hash_size; i = t.head[--e], t.head[e] = f <= i ? i - f : 0, --r;);

                for (e = r = f; i = t.prev[--e], t.prev[e] = f <= i ? i - f : 0, --r;);

                n += f;
              }

              if (0 === t.strm.avail_in) break;
              if (a = t.strm, o = t.window, h = t.strstart + t.lookahead, u = n, l = void 0, l = a.avail_in, u < l && (l = u), r = 0 === l ? 0 : (a.avail_in -= l, d.arraySet(o, a.input, a.next_in, l, h), 1 === a.state.wrap ? a.adler = c(a.adler, o, l, h) : 2 === a.state.wrap && (a.adler = p(a.adler, o, l, h)), a.next_in += l, a.total_in += l, l), t.lookahead += r, t.lookahead + t.insert >= x) for (s = t.strstart - t.insert, t.ins_h = t.window[s], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + x - 1]) & t.hash_mask, t.prev[s & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = s, s++, t.insert--, !(t.lookahead + t.insert < x)););
            } while (t.lookahead < z && 0 !== t.strm.avail_in);
          }

          function Z(t, e) {
            for (var r, i;;) {
              if (t.lookahead < z) {
                if (j(t), t.lookahead < z && e === l) return A;
                if (0 === t.lookahead) break;
              }

              if (r = 0, t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - z && (t.match_length = L(t, r)), t.match_length >= x) {
                if (i = u._tr_tally(t, t.strstart - t.match_start, t.match_length - x), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= x) {
                  for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, 0 != --t.match_length;);

                  t.strstart++;
                } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
              } else i = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
              if (i && (N(t, !1), 0 === t.strm.avail_out)) return A;
            }

            return t.insert = t.strstart < x - 1 ? t.strstart : x - 1, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
          }

          function W(t, e) {
            for (var r, i, n;;) {
              if (t.lookahead < z) {
                if (j(t), t.lookahead < z && e === l) return A;
                if (0 === t.lookahead) break;
              }

              if (r = 0, t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = x - 1, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - z && (t.match_length = L(t, r), t.match_length <= 5 && (1 === t.strategy || t.match_length === x && 4096 < t.strstart - t.match_start) && (t.match_length = x - 1)), t.prev_length >= x && t.match_length <= t.prev_length) {
                for (n = t.strstart + t.lookahead - x, i = u._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - x), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 != --t.prev_length;);

                if (t.match_available = 0, t.match_length = x - 1, t.strstart++, i && (N(t, !1), 0 === t.strm.avail_out)) return A;
              } else if (t.match_available) {
                if ((i = u._tr_tally(t, 0, t.window[t.strstart - 1])) && N(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return A;
              } else t.match_available = 1, t.strstart++, t.lookahead--;
            }

            return t.match_available && (i = u._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < x - 1 ? t.strstart : x - 1, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
          }

          function M(t, e, r, i, n) {
            this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = n;
          }

          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new d.Buf16(2 * w), this.dyn_dtree = new d.Buf16(2 * (2 * a + 1)), this.bl_tree = new d.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new d.Buf16(k + 1), this.heap = new d.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new d.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }

          function G(t) {
            var e;
            return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = n, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? C : E, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = l, u._tr_init(e), m) : R(t, _);
          }

          function K(t) {
            var e = G(t);
            return e === m && function (t) {
              t.window_size = 2 * t.w_size, D(t.head), t.max_lazy_match = h[t.level].max_lazy, t.good_match = h[t.level].good_length, t.nice_match = h[t.level].nice_length, t.max_chain_length = h[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = x - 1, t.match_available = 0, t.ins_h = 0;
            }(t.state), e;
          }

          function Y(t, e, r, i, n, s) {
            if (!t) return _;
            var a = 1;
            if (e === g && (e = 6), i < 0 ? (a = 0, i = -i) : 15 < i && (a = 2, i -= 16), n < 1 || y < n || r !== v || i < 8 || 15 < i || e < 0 || 9 < e || s < 0 || b < s) return R(t, _);
            8 === i && (i = 9);
            var o = new H();
            return (t.state = o).strm = t, o.wrap = a, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = n + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + x - 1) / x), o.window = new d.Buf8(2 * o.w_size), o.head = new d.Buf16(o.hash_size), o.prev = new d.Buf16(o.w_size), o.lit_bufsize = 1 << n + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new d.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = e, o.strategy = s, o.method = r, K(t);
          }

          h = [new M(0, 0, 0, 0, function (t, e) {
            var r = 65535;

            for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5);;) {
              if (t.lookahead <= 1) {
                if (j(t), 0 === t.lookahead && e === l) return A;
                if (0 === t.lookahead) break;
              }

              t.strstart += t.lookahead, t.lookahead = 0;
              var i = t.block_start + r;
              if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, N(t, !1), 0 === t.strm.avail_out)) return A;
              if (t.strstart - t.block_start >= t.w_size - z && (N(t, !1), 0 === t.strm.avail_out)) return A;
            }

            return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : (t.strstart > t.block_start && (N(t, !1), t.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function (t, e) {
            return Y(t, e, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function (t, e) {
            return t && t.state ? 2 !== t.state.wrap ? _ : (t.state.gzhead = e, m) : _;
          }, r.deflate = function (t, e) {
            var r, i, n, s;
            if (!t || !t.state || 5 < e || e < 0) return t ? R(t, _) : _;
            if (i = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === i.status && e !== f) return R(t, 0 === t.avail_out ? -5 : _);
            if (i.strm = t, r = i.last_flush, i.last_flush = e, i.status === C) if (2 === i.wrap) t.adler = 0, U(i, 31), U(i, 139), U(i, 8), i.gzhead ? (U(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), U(i, 255 & i.gzhead.time), U(i, i.gzhead.time >> 8 & 255), U(i, i.gzhead.time >> 16 & 255), U(i, i.gzhead.time >> 24 & 255), U(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), U(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (U(i, 255 & i.gzhead.extra.length), U(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (t.adler = p(t.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (U(i, 0), U(i, 0), U(i, 0), U(i, 0), U(i, 0), U(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), U(i, 3), i.status = E);else {
              var a = v + (i.w_bits - 8 << 4) << 8;
              a |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (a |= 32), a += 31 - a % 31, i.status = E, P(i, a), 0 !== i.strstart && (P(i, t.adler >>> 16), P(i, 65535 & t.adler)), t.adler = 1;
            }
            if (69 === i.status) if (i.gzhead.extra) {
              for (n = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending !== i.pending_buf_size));) U(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;

              i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
            } else i.status = 73;
            if (73 === i.status) if (i.gzhead.name) {
              n = i.pending;

              do {
                if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending === i.pending_buf_size)) {
                  s = 1;
                  break;
                }

                s = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, U(i, s);
              } while (0 !== s);

              i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.gzindex = 0, i.status = 91);
            } else i.status = 91;
            if (91 === i.status) if (i.gzhead.comment) {
              n = i.pending;

              do {
                if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending === i.pending_buf_size)) {
                  s = 1;
                  break;
                }

                s = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, U(i, s);
              } while (0 !== s);

              i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.status = 103);
            } else i.status = 103;

            if (103 === i.status && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && F(t), i.pending + 2 <= i.pending_buf_size && (U(i, 255 & t.adler), U(i, t.adler >> 8 & 255), t.adler = 0, i.status = E)) : i.status = E), 0 !== i.pending) {
              if (F(t), 0 === t.avail_out) return i.last_flush = -1, m;
            } else if (0 === t.avail_in && T(e) <= T(r) && e !== f) return R(t, -5);

            if (666 === i.status && 0 !== t.avail_in) return R(t, -5);

            if (0 !== t.avail_in || 0 !== i.lookahead || e !== l && 666 !== i.status) {
              var o = 2 === i.strategy ? function (t, e) {
                for (var r;;) {
                  if (0 === t.lookahead && (j(t), 0 === t.lookahead)) {
                    if (e === l) return A;
                    break;
                  }

                  if (t.match_length = 0, r = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (N(t, !1), 0 === t.strm.avail_out)) return A;
                }

                return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
              }(i, e) : 3 === i.strategy ? function (t, e) {
                for (var r, i, n, s, a = t.window;;) {
                  if (t.lookahead <= S) {
                    if (j(t), t.lookahead <= S && e === l) return A;
                    if (0 === t.lookahead) break;
                  }

                  if (t.match_length = 0, t.lookahead >= x && 0 < t.strstart && (i = a[n = t.strstart - 1]) === a[++n] && i === a[++n] && i === a[++n]) {
                    s = t.strstart + S;

                    do {} while (i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && n < s);

                    t.match_length = S - (s - n), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                  }

                  if (t.match_length >= x ? (r = u._tr_tally(t, 1, t.match_length - x), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (N(t, !1), 0 === t.strm.avail_out)) return A;
                }

                return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
              }(i, e) : h[i.level].func(i, e);
              if (o !== O && o !== B || (i.status = 666), o === A || o === O) return 0 === t.avail_out && (i.last_flush = -1), m;
              if (o === I && (1 === e ? u._tr_align(i) : 5 !== e && (u._tr_stored_block(i, 0, 0, !1), 3 === e && (D(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), F(t), 0 === t.avail_out)) return i.last_flush = -1, m;
            }

            return e !== f ? m : i.wrap <= 0 ? 1 : (2 === i.wrap ? (U(i, 255 & t.adler), U(i, t.adler >> 8 & 255), U(i, t.adler >> 16 & 255), U(i, t.adler >> 24 & 255), U(i, 255 & t.total_in), U(i, t.total_in >> 8 & 255), U(i, t.total_in >> 16 & 255), U(i, t.total_in >> 24 & 255)) : (P(i, t.adler >>> 16), P(i, 65535 & t.adler)), F(t), 0 < i.wrap && (i.wrap = -i.wrap), 0 !== i.pending ? m : 1);
          }, r.deflateEnd = function (t) {
            var e;
            return t && t.state ? (e = t.state.status) !== C && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== E && 666 !== e ? R(t, _) : (t.state = null, e === E ? R(t, -3) : m) : _;
          }, r.deflateSetDictionary = function (t, e) {
            var r,
                i,
                n,
                s,
                a,
                o,
                h,
                u,
                l = e.length;
            if (!t || !t.state) return _;
            if (2 === (s = (r = t.state).wrap) || 1 === s && r.status !== C || r.lookahead) return _;

            for (1 === s && (t.adler = c(t.adler, e, l, 0)), r.wrap = 0, l >= r.w_size && (0 === s && (D(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), u = new d.Buf8(r.w_size), d.arraySet(u, e, l - r.w_size, r.w_size, 0), e = u, l = r.w_size), a = t.avail_in, o = t.next_in, h = t.input, t.avail_in = l, t.next_in = 0, t.input = e, j(r); r.lookahead >= x;) {
              for (i = r.strstart, n = r.lookahead - (x - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + x - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++, --n;);

              r.strstart = i, r.lookahead = x - 1, j(r);
            }

            return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = x - 1, r.match_available = 0, t.next_in = o, t.input = h, t.avail_in = a, r.wrap = s, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, {
          "../utils/common": 41,
          "./adler32": 43,
          "./crc32": 45,
          "./messages": 51,
          "./trees": 52
        }],
        47: [function (t, e, r) {

          e.exports = function () {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
          };
        }, {}],
        48: [function (t, e, r) {

          e.exports = function (t, e) {
            var r, i, n, s, a, o, h, u, l, f, d, c, p, m, _, g, b, v, y, w, k, x, S, z, C;

            r = t.state, i = t.next_in, z = t.input, n = i + (t.avail_in - 5), s = t.next_out, C = t.output, a = s - (e - t.avail_out), o = s + (t.avail_out - 257), h = r.dmax, u = r.wsize, l = r.whave, f = r.wnext, d = r.window, c = r.hold, p = r.bits, m = r.lencode, _ = r.distcode, g = (1 << r.lenbits) - 1, b = (1 << r.distbits) - 1;

            t: do {
              p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = m[c & g];

              e: for (;;) {
                if (c >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (c & (1 << y) - 1)];
                      continue e;
                    }

                    if (32 & y) {
                      r.mode = 12;
                      break t;
                    }

                    t.msg = "invalid literal/length code", r.mode = 30;
                    break t;
                  }

                  w = 65535 & v, (y &= 15) && (p < y && (c += z[i++] << p, p += 8), w += c & (1 << y) - 1, c >>>= y, p -= y), p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = _[c & b];

                  r: for (;;) {
                    if (c >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (c & (1 << y) - 1)];
                        continue r;
                      }

                      t.msg = "invalid distance code", r.mode = 30;
                      break t;
                    }

                    if (k = 65535 & v, p < (y &= 15) && (c += z[i++] << p, (p += 8) < y && (c += z[i++] << p, p += 8)), h < (k += c & (1 << y) - 1)) {
                      t.msg = "invalid distance too far back", r.mode = 30;
                      break t;
                    }

                    if (c >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r.sane) {
                        t.msg = "invalid distance too far back", r.mode = 30;
                        break t;
                      }

                      if (S = d, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = d[x++], --y;);

                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = d[x++], --y;);

                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = d[x++], --y;);

                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = d[x++], --y;);

                        x = s - k, S = C;
                      }

                      for (; 2 < w;) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;

                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3););

                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }

                    break;
                  }
                }
                break;
              }
            } while (i < n && s < o);

            i -= w = p >> 3, c &= (1 << (p -= w << 3)) - 1, t.next_in = i, t.next_out = s, t.avail_in = i < n ? n - i + 5 : 5 - (i - n), t.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = c, r.bits = p;
          };
        }, {}],
        49: [function (t, e, r) {

          var I = t("../utils/common"),
              O = t("./adler32"),
              B = t("./crc32"),
              R = t("./inffast"),
              T = t("./inftrees"),
              D = 1,
              F = 2,
              N = 0,
              U = -2,
              P = 1,
              i = 852,
              n = 592;

          function L(t) {
            return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
          }

          function s() {
            this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }

          function a(t) {
            var e;
            return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = P, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new I.Buf32(i), e.distcode = e.distdyn = new I.Buf32(n), e.sane = 1, e.back = -1, N) : U;
          }

          function o(t) {
            var e;
            return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, a(t)) : U;
          }

          function h(t, e) {
            var r, i;
            return t && t.state ? (i = t.state, e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || 15 < e) ? U : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, o(t))) : U;
          }

          function u(t, e) {
            var r, i;
            return t ? (i = new s(), (t.state = i).window = null, (r = h(t, e)) !== N && (t.state = null), r) : U;
          }

          var l,
              f,
              d = !0;

          function j(t) {
            if (d) {
              var e;

              for (l = new I.Buf32(512), f = new I.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;

              for (; e < 256;) t.lens[e++] = 9;

              for (; e < 280;) t.lens[e++] = 7;

              for (; e < 288;) t.lens[e++] = 8;

              for (T(D, t.lens, 0, 288, l, 0, t.work, {
                bits: 9
              }), e = 0; e < 32;) t.lens[e++] = 5;

              T(F, t.lens, 0, 32, f, 0, t.work, {
                bits: 5
              }), d = !1;
            }

            t.lencode = l, t.lenbits = 9, t.distcode = f, t.distbits = 5;
          }

          function Z(t, e, r, i) {
            var n,
                s = t.state;
            return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new I.Buf8(s.wsize)), i >= s.wsize ? (I.arraySet(s.window, e, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (i < (n = s.wsize - s.wnext) && (n = i), I.arraySet(s.window, e, r - i, n, s.wnext), (i -= n) ? (I.arraySet(s.window, e, r - i, i, 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0;
          }

          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function (t) {
            return u(t, 15);
          }, r.inflateInit2 = u, r.inflate = function (t, e) {
            var r,
                i,
                n,
                s,
                a,
                o,
                h,
                u,
                l,
                f,
                d,
                c,
                p,
                m,
                _,
                g,
                b,
                v,
                y,
                w,
                k,
                x,
                S,
                z,
                C = 0,
                E = new I.Buf8(4),
                A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

            if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return U;
            12 === (r = t.state).mode && (r.mode = 13), a = t.next_out, n = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, u = r.hold, l = r.bits, f = o, d = h, x = N;

            t: for (;;) switch (r.mode) {
              case P:
                if (0 === r.wrap) {
                  r.mode = 13;
                  break;
                }

                for (; l < 16;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if (2 & r.wrap && 35615 === u) {
                  E[r.check = 0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0), l = u = 0, r.mode = 2;
                  break;
                }

                if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31) {
                  t.msg = "incorrect header check", r.mode = 30;
                  break;
                }

                if (8 != (15 & u)) {
                  t.msg = "unknown compression method", r.mode = 30;
                  break;
                }

                if (l -= 4, k = 8 + (15 & (u >>>= 4)), 0 === r.wbits) r.wbits = k;else if (k > r.wbits) {
                  t.msg = "invalid window size", r.mode = 30;
                  break;
                }
                r.dmax = 1 << k, t.adler = r.check = 1, r.mode = 512 & u ? 10 : 12, l = u = 0;
                break;

              case 2:
                for (; l < 16;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if (r.flags = u, 8 != (255 & r.flags)) {
                  t.msg = "unknown compression method", r.mode = 30;
                  break;
                }

                if (57344 & r.flags) {
                  t.msg = "unknown header flags set", r.mode = 30;
                  break;
                }

                r.head && (r.head.text = u >> 8 & 1), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 3;

              case 3:
                for (; l < 32;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                r.head && (r.head.time = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, E[2] = u >>> 16 & 255, E[3] = u >>> 24 & 255, r.check = B(r.check, E, 4, 0)), l = u = 0, r.mode = 4;

              case 4:
                for (; l < 16;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                r.head && (r.head.xflags = 255 & u, r.head.os = u >> 8), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 5;

              case 5:
                if (1024 & r.flags) {
                  for (; l < 16;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  r.length = u, r.head && (r.head.extra_len = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0;
                } else r.head && (r.head.extra = null);

                r.mode = 6;

              case 6:
                if (1024 & r.flags && (o < (c = r.length) && (c = o), c && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, i, s, c, k)), 512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, r.length -= c), r.length)) break t;
                r.length = 0, r.mode = 7;

              case 7:
                if (2048 & r.flags) {
                  if (0 === o) break t;

                  for (c = 0; k = i[s + c++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && c < o;);

                  if (512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, k) break t;
                } else r.head && (r.head.name = null);

                r.length = 0, r.mode = 8;

              case 8:
                if (4096 & r.flags) {
                  if (0 === o) break t;

                  for (c = 0; k = i[s + c++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && c < o;);

                  if (512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, k) break t;
                } else r.head && (r.head.comment = null);

                r.mode = 9;

              case 9:
                if (512 & r.flags) {
                  for (; l < 16;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  if (u !== (65535 & r.check)) {
                    t.msg = "header crc mismatch", r.mode = 30;
                    break;
                  }

                  l = u = 0;
                }

                r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = 12;
                break;

              case 10:
                for (; l < 32;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                t.adler = r.check = L(u), l = u = 0, r.mode = 11;

              case 11:
                if (0 === r.havedict) return t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, 2;
                t.adler = r.check = 1, r.mode = 12;

              case 12:
                if (5 === e || 6 === e) break t;

              case 13:
                if (r.last) {
                  u >>>= 7 & l, l -= 7 & l, r.mode = 27;
                  break;
                }

                for (; l < 3;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                switch (r.last = 1 & u, l -= 1, 3 & (u >>>= 1)) {
                  case 0:
                    r.mode = 14;
                    break;

                  case 1:
                    if (j(r), r.mode = 20, 6 !== e) break;
                    u >>>= 2, l -= 2;
                    break t;

                  case 2:
                    r.mode = 17;
                    break;

                  case 3:
                    t.msg = "invalid block type", r.mode = 30;
                }

                u >>>= 2, l -= 2;
                break;

              case 14:
                for (u >>>= 7 & l, l -= 7 & l; l < 32;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if ((65535 & u) != (u >>> 16 ^ 65535)) {
                  t.msg = "invalid stored block lengths", r.mode = 30;
                  break;
                }

                if (r.length = 65535 & u, l = u = 0, r.mode = 15, 6 === e) break t;

              case 15:
                r.mode = 16;

              case 16:
                if (c = r.length) {
                  if (o < c && (c = o), h < c && (c = h), 0 === c) break t;
                  I.arraySet(n, i, s, c, a), o -= c, s += c, h -= c, a += c, r.length -= c;
                  break;
                }

                r.mode = 12;
                break;

              case 17:
                for (; l < 14;) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if (r.nlen = 257 + (31 & u), u >>>= 5, l -= 5, r.ndist = 1 + (31 & u), u >>>= 5, l -= 5, r.ncode = 4 + (15 & u), u >>>= 4, l -= 4, 286 < r.nlen || 30 < r.ndist) {
                  t.msg = "too many length or distance symbols", r.mode = 30;
                  break;
                }

                r.have = 0, r.mode = 18;

              case 18:
                for (; r.have < r.ncode;) {
                  for (; l < 3;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  r.lens[A[r.have++]] = 7 & u, u >>>= 3, l -= 3;
                }

                for (; r.have < 19;) r.lens[A[r.have++]] = 0;

                if (r.lencode = r.lendyn, r.lenbits = 7, S = {
                  bits: r.lenbits
                }, x = T(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                  t.msg = "invalid code lengths set", r.mode = 30;
                  break;
                }

                r.have = 0, r.mode = 19;

              case 19:
                for (; r.have < r.nlen + r.ndist;) {
                  for (; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  if (b < 16) u >>>= _, l -= _, r.lens[r.have++] = b;else {
                    if (16 === b) {
                      for (z = _ + 2; l < z;) {
                        if (0 === o) break t;
                        o--, u += i[s++] << l, l += 8;
                      }

                      if (u >>>= _, l -= _, 0 === r.have) {
                        t.msg = "invalid bit length repeat", r.mode = 30;
                        break;
                      }

                      k = r.lens[r.have - 1], c = 3 + (3 & u), u >>>= 2, l -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l < z;) {
                        if (0 === o) break t;
                        o--, u += i[s++] << l, l += 8;
                      }

                      l -= _, k = 0, c = 3 + (7 & (u >>>= _)), u >>>= 3, l -= 3;
                    } else {
                      for (z = _ + 7; l < z;) {
                        if (0 === o) break t;
                        o--, u += i[s++] << l, l += 8;
                      }

                      l -= _, k = 0, c = 11 + (127 & (u >>>= _)), u >>>= 7, l -= 7;
                    }

                    if (r.have + c > r.nlen + r.ndist) {
                      t.msg = "invalid bit length repeat", r.mode = 30;
                      break;
                    }

                    for (; c--;) r.lens[r.have++] = k;
                  }
                }

                if (30 === r.mode) break;

                if (0 === r.lens[256]) {
                  t.msg = "invalid code -- missing end-of-block", r.mode = 30;
                  break;
                }

                if (r.lenbits = 9, S = {
                  bits: r.lenbits
                }, x = T(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
                  t.msg = "invalid literal/lengths set", r.mode = 30;
                  break;
                }

                if (r.distbits = 6, r.distcode = r.distdyn, S = {
                  bits: r.distbits
                }, x = T(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, x) {
                  t.msg = "invalid distances set", r.mode = 30;
                  break;
                }

                if (r.mode = 20, 6 === e) break t;

              case 20:
                r.mode = 21;

              case 21:
                if (6 <= o && 258 <= h) {
                  t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, R(t, d), a = t.next_out, n = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, u = r.hold, l = r.bits, 12 === r.mode && (r.back = -1);
                  break;
                }

                for (r.back = 0; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r.lencode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  u >>>= v, l -= v, r.back += v;
                }

                if (u >>>= _, l -= _, r.back += _, r.length = b, 0 === g) {
                  r.mode = 26;
                  break;
                }

                if (32 & g) {
                  r.back = -1, r.mode = 12;
                  break;
                }

                if (64 & g) {
                  t.msg = "invalid literal/length code", r.mode = 30;
                  break;
                }

                r.extra = 15 & g, r.mode = 22;

              case 22:
                if (r.extra) {
                  for (z = r.extra; l < z;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  r.length += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
                }

                r.was = r.length, r.mode = 23;

              case 23:
                for (; g = (C = r.distcode[u & (1 << r.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                  if (0 === o) break t;
                  o--, u += i[s++] << l, l += 8;
                }

                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r.distcode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  u >>>= v, l -= v, r.back += v;
                }

                if (u >>>= _, l -= _, r.back += _, 64 & g) {
                  t.msg = "invalid distance code", r.mode = 30;
                  break;
                }

                r.offset = b, r.extra = 15 & g, r.mode = 24;

              case 24:
                if (r.extra) {
                  for (z = r.extra; l < z;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  r.offset += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
                }

                if (r.offset > r.dmax) {
                  t.msg = "invalid distance too far back", r.mode = 30;
                  break;
                }

                r.mode = 25;

              case 25:
                if (0 === h) break t;

                if (c = d - h, r.offset > c) {
                  if ((c = r.offset - c) > r.whave && r.sane) {
                    t.msg = "invalid distance too far back", r.mode = 30;
                    break;
                  }

                  p = c > r.wnext ? (c -= r.wnext, r.wsize - c) : r.wnext - c, c > r.length && (c = r.length), m = r.window;
                } else m = n, p = a - r.offset, c = r.length;

                for (h < c && (c = h), h -= c, r.length -= c; n[a++] = m[p++], --c;);

                0 === r.length && (r.mode = 21);
                break;

              case 26:
                if (0 === h) break t;
                n[a++] = r.length, h--, r.mode = 21;
                break;

              case 27:
                if (r.wrap) {
                  for (; l < 32;) {
                    if (0 === o) break t;
                    o--, u |= i[s++] << l, l += 8;
                  }

                  if (d -= h, t.total_out += d, r.total += d, d && (t.adler = r.check = r.flags ? B(r.check, n, d, a - d) : O(r.check, n, d, a - d)), d = h, (r.flags ? u : L(u)) !== r.check) {
                    t.msg = "incorrect data check", r.mode = 30;
                    break;
                  }

                  l = u = 0;
                }

                r.mode = 28;

              case 28:
                if (r.wrap && r.flags) {
                  for (; l < 32;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  if (u !== (4294967295 & r.total)) {
                    t.msg = "incorrect length check", r.mode = 30;
                    break;
                  }

                  l = u = 0;
                }

                r.mode = 29;

              case 29:
                x = 1;
                break t;

              case 30:
                x = -3;
                break t;

              case 31:
                return -4;

              case 32:
              default:
                return U;
            }

            return t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, (r.wsize || d !== t.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== e)) && Z(t, t.output, t.next_out, d - t.avail_out) ? (r.mode = 31, -4) : (f -= t.avail_in, d -= t.avail_out, t.total_in += f, t.total_out += d, r.total += d, r.wrap && d && (t.adler = r.check = r.flags ? B(r.check, n, d, t.next_out - d) : O(r.check, n, d, t.next_out - d)), t.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == f && 0 === d || 4 === e) && x === N && (x = -5), x);
          }, r.inflateEnd = function (t) {
            if (!t || !t.state) return U;
            var e = t.state;
            return e.window && (e.window = null), t.state = null, N;
          }, r.inflateGetHeader = function (t, e) {
            var r;
            return t && t.state ? 0 == (2 & (r = t.state).wrap) ? U : ((r.head = e).done = !1, N) : U;
          }, r.inflateSetDictionary = function (t, e) {
            var r,
                i = e.length;
            return t && t.state ? 0 !== (r = t.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, e, i, 0) !== r.check ? -3 : Z(t, e, i, i) ? (r.mode = 31, -4) : (r.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, {
          "../utils/common": 41,
          "./adler32": 43,
          "./crc32": 45,
          "./inffast": 48,
          "./inftrees": 50
        }],
        50: [function (t, e, r) {

          var D = t("../utils/common"),
              F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
              N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
              U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
              P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

          e.exports = function (t, e, r, i, n, s, a, o) {
            var h,
                u,
                l,
                f,
                d,
                c,
                p,
                m,
                _,
                g = o.bits,
                b = 0,
                v = 0,
                y = 0,
                w = 0,
                k = 0,
                x = 0,
                S = 0,
                z = 0,
                C = 0,
                E = 0,
                A = null,
                I = 0,
                O = new D.Buf16(16),
                B = new D.Buf16(16),
                R = null,
                T = 0;

            for (b = 0; b <= 15; b++) O[b] = 0;

            for (v = 0; v < i; v++) O[e[r + v]]++;

            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--);

            if (w < k && (k = w), 0 === w) return n[s++] = 20971520, n[s++] = 20971520, o.bits = 1, 0;

            for (y = 1; y < w && 0 === O[y]; y++);

            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;

            if (0 < z && (0 === t || 1 !== w)) return -1;

            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];

            for (v = 0; v < i; v++) 0 !== e[r + v] && (a[B[e[r + v]]++] = v);

            if (c = 0 === t ? (A = R = a, 19) : 1 === t ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, d = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === t && 852 < C || 2 === t && 592 < C) return 1;

            for (;;) {
              for (p = b - S, _ = a[v] < c ? (m = 0, a[v]) : a[v] > c ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; n[d + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u;);

              for (h = 1 << b - 1; E & h;) h >>= 1;

              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = e[r + a[v]];
              }

              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), d += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0);) x++, z <<= 1;

                if (C += 1 << x, 1 === t && 852 < C || 2 === t && 592 < C) return 1;
                n[l = E & f] = k << 24 | x << 16 | d - s | 0;
              }
            }

            return 0 !== E && (n[d + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, {
          "../utils/common": 41
        }],
        51: [function (t, e, r) {

          e.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
          };
        }, {}],
        52: [function (t, e, r) {

          var n = t("../utils/common"),
              o = 0,
              h = 1;

          function i(t) {
            for (var e = t.length; 0 <= --e;) t[e] = 0;
          }

          var s = 0,
              a = 29,
              u = 256,
              l = u + 1 + a,
              f = 30,
              d = 19,
              _ = 2 * l + 1,
              g = 15,
              c = 16,
              p = 7,
              m = 256,
              b = 16,
              v = 17,
              y = 18,
              w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
              k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
              x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
              z = new Array(2 * (l + 2));

          i(z);
          var C = new Array(2 * f);
          i(C);
          var E = new Array(512);
          i(E);
          var A = new Array(256);
          i(A);
          var I = new Array(a);
          i(I);
          var O,
              B,
              R,
              T = new Array(f);

          function D(t, e, r, i, n) {
            this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = n, this.has_stree = t && t.length;
          }

          function F(t, e) {
            this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
          }

          function N(t) {
            return t < 256 ? E[t] : E[256 + (t >>> 7)];
          }

          function U(t, e) {
            t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
          }

          function P(t, e, r) {
            t.bi_valid > c - r ? (t.bi_buf |= e << t.bi_valid & 65535, U(t, t.bi_buf), t.bi_buf = e >> c - t.bi_valid, t.bi_valid += r - c) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r);
          }

          function L(t, e, r) {
            P(t, r[2 * e], r[2 * e + 1]);
          }

          function j(t, e) {
            for (var r = 0; r |= 1 & t, t >>>= 1, r <<= 1, 0 < --e;);

            return r >>> 1;
          }

          function Z(t, e, r) {
            var i,
                n,
                s = new Array(g + 1),
                a = 0;

            for (i = 1; i <= g; i++) s[i] = a = a + r[i - 1] << 1;

            for (n = 0; n <= e; n++) {
              var o = t[2 * n + 1];
              0 !== o && (t[2 * n] = j(s[o]++, o));
            }
          }

          function W(t) {
            var e;

            for (e = 0; e < l; e++) t.dyn_ltree[2 * e] = 0;

            for (e = 0; e < f; e++) t.dyn_dtree[2 * e] = 0;

            for (e = 0; e < d; e++) t.bl_tree[2 * e] = 0;

            t.dyn_ltree[2 * m] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
          }

          function M(t) {
            8 < t.bi_valid ? U(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
          }

          function H(t, e, r, i) {
            var n = 2 * e,
                s = 2 * r;
            return t[n] < t[s] || t[n] === t[s] && i[e] <= i[r];
          }

          function G(t, e, r) {
            for (var i = t.heap[r], n = r << 1; n <= t.heap_len && (n < t.heap_len && H(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !H(e, i, t.heap[n], t.depth));) t.heap[r] = t.heap[n], r = n, n <<= 1;

            t.heap[r] = i;
          }

          function K(t, e, r) {
            var i,
                n,
                s,
                a,
                o = 0;
            if (0 !== t.last_lit) for (; i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], n = t.pending_buf[t.l_buf + o], o++, 0 === i ? L(t, n, e) : (L(t, (s = A[n]) + u + 1, e), 0 !== (a = w[s]) && P(t, n -= I[s], a), L(t, s = N(--i), r), 0 !== (a = k[s]) && P(t, i -= T[s], a)), o < t.last_lit;);
            L(t, m, e);
          }

          function Y(t, e) {
            var r,
                i,
                n,
                s = e.dyn_tree,
                a = e.stat_desc.static_tree,
                o = e.stat_desc.has_stree,
                h = e.stat_desc.elems,
                u = -1;

            for (t.heap_len = 0, t.heap_max = _, r = 0; r < h; r++) 0 !== s[2 * r] ? (t.heap[++t.heap_len] = u = r, t.depth[r] = 0) : s[2 * r + 1] = 0;

            for (; t.heap_len < 2;) s[2 * (n = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1, t.depth[n] = 0, t.opt_len--, o && (t.static_len -= a[2 * n + 1]);

            for (e.max_code = u, r = t.heap_len >> 1; 1 <= r; r--) G(t, s, r);

            for (n = h; r = t.heap[1], t.heap[1] = t.heap[t.heap_len--], G(t, s, 1), i = t.heap[1], t.heap[--t.heap_max] = r, t.heap[--t.heap_max] = i, s[2 * n] = s[2 * r] + s[2 * i], t.depth[n] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1, s[2 * r + 1] = s[2 * i + 1] = n, t.heap[1] = n++, G(t, s, 1), 2 <= t.heap_len;);

            t.heap[--t.heap_max] = t.heap[1], function (t, e) {
              var r,
                  i,
                  n,
                  s,
                  a,
                  o,
                  h = e.dyn_tree,
                  u = e.max_code,
                  l = e.stat_desc.static_tree,
                  f = e.stat_desc.has_stree,
                  d = e.stat_desc.extra_bits,
                  c = e.stat_desc.extra_base,
                  p = e.stat_desc.max_length,
                  m = 0;

              for (s = 0; s <= g; s++) t.bl_count[s] = 0;

              for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < _; r++) p < (s = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) && (s = p, m++), h[2 * i + 1] = s, u < i || (t.bl_count[s]++, a = 0, c <= i && (a = d[i - c]), o = h[2 * i], t.opt_len += o * (s + a), f && (t.static_len += o * (l[2 * i + 1] + a)));

              if (0 !== m) {
                do {
                  for (s = p - 1; 0 === t.bl_count[s];) s--;

                  t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[p]--, m -= 2;
                } while (0 < m);

                for (s = p; 0 !== s; s--) for (i = t.bl_count[s]; 0 !== i;) u < (n = t.heap[--r]) || (h[2 * n + 1] !== s && (t.opt_len += (s - h[2 * n + 1]) * h[2 * n], h[2 * n + 1] = s), i--);
              }
            }(t, e), Z(s, u, t.bl_count);
          }

          function X(t, e, r) {
            var i,
                n,
                s = -1,
                a = e[1],
                o = 0,
                h = 7,
                u = 4;

            for (0 === a && (h = 138, u = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) n = a, a = e[2 * (i + 1) + 1], ++o < h && n === a || (o < u ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[2 * b]++) : o <= 10 ? t.bl_tree[2 * v]++ : t.bl_tree[2 * y]++, s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4));
          }

          function V(t, e, r) {
            var i,
                n,
                s = -1,
                a = e[1],
                o = 0,
                h = 7,
                u = 4;

            for (0 === a && (h = 138, u = 3), i = 0; i <= r; i++) if (n = a, a = e[2 * (i + 1) + 1], !(++o < h && n === a)) {
              if (o < u) for (; L(t, n, t.bl_tree), 0 != --o;);else 0 !== n ? (n !== s && (L(t, n, t.bl_tree), o--), L(t, b, t.bl_tree), P(t, o - 3, 2)) : o <= 10 ? (L(t, v, t.bl_tree), P(t, o - 3, 3)) : (L(t, y, t.bl_tree), P(t, o - 11, 7));
              s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4);
            }
          }

          i(T);
          var q = !1;

          function J(t, e, r, i) {
            P(t, (s << 1) + (i ? 1 : 0), 3), function (t, e, r, i) {
              M(t), i && (U(t, r), U(t, ~r)), n.arraySet(t.pending_buf, t.window, e, r, t.pending), t.pending += r;
            }(t, e, r, !0);
          }

          r._tr_init = function (t) {
            q || (function () {
              var t,
                  e,
                  r,
                  i,
                  n,
                  s = new Array(g + 1);

              for (i = r = 0; i < a - 1; i++) for (I[i] = r, t = 0; t < 1 << w[i]; t++) A[r++] = i;

              for (A[r - 1] = i, i = n = 0; i < 16; i++) for (T[i] = n, t = 0; t < 1 << k[i]; t++) E[n++] = i;

              for (n >>= 7; i < f; i++) for (T[i] = n << 7, t = 0; t < 1 << k[i] - 7; t++) E[256 + n++] = i;

              for (e = 0; e <= g; e++) s[e] = 0;

              for (t = 0; t <= 143;) z[2 * t + 1] = 8, t++, s[8]++;

              for (; t <= 255;) z[2 * t + 1] = 9, t++, s[9]++;

              for (; t <= 279;) z[2 * t + 1] = 7, t++, s[7]++;

              for (; t <= 287;) z[2 * t + 1] = 8, t++, s[8]++;

              for (Z(z, l + 1, s), t = 0; t < f; t++) C[2 * t + 1] = 5, C[2 * t] = j(t, 5);

              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, d, p);
            }(), q = !0), t.l_desc = new F(t.dyn_ltree, O), t.d_desc = new F(t.dyn_dtree, B), t.bl_desc = new F(t.bl_tree, R), t.bi_buf = 0, t.bi_valid = 0, W(t);
          }, r._tr_stored_block = J, r._tr_flush_block = function (t, e, r, i) {
            var n,
                s,
                a = 0;
            0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {
              var e,
                  r = 4093624447;

              for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return o;

              if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return h;

              for (e = 32; e < u; e++) if (0 !== t.dyn_ltree[2 * e]) return h;

              return o;
            }(t)), Y(t, t.l_desc), Y(t, t.d_desc), a = function (t) {
              var e;

              for (X(t, t.dyn_ltree, t.l_desc.max_code), X(t, t.dyn_dtree, t.d_desc.max_code), Y(t, t.bl_desc), e = d - 1; 3 <= e && 0 === t.bl_tree[2 * S[e] + 1]; e--);

              return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
            }(t), n = t.opt_len + 3 + 7 >>> 3, (s = t.static_len + 3 + 7 >>> 3) <= n && (n = s)) : n = s = r + 5, r + 4 <= n && -1 !== e ? J(t, e, r, i) : 4 === t.strategy || s === n ? (P(t, 2 + (i ? 1 : 0), 3), K(t, z, C)) : (P(t, 4 + (i ? 1 : 0), 3), function (t, e, r, i) {
              var n;

              for (P(t, e - 257, 5), P(t, r - 1, 5), P(t, i - 4, 4), n = 0; n < i; n++) P(t, t.bl_tree[2 * S[n] + 1], 3);

              V(t, t.dyn_ltree, e - 1), V(t, t.dyn_dtree, r - 1);
            }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1), K(t, t.dyn_ltree, t.dyn_dtree)), W(t), i && M(t);
          }, r._tr_tally = function (t, e, r) {
            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (A[r] + u + 1)]++, t.dyn_dtree[2 * N(e)]++), t.last_lit === t.lit_bufsize - 1;
          }, r._tr_align = function (t) {
            P(t, 2, 3), L(t, m, z), function (t) {
              16 === t.bi_valid ? (U(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : 8 <= t.bi_valid && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8);
            }(t);
          };
        }, {
          "../utils/common": 41
        }],
        53: [function (t, e, r) {

          e.exports = function () {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}],
        54: [function (t, e, r) {

          e.exports = "function" == typeof setImmediate ? setImmediate : function () {
            var t = [].slice.apply(arguments);
            t.splice(1, 0, 0), setTimeout.apply(null, t);
          };
        }, {}]
      }, {}, [10])(10);
    });
  });

  /* eslint-disable no-unused-vars */
  /**
   * Parse metadata from xml file that is contained in BRML
   * @export
   * @param {String} file
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */

  function parseDiffractogram(file) {
    let json = parser.parse(file, {
      ignoreAttributes: false,
      attributeNamePrefix: '__'
    });
    const data = json.RawData;
    let axes = data.DataRoutes.DataRoute.ScanInformation.ScanAxes.ScanAxisInfo.map(element => ({
      id: element.__AxisId,
      name: element.__AxisName,
      unitBase: element.Unit.__Base,
      unitPrefix: element.Unit.__Prefix,
      reference: element.reference,
      start: element.start,
      stop: element.stop,
      increment: element.increment
    }));
    let adddata = {
      startTime: data.TimeStampStarted,
      endTime: data.TimeStampFinished,
      measurmentPoints: data.DataRoutes.DataRoute.ScanInformation.MeasurementPoints,
      timePerStep: data.DataRoutes.DataRoute.ScanInformation.TimePerStep,
      timePerStepEffective: data.DataRoutes.DataRoute.ScanInformation.TimePerStepEffective,
      scanMode: data.DataRoutes.DataRoute.ScanInformation.ScanMode,
      scanModeVisibleName: data.DataRoutes.DataRoute.ScanInformation.ScanModeVisibleName,
      userName: data.Identifier.__UserName,
      machineName: data.Identifier.__MachineName,
      guid: data.Identifier.Guid,
      axes: axes,
      goniometerType: data.FixedInformation.Instrument.GoniometerType,
      anode: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.TubeMaterial,
      anodeVoltage: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.Generator.Voltage.__Value,
      anodeVoltageUnit: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.Generator.Voltage.__Unit,
      anodeSerialNumber: data.FixedInformation.Instrument.PrimaryTracks.TrackInfoData.MountedOptics.InfoData[0].Tube.SerialNumber.__Value
    };
    const diffractogram = getXYDiffractogram(data.DataRoutes.DataRoute.Datum);
    diffractogram.meta = { ...adddata,
      ...diffractogram.meta
    };
    let label = adddata.axes[0].name.replace(/two/i, '2').replace(/theta/i, 'ϴ');
    let unit = adddata.axes[0].unitBase.replace(/degree/i, '°');
    diffractogram.info.xUnits = `${label} [${unit}]`;
    return diffractogram;
  }
  /**
   * @param  {array} data array of strings of the measured points
   */

  function getXYDiffractogram(data) {
    let axis1 = [];
    let axis2 = [];
    let measuredTimePerStep = [];
    let plannedTimePerStep = [];
    let counts = [];
    data.forEach(element => {
      const factors = element.split(',');
      measuredTimePerStep.push(parseFloat(factors[0]));
      plannedTimePerStep.push(parseFloat(factors[1]));
      axis1.push(parseFloat(factors[2]));
      axis2.push(parseFloat(factors[3]));
      counts.push(parseFloat(factors[4]));
    });
    const diffractogram = {
      data: {
        x: axis1,
        y: counts
      },
      info: {
        xUnits: '2ϴ [°]',
        yUnits: 'counts',
        dataType: 'XRD pattern',
        origin: 'Data converted from BRML using convert-to-jcamp'
      },
      meta: {
        axis2: axis2,
        measuredTimePerStep: measuredTimePerStep,
        plannedTimePerStep: plannedTimePerStep
      }
    };
    return diffractogram;
  }
  /**
   * Read a BRML file (produced by Bruker instruments, a zip file that contains XMLs)
   * @export
   * @param {String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise} binary BRML file
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */


  async function readBRML(binary) {
    let zip = new jszip_min();
    const txt = await zip.loadAsync(binary).then(function (zipFiles) {
      return zipFiles.file('Experiment0/RawData0.xml').async('text');
    });
    const diffractogram = parseDiffractogram(txt);
    return diffractogram;
  }

  /**
   * Creates a new Chromatogram element based in a JCAMP string
   * @param {UInt8Array} blob - String containing the JCAMP data
   * @return {Analysis} - New class element with the given data
   */

  async function fromBRML(blob) {
    let parsed = await readBRML(blob);
    let analysis = new Analysis();
    const variables = {
      x: {
        data: parsed.data.x,
        label: parsed.info.xUnits
      },
      y: {
        data: parsed.data.y,
        label: parsed.info.yUnits
      }
    };
    analysis.pushSpectrum(variables, {
      title: parsed.info.title,
      meta: parsed.meta,
      dataType: 'XRD pattern'
    });
    return analysis;
  }

  /**
   * Parse diffractograms saved in xy files that are generated with PowDLL
   * @export
   * @param {String} [text] Text containing the data
   * @returns {Object} containing data (x: 2theta, y: counts), info and metadata
   */
  function parsePowDLLXY(text) {
    let lines = text.split(/\r?\n/).filter(line => !line.match(/^\s*$/));
    const header = lines[0];
    lines.splice(0, 1); // remove header line

    let data = {
      x: [],
      y: []
    };

    for (const line of lines) {
      let tmp = line.split(/\s+/);
      data.x.push(parseFloat(tmp[0].trim()));
      data.y.push(parseFloat(tmp[1].trim()));
    }

    let headerLines = header.split('" '); // try to make metadata consistent with Bruker

    let meta = {};
    meta.id = trimReplace(headerLines[0]);
    meta.comment = trimReplace(headerLines[1]);
    meta.userName = trimReplace(headerLines[2]);
    meta.anode = trimReplace(headerLines[3]);
    meta.scanType = trimReplace(headerLines[4]); // eslint-disable-next-line radix

    meta.timePerStep = parseInt(trimReplace(headerLines[5]));
    const diffractogram = {
      data: {
        x: data.x,
        y: data.y
      },
      info: {
        xUnits: '2ϴ [°]',
        yUnits: 'counts',
        dataType: 'XRD pattern',
        origin: 'Data converted from xy using convert-to-jcamp'
      },
      meta: meta
    };
    return diffractogram;
  }

  function trimReplace(string) {
    return string.split(':')[1].replace('"', '').replace("'", '').trim();
  }

  /**
   * Creates a new Chromatogram element based in a JCAMP string
   * @param {UInt8Array} blob - String containing the JCAMP data
   * @return {Analysis} - New class element with the given data
   */

  function fromPowDLLXY(blob) {
    let parsed = parsePowDLLXY(blob);
    let analysis = new Analysis();
    const variables = {
      x: {
        data: parsed.data.x,
        label: parsed.info.xUnits
      },
      y: {
        data: parsed.data.y,
        label: parsed.info.yUnits
      }
    };
    analysis.pushSpectrum(variables, {
      title: parsed.info.title,
      meta: parsed.meta,
      dataType: 'XRD pattern'
    });
    return analysis;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;

    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];

      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    } // if the path is allowed to go above the root, restore leading ..s


    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  } // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.


  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

  var splitPath = function (filename) {
    return splitPathRe.exec(filename).slice(1);
  }; // path.resolve([from ...], to)
  // posix version


  function resolve() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : '/'; // Skip empty and invalid entries

      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    } // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path


    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
      return !!p;
    }), !resolvedAbsolute).join('/');
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
  }
  // posix version

  function normalize$1(path) {
    var isPathAbsolute = isAbsolute(path),
        trailingSlash = substr(path, -1) === '/'; // Normalize the path

    path = normalizeArray(filter(path.split('/'), function (p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }

    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }

  function isAbsolute(path) {
    return path.charAt(0) === '/';
  } // posix version

  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize$1(filter(paths, function (p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }

      return p;
    }).join('/'));
  } // path.relative(from, to)
  // posix version

  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;

      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;

      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;

    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];

    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
  }
  var sep = '/';
  var delimiter = ':';
  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }
  function basename(path, ext) {
    var f = splitPath(path)[2]; // TODO: make this comparison case-insensitive on windows?

    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }

    return f;
  }
  function extname(path) {
    return splitPath(path)[3];
  }
  var path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize$1,
    resolve: resolve
  };

  function filter(xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];

    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs)) res.push(xs[i]);
    }

    return res;
  } // String.prototype.substr - negative index don't work in IE8


  var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
    return str.substr(start, len);
  } : function (str, start, len) {
    if (start < 0) start = str.length + start;
    return str.substr(start, len);
  };

  var path$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    resolve: resolve,
    normalize: normalize$1,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    sep: sep,
    delimiter: delimiter,
    dirname: dirname,
    basename: basename,
    extname: extname,
    'default': path
  });

  var empty = {};

  var empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': empty
  });

  class Fs {
    constructor() {}

    getBasename(filePath) {
      if (!(typeof filePath === 'string' && filePath)) throw new Error(`[ File ][ getBasename ] The filePath (${filePath}) is invalid.`);
      return path$1.basename(filePath);
    }

    getExtname(filepath, filterDot = true) {
      let ext = path$1.extname(filepath).toLocaleLowerCase();

      if (filterDot && ext.length >= 2 && ext[0] === '.') {
        return ext.slice(1);
      }

      return ext;
    }

    getFile(filePath) {
      return new Promise((resolve, reject) => {
        empty$1.open(filePath, 'r', (err, fd) => {
          if (err) return reject(err);
          return resolve(fd);
        });
      });
    }

    getFileSync(filePath) {
      try {
        return empty$1.openSync(path$1.resolve(filePath), 'r');
      } catch (error) {
        throw error;
      }
    }

    closeFile(fd) {
      if (!(typeof fd === 'number' && fd > 0)) throw new Error(`[ File ][ closeFile ] The fd (${fd}) is invalid.`);
      empty$1.close(fd, err => {
        if (err) throw err;
      });
    }

    isExist(filePath) {
      return new Promise((resolve, reject) => {
        empty$1.access(filePath, empty$1.constants.F_OK, err => {
          err ? resolve(false) : resolve(true);
        });
      });
    }

    readBytes(fd, position = 0, length = 0) {
      return new Promise((resolve, reject) => {
        let buf = Buffer.alloc(length);
        empty$1.read(fd, buf, 0, length, position, (err, bytesRead) => {
          if (err) return reject(err);

          if (bytesRead < length) {
            buf = buf.slice(0, bytesRead);
          }

          return resolve(buf);
        });
      });
    }

    readBytesSync(fd, position = 0, length = 0) {
      try {
        let buf = Buffer.alloc(length);
        let bytesRead = empty$1.readSync(fd, buf, 0, length, position);

        if (bytesRead < length) {
          buf = buf.slice(0, bytesRead);
        }

        return buf;
      } catch (error) {
        throw error;
      }
    }

    readChunk(filePath, position = 0, length = 0) {
      return new Promise((resolve, reject) => {
        this.getFile(filePath).then(fd => {
          let buf = Buffer.alloc(length);
          empty$1.read(fd, buf, 0, length, position, (err, bytesRead) => {
            this.closeFile(fd);
            if (err) return reject(err);

            if (bytesRead < length) {
              buf = buf.slice(0, bytesRead);
            }

            return resolve(buf);
          });
        }).catch(err => {
          return reject(err);
        });
      });
    }

    readFile(filePath, encoding) {
      return new Promise((resolve, reject) => {
        let argv = [path$1.resolve(filePath)];
        encoding ? argv.push(encoding) : '';

        const cb = (err, data) => {
          err ? reject(err) : resolve(data);
        };

        argv.push(cb);
        empty$1.readFile(...argv);
      });
    }

    readFileSync(filePath, encoding) {
      try {
        return empty$1.readFileSync(path$1.resolve(filePath), encoding);
      } catch (error) {
        throw error;
      }
    }

    writeFile(filePath, data) {
      return new Promise((resolve, reject) => {
        if (!(data && data.length > 0)) {
          return reject(new Error('Invalid data.'));
        }

        empty$1.writeFile(path$1.resolve(filePath), data, err => {
          if (err) {
            return reject(err);
          }

          return resolve(data.length);
        });
      });
    }

  }

  var file = Fs;

  // Vector: Emscripten data type, for Cpp vector
  const isVector = (v, checkSize = true) => {
    if (v && typeof v.size === 'function' && typeof v.get === 'function' && typeof v.set === 'function' && typeof v.push_back === 'function') {
      return checkSize ? v.size() > 0 : true;
    }

    return false;
  };

  const vectorToArray = vector => {
    if (!isVector(vector)) throw new Error('Invalid vector.');
    let array = [];

    for (let i = 0; i < vector.size(); i++) {
      array.push(vector.get(i));
    }

    return array;
  };

  var vector = {
    isVector,
    vectorToArray
  };

  const {
    isVector: isVector$1
  } = vector;
  /**
   * 定时检查某个条件是否具备，具备则立刻resolve, 超时后reject
   * @param {Number} step 检查的时间间隔
   * @param {Number} timeout 超时时间
   * @param {Function} check 判断条件的回调
   */

  const waitingAsync = (step, timeout = 0, check = () => {}) => {
    return new Promise((resolve, reject) => {
      let stepTime = typeof step === 'number' && step > 0 ? step : 10;
      let cnt = 0;
      let totalCnt = Number(timeout) / stepTime;
      let timer = setInterval(() => {
        cnt++;

        if (check()) {
          clearInterval(timer);
          return resolve(cnt * stepTime);
        }

        if (cnt > totalCnt) {
          clearInterval(timer);
          return reject(new Error('timeout'));
        }
      }, stepTime);
    });
  };

  const toFixed = (num, s) => {
    let times = Math.pow(10, s);
    let des = num * times + (num >= 0 || -1) * 0.5;
    return parseInt(des, 10) / times;
  };

  const convertData = (dataVector, decimalX, decimalY, dataFormat) => {
    let data = [];

    for (let i = 0; i < dataVector.size(); i++) {
      let dataItem = dataVector.get(i);
      if (!(dataItem && dataItem.length >= 2)) continue;
      let x = decimalX ? toFixed(dataItem[0], decimalX) : dataItem[0];
      let y = decimalY ? toFixed(dataItem[1], decimalY) : dataItem[1];

      if (dataFormat === 'array') {
        data.push([x, y]);
      } else {
        data.push({
          x,
          y
        });
      }
    }

    return data;
  };

  const twothetaStep = (xrdData, min, max) => {
    if (!(Array.isArray(xrdData) && xrdData.length > 1)) return 0.0;
    return (max - min) / (xrdData.length - 1);
  };

  const twothetaMin = xrdData => {
    let value = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < xrdData.length; i++) {
      let data = typeof xrdData[i].x === 'number' ? xrdData[i].x : xrdData[i][0];
      value = Math.min(value, data);
    }

    return value;
  };

  const twothetaMax = xrdData => {
    let value = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < xrdData.length; i++) {
      let data = typeof xrdData[i].x === 'number' ? xrdData[i].x : xrdData[i][0];
      value = Math.max(value, data);
    }

    return value;
  };

  const intensityMin = xrdData => {
    let value = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < xrdData.length; i++) {
      let data = typeof xrdData[i].y === 'number' ? xrdData[i].y : xrdData[i][1];
      value = Math.min(value, data);
    }

    return value;
  };

  const intensityMax = xrdData => {
    let value = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < xrdData.length; i++) {
      let data = typeof xrdData[i].y === 'number' ? xrdData[i].y : xrdData[i][1];
      value = Math.max(value, data);
    }

    return value;
  };

  const format = (xrdDataVec, filename, options) => {
    if (!isVector$1(xrdDataVec)) throw new Error('[ xrd-cif ] The param xrdDataVec is invalid.');
    let decimalX = options && typeof options.decimalX === 'number' && options.decimalX > 0 && options.decimalX < 20 ? options.decimalX : null;
    let decimalY = options && typeof options.decimalY === 'number' && options.decimalY > 0 && options.decimalY < 20 ? options.decimalY : null;
    let dataFormat = options && typeof options.dataFormat === 'string' && ['object', 'array'].includes(options.dataFormat) ? options.dataFormat : 'object';
    let xrd = {
      name: filename,
      filename: filename,
      lambda: 1.5406,
      data: []
    };
    xrd.data = convertData(xrdDataVec, decimalX, decimalY, dataFormat);
    xrd.twothetaCount = xrd.data.length;
    xrd.twothetaMin = twothetaMin(xrd.data);
    xrd.twothetaMax = twothetaMax(xrd.data);
    xrd.twothetaStep = twothetaStep(xrd.data, xrd.twothetaMin, xrd.twothetaMax);
    xrd.twothetaStart = xrd.twothetaMin;
    xrd.twothetaEnd = xrd.twothetaMax;
    xrd.intensityMin = intensityMin(xrd.data);
    xrd.intensityMax = intensityMax(xrd.data);
    return [xrd];
  }; // 求二维数组的某一列中的最小值  twoDimArrayMin([[1,2], [3,4]]) ==> 1


  const twoDimArrayMin = (arr, axis = 0) => {
    let value = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < arr.length; i++) {
      value = Math.min(value, arr[i][axis]);
    }

    return value;
  }; // 求二维数组的某一列中的最大值 twoDimArrayMin([[1,2], [3,4]], 1) ==> 4


  const twoDimArrayMax = (arr, axis = 0) => {
    let value = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < arr.length; i++) {
      value = Math.max(value, arr[i][axis]);
    }

    return value;
  }; // 求二维数组的某一列中的最小值和最大值 twoDimArrayRange([[1,2], [3,4], [5, 7]], 1) ==> [2,7]


  const twoDimArrayRange = (arr, axis = 0) => {
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i][axis]);
      min = Math.min(min, arr[i][axis]);
    }

    return [min, max];
  };

  var util$1 = {
    waitingAsync,
    format,
    toFixed,
    twoDimArrayMin,
    twoDimArrayMax,
    twoDimArrayRange
  };

  var build = createCommonjsModule(function (module) {
    // Copyright 2010 The Emscripten Authors.  All rights reserved.
    // Emscripten is available under two separate licenses, the MIT license and the
    // University of Illinois/NCSA Open Source License.  Both these licenses can be
    // found in the LICENSE file.
    // The Module object: Our interface to the outside world. We import
    // and export values on it. There are various ways Module can be used:
    // 1. Not defined. We create it here
    // 2. A function parameter, function(Module) { ..generated code.. }
    // 3. pre-run appended it, var Module = {}; ..generated code..
    // 4. External script tag defines var Module.
    // We need to check if Module already exists (e.g. case 3 above).
    // Substitution will be replaced with actual code on later stage of the build,
    // this way Closure Compiler will not mangle it (e.g. case 4. above).
    // Note that if you want to run closure, and also to use Module
    // after the generated code, you will need to define   var Module = {};
    // before the code. Then that object will be used in the code, and you
    // can continue to use Module afterwards as well.
    var Module = typeof Module !== 'undefined' ? Module : {}; // --pre-jses are emitted after the Module integration code, so that they can
    // refer to Module (if they choose; they can also define Module)

    /**
     * 此段代码会预置到build.js
     * 作用：Electron环境下，使用fs替代fetch加载.wasm文件
     */

    const wasmPath = './build.wasm';
    let ret;

    try {
      ret = empty$1.readFileSync(path$1.resolve(__dirname, wasmPath));
    } catch (error) {
      throw error;
    }

    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }

    var Module = {
      'wasmBinary': ret
    };

    {
      module['exports'] = Module;
    } // Sometimes an existing Module object exists with properties
    // meant to overwrite the default module functionality. Here
    // we collect those properties and reapply _after_ we configure
    // the current environment's defaults to avoid having to be so
    // defensive during initialization.


    var moduleOverrides = {};
    var key;

    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }

    Module['arguments'] = [];
    Module['thisProgram'] = './this.program';

    Module['quit'] = function (status, toThrow) {
      throw toThrow;
    };

    Module['preRun'] = [];
    Module['postRun'] = []; // Determine the runtime environment we are in. You can customize this by
    // setting the ENVIRONMENT setting at compile time (see settings.js).

    var ENVIRONMENT_IS_WEB = false;
    var ENVIRONMENT_IS_WORKER = false;
    var ENVIRONMENT_IS_NODE = false;
    var ENVIRONMENT_HAS_NODE = false;
    var ENVIRONMENT_IS_SHELL = false;
    ENVIRONMENT_IS_WEB = typeof window === 'object';
    ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'; // A web environment like Electron.js can have Node enabled, so we must
    // distinguish between Node-enabled environments and Node environments per se.
    // This will allow the former to do things like mount NODEFS.

    ENVIRONMENT_HAS_NODE = typeof process === 'object' && typeof commonjsRequire === 'function';
    ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
    ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER; // Three configurations we can be running in:
    // 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
    // 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
    // 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)
    // `/` should be present at the end if `scriptDirectory` is not empty

    var scriptDirectory = '';

    function locateFile(path) {
      if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory);
      } else {
        return scriptDirectory + path;
      }
    }

    if (ENVIRONMENT_IS_NODE) {
      scriptDirectory = __dirname + '/'; // Expose functionality in the same simple way that the shells work
      // Note that we pollute the global namespace here, otherwise we break in node

      var nodeFS;
      var nodePath;

      Module['read'] = function shell_read(filename, binary) {
        var ret;
        if (!nodeFS) nodeFS = empty$1;
        if (!nodePath) nodePath = path$1;
        filename = nodePath['normalize'](filename);
        ret = nodeFS['readFileSync'](filename);
        return binary ? ret : ret.toString();
      };

      Module['readBinary'] = function readBinary(filename) {
        var ret = Module['read'](filename, true);

        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }

        assert(ret.buffer);
        return ret;
      };

      if (process['argv'].length > 1) {
        Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
      }

      Module['arguments'] = process['argv'].slice(2);

      {
        module['exports'] = Module;
      }

      process['on']('uncaughtException', function (ex) {
        // suppress ExitStatus exceptions from showing an error
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      }); // Currently node will swallow unhandled rejections, but this behavior is
      // deprecated, and in the future it will exit with error status.

      process['on']('unhandledRejection', abort);

      Module['quit'] = function (status) {
        process['exit'](status);
      };

      Module['inspect'] = function () {
        return '[Emscripten Module object]';
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (typeof read != 'undefined') {
        Module['read'] = function shell_read(f) {
          return read(f);
        };
      }

      Module['readBinary'] = function readBinary(f) {
        var data;

        if (typeof readbuffer === 'function') {
          return new Uint8Array(readbuffer(f));
        }

        data = read(f, 'binary');
        assert(typeof data === 'object');
        return data;
      };

      if (typeof scriptArgs != 'undefined') {
        Module['arguments'] = scriptArgs;
      } else if (typeof arguments != 'undefined') {
        Module['arguments'] = arguments;
      }

      if (typeof quit === 'function') {
        Module['quit'] = function (status) {
          quit(status);
        };
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        // Check worker, not web, since window could be polyfilled
        scriptDirectory = self.location.href;
      } else if (document.currentScript) {
        // web
        scriptDirectory = document.currentScript.src;
      } // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
      // otherwise, slice off the final part of the url to find the script directory.
      // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
      // and scriptDirectory will correctly be replaced with an empty string.


      if (scriptDirectory.indexOf('blob:') !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1);
      } else {
        scriptDirectory = '';
      }

      Module['read'] = function shell_read(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
      };

      if (ENVIRONMENT_IS_WORKER) {
        Module['readBinary'] = function readBinary(url) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, false);
          xhr.responseType = 'arraybuffer';
          xhr.send(null);
          return new Uint8Array(xhr.response);
        };
      }

      Module['readAsync'] = function readAsync(url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            // file URLs can return 0
            onload(xhr.response);
            return;
          }

          onerror();
        };

        xhr.onerror = onerror;
        xhr.send(null);
      };

      Module['setWindowTitle'] = function (title) {
        document.title = title;
      };
    } else ; // Set up the out() and err() hooks, which are how we can print to stdout or
    // stderr, respectively.
    // If the user provided Module.print or printErr, use that. Otherwise,
    // console.log is checked first, as 'print' on the web will open a print dialogue
    // printErr is preferable to console.warn (works better in shells)
    // bind(console) is necessary to fix IE/Edge closed dev tools panel behavior.


    var out = Module['print'] || (typeof console !== 'undefined' ? console.log.bind(console) : typeof print !== 'undefined' ? print : null);
    var err = Module['printErr'] || (typeof printErr !== 'undefined' ? printErr : typeof console !== 'undefined' && console.warn.bind(console) || out); // Merge back in the overrides

    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    } // Free the object hierarchy contained in the overrides, this lets the GC
    // reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.


    moduleOverrides = undefined; // perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message

    function dynamicAlloc(size) {
      var ret = HEAP32[DYNAMICTOP_PTR >> 2];
      var end = ret + size + 15 & -16;

      if (end > _emscripten_get_heap_size()) {
        abort();
      }

      HEAP32[DYNAMICTOP_PTR >> 2] = end;
      return ret;
    }

    var asm2wasmImports = {
      // special asm2wasm imports
      "f64-rem": function (x, y) {
        return x % y;
      },
      "debugger": function () {
        debugger;
      }
    };
    var functionPointers = new Array(0); // Wraps a JS function as a wasm function with a given signature.

    var tempRet0 = 0;

    var setTempRet0 = function (value) {
      tempRet0 = value;
    };

    var getTempRet0 = function () {
      return tempRet0;
    };
    // Documentation for the public APIs defined in this file must be updated in:
    //    site/source/docs/api_reference/preamble.js.rst
    // A prebuilt local version of the documentation is available at:
    //    site/build/text/docs/api_reference/preamble.js.txt
    // You can also build docs locally as HTML or other formats in site/
    // An online HTML version (which may be of a different version of Emscripten)
    //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

    if (typeof WebAssembly !== 'object') {
      err('no native wasm support detected');
    } // In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.


    var wasmMemory; // Potentially used for direct table calls.

    var wasmTable; //========================================
    // Runtime essentials
    //========================================
    // whether we are quitting the application. no code should run after this.
    // set in exit() and abort()

    var ABORT = false; // set by exit() and abort().  Passed to 'onExit' handler.
    /** @type {function(*, string=)} */

    function assert(condition, text) {
      if (!condition) {
        abort('Assertion failed: ' + text);
      }
    } // Returns the C function with a specified identifier (for C++, you need to do manual name mangling)


    function getMemory(size) {
      if (!runtimeInitialized) return dynamicAlloc(size);
      return _malloc(size);
    }
    // a copy of that string as a Javascript String object.


    var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
    /**
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */

    function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx; // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
      // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)

      while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;

      if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
      } else {
        var str = ''; // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that

        while (idx < endPtr) {
          // For UTF8 byte structure, see:
          // http://en.wikipedia.org/wiki/UTF-8#Description
          // https://www.ietf.org/rfc/rfc2279.txt
          // https://tools.ietf.org/html/rfc3629
          var u0 = u8Array[idx++];

          if (!(u0 & 0x80)) {
            str += String.fromCharCode(u0);
            continue;
          }

          var u1 = u8Array[idx++] & 63;

          if ((u0 & 0xE0) == 0xC0) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }

          var u2 = u8Array[idx++] & 63;

          if ((u0 & 0xF0) == 0xE0) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
          }

          if (u0 < 0x10000) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 0x10000;
            str += String.fromCharCode(0xD800 | ch >> 10, 0xDC00 | ch & 0x3FF);
          }
        }
      }

      return str;
    } // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
    // copy of that string as a Javascript String object.
    // maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
    //                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
    //                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
    //                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
    //                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
    //                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
    //                 throw JS JIT optimizations off, so it is worth to consider consistently using one
    //                 style or the other.

    /**
     * @param {number} ptr
     * @param {number=} maxBytesToRead
     * @return {string}
     */


    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    } // Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
    // encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
    // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Parameters:
    //   str: the Javascript string to copy.
    //   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
    //   outIdx: The starting offset in the array to begin the copying.
    //   maxBytesToWrite: The maximum number of bytes this function can write to the array.
    //                    This count should include the null terminator,
    //                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
    //                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate

        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | u1 & 0x3FF;
        }

        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          outU8Array[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          outU8Array[outIdx++] = 0xC0 | u >> 6;
          outU8Array[outIdx++] = 0x80 | u & 63;
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          outU8Array[outIdx++] = 0xE0 | u >> 12;
          outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
          outU8Array[outIdx++] = 0x80 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          outU8Array[outIdx++] = 0xF0 | u >> 18;
          outU8Array[outIdx++] = 0x80 | u >> 12 & 63;
          outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
          outU8Array[outIdx++] = 0x80 | u & 63;
        }
      } // Null-terminate the pointer to the buffer.


      outU8Array[outIdx] = 0;
      return outIdx - startIdx;
    } // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
    // null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
    // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    } // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.


    function lengthBytesUTF8(str) {
      var len = 0;

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var u = str.charCodeAt(i); // possibly a lead surrogate

        if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | str.charCodeAt(++i) & 0x3FF;
        if (u <= 0x7F) ++len;else if (u <= 0x7FF) len += 2;else if (u <= 0xFFFF) len += 3;else len += 4;
      }

      return len;
    } // Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
    // a copy of that string as a Javascript String object.


    var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
    // It is the responsibility of the caller to free() that memory.


    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;

      var ret = _malloc(size);

      if (ret) stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    } // Allocate stack space for a JS string, and write it there.


    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    } // Deprecated: This function should not be called because it is unsafe and does not provide

    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer);
    }

    function writeAsciiToMemory(str, buffer, dontAddNull) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
      } // Null-terminate the pointer to the HEAP.


      if (!dontAddNull) HEAP8[buffer >> 0] = 0;
    }

    function demangle(func) {
      return func;
    }

    function demangleAll(text) {
      var regex = /__Z[\w\d_]+/g;
      return text.replace(regex, function (x) {
        var y = demangle(x);
        return x === y ? x : y + ' [' + x + ']';
      });
    }

    function jsStackTrace() {
      var err = new Error();

      if (!err.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error(0);
        } catch (e) {
          err = e;
        }

        if (!err.stack) {
          return '(no stack trace available)';
        }
      }

      return err.stack.toString();
    }

    function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    } // Memory management
    var WASM_PAGE_SIZE = 65536;

    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }

      return x;
    }

    var /** @type {ArrayBuffer} */
    buffer,
    /** @type {Int8Array} */
    HEAP8,
    /** @type {Uint8Array} */
    HEAPU8,
    /** @type {Int16Array} */
    HEAP16,
    /** @type {Uint16Array} */
    HEAPU16,
    /** @type {Int32Array} */
    HEAP32,
    /** @type {Uint32Array} */
    HEAPU32,
    /** @type {Float32Array} */
    HEAPF32,
    /** @type {Float64Array} */
    HEAPF64;

    function updateGlobalBufferViews() {
      Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
      Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
      Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
      Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
      Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
    }

    var DYNAMIC_BASE = 5516368,
        DYNAMICTOP_PTR = 273456;
    var TOTAL_STACK = 5242880;
    var INITIAL_TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
    if (INITIAL_TOTAL_MEMORY < TOTAL_STACK) err('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')'); // Initialize the runtime's memory
    // Use a provided buffer, if there is one, or else allocate a new one

    if (Module['buffer']) {
      buffer = Module['buffer'];
    } else {
      // Use a WebAssembly memory where available
      if (typeof WebAssembly === 'object' && typeof WebAssembly.Memory === 'function') {
        wasmMemory = new WebAssembly.Memory({
          'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE
        });
        buffer = wasmMemory.buffer;
      } else {
        buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
      }
    }

    updateGlobalBufferViews();
    HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE; // Endianness check (note: assumes compiler arch was little-endian)

    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();

        if (typeof callback == 'function') {
          callback();
          continue;
        }

        var func = callback.func;

        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            Module['dynCall_v'](func);
          } else {
            Module['dynCall_vi'](func, callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

    var __ATPRERUN__ = []; // functions called before the runtime is initialized

    var __ATINIT__ = []; // functions called during startup

    var __ATMAIN__ = []; // functions called when main() is to be run

    var __ATPOSTRUN__ = []; // functions called after the main() is called

    var runtimeInitialized = false;

    function preRun() {
      // compatibility - merge in anything from Module['preRun'] at this time
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];

        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPRERUN__);
    }

    function initRuntime() {
      runtimeInitialized = true;
      if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
      TTY.init();
      callRuntimeCallbacks(__ATINIT__);
    }

    function preMain() {
      FS.ignorePermissions = false;
      callRuntimeCallbacks(__ATMAIN__);
    }

    function postRun() {
      // compatibility - merge in anything from Module['postRun'] at this time
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];

        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPOSTRUN__);
    }

    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }

    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }

    var Math_abs = Math.abs;
    var Math_ceil = Math.ceil;
    var Math_floor = Math.floor;
    var Math_min = Math.min;
    // do asynchronous work before running, increment this and
    // decrement it. Incrementing must happen in a place like
    // Module.preRun (used by emcc to add file preloading).
    // Note that you can add dependencies in preRun, even though
    // it happens right before run - run will be postponed until
    // the dependencies are met.

    var runDependencies = 0;
    var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

    function addRunDependency(id) {
      runDependencies++;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }
    }

    function removeRunDependency(id) {
      runDependencies--;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }

      if (runDependencies == 0) {

        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback(); // can add another dependenciesFulfilled
        }
      }
    }

    Module["preloadedImages"] = {}; // maps url to image data

    Module["preloadedAudios"] = {}; // maps url to audio data
    // Emscripten is available under two separate licenses, the MIT license and the
    // University of Illinois/NCSA Open Source License.  Both these licenses can be
    // found in the LICENSE file.
    // Prefix of data URIs emitted by SINGLE_FILE and related options.

    var dataURIPrefix = 'data:application/octet-stream;base64,'; // Indicates whether filename is a base64 data URI.

    function isDataURI(filename) {
      return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
    }

    var wasmBinaryFile = 'build.wasm';

    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }

    function getBinary() {
      try {
        if (Module['wasmBinary']) {
          return new Uint8Array(Module['wasmBinary']);
        }

        if (Module['readBinary']) {
          return Module['readBinary'](wasmBinaryFile);
        } else {
          throw "both async and sync fetching of the wasm failed";
        }
      } catch (err) {
        abort(err);
      }
    }

    function getBinaryPromise() {
      // if we don't have the binary yet, and have the Fetch api, use that
      // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
      if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
        return fetch(wasmBinaryFile, {
          credentials: 'same-origin'
        }).then(function (response) {
          if (!response['ok']) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
          }

          return response['arrayBuffer']();
        }).catch(function () {
          return getBinary();
        });
      } // Otherwise, getBinary should be able to get it synchronously


      return new Promise(function (resolve, reject) {
        resolve(getBinary());
      });
    } // Create the wasm instance.
    // Receives the wasm imports, returns the exports.


    function createWasm(env) {
      // prepare imports
      var info = {
        'env': env,
        'global': {
          'NaN': NaN,
          'Infinity': Infinity
        },
        'global.Math': Math,
        'asm2wasm': asm2wasmImports
      }; // Load the wasm module and create an instance of using native support in the JS engine.
      // handle a generated wasm instance, receiving its exports and
      // performing other necessary setup

      function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module['asm'] = exports;
        removeRunDependency();
      }

      addRunDependency();

      function receiveInstantiatedSource(output) {
        // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
        // receiveInstance() will swap in the exports (to Module.asm) so they can be called
        // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
        // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
        receiveInstance(output['instance']);
      }

      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise().then(function (binary) {
          return WebAssembly.instantiate(binary, info);
        }).then(receiver, function (reason) {
          err('failed to asynchronously prepare wasm: ' + reason);
          abort(reason);
        });
      } // Prefer streaming instantiation if available.


      function instantiateAsync() {
        if (!Module['wasmBinary'] && typeof WebAssembly.instantiateStreaming === 'function' && !isDataURI(wasmBinaryFile) && typeof fetch === 'function') {
          fetch(wasmBinaryFile, {
            credentials: 'same-origin'
          }).then(function (response) {
            return WebAssembly.instantiateStreaming(response, info).then(receiveInstantiatedSource, function (reason) {
              // We expect the most common failure cause to be a bad MIME type for the binary,
              // in which case falling back to ArrayBuffer instantiation should work.
              err('wasm streaming compile failed: ' + reason);
              err('falling back to ArrayBuffer instantiation');
              instantiateArrayBuffer(receiveInstantiatedSource);
            });
          });
        } else {
          return instantiateArrayBuffer(receiveInstantiatedSource);
        }
      } // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
      // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
      // to any other async startup actions they are performing.


      if (Module['instantiateWasm']) {
        try {
          return Module['instantiateWasm'](info, receiveInstance);
        } catch (e) {
          err('Module.instantiateWasm callback failed with error: ' + e);
          return false;
        }
      }

      instantiateAsync();
      return {}; // no exports yet; we'll fill them in later
    } // Provide an "asm.js function" for the application, called to "link" the asm.js module. We instantiate
    // the wasm module at that time, and it receives imports and provides exports and so forth, the app
    // doesn't need to care that it is wasm or asm.js.


    Module['asm'] = function (global, env, providedBuffer) {
      // memory was already allocated (so js could use the buffer)
      env['memory'] = wasmMemory; // import table

      env['table'] = wasmTable = new WebAssembly.Table({
        'initial': 694,
        'maximum': 694,
        'element': 'anyfunc'
      }); // With the wasm backend __memory_base and __table_base and only needed for
      // relocatable output.

      env['__memory_base'] = 1024; // tell the memory segments where to place themselves
      // table starts at 0 by default (even in dynamic linking, for the main module)

      env['__table_base'] = 0;
      var exports = createWasm(env);
      return exports;
    }; // === Body ===

    /* global initializers */

    __ATINIT__.push({
      func: function () {
        globalCtors();
      }
    });
    /* no memory initializer */


    var tempDoublePtr = 273472;


    function ___assert_fail(condition, filename, line, func) {
      abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }

    var ENV = {};

    function ___buildEnvironment(environ) {
      // WARNING: Arbitrary limit!
      var MAX_ENV_VALUES = 64;
      var TOTAL_ENV_SIZE = 1024; // Statically allocate memory for the environment.

      var poolPtr;
      var envPtr;

      if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true; // Set default values. Use string keys for Closure Compiler compatibility.

        ENV['USER'] = ENV['LOGNAME'] = 'web_user';
        ENV['PATH'] = '/';
        ENV['PWD'] = '/';
        ENV['HOME'] = '/home/web_user';
        ENV['LANG'] = 'C.UTF-8'; // Browser language detection #8751

        ENV['LANG'] = (typeof navigator === 'object' && navigator.languages && navigator.languages[0] || 'C').replace('-', '_') + '.UTF-8';
        ENV['_'] = Module['thisProgram']; // Allocate memory.

        poolPtr = getMemory(TOTAL_ENV_SIZE);
        envPtr = getMemory(MAX_ENV_VALUES * 4);
        HEAP32[envPtr >> 2] = poolPtr;
        HEAP32[environ >> 2] = envPtr;
      } else {
        envPtr = HEAP32[environ >> 2];
        poolPtr = HEAP32[envPtr >> 2];
      } // Collect key=value lines.


      var strings = [];
      var totalSize = 0;

      for (var key in ENV) {
        if (typeof ENV[key] === 'string') {
          var line = key + '=' + ENV[key];
          strings.push(line);
          totalSize += line.length;
        }
      }

      if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
      } // Make new.


      var ptrSize = 4;

      for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[envPtr + i * ptrSize >> 2] = poolPtr;
        poolPtr += line.length + 1;
      }

      HEAP32[envPtr + strings.length * ptrSize >> 2] = 0;
    }

    function _emscripten_get_now() {
      abort();
    }

    function _emscripten_get_now_is_monotonic() {
      // return whether emscripten_get_now is guaranteed monotonic; the Date.now
      // implementation is not :(
      return  ENVIRONMENT_IS_NODE || typeof dateNow !== 'undefined' || typeof performance === 'object' && performance && typeof performance['now'] === 'function';
    }

    function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value;
      return value;
    }

    function _clock_gettime(clk_id, tp) {
      // int clock_gettime(clockid_t clk_id, struct timespec *tp);
      var now;

      if (clk_id === 0) {
        now = Date.now();
      } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
        now = _emscripten_get_now();
      } else {
        ___setErrNo(22);

        return -1;
      }

      HEAP32[tp >> 2] = now / 1000 | 0; // seconds

      HEAP32[tp + 4 >> 2] = now % 1000 * 1000 * 1000 | 0; // nanoseconds

      return 0;
    }

    function ___clock_gettime(a0, a1
    /*``*/
    ) {
      return _clock_gettime(a0, a1);
    }

    function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }

    var ___exception_infos = {};

    function ___exception_addRef(ptr) {
      if (!ptr) return;
      var info = ___exception_infos[ptr];
      info.refcount++;
    }

    function ___exception_deAdjust(adjusted) {
      if (!adjusted || ___exception_infos[adjusted]) return adjusted;

      for (var key in ___exception_infos) {
        var ptr = +key; // the iteration key is a string, and if we throw this, it must be an integer as that is what we look for

        var adj = ___exception_infos[ptr].adjusted;
        var len = adj.length;

        for (var i = 0; i < len; i++) {
          if (adj[i] === adjusted) {
            return ptr;
          }
        }
      }

      return adjusted;
    }

    function ___cxa_begin_catch(ptr) {
      var info = ___exception_infos[ptr];

      if (info && !info.caught) {
        info.caught = true;
        __ZSt18uncaught_exceptionv.uncaught_exception--;
      }

      if (info) info.rethrown = false;

      ___exception_addRef(___exception_deAdjust(ptr));

      return ptr;
    }

    function ___cxa_throw(ptr, type, destructor) {
      ___exception_infos[ptr] = {
        ptr: ptr,
        adjusted: [ptr],
        type: type,
        destructor: destructor,
        refcount: 0,
        caught: false,
        rethrown: false
      };

      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }

      throw ptr;
    }

    function ___cxa_uncaught_exception() {
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }

    function ___gxx_personality_v0() {}

    function ___lock() {}

    function ___map_file(pathname, size) {
      ___setErrNo(1);

      return -1;
    }

    var PATH = {
      splitPath: function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;

        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];

          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        } // if the path is allowed to go above the root, restore leading ..s


        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }

        return parts;
      },
      normalize: function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/'; // Normalize the path

        path = PATH.normalizeArray(path.split('/').filter(function (p) {
          return !!p;
        }), !isAbsolute).join('/');

        if (!path && !isAbsolute) {
          path = '.';
        }

        if (path && trailingSlash) {
          path += '/';
        }

        return (isAbsolute ? '/' : '') + path;
      },
      dirname: function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];

        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }

        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }

        return root + dir;
      },
      basename: function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
      },
      extname: function (path) {
        return PATH.splitPath(path)[3];
      },
      join: function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },
      join2: function (l, r) {
        return PATH.normalize(l + '/' + r);
      }
    };
    var PATH_FS = {
      resolve: function () {
        var resolvedPath = '',
            resolvedAbsolute = false;

        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd(); // Skip empty and invalid entries

          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }

          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        } // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)


        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function (p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
      },
      relative: function (from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);

        function trim(arr) {
          var start = 0;

          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }

          var end = arr.length - 1;

          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }

          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }

        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;

        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }

        var outputParts = [];

        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }

        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }
    };
    var TTY = {
      ttys: [],
      init: function () {// https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },
      shutdown: function () {// https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },
      register: function (dev, ops) {
        TTY.ttys[dev] = {
          input: [],
          output: [],
          ops: ops
        };
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open: function (stream) {
          var tty = TTY.ttys[stream.node.rdev];

          if (!tty) {
            throw new FS.ErrnoError(19);
          }

          stream.tty = tty;
          stream.seekable = false;
        },
        close: function (stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },
        flush: function (stream) {
          stream.tty.ops.flush(stream.tty);
        },
        read: function (stream, buffer, offset, length, pos
        /* ignored */
        ) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(6);
          }

          var bytesRead = 0;

          for (var i = 0; i < length; i++) {
            var result;

            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(5);
            }

            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(11);
            }

            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset + i] = result;
          }

          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }

          return bytesRead;
        },
        write: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(6);
          }

          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(5);
          }

          if (length) {
            stream.node.timestamp = Date.now();
          }

          return i;
        }
      },
      default_tty_ops: {
        get_char: function (tty) {
          if (!tty.input.length) {
            var result = null;

            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = new Buffer(BUFSIZE);
              var bytesRead = 0;
              var isPosixPlatform = process.platform != 'win32'; // Node doesn't offer a direct check, so test by exclusion

              var fd = process.stdin.fd;

              if (isPosixPlatform) {
                // Linux and Mac cannot use process.stdin.fd (which isn't set up as sync)
                var usingDevice = false;

                try {
                  fd = fs.openSync('/dev/stdin', 'r');
                  usingDevice = true;
                } catch (e) {}
              }

              try {
                bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
              } catch (e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;else throw e;
              }

              if (usingDevice) {
                fs.closeSync(fd);
              }

              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else if (typeof window != 'undefined' && typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: '); // returns null on cancel

              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();

              if (result !== null) {
                result += '\n';
              }
            }

            if (!result) {
              return null;
            }

            tty.input = intArrayFromString(result, true);
          }

          return tty.input.shift();
        },
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
        flush: function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      },
      default_tty1_ops: {
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        flush: function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      }
    };
    var MEMFS = {
      ops_table: null,
      mount: function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511
        /* 0777 */
        , 0);
      },
      createNode: function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(1);
        }

        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }

        var node = FS.createNode(parent, name, mode, dev);

        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.

          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }

        node.timestamp = Date.now(); // add the new node to the parent

        if (parent) {
          parent.contents[name] = node;
        }

        return node;
      },
      getFileDataAsRegularArray: function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];

          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);

          return arr; // Returns a copy of the original data.
        }

        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },
      getFileDataAsTypedArray: function (node) {
        if (!node.contents) return new Uint8Array();
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.

        return new Uint8Array(node.contents);
      },
      expandFileStorage: function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.

        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125) | 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.

        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.

        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.

        return;
      },
      resizeFileStorage: function (node, newSize) {
        if (node.usedBytes == newSize) return;

        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.

          node.usedBytes = 0;
          return;
        }

        if (!node.contents || node.contents.subarray) {
          // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.

          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }

          node.usedBytes = newSize;
          return;
        } // Backing with a JS array.


        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },
      node_ops: {
        getattr: function (node) {
          var attr = {}; // device numbers reuse inode numbers.

          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;

          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }

          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp); // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.

          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
        setattr: function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }

          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }

          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup: function (parent, name) {
          throw FS.genericErrors[2];
        },
        mknod: function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename: function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;

            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {}

            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(39);
              }
            }
          } // do the internal rewiring


          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },
        unlink: function (parent, name) {
          delete parent.contents[name];
        },
        rmdir: function (parent, name) {
          var node = FS.lookupNode(parent, name);

          for (var i in node.contents) {
            throw new FS.ErrnoError(39);
          }

          delete parent.contents[name];
        },
        readdir: function (node) {
          var entries = ['.', '..'];

          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }

            entries.push(key);
          }

          return entries;
        },
        symlink: function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511
          /* 0777 */
          | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink: function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(22);
          }

          return node.link;
        }
      },
      stream_ops: {
        read: function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);

          if (size > 8 && contents.subarray) {
            // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }

          return size;
        },
        write: function (stream, buffer, offset, length, position, canOwn) {
          // If memory can grow, we don't want to hold on to references of
          // the memory Buffer, as they may get invalidated. That means
          // we need to do a copy here.
          canOwn = false;
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();

          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            // This write is from a typed array to a typed array?
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          } // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.


          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
              for (var i = 0; i < length; i++) {
                node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
              }
            }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek: function (stream, offset, whence) {
          var position = offset;

          if (whence === 1) {
            // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {
            // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }

          if (position < 0) {
            throw new FS.ErrnoError(22);
          }

          return position;
        },
        allocate: function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
        mmap: function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(19);
          }

          var ptr;
          var allocated;
          var contents = stream.node.contents; // Only make a new copy when MAP_PRIVATE is specified.

          if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }

            allocated = true;
            ptr = _malloc(length);

            if (!ptr) {
              throw new FS.ErrnoError(12);
            }

            buffer.set(contents, ptr);
          }

          return {
            ptr: ptr,
            allocated: allocated
          };
        },
        msync: function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(19);
          }

          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }

          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false); // should we check if bytesWritten and length are the same?

          return 0;
        }
      }
    };
    var IDBFS = {
      dbs: {},
      indexedDB: function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },
      DB_VERSION: 21,
      DB_STORE_NAME: "FILE_DATA",
      mount: function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },
      syncfs: function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function (err, local) {
          if (err) return callback(err);
          IDBFS.getRemoteSet(mount, function (err, remote) {
            if (err) return callback(err);
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },
      getDB: function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];

        if (db) {
          return callback(null, db);
        }

        var req;

        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }

        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }

        req.onupgradeneeded = function (e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
          var fileStore;

          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }

          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', {
              unique: false
            });
          }
        };

        req.onsuccess = function () {
          db = req.result; // add to the cache

          IDBFS.dbs[name] = db;
          callback(null, db);
        };

        req.onerror = function (e) {
          callback(this.error);
          e.preventDefault();
        };
      },
      getLocalSet: function (mount, callback) {
        var entries = {};

        function isRealDir(p) {
          return p !== '.' && p !== '..';
        }

        function toAbsolute(root) {
          return function (p) {
            return PATH.join2(root, p);
          };
        }
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));

        while (check.length) {
          var path = check.pop();
          var stat;

          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }

          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }

          entries[path] = {
            timestamp: stat.mtime
          };
        }

        return callback(null, {
          type: 'local',
          entries: entries
        });
      },
      getRemoteSet: function (mount, callback) {
        var entries = {};
        IDBFS.getDB(mount.mountpoint, function (err, db) {
          if (err) return callback(err);

          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');

            transaction.onerror = function (e) {
              callback(this.error);
              e.preventDefault();
            };

            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');

            index.openKeyCursor().onsuccess = function (event) {
              var cursor = event.target.result;

              if (!cursor) {
                return callback(null, {
                  type: 'remote',
                  db: db,
                  entries: entries
                });
              }

              entries[cursor.primaryKey] = {
                timestamp: cursor.key
              };
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },
      loadLocalEntry: function (path, callback) {
        var stat, node;

        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }

        if (FS.isDir(stat.mode)) {
          return callback(null, {
            timestamp: stat.mtime,
            mode: stat.mode
          });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, {
            timestamp: stat.mtime,
            mode: stat.mode,
            contents: node.contents
          });
        } else {
          return callback(new Error('node type not supported'));
        }
      },
      storeLocalEntry: function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, {
              canOwn: true
            });
          } else {
            return callback(new Error('node type not supported'));
          }

          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }

        callback(null);
      },
      removeLocalEntry: function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);

          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }

        callback(null);
      },
      loadRemoteEntry: function (store, path, callback) {
        var req = store.get(path);

        req.onsuccess = function (event) {
          callback(null, event.target.result);
        };

        req.onerror = function (e) {
          callback(this.error);
          e.preventDefault();
        };
      },
      storeRemoteEntry: function (store, path, entry, callback) {
        var req = store.put(entry, path);

        req.onsuccess = function () {
          callback(null);
        };

        req.onerror = function (e) {
          callback(this.error);
          e.preventDefault();
        };
      },
      removeRemoteEntry: function (store, path, callback) {
        var req = store.delete(path);

        req.onsuccess = function () {
          callback(null);
        };

        req.onerror = function (e) {
          callback(this.error);
          e.preventDefault();
        };
      },
      reconcile: function (src, dst, callback) {
        var total = 0;
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];

          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];

          if (!e2) {
            remove.push(key);
            total++;
          }
        });

        if (!total) {
          return callback(null);
        }
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);

        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }

            return;
          }

          if (++completed >= total) {
            return callback(null);
          }
        }

        transaction.onerror = function (e) {
          done(this.error);
          e.preventDefault();
        }; // sort paths in ascending order so directory entries are created
        // before the files inside them


        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        }); // sort paths in descending order so files are deleted before their
        // parent directories

        remove.sort().reverse().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }
    };
    var NODEFS = {
      isWindows: false,
      staticInit: function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process["binding"]("constants"); // Node.js 4 compatibility: it has no namespaces for constants

        if (flags["fs"]) {
          flags = flags["fs"];
        }

        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"]
        };
      },
      bufferFrom: function (arrayBuffer) {
        // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
        // Buffer.from before 4.5 was just a method inherited from Uint8Array
        // Buffer.alloc has been added with Buffer.from together, so check it instead
        return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
      },
      mount: function (mount) {
        assert(ENVIRONMENT_HAS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },
      createNode: function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(22);
        }

        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },
      getMode: function (path) {
        var stat;

        try {
          stat = fs.lstatSync(path);

          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode = stat.mode | (stat.mode & 292) >> 2;
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(-e.errno); // syscall errnos are negated, node's are not
        }

        return stat.mode;
      },
      realPath: function (node) {
        var parts = [];

        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }

        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },
      flagsForNode: function (flags) {
        flags &= ~0x200000
        /*O_PATH*/
        ; // Ignore this flag from musl, otherwise node.js fails to open the file.

        flags &= ~0x800
        /*O_NONBLOCK*/
        ; // Ignore this flag from musl, otherwise node.js fails to open the file.

        flags &= ~0x8000
        /*O_LARGEFILE*/
        ; // Ignore this flag from musl, otherwise node.js fails to open the file.

        flags &= ~0x80000
        /*O_CLOEXEC*/
        ; // Some applications may pass it; it makes no sense for a single process.

        var newFlags = 0;

        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }

        if (!flags) {
          return newFlags;
        } else {
          throw new FS.ErrnoError(22);
        }
      },
      node_ops: {
        getattr: function (node) {
          var path = NODEFS.realPath(node);
          var stat;

          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          } // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365


          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }

          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
          }

          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },
        setattr: function (node, attr) {
          var path = NODEFS.realPath(node);

          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode); // update the common node structure mode as well

              node.mode = attr.mode;
            }

            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }

            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        lookup: function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },
        mknod: function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev); // create the backing node for this in the fs root as well

          var path = NODEFS.realPath(node);

          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', {
                mode: node.mode
              });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }

          return node;
        },
        rename: function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);

          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        unlink: function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);

          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        rmdir: function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);

          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        readdir: function (node) {
          var path = NODEFS.realPath(node);

          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        symlink: function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);

          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        readlink: function (node) {
          var path = NODEFS.realPath(node);

          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        }
      },
      stream_ops: {
        open: function (stream) {
          var path = NODEFS.realPath(stream.node);

          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        close: function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
          }
        },
        read: function (stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;

          try {
            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(-e.errno);
          }
        },
        write: function (stream, buffer, offset, length, position) {
          try {
            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(-e.errno);
          }
        },
        llseek: function (stream, offset, whence) {
          var position = offset;

          if (whence === 1) {
            // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {
            // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(-e.errno);
              }
            }
          }

          if (position < 0) {
            throw new FS.ErrnoError(22);
          }

          return position;
        }
      }
    };
    var WORKERFS = {
      DIR_MODE: 16895,
      FILE_MODE: 33279,
      reader: null,
      mount: function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0);
        var createdParents = {};

        function ensureParent(path) {
          // return the parent node, creating subdirs as necessary
          var parts = path.split('/');
          var parent = root;

          for (var i = 0; i < parts.length - 1; i++) {
            var curr = parts.slice(0, i + 1).join('/'); // Issue 4254: Using curr as a node name will prevent the node
            // from being found in FS.nameTable when FS.open is called on
            // a path which holds a child of this node,
            // given that all FS functions assume node names
            // are just their corresponding parts within their given path,
            // rather than incremental aggregates which include their parent's
            // directories.

            if (!createdParents[curr]) {
              createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
            }

            parent = createdParents[curr];
          }

          return parent;
        }

        function base(path) {
          var parts = path.split('/');
          return parts[parts.length - 1];
        } // We also accept FileList here, by using Array.prototype


        Array.prototype.forEach.call(mount.opts["files"] || [], function (file) {
          WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function (obj) {
          WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function (pack) {
          pack['metadata'].files.forEach(function (file) {
            var name = file.filename.substr(1); // remove initial slash

            WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
          });
        });
        return root;
      },
      createNode: function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date()).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);

        if (mode === WORKERFS.FILE_MODE) {
          node.size = contents.size;
          node.contents = contents;
        } else {
          node.size = 4096;
          node.contents = {};
        }

        if (parent) {
          parent.contents[name] = node;
        }

        return node;
      },
      node_ops: {
        getattr: function (node) {
          return {
            dev: 1,
            ino: undefined,
            mode: node.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: undefined,
            size: node.size,
            atime: new Date(node.timestamp),
            mtime: new Date(node.timestamp),
            ctime: new Date(node.timestamp),
            blksize: 4096,
            blocks: Math.ceil(node.size / 4096)
          };
        },
        setattr: function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }

          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
        },
        lookup: function (parent, name) {
          throw new FS.ErrnoError(2);
        },
        mknod: function (parent, name, mode, dev) {
          throw new FS.ErrnoError(1);
        },
        rename: function (oldNode, newDir, newName) {
          throw new FS.ErrnoError(1);
        },
        unlink: function (parent, name) {
          throw new FS.ErrnoError(1);
        },
        rmdir: function (parent, name) {
          throw new FS.ErrnoError(1);
        },
        readdir: function (node) {
          var entries = ['.', '..'];

          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }

            entries.push(key);
          }

          return entries;
        },
        symlink: function (parent, newName, oldPath) {
          throw new FS.ErrnoError(1);
        },
        readlink: function (node) {
          throw new FS.ErrnoError(1);
        }
      },
      stream_ops: {
        read: function (stream, buffer, offset, length, position) {
          if (position >= stream.node.size) return 0;
          var chunk = stream.node.contents.slice(position, position + length);
          var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
          buffer.set(new Uint8Array(ab), offset);
          return chunk.size;
        },
        write: function (stream, buffer, offset, length, position) {
          throw new FS.ErrnoError(5);
        },
        llseek: function (stream, offset, whence) {
          var position = offset;

          if (whence === 1) {
            // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {
            // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.size;
            }
          }

          if (position < 0) {
            throw new FS.ErrnoError(22);
          }

          return position;
        }
      }
    };
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: false,
      ignorePermissions: true,
      trackingDelegate: {},
      tracking: {
        openFlags: {
          READ: 1,
          WRITE: 2
        }
      },
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      handleFSError: function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },
      lookupPath: function (path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
        if (!path) return {
          path: '',
          node: null
        };
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };

        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }

        if (opts.recurse_count > 8) {
          // max recursive lookup of 8
          throw new FS.ErrnoError(40);
        } // split the path


        var parts = PATH.normalizeArray(path.split('/').filter(function (p) {
          return !!p;
        }), false); // start at the root

        var current = FS.root;
        var current_path = '/';

        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;

          if (islast && opts.parent) {
            // stop resolving
            break;
          }

          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]); // jump to the mount's root node if this is a mountpoint

          if (FS.isMountpoint(current)) {
            if (!islast || islast && opts.follow_mount) {
              current = current.mounted.root;
            }
          } // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.


          if (!islast || opts.follow) {
            var count = 0;

            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count
              });
              current = lookup.node;

              if (count++ > 40) {
                // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(40);
              }
            }
          }
        }

        return {
          path: current_path,
          node: current
        };
      },
      getPath: function (node) {
        var path;

        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length - 1] !== '/' ? mount + '/' + path : mount + path;
          }

          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },
      hashName: function (parentid, name) {
        var hash = 0;

        for (var i = 0; i < name.length; i++) {
          hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
        }

        return (parentid + hash >>> 0) % FS.nameTable.length;
      },
      hashAddNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name);

        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];

          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }

            current = current.name_next;
          }
        }
      },
      lookupNode: function (parent, name) {
        var err = FS.mayLookup(parent);

        if (err) {
          throw new FS.ErrnoError(err, parent);
        }

        var hash = FS.hashName(parent.id, name);

        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;

          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        } // if we failed to find it in the cache, call into the VFS


        return FS.lookup(parent, name);
      },
      createNode: function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function (parent, name, mode, rdev) {
            if (!parent) {
              parent = this; // root node sets parent to itself
            }

            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };

          FS.FSNode.prototype = {}; // compatibility

          var readMode = 292 | 73;
          var writeMode = 146; // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy

          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function () {
                return (this.mode & readMode) === readMode;
              },
              set: function (val) {
                val ? this.mode |= readMode : this.mode &= ~readMode;
              }
            },
            write: {
              get: function () {
                return (this.mode & writeMode) === writeMode;
              },
              set: function (val) {
                val ? this.mode |= writeMode : this.mode &= ~writeMode;
              }
            },
            isFolder: {
              get: function () {
                return FS.isDir(this.mode);
              }
            },
            isDevice: {
              get: function () {
                return FS.isChrdev(this.mode);
              }
            }
          });
        }

        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode: function (node) {
        FS.hashRemoveNode(node);
      },
      isRoot: function (node) {
        return node === node.parent;
      },
      isMountpoint: function (node) {
        return !!node.mounted;
      },
      isFile: function (mode) {
        return (mode & 61440) === 32768;
      },
      isDir: function (mode) {
        return (mode & 61440) === 16384;
      },
      isLink: function (mode) {
        return (mode & 61440) === 40960;
      },
      isChrdev: function (mode) {
        return (mode & 61440) === 8192;
      },
      isBlkdev: function (mode) {
        return (mode & 61440) === 24576;
      },
      isFIFO: function (mode) {
        return (mode & 61440) === 4096;
      },
      isSocket: function (mode) {
        return (mode & 49152) === 49152;
      },
      flagModes: {
        "r": 0,
        "rs": 1052672,
        "r+": 2,
        "w": 577,
        "wx": 705,
        "xw": 705,
        "w+": 578,
        "wx+": 706,
        "xw+": 706,
        "a": 1089,
        "ax": 1217,
        "xa": 1217,
        "a+": 1090,
        "ax+": 1218,
        "xa+": 1218
      },
      modeStringToFlags: function (str) {
        var flags = FS.flagModes[str];

        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }

        return flags;
      },
      flagsToPermissionString: function (flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];

        if (flag & 512) {
          perms += 'w';
        }

        return perms;
      },
      nodePermissions: function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        } // return 0 if any user, group or owner bits are set.


        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 13;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 13;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 13;
        }

        return 0;
      },
      mayLookup: function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return 13;
        return 0;
      },
      mayCreate: function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 17;
        } catch (e) {}

        return FS.nodePermissions(dir, 'wx');
      },
      mayDelete: function (dir, name, isdir) {
        var node;

        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }

        var err = FS.nodePermissions(dir, 'wx');

        if (err) {
          return err;
        }

        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 20;
          }

          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 16;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 21;
          }
        }

        return 0;
      },
      mayOpen: function (node, flags) {
        if (!node) {
          return 2;
        }

        if (FS.isLink(node.mode)) {
          return 40;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
          flags & 512) {
            // TODO: check for O_SEARCH? (== search for dir only)
            return 21;
          }
        }

        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
      MAX_OPEN_FDS: 4096,
      nextfd: function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;

        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }

        throw new FS.ErrnoError(24);
      },
      getStream: function (fd) {
        return FS.streams[fd];
      },
      createStream: function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function () {};

          FS.FSStream.prototype = {}; // compatibility

          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function () {
                return this.node;
              },
              set: function (val) {
                this.node = val;
              }
            },
            isRead: {
              get: function () {
                return (this.flags & 2097155) !== 1;
              }
            },
            isWrite: {
              get: function () {
                return (this.flags & 2097155) !== 0;
              }
            },
            isAppend: {
              get: function () {
                return this.flags & 1024;
              }
            }
          });
        } // clone it, so we can return an instance of FSStream


        var newStream = new FS.FSStream();

        for (var p in stream) {
          newStream[p] = stream[p];
        }

        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream: function (fd) {
        FS.streams[fd] = null;
      },
      chrdev_stream_ops: {
        open: function (stream) {
          var device = FS.getDevice(stream.node.rdev); // override node's stream ops with the device's

          stream.stream_ops = device.stream_ops; // forward the open call

          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },
        llseek: function () {
          throw new FS.ErrnoError(29);
        }
      },
      major: function (dev) {
        return dev >> 8;
      },
      minor: function (dev) {
        return dev & 0xff;
      },
      makedev: function (ma, mi) {
        return ma << 8 | mi;
      },
      registerDevice: function (dev, ops) {
        FS.devices[dev] = {
          stream_ops: ops
        };
      },
      getDevice: function (dev) {
        return FS.devices[dev];
      },
      getMounts: function (mount) {
        var mounts = [];
        var check = [mount];

        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push.apply(check, m.mounts);
        }

        return mounts;
      },
      syncfs: function (populate, callback) {
        if (typeof populate === 'function') {
          callback = populate;
          populate = false;
        }

        FS.syncFSRequests++;

        if (FS.syncFSRequests > 1) {
          console.log('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }

        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;

        function doCallback(err) {
          FS.syncFSRequests--;
          return callback(err);
        }

        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(err);
            }

            return;
          }

          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }

        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }

          mount.type.syncfs(mount, populate, done);
        });
      },
      mount: function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;

        if (root && FS.root) {
          throw new FS.ErrnoError(16);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, {
            follow_mount: false
          });
          mountpoint = lookup.path; // use the absolute path

          node = lookup.node;

          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(16);
          }

          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(20);
          }
        }

        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        }; // create a root node for the fs

        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;

        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount; // add the new mount to the current mount's children

          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }

        return mountRoot;
      },
      unmount: function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, {
          follow_mount: false
        });

        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(22);
        } // destroy the nodes for this mount, and all its child mounts


        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];

          while (current) {
            var next = current.name_next;

            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }

            current = next;
          }
        }); // no longer a mountpoint

        node.mounted = null; // remove this mount from the child mounts

        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },
      lookup: function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
      mknod: function (path, mode, dev) {
        var lookup = FS.lookupPath(path, {
          parent: true
        });
        var parent = lookup.node;
        var name = PATH.basename(path);

        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(22);
        }

        var err = FS.mayCreate(parent, name);

        if (err) {
          throw new FS.ErrnoError(err);
        }

        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(1);
        }

        return parent.node_ops.mknod(parent, name, mode, dev);
      },
      create: function (path, mode) {
        mode = mode !== undefined ? mode : 438
        /* 0666 */
        ;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir: function (path, mode) {
        mode = mode !== undefined ? mode : 511
        /* 0777 */
        ;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree: function (path, mode) {
        var dirs = path.split('/');
        var d = '';

        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];

          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 17) throw e;
          }
        }
      },
      mkdev: function (path, mode, dev) {
        if (typeof dev === 'undefined') {
          dev = mode;
          mode = 438
          /* 0666 */
          ;
        }

        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink: function (oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(2);
        }

        var lookup = FS.lookupPath(newpath, {
          parent: true
        });
        var parent = lookup.node;

        if (!parent) {
          throw new FS.ErrnoError(2);
        }

        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);

        if (err) {
          throw new FS.ErrnoError(err);
        }

        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(1);
        }

        return parent.node_ops.symlink(parent, newname, oldpath);
      },
      rename: function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path); // parents must exist

        var lookup, old_dir, new_dir;

        try {
          lookup = FS.lookupPath(old_path, {
            parent: true
          });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, {
            parent: true
          });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(16);
        }

        if (!old_dir || !new_dir) throw new FS.ErrnoError(2); // need to be part of the same mount

        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(18);
        } // source must exist


        var old_node = FS.lookupNode(old_dir, old_name); // old path should not be an ancestor of the new path

        var relative = PATH_FS.relative(old_path, new_dirname);

        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(22);
        } // new path should not be an ancestor of the old path


        relative = PATH_FS.relative(new_path, old_dirname);

        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(39);
        } // see if the new path already exists


        var new_node;

        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {// not fatal
        } // early out if nothing needs to change


        if (old_node === new_node) {
          return;
        } // we'll need to delete the old entry


        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);

        if (err) {
          throw new FS.ErrnoError(err);
        } // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.


        err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);

        if (err) {
          throw new FS.ErrnoError(err);
        }

        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(1);
        }

        if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
          throw new FS.ErrnoError(16);
        } // if we are going to change the parent, check write permissions


        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');

          if (err) {
            throw new FS.ErrnoError(err);
          }
        }

        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch (e) {
          console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        } // remove the node from the lookup hash


        FS.hashRemoveNode(old_node); // do the underlying fs rename

        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }

        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch (e) {
          console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        }
      },
      rmdir: function (path) {
        var lookup = FS.lookupPath(path, {
          parent: true
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);

        if (err) {
          throw new FS.ErrnoError(err);
        }

        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(1);
        }

        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }

        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch (e) {
          console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }

        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);

        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch (e) {
          console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
      },
      readdir: function (path) {
        var lookup = FS.lookupPath(path, {
          follow: true
        });
        var node = lookup.node;

        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(20);
        }

        return node.node_ops.readdir(node);
      },
      unlink: function (path) {
        var lookup = FS.lookupPath(path, {
          parent: true
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);

        if (err) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(err);
        }

        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(1);
        }

        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }

        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch (e) {
          console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }

        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);

        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch (e) {
          console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
      },
      readlink: function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;

        if (!link) {
          throw new FS.ErrnoError(2);
        }

        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(22);
        }

        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
      stat: function (path, dontFollow) {
        var lookup = FS.lookupPath(path, {
          follow: !dontFollow
        });
        var node = lookup.node;

        if (!node) {
          throw new FS.ErrnoError(2);
        }

        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(1);
        }

        return node.node_ops.getattr(node);
      },
      lstat: function (path) {
        return FS.stat(path, true);
      },
      chmod: function (path, mode, dontFollow) {
        var node;

        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow
          });
          node = lookup.node;
        } else {
          node = path;
        }

        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }

        node.node_ops.setattr(node, {
          mode: mode & 4095 | node.mode & ~4095,
          timestamp: Date.now()
        });
      },
      lchmod: function (path, mode) {
        FS.chmod(path, mode, true);
      },
      fchmod: function (fd, mode) {
        var stream = FS.getStream(fd);

        if (!stream) {
          throw new FS.ErrnoError(9);
        }

        FS.chmod(stream.node, mode);
      },
      chown: function (path, uid, gid, dontFollow) {
        var node;

        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow
          });
          node = lookup.node;
        } else {
          node = path;
        }

        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }

        node.node_ops.setattr(node, {
          timestamp: Date.now() // we ignore the uid / gid for now

        });
      },
      lchown: function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
      fchown: function (fd, uid, gid) {
        var stream = FS.getStream(fd);

        if (!stream) {
          throw new FS.ErrnoError(9);
        }

        FS.chown(stream.node, uid, gid);
      },
      truncate: function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(22);
        }

        var node;

        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, {
            follow: true
          });
          node = lookup.node;
        } else {
          node = path;
        }

        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }

        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(21);
        }

        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(22);
        }

        var err = FS.nodePermissions(node, 'w');

        if (err) {
          throw new FS.ErrnoError(err);
        }

        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
      ftruncate: function (fd, len) {
        var stream = FS.getStream(fd);

        if (!stream) {
          throw new FS.ErrnoError(9);
        }

        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(22);
        }

        FS.truncate(stream.node, len);
      },
      utime: function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, {
          follow: true
        });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
      open: function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(2);
        }

        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438
        /* 0666 */
        : mode;

        if (flags & 64) {
          mode = mode & 4095 | 32768;
        } else {
          mode = 0;
        }

        var node;

        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);

          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {// ignore
          }
        } // perhaps we need to create the node


        var created = false;

        if (flags & 64) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if (flags & 128) {
              throw new FS.ErrnoError(17);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }

        if (!node) {
          throw new FS.ErrnoError(2);
        } // can't truncate a device


        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        } // if asked only for a directory, then this must be one


        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(20);
        } // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)


        if (!created) {
          var err = FS.mayOpen(node, flags);

          if (err) {
            throw new FS.ErrnoError(err);
          }
        } // do truncation if necessary


        if (flags & 512) {
          FS.truncate(node, 0);
        } // we've already handled these, don't pass down to the underlying vfs


        flags &= ~(128 | 512); // register the stream with the filesystem

        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),
          // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end); // call the new stream's open function

        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }

        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};

          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            console.log("FS.trackingDelegate error on read file: " + path);
          }
        }

        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;

            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }

            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }

            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch (e) {
          console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
        }

        return stream;
      },
      close: function (stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }

        if (stream.getdents) stream.getdents = null; // free readdir state

        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }

        stream.fd = null;
      },
      isClosed: function (stream) {
        return stream.fd === null;
      },
      llseek: function (stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }

        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(29);
        }

        if (whence != 0
        /* SEEK_SET */
        && whence != 1
        /* SEEK_CUR */
        && whence != 2
        /* SEEK_END */
        ) {
            throw new FS.ErrnoError(22);
          }

        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
      read: function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }

        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }

        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(9);
        }

        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }

        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(22);
        }

        var seeking = typeof position !== 'undefined';

        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }

        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
      write: function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }

        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }

        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }

        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }

        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(22);
        }

        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }

        var seeking = typeof position !== 'undefined';

        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }

        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;

        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch (e) {
          console.log("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
        }

        return bytesWritten;
      },
      allocate: function (stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }

        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(22);
        }

        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }

        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(19);
        }

        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(95);
        }

        stream.stream_ops.allocate(stream, offset, length);
      },
      mmap: function (stream, buffer, offset, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(13);
        }

        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(13);
        }

        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(19);
        }

        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },
      msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }

        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
      munmap: function (stream) {
        return 0;
      },
      ioctl: function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(25);
        }

        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile: function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';

        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }

        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);

        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }

        FS.close(stream);
        return ret;
      },
      writeFile: function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);

        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }

        FS.close(stream);
      },
      cwd: function () {
        return FS.currentPath;
      },
      chdir: function (path) {
        var lookup = FS.lookupPath(path, {
          follow: true
        });

        if (lookup.node === null) {
          throw new FS.ErrnoError(2);
        }

        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(20);
        }

        var err = FS.nodePermissions(lookup.node, 'x');

        if (err) {
          throw new FS.ErrnoError(err);
        }

        FS.currentPath = lookup.path;
      },
      createDefaultDirectories: function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
      createDefaultDevices: function () {
        // create /dev
        FS.mkdir('/dev'); // setup /dev/null

        FS.registerDevice(FS.makedev(1, 3), {
          read: function () {
            return 0;
          },
          write: function (stream, buffer, offset, length, pos) {
            return length;
          }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3)); // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.

        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0)); // setup /dev/[u]random

        var random_device;

        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);

          random_device = function () {
            crypto.getRandomValues(randomBuffer);
            return randomBuffer[0];
          };
        } else if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = empty$1; // nodejs has crypto support

            random_device = function () {
              return crypto_module['randomBytes'](1)[0];
            };
          } catch (e) {// nodejs doesn't have crypto support
          }
        } else ;

        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function () {
            abort("random_device");
          };
        }

        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device); // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly

        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
      createSpecialDirectories: function () {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function () {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511
            /* 0777 */
            , 73);
            node.node_ops = {
              lookup: function (parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(9);
                var ret = {
                  parent: null,
                  mount: {
                    mountpoint: 'fake'
                  },
                  node_ops: {
                    readlink: function () {
                      return stream.path;
                    }
                  }
                };
                ret.parent = ret; // make it look like a simple root node

                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
      createStandardStreams: function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }

        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }

        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        } // open default streams for the stdin, stdout and stderr devices


        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
      },
      ensureErrnoError: function () {
        if (FS.ErrnoError) return;

        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;

          this.setErrno = function (errno) {
            this.errno = errno;
          };

          this.setErrno(errno);
          this.message = 'FS error'; // Node.js compatibility: assigning on this.stack fails on Node 4 (but fixed on Node 8)

          if (this.stack) Object.defineProperty(this, "stack", {
            value: new Error().stack,
            writable: true
          });
        };

        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError; // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)

        [2].forEach(function (code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },
      staticInit: function () {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, '/');
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
          'WORKERFS': WORKERFS
        };
      },
      init: function (input, output, error) {
        FS.init.initialized = true;
        FS.ensureErrnoError(); // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here

        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
        FS.createStandardStreams();
      },
      quit: function () {
        FS.init.initialized = false; // force-flush all streams, so we get musl std streams printed out

        var fflush = Module['_fflush'];
        if (fflush) fflush(0); // close all of our streams

        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];

          if (!stream) {
            continue;
          }

          FS.close(stream);
        }
      },
      getMode: function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },
      joinPath: function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },
      absolutePath: function (relative, base) {
        return PATH_FS.resolve(base, relative);
      },
      standardizePath: function (path) {
        return PATH.normalize(path);
      },
      findObject: function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);

        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);

          return null;
        }
      },
      analyzePath: function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, {
            follow: !dontResolveLastLink
          });
          path = lookup.path;
        } catch (e) {}

        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };

        try {
          var lookup = FS.lookupPath(path, {
            parent: true
          });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, {
            follow: !dontResolveLastLink
          });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      },
      createFolder: function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },
      createPath: function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();

        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);

          try {
            FS.mkdir(current);
          } catch (e) {// ignore EEXIST
          }

          parent = current;
        }

        return current;
      },
      createFile: function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);

        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);

            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);

            data = arr;
          } // make sure we can write to the file


          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }

        return node;
      },
      createDevice: function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0); // Create a fake device that a set of stream ops to emulate
        // the old behavior.

        FS.registerDevice(dev, {
          open: function (stream) {
            stream.seekable = false;
          },
          close: function (stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function (stream, buffer, offset, length, pos
          /* ignored */
          ) {
            var bytesRead = 0;

            for (var i = 0; i < length; i++) {
              var result;

              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(5);
              }

              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(11);
              }

              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset + i] = result;
            }

            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }

            return bytesRead;
          },
          write: function (stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(5);
              }
            }

            if (length) {
              stream.node.timestamp = Date.now();
            }

            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
      createLink: function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },
      forceLoadFile: function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;

        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }

        if (!success) ___setErrNo(5);
        return success;
      },
      createLazyFile: function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }

        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return undefined;
          }

          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        };

        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };

        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024; // Chunk size in bytes

          if (!hasByteServing) chunkSize = datalength; // Function to get a range from the remote URL.

          var doXHR = function (from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!"); // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to); // Some hints to the browser that we want binary data.

            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';

            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }

            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);

            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          };

          var lazyArray = this;
          lazyArray.setDataGetter(function (chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum + 1) * chunkSize - 1; // including this byte

            end = Math.min(end, datalength - 1); // if datalength-1 is selected, this is the last block

            if (typeof lazyArray.chunks[chunkNum] === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }

            if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });

          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file

            datalength = this.getter(0).length;
            chunkSize = datalength;
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
          }

          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };

        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }

                return this._length;
              }
            },
            chunkSize: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }

                return this._chunkSize;
              }
            }
          });
          var properties = {
            isDevice: false,
            contents: lazyArray
          };
        } else {
          var properties = {
            isDevice: false,
            url: url
          };
        }

        var node = FS.createFile(parent, name, properties, canRead, canWrite); // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.

        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        } // Add a function that defers querying the file size until it is asked the first time.


        Object.defineProperties(node, {
          usedBytes: {
            get: function () {
              return this.contents.length;
            }
          }
        }); // override each stream op with one that tries to force load the lazy file first

        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function (key) {
          var fn = node.stream_ops[key];

          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(5);
            }

            return fn.apply(null, arguments);
          };
        }); // use a custom read function

        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(5);
          }

          var contents = stream.node.contents;
          if (position >= contents.length) return 0;
          var size = Math.min(contents.length - position, length);

          if (contents.slice) {
            // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }

          return size;
        };

        node.stream_ops = stream_ops;
        return node;
      },
      createPreloadedFile: function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways

        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;

        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();

            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }

            if (onload) onload();
            removeRunDependency();
          }

          var handled = false;
          Module['preloadPlugins'].forEach(function (plugin) {
            if (handled) return;

            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function () {
                if (onerror) onerror();
                removeRunDependency();
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }

        addRunDependency();

        if (typeof url == 'string') {
          Browser.asyncLoad(url, function (byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },
      indexedDB: function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },
      DB_NAME: function () {
        return 'EM_FS_' + window.location.pathname;
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: function (paths, onload, onerror) {
        onload = onload || function () {};

        onerror = onerror || function () {};

        var indexedDB = FS.indexedDB();

        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }

        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };

        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0,
              fail = 0,
              total = paths.length;

          function finish() {
            if (fail == 0) onload();else onerror();
          }

          paths.forEach(function (path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);

            putRequest.onsuccess = function putRequest_onsuccess() {
              ok++;
              if (ok + fail == total) finish();
            };

            putRequest.onerror = function putRequest_onerror() {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };

        openRequest.onerror = onerror;
      },
      loadFilesFromDB: function (paths, onload, onerror) {
        onload = onload || function () {};

        onerror = onerror || function () {};

        var indexedDB = FS.indexedDB();

        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }

        openRequest.onupgradeneeded = onerror; // no database to load from

        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;

          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch (e) {
            onerror(e);
            return;
          }

          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0,
              fail = 0,
              total = paths.length;

          function finish() {
            if (fail == 0) onload();else onerror();
          }

          paths.forEach(function (path) {
            var getRequest = files.get(path);

            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }

              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };

            getRequest.onerror = function getRequest_onerror() {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };

        openRequest.onerror = onerror;
      }
    };
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      mappings: {},
      umask: 511,
      calculateAt: function (dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;

          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(9);
            dir = dirstream.path;
          }

          path = PATH.join2(dir, path);
        }

        return path;
      },
      doStat: function (func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -20;
          }

          throw e;
        }

        HEAP32[buf >> 2] = stat.dev;
        HEAP32[buf + 4 >> 2] = 0;
        HEAP32[buf + 8 >> 2] = stat.ino;
        HEAP32[buf + 12 >> 2] = stat.mode;
        HEAP32[buf + 16 >> 2] = stat.nlink;
        HEAP32[buf + 20 >> 2] = stat.uid;
        HEAP32[buf + 24 >> 2] = stat.gid;
        HEAP32[buf + 28 >> 2] = stat.rdev;
        HEAP32[buf + 32 >> 2] = 0;
        tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1.0 ? tempDouble > 0.0 ? (Math_min(+Math_floor(tempDouble / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296.0) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
        HEAP32[buf + 48 >> 2] = 4096;
        HEAP32[buf + 52 >> 2] = stat.blocks;
        HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1000 | 0;
        HEAP32[buf + 60 >> 2] = 0;
        HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1000 | 0;
        HEAP32[buf + 68 >> 2] = 0;
        HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1000 | 0;
        HEAP32[buf + 76 >> 2] = 0;
        tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1.0 ? tempDouble > 0.0 ? (Math_min(+Math_floor(tempDouble / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296.0) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
        return 0;
      },
      doMsync: function (addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
      },
      doMkdir: function (path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1);
        FS.mkdir(path, mode, 0);
        return 0;
      },
      doMknod: function (path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;

          default:
            return -22;
        }

        FS.mknod(path, mode, dev);
        return 0;
      },
      doReadlink: function (path, buf, bufsize) {
        if (bufsize <= 0) return -22;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1); // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.

        HEAP8[buf + len] = endChar;
        return len;
      },
      doAccess: function (path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -22;
        }

        var node;
        var lookup = FS.lookupPath(path, {
          follow: true
        });
        node = lookup.node;
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';

        if (perms
        /* otherwise, they've just passed F_OK */
        && FS.nodePermissions(node, perms)) {
          return -13;
        }

        return 0;
      },
      doDup: function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },
      doReadv: function (stream, iov, iovcnt, offset) {
        var ret = 0;

        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.read(stream, HEAP8, ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }

        return ret;
      },
      doWritev: function (stream, iov, iovcnt, offset) {
        var ret = 0;

        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.write(stream, HEAP8, ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }

        return ret;
      },
      varargs: 0,
      get: function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      },
      getStr: function () {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
      },
      getStreamFromFD: function () {
        var stream = FS.getStream(SYSCALLS.get());
        if (!stream) throw new FS.ErrnoError(9);
        return stream;
      },
      get64: function () {
        var low = SYSCALLS.get(),
            high = SYSCALLS.get();
        return low;
      },
      getZero: function () {
        SYSCALLS.get();
      }
    };

    function ___syscall10(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // unlink
        var path = SYSCALLS.getStr();
        FS.unlink(path);
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall140(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // llseek
        var stream = SYSCALLS.getStreamFromFD(),
            offset_high = SYSCALLS.get(),
            offset_low = SYSCALLS.get(),
            result = SYSCALLS.get(),
            whence = SYSCALLS.get();
        var HIGH_OFFSET = 0x100000000; // 2^32
        // use an unsigned operator on low and shift high by 32-bits

        var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
        var DOUBLE_LIMIT = 0x20000000000000; // 2^53
        // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT

        if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
          return -75;
        }

        FS.llseek(stream, offset, whence);
        tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1.0 ? tempDouble > 0.0 ? (Math_min(+Math_floor(tempDouble / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296.0) >>> 0 : 0)], HEAP32[result >> 2] = tempI64[0], HEAP32[result + 4 >> 2] = tempI64[1];
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state

        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall145(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // readv
        var stream = SYSCALLS.getStreamFromFD(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        return SYSCALLS.doReadv(stream, iov, iovcnt);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall146(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // writev
        var stream = SYSCALLS.getStreamFromFD(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        return SYSCALLS.doWritev(stream, iov, iovcnt);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall194(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // ftruncate64
        var fd = SYSCALLS.get(),
            zero = SYSCALLS.getZero(),
            length = SYSCALLS.get64();
        FS.ftruncate(fd, length);
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall195(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // SYS_stat64
        var path = SYSCALLS.getStr(),
            buf = SYSCALLS.get();
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall197(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // SYS_fstat64
        var stream = SYSCALLS.getStreamFromFD(),
            buf = SYSCALLS.get();
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall221(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // fcntl64
        var stream = SYSCALLS.getStreamFromFD(),
            cmd = SYSCALLS.get();

        switch (cmd) {
          case 0:
            {
              var arg = SYSCALLS.get();

              if (arg < 0) {
                return -22;
              }

              var newStream;
              newStream = FS.open(stream.path, stream.flags, 0, arg);
              return newStream.fd;
            }

          case 1:
          case 2:
            return 0;
          // FD_CLOEXEC makes no sense for a single process.

          case 3:
            return stream.flags;

          case 4:
            {
              var arg = SYSCALLS.get();
              stream.flags |= arg;
              return 0;
            }

          case 12:
            /* case 12: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
            {
              var arg = SYSCALLS.get();
              var offset = 0; // We're always unlocked.

              HEAP16[arg + offset >> 1] = 2;
              return 0;
            }

          case 13:
          case 14:
            /* case 13: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */

            /* case 14: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
            return 0;
          // Pretend that the locking is successful.

          case 16:
          case 8:
            return -22;
          // These are for sockets. We don't have them fully implemented yet.

          case 9:
            // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
            ___setErrNo(22);

            return -1;

          default:
            {
              return -22;
            }
        }
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall33(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // access
        var path = SYSCALLS.getStr(),
            amode = SYSCALLS.get();
        return SYSCALLS.doAccess(path, amode);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall330(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // dup3
        var old = SYSCALLS.getStreamFromFD(),
            suggestFD = SYSCALLS.get(),
            flags = SYSCALLS.get();
        if (old.fd === suggestFD) return -22;
        return SYSCALLS.doDup(old.path, old.flags, suggestFD);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall5(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // open
        var pathname = SYSCALLS.getStr(),
            flags = SYSCALLS.get(),
            mode = SYSCALLS.get(); // optional TODO

        var stream = FS.open(pathname, flags, mode);
        return stream.fd;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall54(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // ioctl
        var stream = SYSCALLS.getStreamFromFD(),
            op = SYSCALLS.get();

        switch (op) {
          case 21509:
          case 21505:
            {
              if (!stream.tty) return -25;
              return 0;
            }

          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508:
            {
              if (!stream.tty) return -25;
              return 0; // no-op, not actually adjusting terminal settings
            }

          case 21519:
            {
              if (!stream.tty) return -25;
              var argp = SYSCALLS.get();
              HEAP32[argp >> 2] = 0;
              return 0;
            }

          case 21520:
            {
              if (!stream.tty) return -25;
              return -22; // not supported
            }

          case 21531:
            {
              var argp = SYSCALLS.get();
              return FS.ioctl(stream, op, argp);
            }

          case 21523:
            {
              // TODO: in theory we should write to the winsize struct that gets
              // passed in, but for now musl doesn't read anything on it
              if (!stream.tty) return -25;
              return 0;
            }

          case 21524:
            {
              // TODO: technically, this ioctl call should change the window size.
              // but, since emscripten doesn't have any concept of a terminal window
              // yet, we'll just silently throw it away as we do TIOCGWINSZ
              if (!stream.tty) return -25;
              return 0;
            }

          default:
            abort('bad ioctl syscall ' + op);
        }
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall6(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // close
        var stream = SYSCALLS.getStreamFromFD();
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall63(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // dup2
        var old = SYSCALLS.getStreamFromFD(),
            suggestFD = SYSCALLS.get();
        if (old.fd === suggestFD) return suggestFD;
        return SYSCALLS.doDup(old.path, old.flags, suggestFD);
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall91(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        // munmap
        var addr = SYSCALLS.get(),
            len = SYSCALLS.get();

        if (addr == -1 || len == 0) {
          return -22;
        } // TODO: support unmmap'ing parts of allocations


        var info = SYSCALLS.mappings[addr];
        if (!info) return 0;

        if (len === info.len) {
          var stream = FS.getStream(info.fd);
          SYSCALLS.doMsync(addr, stream, len, info.flags);
          FS.munmap(stream);
          SYSCALLS.mappings[addr] = null;

          if (info.allocated) {
            _free(info.malloc);
          }
        }

        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___unlock() {}

    var tupleRegistrations = {};

    function runDestructors(destructors) {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    }

    function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAPU32[pointer >> 2]);
    }

    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var char_0 = 48;
    var char_9 = 57;

    function makeLegalFunctionName(name) {
      if (undefined === name) {
        return '_unknown';
      }

      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);

      if (f >= char_0 && f <= char_9) {
        return '_' + name;
      } else {
        return name;
      }
    }

    function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      /*jshint evil:true*/

      return new Function("body", "return function " + name + "() {\n" + "    \"use strict\";" + "    return body.apply(this, arguments);\n" + "};\n")(body);
    }

    function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function (message) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;

        if (stack !== undefined) {
          this.stack = this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;

      errorClass.prototype.toString = function () {
        if (this.message === undefined) {
          return this.name;
        } else {
          return this.name + ': ' + this.message;
        }
      };

      return errorClass;
    }

    var InternalError = undefined;

    function throwInternalError(message) {
      throw new InternalError(message);
    }

    function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function (type) {
        typeDependencies[type] = dependentTypes;
      });

      function onComplete(typeConverters) {
        var myTypeConverters = getTypeConverters(typeConverters);

        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError('Mismatched type converter count');
        }

        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i]);
        }
      }

      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach(function (dt, i) {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);

          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }

          awaitingDependencies[dt].push(function () {
            typeConverters[i] = registeredTypes[dt];
            ++registered;

            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });

      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    }

    function __embind_finalize_value_array(rawTupleType) {
      var reg = tupleRegistrations[rawTupleType];
      delete tupleRegistrations[rawTupleType];
      var elements = reg.elements;
      var elementsLength = elements.length;
      var elementTypes = elements.map(function (elt) {
        return elt.getterReturnType;
      }).concat(elements.map(function (elt) {
        return elt.setterArgumentType;
      }));
      var rawConstructor = reg.rawConstructor;
      var rawDestructor = reg.rawDestructor;
      whenDependentTypesAreResolved([rawTupleType], elementTypes, function (elementTypes) {
        elements.forEach(function (elt, i) {
          var getterReturnType = elementTypes[i];
          var getter = elt.getter;
          var getterContext = elt.getterContext;
          var setterArgumentType = elementTypes[i + elementsLength];
          var setter = elt.setter;
          var setterContext = elt.setterContext;

          elt.read = function (ptr) {
            return getterReturnType['fromWireType'](getter(getterContext, ptr));
          };

          elt.write = function (ptr, o) {
            var destructors = [];
            setter(setterContext, ptr, setterArgumentType['toWireType'](destructors, o));
            runDestructors(destructors);
          };
        });
        return [{
          name: reg.name,
          'fromWireType': function (ptr) {
            var rv = new Array(elementsLength);

            for (var i = 0; i < elementsLength; ++i) {
              rv[i] = elements[i].read(ptr);
            }

            rawDestructor(ptr);
            return rv;
          },
          'toWireType': function (destructors, o) {
            if (elementsLength !== o.length) {
              throw new TypeError("Incorrect number of tuple elements for " + reg.name + ": expected=" + elementsLength + ", actual=" + o.length);
            }

            var ptr = rawConstructor();

            for (var i = 0; i < elementsLength; ++i) {
              elements[i].write(ptr, o[i]);
            }

            if (destructors !== null) {
              destructors.push(rawDestructor, ptr);
            }

            return ptr;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': simpleReadValueFromPointer,
          destructorFunction: rawDestructor
        }];
      });
    }

    function getShiftFromSize(size) {
      switch (size) {
        case 1:
          return 0;

        case 2:
          return 1;

        case 4:
          return 2;

        case 8:
          return 3;

        default:
          throw new TypeError('Unknown type size: ' + size);
      }
    }

    function embind_init_charCodes() {
      var codes = new Array(256);

      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
      }

      embind_charCodes = codes;
    }

    var embind_charCodes = undefined;

    function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;

      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
      }

      return ret;
    }

    var BindingError = undefined;

    function throwBindingError(message) {
      throw new BindingError(message);
    }

    function registerType(rawType, registeredInstance, options) {
      options = options || {};

      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }

      var name = registeredInstance.name;

      if (!rawType) {
        throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }

      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError("Cannot register type '" + name + "' twice");
        }
      }

      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];

      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach(function (cb) {
          cb();
        });
      }
    }

    function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (wt) {
          // ambiguous emscripten ABI: sometimes return values are
          // true or false, and sometimes integers (0 or 1)
          return !!wt;
        },
        'toWireType': function (destructors, o) {
          return o ? trueValue : falseValue;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': function (pointer) {
          // TODO: if heap is fixed (like in asm.js) this could be executed outside
          var heap;

          if (size === 1) {
            heap = HEAP8;
          } else if (size === 2) {
            heap = HEAP16;
          } else if (size === 4) {
            heap = HEAP32;
          } else {
            throw new TypeError("Unknown boolean type size: " + name);
          }

          return this['fromWireType'](heap[pointer >> shift]);
        },
        destructorFunction: null // This type does not need a destructor

      });
    }

    function ClassHandle_isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }

      if (!(other instanceof ClassHandle)) {
        return false;
      }

      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;

      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }

      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }

      return leftClass === rightClass && left === right;
    }

    function shallowCopyInternalPointer(o) {
      return {
        count: o.count,
        deleteScheduled: o.deleteScheduled,
        preservePointerOnDelete: o.preservePointerOnDelete,
        ptr: o.ptr,
        ptrType: o.ptrType,
        smartPtr: o.smartPtr,
        smartPtrType: o.smartPtrType
      };
    }

    function throwInstanceAlreadyDeleted(obj) {
      function getInstanceTypeName(handle) {
        return handle.$$.ptrType.registeredClass.name;
      }

      throwBindingError(getInstanceTypeName(obj) + ' instance already deleted');
    }

    var finalizationGroup = false;

    function detachFinalizer(handle) {}

    function runDestructor($$) {
      if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr);
      } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr);
      }
    }

    function releaseClassHandle($$) {
      $$.count.value -= 1;
      var toDelete = 0 === $$.count.value;

      if (toDelete) {
        runDestructor($$);
      }
    }

    function attachFinalizer(handle) {
      if ('undefined' === typeof FinalizationGroup) {
        attachFinalizer = function (handle) {
          return handle;
        };

        return handle;
      } // If the running environment has a FinalizationGroup (see
      // https://github.com/tc39/proposal-weakrefs), then attach finalizers
      // for class handles.  We check for the presence of FinalizationGroup
      // at run-time, not build-time.


      finalizationGroup = new FinalizationGroup(function (iter) {
        for (var result = iter.next(); !result.done; result = iter.next()) {
          var $$ = result.value;

          if (!$$.ptr) {
            console.warn('object already deleted: ' + $$.ptr);
          } else {
            releaseClassHandle($$);
          }
        }
      });

      attachFinalizer = function (handle) {
        finalizationGroup.register(handle, handle.$$, handle.$$);
        return handle;
      };

      detachFinalizer = function (handle) {
        finalizationGroup.unregister(handle.$$);
      };

      return attachFinalizer(handle);
    }

    function ClassHandle_clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }

      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
          $$: {
            value: shallowCopyInternalPointer(this.$$)
          }
        }));
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    }

    function ClassHandle_delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }

      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }

      detachFinalizer(this);
      releaseClassHandle(this.$$);

      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined;
        this.$$.ptr = undefined;
      }
    }

    function ClassHandle_isDeleted() {
      return !this.$$.ptr;
    }

    var delayFunction = undefined;
    var deletionQueue = [];

    function flushPendingDeletes() {
      while (deletionQueue.length) {
        var obj = deletionQueue.pop();
        obj.$$.deleteScheduled = false;
        obj['delete']();
      }
    }

    function ClassHandle_deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }

      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }

      deletionQueue.push(this);

      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }

      this.$$.deleteScheduled = true;
      return this;
    }

    function init_ClassHandle() {
      ClassHandle.prototype['isAliasOf'] = ClassHandle_isAliasOf;
      ClassHandle.prototype['clone'] = ClassHandle_clone;
      ClassHandle.prototype['delete'] = ClassHandle_delete;
      ClassHandle.prototype['isDeleted'] = ClassHandle_isDeleted;
      ClassHandle.prototype['deleteLater'] = ClassHandle_deleteLater;
    }

    function ClassHandle() {}

    var registeredPointers = {};

    function ensureOverloadTable(proto, methodName, humanName) {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName]; // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.

        proto[methodName] = function () {
          // TODO This check can be removed in -O3 level "unsafe" optimizations.
          if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
            throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
          }

          return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
        }; // Move the previous function into the overload table.


        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    }

    function exposePublicSymbol(name, value, numArguments) {
      if (Module.hasOwnProperty(name)) {
        if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
          throwBindingError("Cannot register public name '" + name + "' twice");
        } // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
        // that routes between the two.


        ensureOverloadTable(Module, name, name);

        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
        } // Add the new function into the overload table.


        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;

        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    }

    function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
      this.name = name;
      this.constructor = constructor;
      this.instancePrototype = instancePrototype;
      this.rawDestructor = rawDestructor;
      this.baseClass = baseClass;
      this.getActualType = getActualType;
      this.upcast = upcast;
      this.downcast = downcast;
      this.pureVirtualFunctions = [];
    }

    function upcastPointer(ptr, ptrClass, desiredClass) {
      while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
          throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
        }

        ptr = ptrClass.upcast(ptr);
        ptrClass = ptrClass.baseClass;
      }

      return ptr;
    }

    function constNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }

        return 0;
      }

      if (!handle.$$) {
        throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
      }

      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }

      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }

    function genericPointerToWireType(destructors, handle) {
      var ptr;

      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }

        if (this.isSmartPointer) {
          ptr = this.rawConstructor();

          if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr);
          }

          return ptr;
        } else {
          return 0;
        }
      }

      if (!handle.$$) {
        throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
      }

      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }

      if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError('Cannot convert argument of type ' + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + ' to parameter type ' + this.name);
      }

      var handleClass = handle.$$.ptrType.registeredClass;
      ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);

      if (this.isSmartPointer) {
        // TODO: this is not strictly true
        // We could support BY_EMVAL conversions from raw pointers to smart pointers
        // because the smart pointer can hold a reference to the handle
        if (undefined === handle.$$.smartPtr) {
          throwBindingError('Passing raw pointer to smart pointer is illegal');
        }

        switch (this.sharingPolicy) {
          case 0:
            // NONE
            // no upcasting
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              throwBindingError('Cannot convert argument of type ' + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + ' to parameter type ' + this.name);
            }

            break;

          case 1:
            // INTRUSIVE
            ptr = handle.$$.smartPtr;
            break;

          case 2:
            // BY_EMVAL
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              var clonedHandle = handle['clone']();
              ptr = this.rawShare(ptr, __emval_register(function () {
                clonedHandle['delete']();
              }));

              if (destructors !== null) {
                destructors.push(this.rawDestructor, ptr);
              }
            }

            break;

          default:
            throwBindingError('Unsupporting sharing policy');
        }
      }

      return ptr;
    }

    function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }

        return 0;
      }

      if (!handle.$$) {
        throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
      }

      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }

      if (handle.$$.ptrType.isConst) {
        throwBindingError('Cannot convert argument of type ' + handle.$$.ptrType.name + ' to parameter type ' + this.name);
      }

      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }

    function RegisteredPointer_getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }

      return ptr;
    }

    function RegisteredPointer_destructor(ptr) {
      if (this.rawDestructor) {
        this.rawDestructor(ptr);
      }
    }

    function RegisteredPointer_deleteObject(handle) {
      if (handle !== null) {
        handle['delete']();
      }
    }

    function downcastPointer(ptr, ptrClass, desiredClass) {
      if (ptrClass === desiredClass) {
        return ptr;
      }

      if (undefined === desiredClass.baseClass) {
        return null; // no conversion
      }

      var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);

      if (rv === null) {
        return null;
      }

      return desiredClass.downcast(rv);
    }

    function getInheritedInstanceCount() {
      return Object.keys(registeredInstances).length;
    }

    function getLiveInheritedInstances() {
      var rv = [];

      for (var k in registeredInstances) {
        if (registeredInstances.hasOwnProperty(k)) {
          rv.push(registeredInstances[k]);
        }
      }

      return rv;
    }

    function setDelayFunction(fn) {
      delayFunction = fn;

      if (deletionQueue.length && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
    }

    function init_embind() {
      Module['getInheritedInstanceCount'] = getInheritedInstanceCount;
      Module['getLiveInheritedInstances'] = getLiveInheritedInstances;
      Module['flushPendingDeletes'] = flushPendingDeletes;
      Module['setDelayFunction'] = setDelayFunction;
    }

    var registeredInstances = {};

    function getBasestPointer(class_, ptr) {
      if (ptr === undefined) {
        throwBindingError('ptr should not be undefined');
      }

      while (class_.baseClass) {
        ptr = class_.upcast(ptr);
        class_ = class_.baseClass;
      }

      return ptr;
    }

    function getInheritedInstance(class_, ptr) {
      ptr = getBasestPointer(class_, ptr);
      return registeredInstances[ptr];
    }

    function makeClassHandle(prototype, record) {
      if (!record.ptrType || !record.ptr) {
        throwInternalError('makeClassHandle requires ptr and ptrType');
      }

      var hasSmartPtrType = !!record.smartPtrType;
      var hasSmartPtr = !!record.smartPtr;

      if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError('Both smartPtrType and smartPtr must be specified');
      }

      record.count = {
        value: 1
      };
      return attachFinalizer(Object.create(prototype, {
        $$: {
          value: record
        }
      }));
    }

    function RegisteredPointer_fromWireType(ptr) {
      // ptr is a raw pointer (or a raw smartpointer)
      // rawPointer is a maybe-null raw pointer
      var rawPointer = this.getPointee(ptr);

      if (!rawPointer) {
        this.destructor(ptr);
        return null;
      }

      var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);

      if (undefined !== registeredInstance) {
        // JS object has been neutered, time to repopulate it
        if (0 === registeredInstance.$$.count.value) {
          registeredInstance.$$.ptr = rawPointer;
          registeredInstance.$$.smartPtr = ptr;
          return registeredInstance['clone']();
        } else {
          // else, just increment reference count on existing object
          // it already has a reference to the smart pointer
          var rv = registeredInstance['clone']();
          this.destructor(ptr);
          return rv;
        }
      }

      function makeDefaultHandle() {
        if (this.isSmartPointer) {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this.pointeeType,
            ptr: rawPointer,
            smartPtrType: this,
            smartPtr: ptr
          });
        } else {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this,
            ptr: ptr
          });
        }
      }

      var actualType = this.registeredClass.getActualType(rawPointer);
      var registeredPointerRecord = registeredPointers[actualType];

      if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this);
      }

      var toType;

      if (this.isConst) {
        toType = registeredPointerRecord.constPointerType;
      } else {
        toType = registeredPointerRecord.pointerType;
      }

      var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);

      if (dp === null) {
        return makeDefaultHandle.call(this);
      }

      if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
          smartPtrType: this,
          smartPtr: ptr
        });
      } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp
        });
      }
    }

    function init_RegisteredPointer() {
      RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
      RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
      RegisteredPointer.prototype['argPackAdvance'] = 8;
      RegisteredPointer.prototype['readValueFromPointer'] = simpleReadValueFromPointer;
      RegisteredPointer.prototype['deleteObject'] = RegisteredPointer_deleteObject;
      RegisteredPointer.prototype['fromWireType'] = RegisteredPointer_fromWireType;
    }

    function RegisteredPointer(name, registeredClass, isReference, isConst, // smart pointer properties
    isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
      this.name = name;
      this.registeredClass = registeredClass;
      this.isReference = isReference;
      this.isConst = isConst; // smart pointer properties

      this.isSmartPointer = isSmartPointer;
      this.pointeeType = pointeeType;
      this.sharingPolicy = sharingPolicy;
      this.rawGetPointee = rawGetPointee;
      this.rawConstructor = rawConstructor;
      this.rawShare = rawShare;
      this.rawDestructor = rawDestructor;

      if (!isSmartPointer && registeredClass.baseClass === undefined) {
        if (isConst) {
          this['toWireType'] = constNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        } else {
          this['toWireType'] = nonConstNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        }
      } else {
        this['toWireType'] = genericPointerToWireType; // Here we must leave this.destructorFunction undefined, since whether genericPointerToWireType returns
        // a pointer that needs to be freed up is runtime-dependent, and cannot be evaluated at registration time.
        // TODO: Create an alternative mechanism that allows removing the use of var destructors = []; array in
        //       craftInvokerFunction altogether.
      }
    }

    function replacePublicSymbol(name, value, numArguments) {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistant public symbol');
      } // If there's an overload table for this symbol, replace the symbol in the overload table instead.


      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    }

    function embind__requireFunction(signature, rawFunction) {
      signature = readLatin1String(signature);

      function makeDynCaller(dynCall) {
        var args = [];

        for (var i = 1; i < signature.length; ++i) {
          args.push('a' + i);
        }

        var name = 'dynCall_' + signature + '_' + rawFunction;
        var body = 'return function ' + name + '(' + args.join(', ') + ') {\n';
        body += '    return dynCall(rawFunction' + (args.length ? ', ' : '') + args.join(', ') + ');\n';
        body += '};\n';
        return new Function('dynCall', 'rawFunction', body)(dynCall, rawFunction);
      }

      var fp;

      if (Module['FUNCTION_TABLE_' + signature] !== undefined) {
        fp = Module['FUNCTION_TABLE_' + signature][rawFunction];
      } else if (typeof FUNCTION_TABLE !== "undefined") {
        fp = FUNCTION_TABLE[rawFunction];
      } else {
        // asm.js does not give direct access to the function tables,
        // and thus we must go through the dynCall interface which allows
        // calling into a signature's function table by pointer value.
        //
        // https://github.com/dherman/asm.js/issues/83
        //
        // This has three main penalties:
        // - dynCall is another function call in the path from JavaScript to C++.
        // - JITs may not predict through the function table indirection at runtime.
        var dc = Module['dynCall_' + signature];

        if (dc === undefined) {
          // We will always enter this branch if the signature
          // contains 'f' and PRECISE_F32 is not enabled.
          //
          // Try again, replacing 'f' with 'd'.
          dc = Module['dynCall_' + signature.replace(/f/g, 'd')];

          if (dc === undefined) {
            throwBindingError("No dynCall invoker for signature: " + signature);
          }
        }

        fp = makeDynCaller(dc);
      }

      if (typeof fp !== "function") {
        throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
      }

      return fp;
    }

    var UnboundTypeError = undefined;

    function getTypeName(type) {
      var ptr = ___getTypeName(type);

      var rv = readLatin1String(ptr);

      _free(ptr);

      return rv;
    }

    function throwUnboundTypeError(message, types) {
      var unboundTypes = [];
      var seen = {};

      function visit(type) {
        if (seen[type]) {
          return;
        }

        if (registeredTypes[type]) {
          return;
        }

        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }

        unboundTypes.push(type);
        seen[type] = true;
      }

      types.forEach(visit);
      throw new UnboundTypeError(message + ': ' + unboundTypes.map(getTypeName).join([', ']));
    }

    function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
      name = readLatin1String(name);
      getActualType = embind__requireFunction(getActualTypeSignature, getActualType);

      if (upcast) {
        upcast = embind__requireFunction(upcastSignature, upcast);
      }

      if (downcast) {
        downcast = embind__requireFunction(downcastSignature, downcast);
      }

      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
      var legalFunctionName = makeLegalFunctionName(name);
      exposePublicSymbol(legalFunctionName, function () {
        // this code cannot run if baseClassRawType is zero
        throwUnboundTypeError('Cannot construct ' + name + ' due to unbound types', [baseClassRawType]);
      });
      whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function (base) {
        base = base[0];
        var baseClass;
        var basePrototype;

        if (baseClassRawType) {
          baseClass = base.registeredClass;
          basePrototype = baseClass.instancePrototype;
        } else {
          basePrototype = ClassHandle.prototype;
        }

        var constructor = createNamedFunction(legalFunctionName, function () {
          if (Object.getPrototypeOf(this) !== instancePrototype) {
            throw new BindingError("Use 'new' to construct " + name);
          }

          if (undefined === registeredClass.constructor_body) {
            throw new BindingError(name + " has no accessible constructor");
          }

          var body = registeredClass.constructor_body[arguments.length];

          if (undefined === body) {
            throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
          }

          return body.apply(this, arguments);
        });
        var instancePrototype = Object.create(basePrototype, {
          constructor: {
            value: constructor
          }
        });
        constructor.prototype = instancePrototype;
        var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
        var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
        var pointerConverter = new RegisteredPointer(name + '*', registeredClass, false, false, false);
        var constPointerConverter = new RegisteredPointer(name + ' const*', registeredClass, false, true, false);
        registeredPointers[rawType] = {
          pointerType: pointerConverter,
          constPointerType: constPointerConverter
        };
        replacePublicSymbol(legalFunctionName, constructor);
        return [referenceConverter, pointerConverter, constPointerConverter];
      });
    }

    function heap32VectorToArray(count, firstElement) {
      var array = [];

      for (var i = 0; i < count; i++) {
        array.push(HEAP32[(firstElement >> 2) + i]);
      }

      return array;
    }

    function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      invoker = embind__requireFunction(invokerSignature, invoker);
      whenDependentTypesAreResolved([], [rawClassType], function (classType) {
        classType = classType[0];
        var humanName = 'constructor ' + classType.name;

        if (undefined === classType.registeredClass.constructor_body) {
          classType.registeredClass.constructor_body = [];
        }

        if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
          throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        }

        classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
          throwUnboundTypeError('Cannot construct ' + classType.name + ' due to unbound types', rawArgTypes);
        };

        whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
          classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
            if (arguments.length !== argCount - 1) {
              throwBindingError(humanName + ' called with ' + arguments.length + ' arguments, expected ' + (argCount - 1));
            }

            var destructors = [];
            var args = new Array(argCount);
            args[0] = rawConstructor;

            for (var i = 1; i < argCount; ++i) {
              args[i] = argTypes[i]['toWireType'](destructors, arguments[i - 1]);
            }

            var ptr = invoker.apply(null, args);
            runDestructors(destructors);
            return argTypes[0]['fromWireType'](ptr);
          };

          return [];
        });
        return [];
      });
    }

    function new_(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
        throw new TypeError('new_ called with constructor type ' + typeof constructor + " which is not a function");
      }
      /*
       * Previously, the following line was just:
           function dummy() {};
           * Unfortunately, Chrome was preserving 'dummy' as the object's name, even though at creation, the 'dummy' has the
       * correct constructor name.  Thus, objects created with IMVU.new would show up in the debugger as 'dummy', which
       * isn't very helpful.  Using IMVU.createNamedFunction addresses the issue.  Doublely-unfortunately, there's no way
       * to write a test for this behavior.  -NRD 2013.02.22
       */


      var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function () {});
      dummy.prototype = constructor.prototype;
      var obj = new dummy();
      var r = constructor.apply(obj, argumentList);
      return r instanceof Object ? r : obj;
    }

    function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
      // humanName: a human-readable string name for the function to be generated.
      // argTypes: An array that contains the embind type objects for all types in the function signature.
      //    argTypes[0] is the type object for the function return value.
      //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
      //    argTypes[2...] are the actual function parameters.
      // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
      // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
      // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
      var argCount = argTypes.length;

      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }

      var isClassMethodFunc = argTypes[1] !== null && classType !== null; // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
      // TODO: This omits argument count check - enable only at -O3 or similar.
      //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
      //       return FUNCTION_TABLE[fn];
      //    }
      // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
      // TODO: Remove this completely once all function invokers are being dynamically generated.

      var needsDestructorStack = false;

      for (var i = 1; i < argTypes.length; ++i) {
        // Skip return value at index 0 - it's not deleted here.
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
          // The type does not define a destructor function - must use dynamic stack
          needsDestructorStack = true;
          break;
        }
      }

      var returns = argTypes[0].name !== "void";
      var argsList = "";
      var argsListWired = "";

      for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i !== 0 ? ", " : "") + "arg" + i;
        argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
      }

      var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n";

      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }

      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
      var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];

      if (isClassMethodFunc) {
        invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
      }

      for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
        args1.push("argType" + i);
        args2.push(argTypes[i + 2]);
      }

      if (isClassMethodFunc) {
        argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
      }

      invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";

      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
          // Skip return value at index 0 - it's not deleted here. Also skip class type if not a method.
          var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";

          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
            args1.push(paramName + "_dtor");
            args2.push(argTypes[i].destructorFunction);
          }
        }
      }

      if (returns) {
        invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
      }

      invokerFnBody += "}\n";
      args1.push(invokerFnBody);
      var invokerFunction = new_(Function, args1).apply(null, args2);
      return invokerFunction;
    }

    function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, // [ReturnType, ThisType, Args...]
    invokerSignature, rawInvoker, context, isPureVirtual) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = readLatin1String(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
      whenDependentTypesAreResolved([], [rawClassType], function (classType) {
        classType = classType[0];
        var humanName = classType.name + '.' + methodName;

        if (isPureVirtual) {
          classType.registeredClass.pureVirtualFunctions.push(methodName);
        }

        function unboundTypesHandler() {
          throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes);
        }

        var proto = classType.registeredClass.instancePrototype;
        var method = proto[methodName];

        if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
          // This is the first overload to be registered, OR we are replacing a function in the base class with a function in the derived class.
          unboundTypesHandler.argCount = argCount - 2;
          unboundTypesHandler.className = classType.name;
          proto[methodName] = unboundTypesHandler;
        } else {
          // There was an existing function with the same name registered. Set up a function overload routing table.
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
        }

        whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
          var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context); // Replace the initial unbound-handler-stub function with the appropriate member function, now that all types
          // are resolved. If multiple overloads are registered for this function, the function goes into an overload table.

          if (undefined === proto[methodName].overloadTable) {
            // Set argCount in case an overload is registered later
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction;
          } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction;
          }

          return [];
        });
        return [];
      });
    }

    var emval_free_list = [];
    var emval_handle_array = [{}, {
      value: undefined
    }, {
      value: null
    }, {
      value: true
    }, {
      value: false
    }];

    function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = undefined;
        emval_free_list.push(handle);
      }
    }

    function count_emval_handles() {
      var count = 0;

      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          ++count;
        }
      }

      return count;
    }

    function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          return emval_handle_array[i];
        }
      }

      return null;
    }

    function init_emval() {
      Module['count_emval_handles'] = count_emval_handles;
      Module['get_first_emval'] = get_first_emval;
    }

    function __emval_register(value) {
      switch (value) {
        case undefined:
          {
            return 1;
          }

        case null:
          {
            return 2;
          }

        case true:
          {
            return 3;
          }

        case false:
          {
            return 4;
          }

        default:
          {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = {
              refcount: 1,
              value: value
            };
            return handle;
          }
      }
    }

    function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (handle) {
          var rv = emval_handle_array[handle].value;

          __emval_decref(handle);

          return rv;
        },
        'toWireType': function (destructors, value) {
          return __emval_register(value);
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: null // This type does not need a destructor
        // TODO: do we need a deleteObject here?  write a test where
        // emval is passed into JS via an interface

      });
    }

    function _embind_repr(v) {
      if (v === null) {
        return 'null';
      }

      var t = typeof v;

      if (t === 'object' || t === 'array' || t === 'function') {
        return v.toString();
      } else {
        return '' + v;
      }
    }

    function floatReadValueFromPointer(name, shift) {
      switch (shift) {
        case 2:
          return function (pointer) {
            return this['fromWireType'](HEAPF32[pointer >> 2]);
          };

        case 3:
          return function (pointer) {
            return this['fromWireType'](HEAPF64[pointer >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + name);
      }
    }

    function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          return value;
        },
        'toWireType': function (destructors, value) {
          // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
          // avoid the following if() and assume value is of proper type.
          if (typeof value !== "number" && typeof value !== "boolean") {
            throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
          }

          return value;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': floatReadValueFromPointer(name, shift),
        destructorFunction: null // This type does not need a destructor

      });
    }

    function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
      rawInvoker = embind__requireFunction(signature, rawInvoker);
      exposePublicSymbol(name, function () {
        throwUnboundTypeError('Cannot call ' + name + ' due to unbound types', argTypes);
      }, argCount - 1);
      whenDependentTypesAreResolved([], argTypes, function (argTypes) {
        var invokerArgsArray = [argTypes[0]
        /* return value */
        , null
        /* no class 'this'*/
        ].concat(argTypes.slice(1)
        /* actual params */
        );
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null
        /* no class 'this'*/
        , rawInvoker, fn), argCount - 1);
        return [];
      });
    }

    function integerReadValueFromPointer(name, shift, signed) {
      // integers are quite common, so generate very specialized functions
      switch (shift) {
        case 0:
          return signed ? function readS8FromPointer(pointer) {
            return HEAP8[pointer];
          } : function readU8FromPointer(pointer) {
            return HEAPU8[pointer];
          };

        case 1:
          return signed ? function readS16FromPointer(pointer) {
            return HEAP16[pointer >> 1];
          } : function readU16FromPointer(pointer) {
            return HEAPU16[pointer >> 1];
          };

        case 2:
          return signed ? function readS32FromPointer(pointer) {
            return HEAP32[pointer >> 2];
          } : function readU32FromPointer(pointer) {
            return HEAPU32[pointer >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + name);
      }
    }

    function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);

      if (maxRange === -1) {
        // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come out as 'i32 -1'. Always treat those as max u32.
        maxRange = 4294967295;
      }

      var shift = getShiftFromSize(size);

      var fromWireType = function (value) {
        return value;
      };

      if (minRange === 0) {
        var bitshift = 32 - 8 * size;

        fromWireType = function (value) {
          return value << bitshift >>> bitshift;
        };
      }

      var isUnsignedType = name.indexOf('unsigned') != -1;
      registerType(primitiveType, {
        name: name,
        'fromWireType': fromWireType,
        'toWireType': function (destructors, value) {
          // todo: Here we have an opportunity for -O3 level "unsafe" optimizations: we could
          // avoid the following two if()s and assume value is of proper type.
          if (typeof value !== "number" && typeof value !== "boolean") {
            throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
          }

          if (value < minRange || value > maxRange) {
            throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ', ' + maxRange + ']!');
          }

          return isUnsignedType ? value >>> 0 : value | 0;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': integerReadValueFromPointer(name, shift, minRange !== 0),
        destructorFunction: null // This type does not need a destructor

      });
    }

    function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
      var TA = typeMapping[dataTypeIndex];

      function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle]; // in elements

        var data = heap[handle + 1]; // byte offset into emscripten heap

        return new TA(heap['buffer'], data, size);
      }

      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': decodeMemoryView,
        'argPackAdvance': 8,
        'readValueFromPointer': decodeMemoryView
      }, {
        ignoreDuplicateRegistrations: true
      });
    }

    function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8 //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = name === "std::string";
      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          var length = HEAPU32[value >> 2];
          var str;

          if (stdStringIsUTF8) {
            //ensure null termination at one-past-end byte if not present yet
            var endChar = HEAPU8[value + 4 + length];
            var endCharSwap = 0;

            if (endChar != 0) {
              endCharSwap = endChar;
              HEAPU8[value + 4 + length] = 0;
            }

            var decodeStartPtr = value + 4; //looping here to support possible embedded '0' bytes

            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i;

              if (HEAPU8[currentBytePtr] == 0) {
                var stringSegment = UTF8ToString(decodeStartPtr);
                if (str === undefined) str = stringSegment;else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }

            if (endCharSwap != 0) HEAPU8[value + 4 + length] = endCharSwap;
          } else {
            var a = new Array(length);

            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
            }

            str = a.join('');
          }

          _free(value);

          return str;
        },
        'toWireType': function (destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }

          var getLength;
          var valueIsOfTypeString = typeof value === 'string';

          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError('Cannot pass non-string to std::string');
          }

          if (stdStringIsUTF8 && valueIsOfTypeString) {
            getLength = function () {
              return lengthBytesUTF8(value);
            };
          } else {
            getLength = function () {
              return value.length;
            };
          } // assumes 4-byte alignment


          var length = getLength();

          var ptr = _malloc(4 + length + 1);

          HEAPU32[ptr >> 2] = length;

          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr + 4, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);

                if (charCode > 255) {
                  _free(ptr);

                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }

                HEAPU8[ptr + 4 + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + 4 + i] = value[i];
              }
            }
          }

          if (destructors !== null) {
            destructors.push(_free, ptr);
          }

          return ptr;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        }
      });
    }

    function __embind_register_std_wstring(rawType, charSize, name) {
      // nb. do not cache HEAPU16 and HEAPU32, they may be destroyed by emscripten_resize_heap().
      name = readLatin1String(name);
      var getHeap, shift;

      if (charSize === 2) {
        getHeap = function () {
          return HEAPU16;
        };

        shift = 1;
      } else if (charSize === 4) {
        getHeap = function () {
          return HEAPU32;
        };

        shift = 2;
      }

      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          var HEAP = getHeap();
          var length = HEAPU32[value >> 2];
          var a = new Array(length);
          var start = value + 4 >> shift;

          for (var i = 0; i < length; ++i) {
            a[i] = String.fromCharCode(HEAP[start + i]);
          }

          _free(value);

          return a.join('');
        },
        'toWireType': function (destructors, value) {
          // assumes 4-byte alignment
          var HEAP = getHeap();
          var length = value.length;

          var ptr = _malloc(4 + length * charSize);

          HEAPU32[ptr >> 2] = length;
          var start = ptr + 4 >> shift;

          for (var i = 0; i < length; ++i) {
            HEAP[start + i] = value.charCodeAt(i);
          }

          if (destructors !== null) {
            destructors.push(_free, ptr);
          }

          return ptr;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        }
      });
    }

    function __embind_register_value_array(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
      tupleRegistrations[rawType] = {
        name: readLatin1String(name),
        rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
        rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
        elements: []
      };
    }

    function __embind_register_value_array_element(rawTupleType, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
      tupleRegistrations[rawTupleType].elements.push({
        getterReturnType: getterReturnType,
        getter: embind__requireFunction(getterSignature, getter),
        getterContext: getterContext,
        setterArgumentType: setterArgumentType,
        setter: embind__requireFunction(setterSignature, setter),
        setterContext: setterContext
      });
    }

    function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true,
        // void return values can be optimized out sometimes
        name: name,
        'argPackAdvance': 0,
        'fromWireType': function () {
          return undefined;
        },
        'toWireType': function (destructors, o) {
          // TODO: assert if anything else is given?
          return undefined;
        }
      });
    }

    function __emval_incref(handle) {
      if (handle > 4) {
        emval_handle_array[handle].refcount += 1;
      }
    }

    function requireRegisteredType(rawType, humanName) {
      var impl = registeredTypes[rawType];

      if (undefined === impl) {
        throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
      }

      return impl;
    }

    function __emval_take_value(type, argv) {
      type = requireRegisteredType(type, '_emval_take_value');
      var v = type['readValueFromPointer'](argv);
      return __emval_register(v);
    }

    function _abort() {
      Module['abort']();
    }

    function _emscripten_get_heap_size() {
      return HEAP8.length;
    }

    function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }

    function _getenv(name) {
      // char *getenv(const char *name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/getenv.html
      if (name === 0) return 0;
      name = UTF8ToString(name);
      if (!ENV.hasOwnProperty(name)) return 0;
      if (_getenv.ret) _free(_getenv.ret);
      _getenv.ret = allocateUTF8(ENV[name]);
      return _getenv.ret;
    }

    function _llvm_stackrestore(p) {
      var self = _llvm_stacksave;
      var ret = self.LLVM_SAVEDSTACKS[p];
      self.LLVM_SAVEDSTACKS.splice(p, 1);
      stackRestore(ret);
    }

    function _llvm_stacksave() {
      var self = _llvm_stacksave;

      if (!self.LLVM_SAVEDSTACKS) {
        self.LLVM_SAVEDSTACKS = [];
      }

      self.LLVM_SAVEDSTACKS.push(stackSave());
      return self.LLVM_SAVEDSTACKS.length - 1;
    }

    function _llvm_trap() {
      abort('trap!');
    }

    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
    }

    function _pthread_cond_wait() {
      return 0;
    }

    function abortOnCannotGrowMemory(requestedSize) {
      abort('OOM');
    }

    function emscripten_realloc_buffer(size) {
      var PAGE_MULTIPLE = 65536;
      size = alignUp(size, PAGE_MULTIPLE); // round up to wasm page size

      var oldSize = buffer.byteLength; // native wasm support
      // note that this is *not* threadsafe. multiple threads can call .grow(), and each
      // presents a delta, so in theory we may over-allocate here (e.g. if two threads
      // ask to grow from 256MB to 512MB, we get 2 requests to add +256MB, and may end
      // up growing to 768MB (even though we may have been able to make do with 512MB).
      // TODO: consider decreasing the step sizes in emscripten_resize_heap

      try {
        var result = wasmMemory.grow((size - oldSize) / 65536); // .grow() takes a delta compared to the previous size

        if (result !== (-1 | 0)) {
          // success in native wasm memory growth, get the buffer from the memory
          buffer = wasmMemory.buffer;
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }

    function _emscripten_resize_heap(requestedSize) {
      var oldSize = _emscripten_get_heap_size(); // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.


      var PAGE_MULTIPLE = 65536;
      var LIMIT = 2147483648 - PAGE_MULTIPLE; // We can do one page short of 2GB as theoretical maximum.

      if (requestedSize > LIMIT) {
        return false;
      }

      var MIN_TOTAL_MEMORY = 16777216;
      var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY); // So the loop below will not be infinite, and minimum asm.js memory size is 16MB.
      // TODO: see realloc_buffer - for PTHREADS we may want to decrease these jumps

      while (newSize < requestedSize) {
        // Keep incrementing the heap size as long as it's less than what is requested.
        if (newSize <= 536870912) {
          newSize = alignUp(2 * newSize, PAGE_MULTIPLE); // Simple heuristic: double until 1GB...
        } else {
          // ..., but after that, add smaller increments towards 2GB, which we cannot reach
          newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
        }
      }

      if (!emscripten_realloc_buffer(newSize)) {
        return false;
      }

      updateGlobalBufferViews();
      return true;
    }

    function _signal(sig, func) {

      return 0;
    }

    function __isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    function __arraySum(array, index) {
      var sum = 0;

      for (var i = 0; i <= index; sum += array[i++]);

      return sum;
    }

    var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function __addDays(date, days) {
      var newDate = new Date(date.getTime());

      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());

        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];

        if (days > daysInCurrentMonth - newDate.getDate()) {
          // we spill over to next month
          days -= daysInCurrentMonth - newDate.getDate() + 1;
          newDate.setDate(1);

          if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1);
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear() + 1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate() + days);
          return newDate;
        }
      }

      return newDate;
    }

    function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      var tm_zone = HEAP32[tm + 40 >> 2];
      var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[tm + 4 >> 2],
        tm_hour: HEAP32[tm + 8 >> 2],
        tm_mday: HEAP32[tm + 12 >> 2],
        tm_mon: HEAP32[tm + 16 >> 2],
        tm_year: HEAP32[tm + 20 >> 2],
        tm_wday: HEAP32[tm + 24 >> 2],
        tm_yday: HEAP32[tm + 28 >> 2],
        tm_isdst: HEAP32[tm + 32 >> 2],
        tm_gmtoff: HEAP32[tm + 36 >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
      var pattern = UTF8ToString(format); // expand format

      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',
        // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',
        // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',
        // Equivalent to %Y - %m - %d
        '%h': '%b',
        // Equivalent to %b
        '%r': '%I:%M:%S %p',
        // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',
        // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',
        // Replaced by the time
        '%x': '%m/%d/%y',
        // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',
        // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',
        // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',
        // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',
        // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',
        // Replaced by the locale's alternative time representation.
        '%Ey': '%y',
        // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',
        // Replaced by the full alternative year representation.
        '%Od': '%d',
        // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',
        // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',
        // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',
        // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',
        // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',
        // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',
        // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',
        // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',
        // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',
        // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',
        // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',
        // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y' // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.

      };

      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }

      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : value || '';

        while (str.length < digits) {
          str = character[0] + str;
        }

        return str;
      }

      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }

      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : value > 0 ? 1 : 0;
        }
        var compare;

        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate());
          }
        }

        return compare;
      }

      function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
          case 0:
            // Sunday
            return new Date(janFourth.getFullYear() - 1, 11, 29);

          case 1:
            // Monday
            return janFourth;

          case 2:
            // Tuesday
            return new Date(janFourth.getFullYear(), 0, 3);

          case 3:
            // Wednesday
            return new Date(janFourth.getFullYear(), 0, 2);

          case 4:
            // Thursday
            return new Date(janFourth.getFullYear(), 0, 1);

          case 5:
            // Friday
            return new Date(janFourth.getFullYear() - 1, 11, 31);

          case 6:
            // Saturday
            return new Date(janFourth.getFullYear() - 1, 11, 30);
        }
      }

      function getWeekBasedYear(date) {
        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);

        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);

        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
          // this date is after the start of the first week of this year
          if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1;
          } else {
            return thisDate.getFullYear();
          }
        } else {
          return thisDate.getFullYear() - 1;
        }
      }
      var EXPANSION_RULES_2 = {
        '%a': function (date) {
          return WEEKDAYS[date.tm_wday].substring(0, 3);
        },
        '%A': function (date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function (date) {
          return MONTHS[date.tm_mon].substring(0, 3);
        },
        '%B': function (date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function (date) {
          var year = date.tm_year + 1900;
          return leadingNulls(year / 100 | 0, 2);
        },
        '%d': function (date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function (date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function (date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function (date) {
          return getWeekBasedYear(date);
        },
        '%H': function (date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function (date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function (date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
        },
        '%m': function (date) {
          return leadingNulls(date.tm_mon + 1, 2);
        },
        '%M': function (date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function () {
          return '\n';
        },
        '%p': function (date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function (date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function () {
          return '\t';
        },
        '%u': function (date) {
          return date.tm_wday || 7;
        },
        '%U': function (date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Sunday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year + 1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
          var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday); // is target date after the first Sunday?

          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
            var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
            var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
            return leadingNulls(Math.ceil(days / 7), 2);
          }

          return compareByDay(firstSunday, janFirst) === 0 ? '01' : '00';
        },
        '%V': function (date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);

          var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);

          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          }

          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          } // given date is in between CW 01..53 of this calendar year


          var daysDifference;

          if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
          }

          return leadingNulls(Math.ceil(daysDifference / 7), 2);
        },
        '%w': function (date) {
          return date.tm_wday;
        },
        '%W': function (date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Monday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
          var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday); // is target date after the first Monday?

          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
            var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
            var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
            return leadingNulls(Math.ceil(days / 7), 2);
          }

          return compareByDay(firstMonday, janFirst) === 0 ? '01' : '00';
        },
        '%y': function (date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year + 1900).toString().substring(2);
        },
        '%Y': function (date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year + 1900;
        },
        '%z': function (date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60; // convert from minutes into hhmm format (which means 60 minutes = 100 units)

          off = off / 60 * 100 + off % 60;
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function (date) {
          return date.tm_zone;
        },
        '%%': function () {
          return '%';
        }
      };

      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }

      var bytes = intArrayFromString(pattern, false);

      if (bytes.length > maxsize) {
        return 0;
      }

      writeArrayToMemory(bytes, s);
      return bytes.length - 1;
    }

    function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }

    if (ENVIRONMENT_IS_NODE) {
      _emscripten_get_now = function _emscripten_get_now_actual() {
        var t = process['hrtime']();
        return t[0] * 1e3 + t[1] / 1e6;
      };
    } else if (typeof dateNow !== 'undefined') {
      _emscripten_get_now = dateNow;
    } else if (typeof performance === 'object' && performance && typeof performance['now'] === 'function') {
      _emscripten_get_now = function () {
        return performance['now']();
      };
    } else {
      _emscripten_get_now = Date.now;
    }
    FS.staticInit();

    if (ENVIRONMENT_HAS_NODE) {
      var fs = empty$1;
      var NODEJS_PATH = path$1;
      NODEFS.staticInit();
    }
    InternalError = Module['InternalError'] = extendError(Error, 'InternalError');
    embind_init_charCodes();
    BindingError = Module['BindingError'] = extendError(Error, 'BindingError');
    init_ClassHandle();
    init_RegisteredPointer();
    init_embind();
    UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError');
    init_emval();
    // Emscripten is available under two separate licenses, the MIT license and the
    // University of Illinois/NCSA Open Source License.  Both these licenses can be
    // found in the LICENSE file.

    /** @type {function(string, boolean=, number=)} */

    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    }


    var asmGlobalArg = {};
    var asmLibraryArg = {
      "abort": abort,
      "setTempRet0": setTempRet0,
      "getTempRet0": getTempRet0,
      "ClassHandle": ClassHandle,
      "ClassHandle_clone": ClassHandle_clone,
      "ClassHandle_delete": ClassHandle_delete,
      "ClassHandle_deleteLater": ClassHandle_deleteLater,
      "ClassHandle_isAliasOf": ClassHandle_isAliasOf,
      "ClassHandle_isDeleted": ClassHandle_isDeleted,
      "RegisteredClass": RegisteredClass,
      "RegisteredPointer": RegisteredPointer,
      "RegisteredPointer_deleteObject": RegisteredPointer_deleteObject,
      "RegisteredPointer_destructor": RegisteredPointer_destructor,
      "RegisteredPointer_fromWireType": RegisteredPointer_fromWireType,
      "RegisteredPointer_getPointee": RegisteredPointer_getPointee,
      "___assert_fail": ___assert_fail,
      "___buildEnvironment": ___buildEnvironment,
      "___clock_gettime": ___clock_gettime,
      "___cxa_allocate_exception": ___cxa_allocate_exception,
      "___cxa_begin_catch": ___cxa_begin_catch,
      "___cxa_throw": ___cxa_throw,
      "___cxa_uncaught_exception": ___cxa_uncaught_exception,
      "___exception_addRef": ___exception_addRef,
      "___exception_deAdjust": ___exception_deAdjust,
      "___gxx_personality_v0": ___gxx_personality_v0,
      "___lock": ___lock,
      "___map_file": ___map_file,
      "___setErrNo": ___setErrNo,
      "___syscall10": ___syscall10,
      "___syscall140": ___syscall140,
      "___syscall145": ___syscall145,
      "___syscall146": ___syscall146,
      "___syscall194": ___syscall194,
      "___syscall195": ___syscall195,
      "___syscall197": ___syscall197,
      "___syscall221": ___syscall221,
      "___syscall33": ___syscall33,
      "___syscall330": ___syscall330,
      "___syscall5": ___syscall5,
      "___syscall54": ___syscall54,
      "___syscall6": ___syscall6,
      "___syscall63": ___syscall63,
      "___syscall91": ___syscall91,
      "___unlock": ___unlock,
      "__addDays": __addDays,
      "__arraySum": __arraySum,
      "__embind_finalize_value_array": __embind_finalize_value_array,
      "__embind_register_bool": __embind_register_bool,
      "__embind_register_class": __embind_register_class,
      "__embind_register_class_constructor": __embind_register_class_constructor,
      "__embind_register_class_function": __embind_register_class_function,
      "__embind_register_emval": __embind_register_emval,
      "__embind_register_float": __embind_register_float,
      "__embind_register_function": __embind_register_function,
      "__embind_register_integer": __embind_register_integer,
      "__embind_register_memory_view": __embind_register_memory_view,
      "__embind_register_std_string": __embind_register_std_string,
      "__embind_register_std_wstring": __embind_register_std_wstring,
      "__embind_register_value_array": __embind_register_value_array,
      "__embind_register_value_array_element": __embind_register_value_array_element,
      "__embind_register_void": __embind_register_void,
      "__emval_decref": __emval_decref,
      "__emval_incref": __emval_incref,
      "__emval_register": __emval_register,
      "__emval_take_value": __emval_take_value,
      "__isLeapYear": __isLeapYear,
      "_abort": _abort,
      "_clock_gettime": _clock_gettime,
      "_embind_repr": _embind_repr,
      "_emscripten_get_heap_size": _emscripten_get_heap_size,
      "_emscripten_get_now": _emscripten_get_now,
      "_emscripten_get_now_is_monotonic": _emscripten_get_now_is_monotonic,
      "_emscripten_memcpy_big": _emscripten_memcpy_big,
      "_emscripten_resize_heap": _emscripten_resize_heap,
      "_exit": _exit,
      "_getenv": _getenv,
      "_llvm_stackrestore": _llvm_stackrestore,
      "_llvm_stacksave": _llvm_stacksave,
      "_llvm_trap": _llvm_trap,
      "_pthread_cond_wait": _pthread_cond_wait,
      "_signal": _signal,
      "_strftime": _strftime,
      "_strftime_l": _strftime_l,
      "abortOnCannotGrowMemory": abortOnCannotGrowMemory,
      "attachFinalizer": attachFinalizer,
      "constNoSmartPtrRawPointerToWireType": constNoSmartPtrRawPointerToWireType,
      "count_emval_handles": count_emval_handles,
      "craftInvokerFunction": craftInvokerFunction,
      "createNamedFunction": createNamedFunction,
      "detachFinalizer": detachFinalizer,
      "downcastPointer": downcastPointer,
      "embind__requireFunction": embind__requireFunction,
      "embind_init_charCodes": embind_init_charCodes,
      "emscripten_realloc_buffer": emscripten_realloc_buffer,
      "ensureOverloadTable": ensureOverloadTable,
      "exposePublicSymbol": exposePublicSymbol,
      "extendError": extendError,
      "floatReadValueFromPointer": floatReadValueFromPointer,
      "flushPendingDeletes": flushPendingDeletes,
      "genericPointerToWireType": genericPointerToWireType,
      "getBasestPointer": getBasestPointer,
      "getInheritedInstance": getInheritedInstance,
      "getInheritedInstanceCount": getInheritedInstanceCount,
      "getLiveInheritedInstances": getLiveInheritedInstances,
      "getShiftFromSize": getShiftFromSize,
      "getTypeName": getTypeName,
      "get_first_emval": get_first_emval,
      "heap32VectorToArray": heap32VectorToArray,
      "init_ClassHandle": init_ClassHandle,
      "init_RegisteredPointer": init_RegisteredPointer,
      "init_embind": init_embind,
      "init_emval": init_emval,
      "integerReadValueFromPointer": integerReadValueFromPointer,
      "makeClassHandle": makeClassHandle,
      "makeLegalFunctionName": makeLegalFunctionName,
      "new_": new_,
      "nonConstNoSmartPtrRawPointerToWireType": nonConstNoSmartPtrRawPointerToWireType,
      "readLatin1String": readLatin1String,
      "registerType": registerType,
      "releaseClassHandle": releaseClassHandle,
      "replacePublicSymbol": replacePublicSymbol,
      "requireRegisteredType": requireRegisteredType,
      "runDestructor": runDestructor,
      "runDestructors": runDestructors,
      "setDelayFunction": setDelayFunction,
      "shallowCopyInternalPointer": shallowCopyInternalPointer,
      "simpleReadValueFromPointer": simpleReadValueFromPointer,
      "throwBindingError": throwBindingError,
      "throwInstanceAlreadyDeleted": throwInstanceAlreadyDeleted,
      "throwInternalError": throwInternalError,
      "throwUnboundTypeError": throwUnboundTypeError,
      "upcastPointer": upcastPointer,
      "whenDependentTypesAreResolved": whenDependentTypesAreResolved,
      "tempDoublePtr": tempDoublePtr,
      "DYNAMICTOP_PTR": DYNAMICTOP_PTR
    }; // EMSCRIPTEN_START_ASM

    var asm = Module["asm"] // EMSCRIPTEN_END_ASM
    (asmGlobalArg, asmLibraryArg, buffer);
    Module["asm"] = asm;

    var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = function () {
      return Module["asm"]["__ZSt18uncaught_exceptionv"].apply(null, arguments);
    };

    var ___cxa_can_catch = Module["___cxa_can_catch"] = function () {
      return Module["asm"]["___cxa_can_catch"].apply(null, arguments);
    };

    var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function () {
      return Module["asm"]["___cxa_is_pointer_type"].apply(null, arguments);
    };

    var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function () {
      return Module["asm"]["___embind_register_native_and_builtin_types"].apply(null, arguments);
    };

    var ___errno_location = Module["___errno_location"] = function () {
      return Module["asm"]["___errno_location"].apply(null, arguments);
    };

    var ___getTypeName = Module["___getTypeName"] = function () {
      return Module["asm"]["___getTypeName"].apply(null, arguments);
    };

    var __get_environ = Module["__get_environ"] = function () {
      return Module["asm"]["__get_environ"].apply(null, arguments);
    };

    var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = function () {
      return Module["asm"]["_emscripten_replace_memory"].apply(null, arguments);
    };

    var _free = Module["_free"] = function () {
      return Module["asm"]["_free"].apply(null, arguments);
    };

    var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = function () {
      return Module["asm"]["_llvm_bswap_i32"].apply(null, arguments);
    };

    var _llvm_round_f64 = Module["_llvm_round_f64"] = function () {
      return Module["asm"]["_llvm_round_f64"].apply(null, arguments);
    };

    var _main = Module["_main"] = function () {
      return Module["asm"]["_main"].apply(null, arguments);
    };

    var _malloc = Module["_malloc"] = function () {
      return Module["asm"]["_malloc"].apply(null, arguments);
    };

    var _memcpy = Module["_memcpy"] = function () {
      return Module["asm"]["_memcpy"].apply(null, arguments);
    };

    var _memmove = Module["_memmove"] = function () {
      return Module["asm"]["_memmove"].apply(null, arguments);
    };

    var _memset = Module["_memset"] = function () {
      return Module["asm"]["_memset"].apply(null, arguments);
    };

    var _pthread_cond_broadcast = Module["_pthread_cond_broadcast"] = function () {
      return Module["asm"]["_pthread_cond_broadcast"].apply(null, arguments);
    };

    var _sbrk = Module["_sbrk"] = function () {
      return Module["asm"]["_sbrk"].apply(null, arguments);
    };

    var establishStackSpace = Module["establishStackSpace"] = function () {
      return Module["asm"]["establishStackSpace"].apply(null, arguments);
    };

    var globalCtors = Module["globalCtors"] = function () {
      return Module["asm"]["globalCtors"].apply(null, arguments);
    };

    var stackAlloc = Module["stackAlloc"] = function () {
      return Module["asm"]["stackAlloc"].apply(null, arguments);
    };

    var stackRestore = Module["stackRestore"] = function () {
      return Module["asm"]["stackRestore"].apply(null, arguments);
    };

    var stackSave = Module["stackSave"] = function () {
      return Module["asm"]["stackSave"].apply(null, arguments);
    };

    var dynCall_dii = Module["dynCall_dii"] = function () {
      return Module["asm"]["dynCall_dii"].apply(null, arguments);
    };

    var dynCall_i = Module["dynCall_i"] = function () {
      return Module["asm"]["dynCall_i"].apply(null, arguments);
    };

    var dynCall_ii = Module["dynCall_ii"] = function () {
      return Module["asm"]["dynCall_ii"].apply(null, arguments);
    };

    var dynCall_iidiiii = Module["dynCall_iidiiii"] = function () {
      return Module["asm"]["dynCall_iidiiii"].apply(null, arguments);
    };

    var dynCall_iii = Module["dynCall_iii"] = function () {
      return Module["asm"]["dynCall_iii"].apply(null, arguments);
    };

    var dynCall_iiii = Module["dynCall_iiii"] = function () {
      return Module["asm"]["dynCall_iiii"].apply(null, arguments);
    };

    var dynCall_iiiii = Module["dynCall_iiiii"] = function () {
      return Module["asm"]["dynCall_iiiii"].apply(null, arguments);
    };

    var dynCall_iiiiid = Module["dynCall_iiiiid"] = function () {
      return Module["asm"]["dynCall_iiiiid"].apply(null, arguments);
    };

    var dynCall_iiiiidi = Module["dynCall_iiiiidi"] = function () {
      return Module["asm"]["dynCall_iiiiidi"].apply(null, arguments);
    };

    var dynCall_iiiiii = Module["dynCall_iiiiii"] = function () {
      return Module["asm"]["dynCall_iiiiii"].apply(null, arguments);
    };

    var dynCall_iiiiiid = Module["dynCall_iiiiiid"] = function () {
      return Module["asm"]["dynCall_iiiiiid"].apply(null, arguments);
    };

    var dynCall_iiiiiididi = Module["dynCall_iiiiiididi"] = function () {
      return Module["asm"]["dynCall_iiiiiididi"].apply(null, arguments);
    };

    var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function () {
      return Module["asm"]["dynCall_iiiiiii"].apply(null, arguments);
    };

    var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function () {
      return Module["asm"]["dynCall_iiiiiiii"].apply(null, arguments);
    };

    var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function () {
      return Module["asm"]["dynCall_iiiiiiiii"].apply(null, arguments);
    };

    var dynCall_iiiiij = Module["dynCall_iiiiij"] = function () {
      return Module["asm"]["dynCall_iiiiij"].apply(null, arguments);
    };

    var dynCall_jiji = Module["dynCall_jiji"] = function () {
      return Module["asm"]["dynCall_jiji"].apply(null, arguments);
    };

    var dynCall_v = Module["dynCall_v"] = function () {
      return Module["asm"]["dynCall_v"].apply(null, arguments);
    };

    var dynCall_vi = Module["dynCall_vi"] = function () {
      return Module["asm"]["dynCall_vi"].apply(null, arguments);
    };

    var dynCall_vii = Module["dynCall_vii"] = function () {
      return Module["asm"]["dynCall_vii"].apply(null, arguments);
    };

    var dynCall_viid = Module["dynCall_viid"] = function () {
      return Module["asm"]["dynCall_viid"].apply(null, arguments);
    };

    var dynCall_viii = Module["dynCall_viii"] = function () {
      return Module["asm"]["dynCall_viii"].apply(null, arguments);
    };

    var dynCall_viiii = Module["dynCall_viiii"] = function () {
      return Module["asm"]["dynCall_viiii"].apply(null, arguments);
    };

    var dynCall_viiiidi = Module["dynCall_viiiidi"] = function () {
      return Module["asm"]["dynCall_viiiidi"].apply(null, arguments);
    };

    var dynCall_viiiii = Module["dynCall_viiiii"] = function () {
      return Module["asm"]["dynCall_viiiii"].apply(null, arguments);
    };

    var dynCall_viiiiididi = Module["dynCall_viiiiididi"] = function () {
      return Module["asm"]["dynCall_viiiiididi"].apply(null, arguments);
    };

    var dynCall_viiiiii = Module["dynCall_viiiiii"] = function () {
      return Module["asm"]["dynCall_viiiiii"].apply(null, arguments);
    };

    var dynCall_viijii = Module["dynCall_viijii"] = function () {
      return Module["asm"]["dynCall_viijii"].apply(null, arguments);
    };

    Module['asm'] = asm;
    /**
     * @constructor
     * @extends {Error}
     * @this {ExitStatus}
     */

    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    ExitStatus.prototype = new Error();
    ExitStatus.prototype.constructor = ExitStatus;

    dependenciesFulfilled = function runCaller() {
      // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
      if (!Module['calledRun']) run();
      if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
    };

    Module['callMain'] = function callMain(args) {
      args = args || [];
      var argc = args.length + 1;
      var argv = stackAlloc((argc + 1) * 4);
      HEAP32[argv >> 2] = allocateUTF8OnStack(Module['thisProgram']);

      for (var i = 1; i < argc; i++) {
        HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
      }

      HEAP32[(argv >> 2) + argc] = 0;

      try {
        var ret = Module['_main'](argc, argv, 0); // if we're not running an evented main loop, it's time to exit

        exit(ret,
        /* implicit = */
        true);
      } catch (e) {
        if (e instanceof ExitStatus) {
          // exit() throws this once it's done to make sure execution
          // has been stopped completely
          return;
        } else if (e == 'SimulateInfiniteLoop') {
          // running an evented main loop, don't immediately exit
          Module['noExitRuntime'] = true;
          return;
        } else {
          var toLog = e;

          if (e && typeof e === 'object' && e.stack) {
            toLog = [e, e.stack];
          }

          err('exception thrown: ' + toLog);
          Module['quit'](1, e);
        }
      } finally {
      }
    };
    /** @type {function(Array=)} */


    function run(args) {
      args = args || Module['arguments'];

      if (runDependencies > 0) {
        return;
      }

      preRun();
      if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

      if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

      function doRun() {
        if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening

        Module['calledRun'] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();
        if (Module['_main'] && shouldRunNow) Module['callMain'](args);
        postRun();
      }

      if (Module['setStatus']) {
        Module['setStatus']('Running...');
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('');
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }

    Module['run'] = run;

    function exit(status, implicit) {
      // if this is just main exit-ing implicitly, and the status is 0, then we
      // don't need to do anything here and can just leave. if the status is
      // non-zero, though, then we need to report it.
      // (we may have warned about this earlier, if a situation justifies doing so)
      if (implicit && Module['noExitRuntime'] && status === 0) {
        return;
      }

      if (Module['noExitRuntime']) ; else {
        ABORT = true;
        if (Module['onExit']) Module['onExit'](status);
      }

      Module['quit'](status, new ExitStatus(status));
    }

    function abort(what) {
      if (Module['onAbort']) {
        Module['onAbort'](what);
      }

      if (what !== undefined) {
        out(what);
        err(what);
        what = '"' + what + '"';
      } else {
        what = '';
      }

      ABORT = true;
      throw 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';
    }

    Module['abort'] = abort;

    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];

      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()();
      }
    } // shouldRunNow refers to calling main(), not run().


    var shouldRunNow = true;

    if (Module['noInitialRun']) {
      shouldRunNow = false;
    }

    Module["noExitRuntime"] = true;
    run(); // {{MODULE_ADDITIONS}}
  });

  const {
    waitingAsync: waitingAsync$1,
    format: format$1,
    twoDimArrayRange: twoDimArrayRange$1,
    toFixed: toFixed$1
  } = util$1;
  const {
    isVector: isVector$2,
    vectorToArray: vectorToArray$1
  } = vector;
  let _initialized = false;

  build.onRuntimeInitialized = () => {
    _initialized = true;
  };

  class Calculate extends file {
    constructor() {
      super();
    }

    get calculateLib() {
      return build;
    }

    get initialized() {
      return _initialized;
    } // Waiting for webAssembly to initialize


    async onInitialized() {
      let time = await waitingAsync$1(20, 15000, () => this.initialized).catch(() => {
        throw new Error('[ xrd-calculate ] Initialization timed out.');
      });
      return time;
    }
    /**
     * @function 解析cif文件，转换为xrd数据
     * @param {String} filepath cif文件路径 
     * @param {Object} options 可选项
     *                 - theta2Min {Number} 2theta的最小值， 默认为0
     *                 - theta2Max {Number} 2theta的最大值， 默认为50
     *                 - raySource {String} 射线源，默认为'CuKa1'
     *                 - smooth {Boolean} 是否进行平滑降噪处理， 默认为true
     *                 - smoothStep {Number} 平滑处理的步进， 默认为0.02
     *                 - scaled {Boolean} 是否将intensity转换为相对百分比， 默认为false
     *                 - decimalX {Number} 2theta值的小数位精度， 默认为原始值
     *                 - decimalY {Number} intensity值的小数位精度， 默认为原始值
     *                 - dataFormat {String} 返回的单个数据项格式，可选值：object/array。默认为'object'，即：[{x:3,y:100},{x:4,y:100.5}...]
     * @return {Promise} 成功：resolve(xrdData)， xrdData为转换后的结果。失败：reject(error)
     */


    async cifToXrd(filepath, options) {
      await waitingAsync$1(20, 2000, () => this.initialized).catch(() => {
        throw new Error('[ xrd-calculate ] Not initialized yet, or has failed to initialize.');
      });
      filepath = path$1.resolve(filepath);
      if (!(await this.isExist(filepath))) throw new Error(`[ xrd-calculate ] No such file: ${filepath}`);
      let theta2Min = options && typeof options.theta2Min === 'number' && options.theta2Min >= 0 && options.theta2Min <= 100 ? options.theta2Min : 0;
      let theta2Max = options && typeof options.theta2Max === 'number' && options.theta2Max >= 0 && options.theta2Max <= 100 ? options.theta2Max : 50;
      if (theta2Min > theta2Max) throw new Error(`[ xrd-calculate ] theta2Min(${theta2Min}) must be less than theta2Max(${theta2Max})`);
      let raySource = options && typeof options.raySource === 'string' && options.raySource ? options.raySource : 'CuKa1';
      let symprec = options && typeof options.symprec === 'number' && options.symprec >= 0 ? options.symprec : 0.01;
      let smooth = options && options.smooth === false ? false : true;
      let smoothStep = options && typeof options.smoothStep === 'number' && options.smoothStep >= 0 ? options.smoothStep : 0.02;
      let scaled = !!(options && options.scaled === true);
      let fileData = await this.readFile(filepath, 'base64').catch(err => {
        throw err;
      });
      let xrdDataVec = build.cifToXrd(fileData, theta2Min, theta2Max, raySource, symprec, smooth, smoothStep, scaled);
      return format$1(xrdDataVec, this.getBasename(filepath), options);
    }
    /**
     * @function 对xrd数据进行平滑降噪处理
     * @param {Array} xrdArray xrd数据，如：[[3,100],[4,100.5]...]
     * @param {Object} options 可选项
     *                 - theta2Min {Number} 2theta的最小值， 默认为0
     *                 - theta2Max {Number} 2theta的最大值， 默认为50
     *                 - smoothStep {Number} 平滑处理的步进， 默认为0.02
     *                 - scaled {Boolean} 是否将intensity转换为相对百分比， 默认为false
     *                 - yIndex {Number} 取xrdArray中单个数据项的第几个作为intensity， 默认为1，即取[3,100]中的100作为intensity值
     *                 - update {Boolean} 是否用平滑后的数据更新xrdArray， 默认为false，即不更新
     * @return {Promise} 成功：resolve(result)， 当update为false时，result为平滑后的xrd数据；当update为true时，result为更新后的xrdArray。失败：reject(error)
     */


    async smooth(xrdArray, options) {
      await waitingAsync$1(20, 2000, () => this.initialized).catch(() => {
        throw new Error('[ xrd-calculate ] Not initialized yet, or has failed to initialize.');
      });
      if (!(Array.isArray(xrdArray) && xrdArray.length > 0)) throw new Error('[ xrd-calculate ] Invalid xrd array.');
      let theta2Min = options && typeof options.theta2Min === 'number' && options.theta2Min >= 0 && options.theta2Min <= 100 ? options.theta2Min : 0;
      let theta2Max = options && typeof options.theta2Max === 'number' && options.theta2Max >= 0 && options.theta2Max <= 100 ? options.theta2Max : 50;
      if (theta2Min > theta2Max) throw new Error(`[ xrd-calculate ] theta2Min(${theta2Min}) must be less than theta2Max(${theta2Max})`);
      let smoothStep = options && typeof options.smoothStep === 'number' && options.smoothStep >= 0 ? options.smoothStep : 0.02;
      let scaled = !!(options && options.scaled === true);
      let yIndex = options && typeof options.yIndex === 'number' && options.yIndex >= 1 ? options.yIndex : 1;
      let update = !!(options && options.update === true);
      let xrdVec = new build.XrdVector();

      for (let i = 0; i < xrdArray.length; i++) {
        let xrdItem = xrdArray[i];
        if (!(Array.isArray(xrdItem) && xrdItem.length >= yIndex + 1)) throw new Error('[ xrd-calculate ] Invalid xrd array item.');
        xrdVec.push_back([xrdItem[0], xrdItem[yIndex]]);
      }

      let output = build.smooth(xrdVec, theta2Min, theta2Max, smoothStep, scaled);
      if (!(isVector$2(output) && output.size() > 0)) throw new Error(`[ xrd-calculate ] The output of smooth is invalid.`);

      if (update) {
        xrdArray.splice(0, xrdArray.length);
        xrdArray.length = output.size();

        for (let i = 0; i < output.size(); i++) {
          let item = [];
          item.length = yIndex + 1;
          item.fill(output.get(i)[1]);
          item[0] = output.get(i)[0];
          xrdArray[i] = item;
        }

        return xrdArray;
      } else {
        return vectorToArray$1(output);
      }
    }
    /**
     * @function 对xrd数据进行归一化处理
     * @param {Array} xrdArray xrd数据，如：[[3,100],[4,100.5]...]
     * @param {Object} options 可选项
     *                 - decimal {Number} 归一化后的数据精度（小数点后的位数），默认为3
     *                 - yIndex {Number} 取xrdArray中单个数据项的第几个作为intensity， 默认为1，即取[3,100]中的100作为intensity值
     *                 - update {Boolean} 是否用归一化后的数据更新xrdArray， 默认为false，即不更新
     * @return {Array} 返回归一化后的结果。update为false时返回新数组，update为true时返回处理后的输入数组
     */


    normalize(xrdArray, options) {
      if (!(Array.isArray(xrdArray) && xrdArray.length > 0)) throw new Error('[ xrd-calculate ] Invalid xrd array.');
      let yIndex = options && typeof options.yIndex === 'number' && options.yIndex >= 1 ? options.yIndex : 1;
      let update = !!(options && options.update === true);
      let decimal = options && typeof options.decimal === 'number' && options.decimal > 0 && options.decimal < 20 ? options.decimal : null;

      if (update) {
        let [min, max] = twoDimArrayRange$1(xrdArray, yIndex);

        for (let i = 0; i < xrdArray.length; i++) {
          let raw = xrdArray[i][yIndex];
          let normalized = (raw - min) * 100 / max;
          xrdArray[i][yIndex] = decimal ? toFixed$1(normalized, decimal) : normalized;
        }

        return xrdArray;
      } else {
        let arr = [];
        let [min, max] = twoDimArrayRange$1(xrdArray, yIndex);

        for (let i = 0; i < xrdArray.length; i++) {
          let normalized = (xrdArray[i][yIndex] - min) * 100 / max;
          decimal ? normalized = toFixed$1(normalized, decimal) : '';
          arr.push([xrdArray[i][0], normalized]);
        }

        return arr;
      }
    }

  }

  var calculate = Calculate;

  var src$2 = {
    Calculate: calculate
  };

  /**
   * Create Analysis with predicted XRD pattern
   * @export
   * @param {String} fileName - path to CIF
   * @param {Object} options - options for the XRD prediction
   * @returns Analysis
   */

  async function predictPattern(fileName, options) {
    const xrdCalc = new src$2.Calculate();
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
        label: '2ϴ [°]'
      },
      y: {
        data: y,
        label: 'counts'
      }
    };
    analysis.pushSpectrum(variables, {
      title: 'Predicted XRD pattern',
      meta: {
        xUnits: '2ϴ [°]',
        fileName: xrd[0].filename,
        lambda: xrd[0].lambda,
        yUnits: 'counts',
        dataType: 'XRD pattern',
        origin: 'Pattern predicted from CIF using xrd-calculate'
      },
      dataType: 'XRD pattern'
    });
    return analysis;
  }

  exports.AnalysesManager = AnalysesManager;
  exports.Analysis = Analysis;
  exports.fromBRML = fromBRML;
  exports.fromJcamp = fromJcamp;
  exports.fromPowDLLXY = fromPowDLLXY;
  exports.getJSGraph = getJSGraph;
  exports.getNormalizationAnnotations = getNormalizationAnnotations;
  exports.predictPattern = predictPattern;
  exports.toJcamp = toJcamp;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xrd-analysis.js.map
