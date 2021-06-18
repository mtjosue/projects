import {
  PROJECT_FETCH_ALL,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_UPDATE,
} from "../constants/projectConstants";

// setup initial state, this way we have a state after charging stuff.
const initialState = {
  projects: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_FETCH_ALL:
      // make a copy of the object(spreading it), modify robots inside the copy.
      return { ...state, projects: action.payload };
    case PROJECT_CREATE:
      // make a copy of state by spreading the state object in a new object.
      // select a key, in this case robots and equal that keys value to
      return { ...state, projects: [...state.projects, action.payload] };
    case PROJECT_DELETE:
      const filteredProjects = [...state.projects].filter(
        (project) => project._id !== action.payload
      );
      return { ...state, projects: filteredProjects };
    case PROJECT_UPDATE:
      // const projectsCopy = state.projects.slice()

      const updatedProjects = [...state.projects].map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
      return { ...state, projects: updatedProjects };

    default:
      return state;
  }
};
