/**
 * @param type - The initial {@link @edtr-io/internal__plugin-state#StateType | state type} to start the migration from
 * @public
 */
export function migratable(type) {
    return migrate((state) => {
        return state;
    }, type, 0, (state) => state);
}
function migrate(recursiveMigrate, nextType, nextVersion, f) {
    return {
        ...nextType,
        deserialize(serialized, helpers) {
            if (isVersionized(serialized, nextVersion)) {
                return nextType.deserialize(serialized.value, helpers);
            }
            const s = serialized;
            return nextType.deserialize(f(recursiveMigrate(s)), helpers);
        },
        serialize(deserialized, helpers) {
            return {
                __version__: nextVersion,
                value: nextType.serialize(deserialized, helpers),
            };
        },
        migrate(nextNextType, f2) {
            return migrate((previousState) => {
                if (isVersionized(previousState, nextVersion)) {
                    return previousState.value;
                }
                return f(recursiveMigrate(previousState));
            }, nextNextType, nextVersion + 1, f2);
        },
    };
}
function isVersionized(state, version) {
    return state.__version__ === version;
}
