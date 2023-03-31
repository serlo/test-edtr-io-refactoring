import { PreferenceContext } from '../../core';
import { MathEditor } from '../../math';
import React, { useContext } from 'react';
import { Range, Transforms } from 'slate';
import { ReactEditor, useSlate, useSelected, } from 'slate-react';
import { MathFormula } from './math-formula';
const visualEditorPreferenceKey = 'text:math:visual-editor';
export function MathElement({ element, attributes, focused, children, }) {
    const editor = useSlate();
    const selected = useSelected();
    const preferences = useContext(PreferenceContext);
    const shouldShowMathEditor = focused &&
        selected &&
        editor.selection &&
        Range.isCollapsed(editor.selection);
    if (!shouldShowMathEditor) {
        return (<span {...attributes}>
        <MathFormula element={element}/>
        {children}
      </span>);
    }
    const isVisualMode = !!preferences.getKey(visualEditorPreferenceKey);
    function updateElement(update) {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, update, { at: path });
    }
    function transformOutOfElement({ reverse = false, shouldDelete = false, } = {}) {
        const unit = 'character';
        Transforms.move(editor, { unit, reverse });
        if (shouldDelete) {
            Transforms.delete(editor, { unit, reverse });
        }
        ReactEditor.focus(editor);
    }
    /* TODO: We need to define
      export interface MathEditorProps {
        config: DeepPartial<MathEditorConfig>
      }
    */
    return (<span {...attributes} tabIndex={-1}>
      <MathEditor autofocus state={element.src} inline={element.inline} readOnly={false} visual={isVisualMode} disableBlock={false} onInlineChange={(inline) => {
            updateElement({ inline });
        }} onChange={(src) => updateElement({ src })} onMoveOutRight={transformOutOfElement} onMoveOutLeft={() => {
            transformOutOfElement({ reverse: true });
        }} onDeleteOutRight={() => {
            transformOutOfElement({ shouldDelete: true });
        }} onDeleteOutLeft={() => {
            transformOutOfElement({ shouldDelete: true, reverse: true });
        }} config={{}} onEditorChange={(visual) => preferences.setKey(visualEditorPreferenceKey, visual)}/>
      {children}
    </span>);
}
