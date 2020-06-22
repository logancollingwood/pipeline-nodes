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
    rootNode: [
      {
        nodes:[
          {
            label: "first child",
            type: "test",
            state: NODE_STATES.Success,
          }
        ]
      },
      {
        nodes: [ {
            label: "second stage part 1",
            type: "test",
            state: NODE_STATES.Success,
          },
          {
            label: "second stage part 2",
            type: "test",
            state: NODE_STATES.Pending,
          }
        ]
      },
      {
        nodes: [ {
            label: "third stage part 1",
            type: "test",
            state: NODE_STATES.Success,
          },
        ]
      },
      {
        nodes: [ {
            label: "4 stage part 1",
            type: "test",
            state: NODE_STATES.Success,
          },
        ]
      }

    ]
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
                      <Pipeline steps={jsonDefinition.rootNode} />
                    </Layer>
                </Stage>
        </Group>
    </div>
  );
}

export default App;
