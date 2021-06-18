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
// import FileBase from "react-file-base64";
// import { makeStyles } from "@material-ui/core/styles";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  updateProject,
} from "../../redux/actions/projectActions";

// const useStyles = makeStyles((theme) => ({
//   file: {
//     marginTop: "15px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   root: {
//     width: "300",
//   },
// }));

const ProjectsForm = ({ open, handleClickClose, currentId, setCurrentId }) => {
  // const classes = useStyles();

  const initialState = {
    title: "",
    deadline: "",
    priority: "",
    completed: false,
    description: "",
  };

  const [projectData, setProjectData] = useState(initialState);

  const projectDetails = useSelector(({ projects }) =>
    currentId
      ? projects.projects.find((project) => project._id === currentId)
      : ""
  );

  useEffect(() => {
    if (projectDetails) {
      setProjectData(projectDetails);
    }
  }, [projectDetails]);

  const clearProjectData = () => {
    setProjectData(initialState);
    setCurrentId(0);
  };

  const dispatch = useDispatch();
  const handleClickSubmit = (e) => {
    e.preventDefault();
    handleClickClose();
    if (currentId === 0) {
      dispatch(createProject(projectData));
    } else {
      dispatch(updateProject(currentId, projectData));
    }
    clearProjectData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Project Details</DialogTitle>

      <DialogContent>
        {/* --- */}
        <DialogContentText>
          {`${
            currentId === 0 ? "Add" : "Update"
          } your project details from here!`}
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={projectData.title}
          onChange={(e) => {
            setProjectData({ ...projectData, title: e.target.value });
          }}
        />
        {/* 
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Deadline
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={projectData.deadline}
            onChange={(e) =>
              setProjectData({ ...projectData, deadline: e.target.value })
            }
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="electric">electric</MenuItem>
            <MenuItem value="gas">gas</MenuItem>
            <MenuItem value="diesel">diesel</MenuItem>
          </Select>
          <FormHelperText>Select one</FormHelperText>
        </FormControl> */}

        {/* <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>
            Fuel Level
          </Typography>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            // marks
            // value={robotData.fuelLevel}
            min={0}
            max={100}
            onChange={(e) => {
              setRobotData({ ...robotData, fuelLevel: e.target.ariaValueNow });
              // console.log(e.target.ariaValueNow);
              // console.log(robotData);
            }}
          />
        </div> */}

        {/* <div className={classes.file}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setRobotData({ ...robotData, imageUrl: base64 })
            }
          />
        </div> */}

        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={projectData.description}
          onChange={(e) => {
            setProjectData({ ...projectData, description: e.target.value });
          }}
        />

        <DialogActions>
          <Button color="secondary" onClick={handleClickClose}>
            Close
          </Button>

          <Button color="primary" onClick={handleClickSubmit}>
            {`${currentId === 0 ? "Add" : "Update"} Project`}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsForm;