import {
  ROBOT_CREATE,
  ROBOT_DELETE,
  ROBOT_UPDATE,
  SET_ROBOTS,
  SET_ASSIGNED_PROJECTS,
} from "../action-types/robot.types";

// setup initial state, this way we have a state after charging stuff.
const initialState = {
  robots: [],
};

export const robotReducer = (state = initialState, action) => {
  // console.log("The id from the action.payload : ", action.payload._id);
  // console.log("The data that IS the action.payload : ", action.payload);
  switch (action.type) {
    case SET_ROBOTS:
      // make a copy of the object(spreading it), modify robots inside the copy.
      return { ...state, robots: [...action.payload] };
    case SET_ASSIGNED_PROJECTS:
      const updatedRobotProjects = [...state.robots].map((robot) => {
        if (robot._id === action.payload._id) {
          return action.payload;
        } else {
          return robot;
        }
      });
      return { ...state, robots: updatedRobotProjects };
    case ROBOT_CREATE:
      // make a copy of state by spreading the state object in a new object.
      // select a key, in this case robots and equal that keys value to
      return { ...state, robots: [...state.robots, action.payload] };
    case ROBOT_DELETE:
      const filteredRobots = [...state.robots].filter(
        (robot) => robot._id !== action.payload
      );
      return { ...state, robots: filteredRobots };
    case ROBOT_UPDATE:
      const updatedRobots = [...state.robots].map((robot) =>
        robot._id === action.payload._id ? action.payload : robot
      );
      return { ...state, robots: updatedRobots };

    default:
      return state;
  }
};
