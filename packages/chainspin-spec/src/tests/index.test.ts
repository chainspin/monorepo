import test from 'ava';
import * as spec from '..';

test('exposes Spec class', async (t) => {
  t.true(!!spec.Spec);
});

test('exposes Runner class', async (t) => {
  t.true(!!spec.Runner);
});
