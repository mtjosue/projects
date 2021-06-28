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
  assignAllProjectsToRobot,
  assignRobotToAllProjects,
  unassignRobotFromProjects,
} from "../../redux/actions/robotActions";
// import { assignRobotToAllProjects } from "../../redux/actions/projectActions";

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

//----------------------------------------------------------------------------------------------------------

const RobotsTransferListExample = ({
  open,
  handleTransferClickClose,
  currentId,
}) => {
  //
  const classes = useStyles();

  const [checked, setChecked] = useState([]);

  //Grabbing the robot with the currentID
  const selectedRobot = useSelector(({ robots }) => {
    return robots.robots.find((robot) => robot._id === currentId);
  });

  // console.log("line 66 selectedRobot : ".toUpperCase(), selectedRobot);////////////////////////////////////////

  const [left, setLeft] = useState(selectedRobot.assignedProjects);
  // console.log(selectedRobot);
  // console.log(left);
  // console.log("line 71 left : ".toUpperCase(), left);/////////////////////////////////////////////////////////
  // const [left, setLeft] = useState([...selectedRobot.assignedProjects]);
  // Using || it will prepopulate with either or.

  // const projects = useSelector(({ projects }) => projects.projectsObj);
  const projects = useSelector(({ projects }) => projects.projects);
  //returns {{}}

  // const arrOfObjs = Object.values(projects);
  // console.log(arrOfObjs);

  const assProjects = selectedRobot.assignedProjects;
  //returns [{}]

  // console.log(assProjects);
  //Array of objects

  // console.log("line 88 projects : ".toUpperCase(), projects);///////////////////////////////////////
  //Object with Objects as properties, (key value pairs)

  // const createObjWithIds = (projects) => {
  //   const objWithIds = {};
  //   const assProjectB = projects.map((project) => {
  //     return {project}
  //   })
  // }

  // const filteredUnassignedProjects = projects.filter((project) => {
  //   return assProjects
  // })

  //Right now we have the single project in "project" with their id selected.
  // const findElements = projects.forEach((project) => {
  //   if (project._id) {

  //   }
  // })

  // createObjWithIds(assProjects)

  //----------------------------------------------------------------------------
  // const convertArrayToObject = (array, key) => {
  //   const initialValue = {};
  //   return array.reduce((obj, item) => {
  //     return { ...obj, [item[key]]: item };
  //   }, initialValue);
  // };

  // console.log(convertedObjectFromArray);
  //----------------------------------------------------------------------------

  const existingIndex = (id) => {
    // const convertedObjectFromArray = convertArrayToObject(assProjects, "_id");

    // console.log(assProjects);

    if (assProjects.length === 0) {
      return false;
    } else {
      if (assProjects.findIndex((project) => project._id === id) === -1) {
        return false;
      } else {
        return true;
      }
    }
  };

  const filteredProjects = () =>
    projects.filter((project) => {
      if (existingIndex(project._id)) {
        return null;
      } else {
        return project;
      }
    });

  // const func = filteredProjects();

  // console.log("line 149 filteredRobots : ".toUpperCase(), func);///////////////////////////////

  const [right, setRight] = useState(filteredProjects());
  // filteredProjects

  // console.log("line 154 right : ".toUpperCase(), right);/////////////////////////////////////////
  // console.log(right);

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

  // console.log("line 199 left : ".toUpperCase(), left);//////////////////////////////////////

  // import { assignAllProjectsToRobot } from "../../redux/actions/robotActions";
  // import { assignRobotToAllProjects } from "../../redux/actions/projectActions";

  // const leftRight = {
  //   left: [...left],
  //   right: [...right],
  // };

  // console.log("leftRight line(215) : ".toUpperCase(), leftRight);
  // console.log("----------------------------------------------------------");

  const handleSubmit = () => {
    //
    dispatch(assignAllProjectsToRobot(currentId, left));
    //
    dispatch(assignRobotToAllProjects(currentId, left));
    //
    dispatch(unassignRobotFromProjects(currentId, right));
    //
  };

  //-------------------------------------------------------------------------------------------------------

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.title}-label`;
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
              <ListItemText id={labelId} primary={value.title} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  //
  //
  //
  //
  //
  //
  //
  //
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

export default RobotsTransferListExample;
