//      0              1             2
// [{key:value}, {key: value}, {key: value}]
//   item0        item1     item2
// { id: item, id: item, id: item }

// instant time lookup.
// obj[item2]

import {
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_UPDATE,
  SET_PROJECTS,
  SET_ASSIGNED_ROBOTS,
  SET_ROBOT_TO_PROJECTS,
  DELETE_ROBOT_FROM_PROJECTS,
} from "../action-types/project.types";

// setup initial state, this way we have a state after charging stuff.
const initialState = {
  projects: [],
  projectsObj: {},
};

export const projectReducer = (state = initialState, action) => {
  //
  // console.log("action.payload line(26) : ", action.payload);
  //

  switch (action.type) {
    //
    case SET_PROJECTS:
      // make a copy of the object(spreading it), modify robots inside the copy.
      const objetifiedProjects = {};
      //
      action.payload.forEach(
        (project) => (objetifiedProjects[project._id] = project)
      );
      //
      return {
        ...state,
        projects: action.payload,
        projectsObj: objetifiedProjects,
      };
    //
    case SET_ASSIGNED_ROBOTS:
      //
      console.log("line 48 action.payload : ".toUpperCase(), action.payload);
      //
      const updatedProjecRobots = [...state.projects].map((project) => {
        //
        if (project._id === action.payload._id) {
          //
          return action.payload;
          //
        } else {
          //
          return project;
          //
        }
        //
      });
      //

      return { ...state, projects: updatedProjecRobots };

    //------------------------------------------------------------------------------------------
    case SET_ROBOT_TO_PROJECTS:
      //----------------------------------------------------------------------------------------
      //START HERE WHEN YOU COME BACK FOR TESTING

      //----------------------------------------------------------------------------------------
      const newProjects = [...state.projects].map((project) => {
        //
        // console.log("line 61 project : ".toUpperCase(), project);///////////////////////////////////
        //
        if (action.payload.findIndex((p) => p._id === project._id) !== -1) {
          //
          const newProject = action.payload.find((p) => p._id === project._id);
          //
          return newProject;
          //
        } else {
          //
          return project;
        }
        //
      });
      //----------------------------------------------------------------------------------------
      // console.log("newProjects line(68) : ", newProjects);
      //----------------------------------------------------------------------------------------
      return { ...state, projects: [...newProjects] };
    //-------------------------------------------------------------------------------------------
    case DELETE_ROBOT_FROM_PROJECTS:
      //
      // console.log("action.payload line(80) : ".toUpperCase(), action.payload);////////////////////////////////////////////
      //
      const projectsWithoutRobot = [...state.projects].map((project) => {
        //
        if (action.payload.findIndex((p) => p.title === project.title) > -1) {
          //
          return action.payload.find((p) => p.title === project.title);
          //
        } else {
          //
          return project;
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

      return { ...state, projects: projectsWithoutRobot };
    //-------------------------------------------------------------------------------------------
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
//
//
//   [1] [
//   [1]   {
//   [1]     selected: false,
//   [1]     assignedRobots: [ [Object], [Object] ],
//   [1]     _id: 60d60eececaf120ad4c638e4,
//   [1]     title: 'Go to Monaco',
//   [1]     deadline: 'Fri Jun 25 2021 13:14:20 GMT-0400 (Eastern Daylight Time)',
//   [1]     priority: '5',
//   [1]     completed: false,
//   [1]     description: 'Finally visit a far away place of my own volition',
//   [1]     __v: 2
//   [1]   },
//   [1]   {
//   [1]     selected: false,
//   [1]     assignedRobots: [ [Object], [Object] ],
//   [1]     _id: 60d60eececaf120ad4c638e6,
//   [1]     title: 'Finish Fullstack JPFP',
//   [1]     deadline: 'Fri Jun 25 2021 13:14:20 GMT-0400 (Eastern Daylight Time)',
//   [1]     priority: '9',
//   [1]     completed: false,
//   [1]     description: 'Finish this shit so we can start working on dope platforms as projects.',
//   [1]     __v: 2
//   [1]   }
//   [1] ]
