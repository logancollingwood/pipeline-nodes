import React, { Ref } from 'react';

import CONSTANTS from './constants';
import PipelineStep from './types/PipelineStep';
import Step from './Step';
import Edge from './Edge';

const NODE_SEPARATOR_Y_DIST = CONSTANTS.nodeSize * 3;
const NODE_SEPARATER_X_DIST = CONSTANTS.nodeSize * 4;
type Props = { 
    steps: PipelineStep[]
}

type State = {
    containerRef: Ref<any>
}

function sumDistanceOfChildren(y_dist: number, numChildren: number): number {
    let points = [];
    for (let i = 0; i < numChildren; i++) {
        points.push(i * y_dist)
    }
    if (points.length % 2 === 0) {
        const middle = points.length / 2;
        if (points.length === 2) {
            return points[middle]
        } else {
            return ((points[middle] + points[middle + 1]) / 2) - y_dist
        }
    } else {
        const middle = Math.floor(numChildren / 2);
        let distance = 0;
        for (let j = 0; j < middle; j++) {
            distance += y_dist
        }
        return distance
    }
}

class Pipeline extends React.Component<Props, State>  {
    render() {
        return (
            this.props.steps.map((step, index) => {
                let x1: number = 0, y1: number = 0;
                let x2: number = 0, y2: number = 0;
                let xOffset: number = 0;
                if (index === 0) {
                    xOffset = CONSTANTS.nodeSize
                    x1 = CONSTANTS.nodeSize
                    y1 = CONSTANTS.nodeSize
                } else {
                    xOffset = NODE_SEPARATER_X_DIST * (index) + CONSTANTS.nodeSize
                }

                return (
                    <>
                        <Step key={index.toString()} step={step} xOffset={xOffset} />
                        <Edge from={[x1,y1]} to={[x2,y2]} />
                    </>
                )
            }
            )
        );
    }
}


export default Pipeline