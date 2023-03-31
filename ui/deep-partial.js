import * as R from 'ramda';
/**
 * Creates a new object with the own properties of `values` merged with the own properties of `fallback`.
 * If a key exists in both objects:
 * and both values are objects, the two values will be recursively merged
 * otherwise the value from the `values` object will be used.
 *
 * @param payload - An object containing `fallback` and `values`
 * @returns The merged object
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function merge(payload) {
    return R.mergeDeepRight(payload.fallback, payload.values);
}
