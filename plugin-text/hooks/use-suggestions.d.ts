import React from 'react';
interface useSuggestionsArgs {
    text: string;
    id: string;
    editable: boolean;
    focused: boolean;
}
export declare const useSuggestions: (args: useSuggestionsArgs) => {
    showSuggestions: boolean;
    suggestionsProps: {
        options: {
            name: string;
            title?: string | undefined;
            icon?: React.ComponentType<{}> | undefined;
            description?: string | undefined;
        }[];
        currentValue: string;
        selected: number;
        onMouseDown: (plugin: string) => void;
    };
    hotKeysProps: {
        keyMap: {
            SELECT_UP: string;
            SELECT_DOWN: string;
            INSERT: string;
        };
        handlers: {
            SELECT_UP: () => void;
            SELECT_DOWN: () => void;
            INSERT: () => void;
        };
    };
    handleHotkeys: (event: React.KeyboardEvent) => void;
};
export {};
