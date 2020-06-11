import React from 'react';
import PipelineNode from './../types/PipelineNode';


type Props = { 
    from: PipelineNode,
    to: PipelineNode
}

type State = {

}
class Edge extends React.Component<Props, State>  {
    render() {
        return (
            <div> Edge from: {this.props.from.label} to: {this.props.to.label}</div>
        );
    }
}

export default Edge