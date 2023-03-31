import { string, } from '../plugin';
import { GeogebraEditor } from './editor';
/**
 * @param config - {@link GeogebraConfig | Plugin configuration}
 * @public
 */
export function createGeogebraPlugin(config = {}) {
    return {
        Component: GeogebraEditor,
        config,
        state: string(),
        onText(value) {
            if (/geogebra\.org\/m\/(.+)/.test(value)) {
                return { state: value };
            }
        },
    };
}
