'use strict';

// Zapier's publishing checks, run locally on every generated entry.
const App = require('../index');
const catalog = require('../src/catalog');

const all = [
  ...Object.values(App.triggers).map((t) => ({ kind: 'trigger', ...t })),
  ...Object.values(App.creates).map((c) => ({ kind: 'create', ...c })),
  ...Object.values(App.searches).map((s) => ({ kind: 'search', ...s })),
];

const isTitleCase = (label) =>
  label.split(' ').every((w) => /^[A-Z0-9(]/.test(w) || ['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'].includes(w));

const DATE_LIKE = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;

const walk = (value, fn, path = '') => {
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, fn, `${path}[${i}]`));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walk(v, fn, `${path}.${k}`));
  else fn(value, path);
};

const sampleValue = (sample, key) => {
  // Resolves Zapier output field keys: a__b for nested objects, a[]b for line items.
  const [head, ...rest] = key.split('[]');
  const get = (obj, dotted) => dotted.split('__').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  let value = get(sample, head);
  for (const part of rest) {
    if (!Array.isArray(value) || !value.length) return undefined;
    value = get(value[0], part);
  }
  return value;
};

describe('every step', () => {
  it.each(all.map((s) => [s.kind, s.key]))('%s %s meets the publishing checks', (kind, key) => {
    const step = all.find((s) => s.kind === kind && s.key === key);
    expect(key).toMatch(/^[a-zA-Z]+[a-zA-Z0-9_]*$/);
    expect(step.noun).toBeTruthy();
    if (!step.display.hidden) {
      expect(step.display.label.length).toBeLessThanOrEqual(64);
      expect(isTitleCase(step.display.label)).toBe(true);
      expect(step.display.description.length).toBeLessThanOrEqual(1000);
      expect(step.display.description.endsWith('.')).toBe(true);
      expect(step.display.description).not.toMatch(/\*\*|\[.*\]\(/);
      if (kind === 'trigger') expect(step.display.description.startsWith('Triggers when ')).toBe(true);
      else expect(step.display.description).toMatch(/^[A-Z][a-z]+s /);
    }
    expect(step.operation.sample).toBeTruthy();
    if (kind === 'trigger') {
      expect(step.operation.sample.id).toBeTruthy();
      expect(typeof step.operation.sample.id).toBe('string');
    }
    // D023: sample dates are ISO 8601 with a timezone
    walk(step.operation.sample, (v, p) => {
      if (typeof v === 'string' && DATE_LIKE.test(v)) expect({ p, v, ok: ISO.test(v) }).toEqual({ p, v, ok: true });
    });
    // D024: static output fields exist in the sample with the declared type
    const fields = (step.operation.outputFields || []).filter((f) => typeof f !== 'function');
    const keys = new Set();
    for (const f of fields) {
      expect(keys.has(f.key)).toBe(false);
      keys.add(f.key);
      const v = sampleValue(step.operation.sample, f.key);
      if (f.type === 'number' || f.type === 'integer') expect({ key: f.key, type: typeof v }).toEqual({ key: f.key, type: 'number' });
      if (f.type === 'boolean') expect({ key: f.key, type: typeof v }).toEqual({ key: f.key, type: 'boolean' });
    }
    // input fields: unique keys, help text that adds to the label, choices with values
    const inputs = step.operation.inputFields || [];
    const inputKeys = new Set();
    for (const f of inputs) {
      expect(inputKeys.has(f.key)).toBe(false);
      inputKeys.add(f.key);
      if (f.helpText) expect(f.helpText.toLowerCase()).not.toBe(f.label.toLowerCase());
      if (f.default !== undefined) expect(typeof f.default).toBe('string');
      if (f.choices && f.default !== undefined && !f.dynamic) expect(Object.keys(f.choices)).toContain(f.default);
    }
    if (kind === 'search') expect(inputs.length).toBeGreaterThan(0);
  });

  it('uses unique labels across visible steps', () => {
    const labels = all.filter((s) => !s.display.hidden).map((s) => s.display.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('covers every operation in the spec', () => {
    const spec = require('../spec/openapi.json');
    const covered = new Set([
      ...catalog.map((e) => e.path),
      '/v1/time', // Check API Key
      '/v1/batch', // Run Batch Requests
    ]);
    for (const path of Object.keys(spec.paths)) {
      if (path.startsWith('/v1/saved-searches')) continue; // hand-written saved search steps
      expect({ path, covered: covered.has(path) }).toEqual({ path, covered: true });
    }
  });

  it('covers every catalog entry', () => {
    for (const entry of catalog) {
      if (entry.kind === 'detail') expect(App.searches[`find_${entry.key}`]).toBeTruthy();
      else expect(App.creates[entry.key]).toBeTruthy();
      if (entry.trigger) expect(App.triggers[`new_${entry.key}`]).toBeTruthy();
    }
  });
});
