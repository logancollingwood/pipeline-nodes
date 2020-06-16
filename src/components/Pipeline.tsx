import React, { Ref } from 'react';

import Node from './Node';
import Edge from './Edge';
import PipelineDefinition from "./types/PipelineDefinition";
import {Stage, Layer, Group} from "react-konva";
import CONSTANTS from './constants';
import PipelineNode from './types/PipelineNode';

const NODE_SEPARATOR_Y_DIST = CONSTANTS.nodeSize * 3;
const NODE_SEPARATER_X_DIST = CONSTANTS.nodeSize * 4;
type Props = { 
    node: PipelineNode
    xOffset: number
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
    constructor(props: Props){
        super(props)
        this.state = {containerRef: React.createRef() }
    }

    render() {

        let nodes = [];
        let xOffset = this.props.xOffset;
        let yOffset = CONSTANTS.nodeSize;
        if (this.props.node != null) {
            const node = this.props.node;

            // Draw Root Node and set up offsets
            if (node.children.length > 1) {
                yOffset =  sumDistanceOfChildren(NODE_SEPARATOR_Y_DIST, node.children.length) + CONSTANTS.nodeSize
            }
            let parentXLocation = xOffset;
            let parentYLocation = yOffset;
            nodes.push(<Node x={xOffset} y={yOffset} data={node}/>)
            if (node.children.length > 0) {
                xOffset += NODE_SEPARATER_X_DIST
            }
            

            // draw children
            yOffset = CONSTANTS.nodeSize;
            node.children.forEach(element => {
            //    nodes.push(<Node  x={xOffset} y={yOffset} data={element} />) 
               nodes.push(<Edge from={[parentXLocation, parentYLocation]} to={[xOffset, yOffset]} />)
               yOffset += NODE_SEPARATOR_Y_DIST;
               if (element.children.length > 0) {
                   for (let i = 0; i < element.children.length; i++) {
                       nodes.push(<Pipeline node={element.children[i]} xOffset={xOffset + NODE_SEPARATER_X_DIST}/>)
                   }
               }
            });
        }
        const CANVAS_VIRTUAL_WIDTH = window.innerWidth;
        const CANVAS_VIRTUAL_HEIGHT = window.innerHeight;
        const scale = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
            window.innerHeight / CANVAS_VIRTUAL_HEIGHT
        );
        return (
          <>
                        { nodes }
                
            </>
        );
    }
}


export default Pipeline