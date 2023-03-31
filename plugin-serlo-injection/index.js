import { string, } from '../plugin';
import { SerloInjectionEditor } from './editor';
/**
 * @param config - {@link SerloInjectionConfig | Plugin configuration}
  @public */
export function createSerloInjectionPlugin(config = {}) {
    return {
        Component: SerloInjectionEditor,
        config,
        state: string(),
    };
}
