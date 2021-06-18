import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: "auto",
//   },
//   paper: {
//     width: 200,
//     height: 230,
//     overflow: "auto",
//   },
//   button: {
//     margin: theme.spacing(0.5, 0),
//   },
// }));

const RobotsTransferList = ({ open, handleTransferClickClose, currentId }) => {
  // const classes = useStyles();

  const [robot, setRobot] = useState({});

  const robotSelected = useSelector(({ robots }) =>
    currentId ? robots.robots.find((robot) => robot._id === currentId) : ""
  );

  const projects = useSelector(({ projects }) => projects.projects);

  // console.log(projects);

  const unselectedProjects = projects.map((project) => {
    return {
      ...project,
      selected: false,
    };
  });

  console.log(unselectedProjects);

  const [items, setItems] = useState([...unselectedProjects]);

  console.log(items);

  useEffect(() => {
    if (robotSelected) {
      setRobot(robotSelected);
    }
  }, [robotSelected]);

  const generateMarkUp = (items) => {
    return (
      <Paper>
        <List>
          {items.map((item) => (
            <ListItem key={item._id}>
              <Checkbox key={item._id} />
              <span key={item._id}>{item.title}</span>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  const leftSide = [];
  const rightSide = [items];

  return (
    <Dialog
      open={open}
      onClose={handleTransferClickClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle aria-labelledby="form-dialog-title">
        Robot - Project Assignment
      </DialogTitle>
      <DialogContent style={{ height: "170px" }}>
        <DialogContentText>
          Assign projects to this robot from here.
        </DialogContentText>
        <Grid container>
          <Grid item md={5} style={{ textAlign: "center", fontWeight: "bold" }}>
            {robot.name}
          </Grid>
          <Grid item md={2}></Grid>
          <Grid item md={5} style={{ textAlign: "center", fontWeight: "bold" }}>
            Projects
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={5}>
            {generateMarkUp(leftSide)}
          </Grid>
          <Grid
            style={{ marginTop: "25px" }}
            item
            container
            direction="column"
            md={2}
          >
            <Button>{">"}</Button>
            <Button>{"<"}</Button>
          </Grid>
          <Grid item md={5}>
            {generateMarkUp(rightSide)}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RobotsTransferList;
