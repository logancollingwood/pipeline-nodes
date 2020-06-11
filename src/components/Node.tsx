import React from 'react';
import PipelineNode from './../types/PipelineNode';
import NODE_STATES from './../types/NodeState';

type Props = { 
    data: PipelineNode
    x: number,
    y: number
}

type State = {

}
class Node extends React.Component<Props, State>  {

    render() {
        let className = "node "
        if (this.props.data.state == NODE_STATES.Success) {
            className += " success"
        } else if (this.props.data.state == NODE_STATES.Failure) {
            className += " failure"
        } else if (this.props.data.state == NODE_STATES.Pending) {
            className += " pending"
        }
        let style = {
            top: this.props.y + "%",
            left: this.props.x + "%"
        }
        return (
            <div className={className} style={style}> 
                <p> {this.props.data.label} </p>
            </div>
        );
    }
}

export default Node