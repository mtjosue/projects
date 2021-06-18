import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import RobotsForm from "../components/robots-form/RobotsForm";
import RobotsTable from "../components/robots-table/RobotsTable";
import AddButton from "../components/add-button/AddButton";
import { useDispatch } from "react-redux";
import { getRobots } from "../redux/actions/robotActions";
import RobotsTransferList from "../components/robots-transfer-list/RobotsTransferList";

const RobotsIndex = () => {
  const [currentId, setCurrentId] = useState(0);

  // console.log(currentId);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [openTransfer, setOpenTransfer] = useState(false);

  const handleTransferClickOpen = () => {
    setOpenTransfer(true);
  };

  const handleTransferClickClose = () => {
    setOpenTransfer(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("useEffect running!");
    // console.log(currentId);
    dispatch(getRobots());
    // console.log(object)
  }, [dispatch]);

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
      <RobotsTransferList
        open={openTransfer}
        handleTransferClickClose={handleTransferClickClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      ></RobotsTransferList>
    </div>
  );
};

export default RobotsIndex;
