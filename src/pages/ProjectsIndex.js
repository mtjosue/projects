import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import ProjectsForm from "../components/projects-form/ProjectsForm";
import ProjectsTable from "../components/projects-table/ProjectsTable";
import AddButton from "../components/add-button/AddButton";
import { useDispatch } from "react-redux";
import { getProjects } from "../redux/actions/projectActions";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

const ProjectsIndex = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect running!");
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      <HomePage title="Projects Listing" />
      <ProjectsForm
        open={open}
        handleClickClose={handleClickClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />

      <AddButton
        text="Add Project"
        setCurrentId={setCurrentId}
        handleClickOpen={handleClickOpen}
      />
      <ProjectsTable
        open={open}
        handleClickOpen={handleClickOpen}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default ProjectsIndex;
