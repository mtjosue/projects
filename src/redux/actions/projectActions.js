import axios from "axios";
import {
  PROJECT_FETCH_ALL,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_UPDATE,
} from "../constants/projectConstants";

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/projects");
    dispatch({ type: PROJECT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

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
