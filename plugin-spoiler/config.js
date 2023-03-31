import * as R from 'ramda';
export function useSpoilerConfig(config) {
    const { i18n = {}, theme = {} } = config;
    return {
        i18n: R.mergeDeepRight({
            title: {
                placeholder: 'Enter a title',
            },
        }, i18n),
        theme: {
            color: '#f5f5f5',
            ...theme,
        },
    };
}
