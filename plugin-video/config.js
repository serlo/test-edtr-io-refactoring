import * as R from 'ramda';
export function useVideoConfig(config) {
    const { i18n = {} } = config;
    return {
        i18n: R.mergeDeepRight({
            src: {
                label: 'Video URL',
            },
            alt: {
                label: 'Description',
            },
        }, i18n),
    };
}
