import axios from "axios";
import {
  ROBOT_CREATE,
  ROBOT_DELETE,
  ROBOT_UPDATE,
  SET_ROBOTS,
  SET_ASSIGNED_PROJECTS,
  // SET_ROBOT_TO_PROJECTS,
} from "../action-types/robot.types";
import {
  SET_ROBOT_TO_PROJECTS,
  DELETE_ROBOT_FROM_PROJECTS,
} from "../action-types/project.types";

// action creators
export const getAllRobots = (robots) => ({
  type: SET_ROBOTS,
  payload: robots,
});

export const updateRobotProjects = (updatedProjects) => ({
  type: SET_ASSIGNED_PROJECTS,
  payload: updatedProjects,
});

export const updateRobotsOnProjects = (data) => ({
  type: SET_ROBOT_TO_PROJECTS,
  payload: data,
});

export const deleteRobotFromRight = (data) => ({
  type: DELETE_ROBOT_FROM_PROJECTS,
  payload: data,
});

// thunks
export const getRobots = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/robots");

    // console.log("---------------------------------------------------");
    // console.log(
    //   "const { data } = await axios.get('/robots'); : ".toUpperCase(),/////////////////////////
    //   data
    // );

    dispatch(getAllRobots(data));
  } catch (error) {
    console.log(error);
  }
};

// thunks
export const createRobot = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/robots", formData);
    dispatch({ type: ROBOT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRobot = (id) => async (dispatch) => {
  try {
    await axios.delete(`/robots/${id}`);
    dispatch({ type: ROBOT_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateRobot = (id, form) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/robots/${id}`, form);
    console.log("data after update", data);
    dispatch({ type: ROBOT_UPDATE, payload: data });
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const assignAllProjectsToRobot = (id, projects) => async (dispatch) => {
  try {
    //                               `calls updateAllProjectsOnRobot()`
    const { data } = await axios.put(`/robots/${id}/projects`, projects);

    //type: SET_ASSIGNED_PROJECTS
    dispatch(updateRobotProjects(data));
  } catch (error) {
    console.log("The error : ", error);
  }
};

export const assignRobotToAllProjects = (id, projects) => async (dispatch) => {
  // console.log("projects line(94) : ", projects);
  try {
    //                               `updateRobotOnAllProjects()`
    const { data } = await axios.put(`/robots/${id}/project`, projects);

    // console.log("---------------------------------------------------");
    // console.log("{ data } line(89) : ".toUpperCase(), data);

    //
    //SET_ROBOT_TO_PROJECTS
    //
    dispatch(updateRobotsOnProjects(data));
    //
  } catch (error) {
    //
    console.log("assignRobotToProjects ERROR : ", error);
  }
};

export const unassignRobotFromProjects = (id, projects) => async (dispatch) => {
  //
  try {
    //
    const { data } = await axios.put(`/robots/${id}/deleteRobot`, projects);
    //
    // console.log("line 109 data : ".toUpperCase(), data);/////////////////////////////////////
    //
    dispatch(deleteRobotFromRight(data));
    //
  } catch (error) {
    //
    console.log(error);
    //
  }
};
