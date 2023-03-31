export function useSerloInjectionConfig(config) {
    const { i18n = {} } = config;
    return {
        i18n: {
            label: 'Serlo ID',
            placeholder: '123456',
            ...i18n,
        },
    };
}
