import * as R from 'ramda';
import * as React from 'react';
/** @public */
export class FetchDimensions extends React.Component {
    state = {
        heights: R.times(() => null, this.props.length),
        widths: R.times(() => null, this.props.length),
        scrollHeights: R.times(() => null, this.props.length),
        scrollWidths: R.times(() => null, this.props.length),
        clientHeights: R.times(() => null, this.props.length),
        clientWidths: R.times(() => null, this.props.length),
    };
    componentDidUpdate() {
        const all = R.all((height) => typeof height === 'number', this.state.heights);
        if (all && !this.done) {
            this.done = true;
            this.props.onDone(this.state);
        }
    }
    render() {
        const createRef = (index) => (instance) => {
            if (!instance) {
                return;
            }
            this.setState((state) => {
                if (typeof state.heights[index] === 'number') {
                    return null;
                }
                return {
                    heights: R.update(index, instance.offsetHeight, state.heights),
                    widths: R.update(index, instance.offsetWidth, state.widths),
                    scrollHeights: R.update(index, instance.scrollHeight, state.scrollHeights),
                    scrollWidths: R.update(index, instance.scrollWidth, state.scrollWidths),
                    clientHeights: R.update(index, instance.clientHeight, state.clientHeights),
                    clientWidths: R.update(index, instance.clientWidth, state.clientWidths),
                };
            });
        };
        return this.props.render(createRef);
    }
    done = false;
}
