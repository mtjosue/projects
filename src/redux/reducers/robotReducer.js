import {
  ROBOT_FETCH_ALL,
  ROBOT_CREATE,
  ROBOT_DELETE,
  ROBOT_UPDATE,
} from "../constants/robotConstants";

// setup initial state, this way we have a state after charging stuff.
const initialState = {
  robots: [],
};

export const robotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROBOT_FETCH_ALL:
      // make a copy of the object(spreading it), modify robots inside the copy.
      return { ...state, robots: action.payload };
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
