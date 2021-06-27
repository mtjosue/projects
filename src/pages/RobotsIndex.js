import React, { useState } from "react";
import HomePage from "./HomePage";
import RobotsForm from "../components/robots-form/RobotsForm";
import RobotsTable from "../components/robots-table/RobotsTable";
import AddButton from "../components/add-button/AddButton";
import RobotsTransferListExample from "../components/robots-transfer-list-example/RobotsTransferListExample";

const RobotsIndex = () => {
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openExampleTransfer, setOpenExampleTransfer] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleTransferClickOpen = () => {
    setOpenExampleTransfer(true);
  };

  const handleTransferClickClose = () => {
    setOpenExampleTransfer(false);
  };

  return (
    <div>
      <HomePage title="Robots Listing" />
      <RobotsForm
        open={open}
        handleClickClose={handleClickClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <AddButton
        text="Add Robot"
        setCurrentId={setCurrentId}
        handleClickOpen={handleClickOpen}
      />
      <RobotsTable
        open={open}
        handleClickOpen={handleClickOpen}
        setCurrentId={setCurrentId}
        handleTransferClickOpen={handleTransferClickOpen}
        current={currentId}
      />
      {/* {openTransfer && (
        <RobotsTransferList
          open={openTransfer}
          handleTransferClickClose={handleTransferClickClose}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      )} */}
      {openExampleTransfer && (
        <RobotsTransferListExample
          open={openExampleTransfer}
          handleTransferClickClose={handleTransferClickClose}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      )}
    </div>
  );
};

export default RobotsIndex;
