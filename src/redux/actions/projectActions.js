import axios from "axios";
import { useDispatch } from "react-redux";
import {
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_UPDATE,
  SET_PROJECTS,
  SET_ASSIGNED_ROBOTS,
  SET_ROBOT_TO_PROJECTS,
} from "../action-types/project.types";

// action creators
export const getAllProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const updateProjectRobots = (updatedRobots) => ({
  type: SET_ASSIGNED_ROBOTS,
  payload: updatedRobots,
});

// thunks
export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/projects");
    dispatch(getAllProjects(data));
  } catch (error) {
    console.log(error);
  }
};

// thunks
export const createProject = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/projects", formData);
    dispatch({ type: PROJECT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`/projects/${id}`);
    dispatch({ type: PROJECT_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/projects/${id}`, form);
    dispatch({ type: PROJECT_UPDATE, payload: data });
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const assignAllRobotsToProject = (id, robots) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/projects/${id}/robots`, robots);
    // console.log("Data destructured from the put request : ", data);
    dispatch(updateProjectRobots(data));
  } catch (error) {
    console.log("The error : ", error);
  }
};

// export const assignRobotToAllProjects = (id, projects) => async (dispatch) => {
//   try {
//     const { data } = await axios.put(`/robots/${id}/project`, projects);

//     console.log("---------------------------------------------------");
//     console.log("{ data } line(81) : ".toUpperCase(), data);

//     dispatch(updateRobotsOnProjects(data));
//   } catch (error) {
//     console.log("assignRobotToProjects ERROR : ", error);
//   }
// };
