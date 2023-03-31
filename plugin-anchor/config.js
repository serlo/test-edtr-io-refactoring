export function useAnchorConfig(config) {
    const { i18n = {} } = config;
    return {
        i18n: {
            label: 'Identifier',
            placeholder: 'ID of the anchor',
            ...i18n,
        },
    };
}
