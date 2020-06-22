import NODE_STATES from './NodeState';

type PipelineNode  = { 
    label: string,
    type: string,
    state: NODE_STATES,
}

export default PipelineNode