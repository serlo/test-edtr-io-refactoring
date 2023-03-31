export function useGeogebraConfig(config) {
    const { i18n = {} } = config;
    return {
        i18n: {
            label: 'GeoGebra URL or ID',
            placeholder: '12345',
            ...i18n,
        },
    };
}
