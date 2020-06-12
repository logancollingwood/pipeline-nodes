import React from 'react';
import {Arrow} from "react-konva";

type Props = { 
    from: [number, number],
    to: [number, number]
}

type State = {

}
class Edge extends React.Component<Props, State>  {
    render() {
        return (
            <Arrow
                points={this.props.from.concat(this.props.to)}
                stroke={'white'}
            />
        );
    }
}

export default Edge