import PipelineStep from './PipelineStep';

type JsonDefinition = {
    pipelineName: string
    rootNode: PipelineStep[],
}

export default JsonDefinition