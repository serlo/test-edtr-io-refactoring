import { useScopedStore } from '../../core';
import { RegistryContext } from '../../plugin-rows';
import { replace } from '../../store';
import { useContext, useState, useEffect, useRef } from 'react';
const hotKeysMap = {
    SELECT_UP: 'up',
    SELECT_DOWN: 'down',
    INSERT: 'enter',
};
export const useSuggestions = (args) => {
    const [selected, setSelected] = useState(0);
    const store = useScopedStore();
    const { text, id, editable, focused } = args;
    const plugins = useContext(RegistryContext);
    const allOptions = mapPlugins(plugins, text);
    const showSuggestions = editable && focused && text.startsWith('/') && allOptions.length > 0;
    const options = showSuggestions ? allOptions : [];
    const currentValue = text.substring(1);
    const closure = useRef({
        showSuggestions,
        selected,
        options,
    });
    closure.current = {
        showSuggestions,
        selected,
        options,
    };
    useEffect(() => {
        if (options.length < selected) {
            setSelected(0);
        }
    }, [options.length, selected]);
    const handleSelectionChange = (direction) => () => {
        if (closure.current.showSuggestions) {
            setSelected((currentSelected) => {
                const optionsCount = closure.current.options.length;
                const value = direction === 'up' ? optionsCount - 1 : 1;
                if (optionsCount === 0)
                    return 0;
                return (currentSelected + value) % optionsCount;
            });
        }
    };
    const handleSuggestionInsert = () => {
        if (closure.current.showSuggestions) {
            const option = closure.current.options[closure.current.selected];
            if (!option)
                return;
            setTimeout(() => {
                insertPlugin(option.name);
            });
        }
    };
    const hotKeysHandlers = {
        SELECT_UP: handleSelectionChange('up'),
        SELECT_DOWN: handleSelectionChange('down'),
        INSERT: handleSuggestionInsert,
    };
    return {
        showSuggestions,
        suggestionsProps: {
            options,
            currentValue,
            selected,
            onMouseDown: insertPlugin,
        },
        hotKeysProps: {
            keyMap: hotKeysMap,
            handlers: hotKeysHandlers,
        },
        handleHotkeys,
    };
    function insertPlugin(plugin) {
        store.dispatch(replace({ id, plugin }));
    }
    function handleHotkeys(event) {
        if (closure.current.showSuggestions) {
            if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
                event.preventDefault();
                return;
            }
        }
    }
};
function mapPlugins(registry, text) {
    const search = text.replace('/', '').toLowerCase();
    const startingWithSearchString = registry.filter(({ title }) => {
        if (!search.length)
            return true;
        return title?.toLowerCase()?.startsWith(search);
    });
    const containingSearchString = registry.filter(({ title }) => {
        const value = title?.toLowerCase();
        return value?.includes(search) && !value?.startsWith(search);
    });
    return [...startingWithSearchString, ...containingSearchString];
}