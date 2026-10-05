'use strict';

// The query string an endpoint reads, from what the user typed into a step.
// Only the endpoint's own fields are sent, booleans go as "true"/"false" (the
// API reads strings off the query string), and empty values are dropped.
const toQuery = (inputData, fields) => {
  const params = {};
  for (const field of fields) {
    const value = inputData ? inputData[field.key] : undefined;
    if (value === undefined || value === null || value === '') {
      continue;
    }
    if (typeof value === 'boolean') {
      params[field.key] = value ? 'true' : 'false';
    } else {
      params[field.key] = String(value);
    }
  }
  return params;
};

// A key/value ("dict") field without the empty rows Zapier's editor leaves in.
const cleanDict = (value) => {
  const out = {};
  for (const [k, v] of Object.entries(value || {})) {
    if (k && k.trim() !== '' && v !== undefined && v !== null && v !== '') {
      out[k.trim()] = v;
    }
  }
  return out;
};

const truthy = (value) => value === true || value === 'true' || value === 'yes' || value === '1' || value === 1;

module.exports = { toQuery, cleanDict, truthy };
