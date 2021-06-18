import axios from "axios";
import {
  ROBOT_FETCH_ALL,
  ROBOT_CREATE,
  ROBOT_DELETE,
  ROBOT_UPDATE,
} from "../constants/robotConstants";
import { PROJECT_FETCH_ALL } from "../constants/projectConstants";

export const getRobots = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/robots");
    dispatch({ type: ROBOT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
  try {
    const { data } = await axios.get("/projects");
    dispatch({ type: PROJECT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

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
    dispatch({ type: ROBOT_UPDATE, payload: data });
  } catch (error) {
    console.log("Error : ", error);
  }
};
