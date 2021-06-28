import {
  ROBOT_CREATE,
  ROBOT_DELETE,
  ROBOT_UPDATE,
  SET_ROBOTS,
  SET_ASSIGNED_PROJECTS,
  SET_PROJECT_TO_ROBOTS,
  DELETE_PROJECT_FROM_ROBOTS,
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
    //
    case SET_PROJECT_TO_ROBOTS:
      //
      const newRobots = [...state.robots].map((robot) => {
        //
        // console.log("line 61 project : ".toUpperCase(), project);///////////////////////////////////
        //
        if (action.payload.findIndex((r) => r._id === robot._id) !== -1) {
          //
          const newRobot = action.payload.find((r) => r._id === robot._id);
          //
          return newRobot;
          //
        } else {
          //
          return robot;
        }
        //
      });
      //----------------------------------------------------------------------------------------
      // console.log("newProjects line(68) : ", newProjects);
      //----------------------------------------------------------------------------------------
      return { ...state, robots: [...newRobots] };
    //
    case DELETE_PROJECT_FROM_ROBOTS:
      //
      const robotsWithoutProject = [...state.robots].map((robot) => {
        //
        if (action.payload.findIndex((r) => r.name === robot.name) > -1) {
          //
          return action.payload.find((r) => r.name === robot.name);
          //
        } else {
          //
          return robot;
          //
        }
        //
      });
      //
      // console.log(
      //   "line 90 projectsWithoutRobot : ".toUpperCase(),////////////////////////////////////////////////////////
      //   projectsWithoutRobot
      // );
      //
      // return;

      return { ...state, robots: robotsWithoutProject };
    //
    // return;
    //
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
