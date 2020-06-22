import { Component, Ref } from "react"
import PipelineStep from "./types/PipelineStep"
import React from "react"
import Node from './Node';
import CONSTANTS from './constants';

type Props = { 
    step: PipelineStep,
    xOffset: number
}

type State = {
    containerRef: Ref<any>
}

const Y_BUFFER_HEIGHT = 50;
class Step extends Component<Props, State> {

    render() {
        let yOffset = CONSTANTS.nodeSize;
        return (
            this.props.step.nodes.map(node => {
                let nodeElement = <Node data={node} x={this.props.xOffset} y={yOffset}/>
                yOffset += CONSTANTS.nodeSize * 2 + Y_BUFFER_HEIGHT
                return nodeElement
            })
        )
    }
}


export default Step