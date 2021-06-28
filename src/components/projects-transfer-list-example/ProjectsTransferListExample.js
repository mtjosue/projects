import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  // DialogActions,
  // Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  assignAllRobotsToProject,
  assignProjectToAllRobots,
  unassignProjectFromRobots,
} from "../../redux/actions/projectActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

//-------------------------------------------------------------------------------------------------------

const ProjectsTransferListExample = ({
  open,
  handleTransferClickClose,
  currentId,
}) => {
  //-------------------------------------------------------------------------------------------------------
  const classes = useStyles();

  const [checked, setChecked] = useState([]);

  const selectedProject = useSelector(({ projects }) => {
    return projects.projects.find((project) => project._id === currentId);
  });

  console.log("selectedProject : ".toUpperCase(), selectedProject);

  const [left, setLeft] = useState(selectedProject.assignedRobots);

  console.log(`left = selectedProject.assignedRobots : `.toUpperCase(), left);

  const robots = useSelector(({ robots }) => robots.robots);

  console.log("robots = robots.robots : ".toUpperCase(), robots);

  const assRobots = selectedProject.assignedRobots;

  //-------------------------------------------------------------------------------------------------------

  const existingIndex = (id) => {
    if (assRobots.length === 0) {
      return false;
    } else {
      if (
        selectedProject.assignedRobots.findIndex(
          (robot) => robot._id === id
        ) === -1
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const filteredRobots = () =>
    robots.filter((robot) => {
      console.log(
        "filteredRobots/selectedProject._id : ".toUpperCase(),
        selectedProject._id
      );
      console.log(`${robot.name} : `.toUpperCase(), robot);
      if (
        robot.assignedProjects.findIndex(
          (project) => project._id === selectedProject._id
        ) > -1
      ) {
        return null;
      } else if (existingIndex(robot._id)) {
        return null;
      } else {
        return robot;
      }
    });

  const [right, setRight] = useState(filteredRobots());

  console.log("right = filteredRobots() : ".toUpperCase(), right);

  //-------------------------------------------------------------------------------------------------------

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  //-------------------------------------------------------------------------------------------------------

  const dispatch = useDispatch();

  console.log("about to dispatch 'left' : ".toUpperCase(), left);

  // import { assignAllRobotsToProject } from "../../redux/actions/projectActions";

  const handleSubmit = () => {
    //
    dispatch(assignAllRobotsToProject(currentId, left));
    //
    dispatch(assignProjectToAllRobots(currentId, left));
    //
    dispatch(unassignProjectFromRobots(currentId, right));
  };

  //-------------------------------------------------------------------------------------------------------
  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.name}-label`;
          // console.log(value._id);
          return (
            <ListItem
              key={value._id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  //-------------------------------------------------------------------------------------------------------
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleSubmit();
        handleTransferClickClose();
      }}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle
        aria-labelledby="form-dialog-title"
        style={{ textAlign: "center" }}
      >
        Project - Robot Assignment
      </DialogTitle>
      <DialogContentText style={{ textAlign: "center" }}>
        Assign robots to this project from here.
      </DialogContentText>
      <Grid container>
        <Grid item md={6} style={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedProject && selectedProject.title}
        </Grid>
        {/* <Grid item md={0}></Grid> */}
        <Grid item md={6} style={{ textAlign: "center", fontWeight: "bold" }}>
          Robots
        </Grid>
      </Grid>
      <DialogContent style={{ height: "500px" }}>
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsTransferListExample;
