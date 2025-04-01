import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Node {
  id: string;
  data: {
    label: string;
    description?: string;
    resources?: string[];
    prerequisites?: string[];
    nextSteps?: string;
    shouldBeVisible?: boolean;
    isTyping?: boolean;
  };
  position: { x: number; y: number };
  style?: Record<string, any>;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated?: boolean;
  style?: Record<string, any>;
}

interface RoadmapState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: RoadmapState = {
  nodes: [],
  edges: [],
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setRoadmap(state, action: PayloadAction<RoadmapState>) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    updateNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    updateEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    clearRoadmap(state) {
      state.nodes = [];
      state.edges = [];
    },
  },
});

export const { setRoadmap, updateNodes, updateEdges, clearRoadmap } = roadmapSlice.actions;
export default roadmapSlice.reducer;