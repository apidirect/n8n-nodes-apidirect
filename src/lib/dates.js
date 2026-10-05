'use strict';

// API Direct returns most timestamps as "YYYY-MM-DD HH:MM:SS" in UTC (some
// with a trailing " UTC"). Zapier wants ISO 8601 with a timezone, so every
// such string becomes "YYYY-MM-DDTHH:MM:SSZ" before it leaves a step.
const DATE_RE = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(?: UTC)?$/;

const normalizeDates = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeDates);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizeDates(v);
    }
    return out;
  }
  if (typeof value === 'string') {
    const m = DATE_RE.exec(value.trim());
    if (m) {
      return `${m[1]}T${m[2]}Z`;
    }
  }
  return value;
};

module.exports = { normalizeDates };
