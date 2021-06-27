import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  // DialogActions,
  Button,
} from "@material-ui/core";
import {
  Grid,
  List,
  ListItem,
  // ListItemIcon,
  // ListItemText,
  Checkbox,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateRobot } from "../../redux/actions/robotActions";

const RobotsTransferList = ({
  open,
  handleTransferClickClose,
  currentId,
  setCurrentId,
}) => {
  const [remainingProjects, setRemainingProjects] = useState([]);
  // extract selected robot from redux state
  const selectedRobot = useSelector(({ robots }) => {
    return robots.robots.find((robot) => robot._id === currentId);
  });

  const selectProjects = useSelector(({ projects }) => projects.projects);

  // we have a right and left side to our transfer list

  // RIGHT
  // We have the assigned projects for the current robot.

  // LEFT
  // we have the remaining projects.

  const generateMarkUp = (projects) => {
    return (
      <Paper>
        <List>
          {projects.length < 1 ? (
            <ListItem>
              <span>No assigned Projects</span>
            </ListItem>
          ) : (
            projects.map((p) => (
              <ListItem key={p._id}>
                <Checkbox
                  // onChange={() => handleCheckboxChange(p)}
                  checked={p.selected}
                />
                <span>{p.title}</span>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleTransferClickClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle
        aria-labelledby="form-dialog-title"
        style={{ textAlign: "center" }}
      >
        Robot - Project Assignment
      </DialogTitle>
      <DialogContentText style={{ textAlign: "center" }}>
        Assign projects to this robot from here.
      </DialogContentText>
      <Grid container>
        <Grid item md={6} style={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedRobot && selectedRobot.name}
        </Grid>
        {/* <Grid item md={0}></Grid> */}
        <Grid item md={6} style={{ textAlign: "center", fontWeight: "bold" }}>
          Projects
        </Grid>
      </Grid>
      <DialogContent style={{ height: "500px" }}>
        <Grid container>
          {/* Left side of the transfer list */}
          <Grid item md={5}>
            {selectedRobot.assignedProjects &&
              generateMarkUp(selectedRobot.assignedProjects)}
          </Grid>
          <Grid
            style={{ marginTop: "160px" }}
            item
            container
            direction="column"
            md={2}
          >
            <Button
              style={{ marginBottom: "35px" }}
              // onClick={() => {} } dispatch an action and add the project to the assigned projects list. On the current robot.
            >
              {"<"}
            </Button>
            <Button
            // onClick={() => }
            // dipsatch an action and remove the project from the assigned projects list. on the current robot.
            >
              {">"}
            </Button>
          </Grid>
          {/* Right side of the transfer list */}
          <Grid item md={5}>
            {generateMarkUp(selectProjects)}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RobotsTransferList;
