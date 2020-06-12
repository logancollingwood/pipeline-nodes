import React from 'react';
import PipelineNode from './types/PipelineNode';
import NODE_STATES from './types/NodeState';
import {Circle, Text, Group} from "react-konva";
import CONSTANTS from './constants';

type Props = { 
    data: PipelineNode
    x: number,
    y: number
}

type State = {
    opacity: number
    decreasing: boolean
    fadeInterval?: NodeJS.Timeout
}
const OPACITY_STEP = 2;
class Node extends React.Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {opacity: 100, decreasing: true, fadeInterval: undefined}
    }

    componentDidMount() {
        if (this.props.data.state == NODE_STATES.Pending) {
            const fadeInterval = setInterval(() => {
                if (this.state.opacity === 0) {
                    this.setState({
                        opacity: 1,
                        decreasing: false
                    })
                } else {
                    let newOpacity = this.state.opacity;
                    if (this.state.decreasing) {
                        newOpacity = newOpacity - OPACITY_STEP;
                    } else {
                        newOpacity = newOpacity + OPACITY_STEP;
                    }
                    let decreasing = this.state.decreasing;
                    if (this.state.decreasing && newOpacity < 0 + OPACITY_STEP) {
                        decreasing = false;
                    } else if (!this.state.decreasing && newOpacity > 100 - OPACITY_STEP) {
                        decreasing = true;
                    }
                    this.setState({ 
                        opacity: newOpacity,
                        decreasing: decreasing
                    });
                }
            }, 30);
            this.setState({fadeInterval: fadeInterval});
        }
    }

    componentWillUnmount() {
        if (this.state.fadeInterval) {
            console.log("Clearing Interval")
            clearTimeout(this.state.fadeInterval)
        }
    }

    render() {
        let fillColor = "green"
        
        if (this.props.data.state === NODE_STATES.Failure) {
            fillColor = "red"
        } else if (this.props.data.state === NODE_STATES.Pending) {
            fillColor = "yellow"
        }

        return (
            <Group>
                <Circle
                    radius={CONSTANTS.nodeSize}
                    x={this.props.x}
                    y={this.props.y}
                    fill={fillColor}
                    opacity={this.state.opacity/100}
                />
                <Text 
                    x={this.props.x}
                    y={this.props.y}
                    stroke={'black'}
                    text={this.props.data.label}
                    strokeWidth={0.5}
                />
            </Group>
        );
    }
}

export default Node