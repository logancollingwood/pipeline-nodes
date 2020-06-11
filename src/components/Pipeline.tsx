import React, { ReactPropTypes } from 'react';
import PropTypes from 'prop-types';

import Node from './Node';
import Edge from './Edge';
import PipelineDefinition from "../types/PipelineDefinition"

type Props = { 
    pipelineDefinition: PipelineDefinition
}

type State = {

}
class Pipeline extends React.Component<Props, State>  {

    render() {

        let nodes = [];
        let xOffset = 0;
        if (this.props.pipelineDefinition.rootNode != null) {
            const pipelineDef = this.props.pipelineDefinition;

            // Draw Root Node and set up offsets
            let yOffset = 0;
            if (pipelineDef.rootNode.children.length > 0) {
                yOffset = pipelineDef.rootNode.children.length * 15;
            }
            nodes.push(<Node x={xOffset} y={yOffset} data={pipelineDef.rootNode}/>)
            if (pipelineDef.rootNode.children.length > 0) {
                xOffset += 50
            }


            yOffset = 0;
            pipelineDef.rootNode.children.forEach(element => {
               nodes.push(<Node  x={xOffset} y={yOffset} data={element} />) 
               nodes.push(<Edge from={pipelineDef.rootNode} to={element} />)
               yOffset += 30;
            });
        }
        return (
            <div>
                <header> Pipeline {this.props.pipelineDefinition.pipelineName} </header>
                <hr />
                <section> { nodes } </section>
            </div>
        );
    }
}


export default Pipeline