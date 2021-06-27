import React, { useState } from "react";
import HomePage from "./HomePage";
import ProjectsForm from "../components/projects-form/ProjectsForm";
import ProjectsTable from "../components/projects-table/ProjectsTable";
import AddButton from "../components/add-button/AddButton";
// import SearchIcon from "@material-ui/icons/Search";
// import { InputBase } from "@material-ui/core";
import ProjectsTransferListExample from "../components/projects-transfer-list-example/ProjectsTransferListExample";

const ProjectsIndex = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [openTransfer, setOpenTransfer] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleTransferClickOpen = () => {
    setOpenTransfer(true);
  };

  const handleTransferClickClose = () => {
    setOpenTransfer(false);
  };

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
        handleTransferClickOpen={handleTransferClickOpen}
        setCurrentId={setCurrentId}
        current={currentId}
      />
      {openTransfer && (
        <ProjectsTransferListExample
          open={openTransfer}
          handleTransferClickClose={handleTransferClickClose}
          currentId={currentId}
          // setCurrentId={setCurrentId}
        />
      )}
    </div>
  );
};

export default ProjectsIndex;
