import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pipeline from './components/Pipeline';
import PipelineDefinition from "./components/types/PipelineDefinition"
import NODE_STATES from './components/types/NodeState';

let jsonDefinition: PipelineDefinition = {
    pipelineName: "Test Pipeline",
    rootNode: {
      label: "Root",
      type: "test",
      state: NODE_STATES.Success,
      children: [
        {
          label: "second node",
          type: "test",
          state: NODE_STATES.Success,
          children: [],
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
        <Pipeline pipelineDefinition={jsonDefinition}/>
      </header>
    </div>
  );
}

export default App;
