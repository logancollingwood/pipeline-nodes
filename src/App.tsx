import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pipeline from './components/Pipeline';
import PipelineDefinition from "./components/types/PipelineDefinition"
import NODE_STATES from './components/types/NodeState';
import {Stage, Layer, Group} from "react-konva";
import CONSTANTS from './components/constants';

let jsonDefinition: PipelineDefinition = {
    pipelineName: "Test Pipeline",
    rootNode: {
      label: "Root",
      type: "test",
      state: NODE_STATES.Success,
      children: [
        {
          label: "first child",
          type: "test",
          state: NODE_STATES.Success,
          children: [ {
              label: "first child of first node",
              type: "test",
              state: NODE_STATES.Success,
              children: [ {
                  label: "nested third",
                  type: "test",
                  state: NODE_STATES.Success,
                  children: [{
                    label: "second node",
                    type: "test",
                    state: NODE_STATES.Success,
                    children: []
                  }]
                }
            ]
            }, {
              label: "first child of first node",
              type: "test",
              state: NODE_STATES.Success,
              children: []
            }
          ],
        },
        {
          label: "third node",
          type: "test",
          state: NODE_STATES.Failure,
          children: [],
        },
        {
          label: "fourth node",
          type: "test",
          state: NODE_STATES.Pending,
          children: [],
        },
      ]
    }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pipeline: {jsonDefinition.pipelineName}
      </header>
          <Group className="pipeline-container">
                <Stage width={window.innerWidth} height={window.innerHeight} draggable={true}>
                    <Layer>
                      <Pipeline node={jsonDefinition.rootNode} xOffset={0 + CONSTANTS.nodeSize}/>
                    </Layer>
                </Stage>
        </Group>
    </div>
  );
}

export default App;
