import React from 'react';

import Node from './Node';
import Edge from './Edge';
import PipelineDefinition from "./types/PipelineDefinition";
import {Stage, Layer} from "react-konva";
import CONSTANTS from './constants';

const NODE_SEPARATOR_Y_DIST = CONSTANTS.nodeSize * 3;
const NODE_SEPARATER_X_DIST = CONSTANTS.nodeSize * 4;
type Props = { 
    pipelineDefinition: PipelineDefinition
}

type State = {

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

        let nodes = [];
        let xOffset = CONSTANTS.nodeSize;
        let yOffset = CONSTANTS.nodeSize;
        if (this.props.pipelineDefinition.rootNode != null) {
            const pipelineDef = this.props.pipelineDefinition;

            // Draw Root Node and set up offsets
            if (pipelineDef.rootNode.children.length > 1) {
                yOffset =  sumDistanceOfChildren(NODE_SEPARATOR_Y_DIST, pipelineDef.rootNode.children.length) + CONSTANTS.nodeSize
            }
            let parentXLocation = xOffset;
            let parentYLocation = yOffset;
            nodes.push(<Node x={xOffset} y={yOffset} data={pipelineDef.rootNode}/>)
            if (pipelineDef.rootNode.children.length > 0) {
                xOffset += NODE_SEPARATER_X_DIST
            }
            

            // draw children
            yOffset = CONSTANTS.nodeSize;
            pipelineDef.rootNode.children.forEach(element => {
               nodes.push(<Node  x={xOffset} y={yOffset} data={element} />) 
               nodes.push(<Edge from={[parentXLocation, parentYLocation]} to={[xOffset, yOffset]} />)
               yOffset += NODE_SEPARATOR_Y_DIST;
            //  Recursively draw the children of the children
            //    if (element.children.length > 0) {
            //        for (let i = 0; i < element.children.length; i++) {
            //            nodes.push(<Pipeline pipelineDefinition={element.children[i]} />)
            //        }
            //    }
            });
        }
        return (
            <div>
                <header> Pipeline {this.props.pipelineDefinition.pipelineName} </header>
                <hr />
                <Stage width={700} height={700}>
                    <Layer>
                        { nodes }
                    </Layer>
                </Stage>
                <section> { nodes } </section>
            </div>
        );
    }
}


export default Pipeline