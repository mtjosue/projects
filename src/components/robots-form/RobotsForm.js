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
import FileBase from "react-file-base64";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import { createRobot, updateRobot } from "../../redux/actions/robotActions";

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "15px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "300",
  },
}));

const valuetext = (value) => {
  return `${value}%`;
};

const RobotsForm = ({ open, handleClickClose, currentId, setCurrentId }) => {
  const classes = useStyles();

  const initialState = {
    name: "",
    fuelType: "",
    fuelLevel: "",
    imageUrl: "",
    assignedProjects: "",
  };

  const [robotData, setRobotData] = useState(initialState);

  const robotDetails = useSelector(({ robots }) =>
    currentId ? robots.robots.find((robot) => robot._id === currentId) : ""
  );

  // console.log(robotDetails);

  useEffect(() => {
    if (robotDetails) {
      setRobotData(robotDetails);
    }
  }, [robotDetails]);

  const clearRobotData = () => {
    setRobotData(initialState);
    setCurrentId(0);
  };

  const dispatch = useDispatch();
  const handleClickSubmit = (e) => {
    e.preventDefault();
    handleClickClose();
    if (currentId === 0) {
      dispatch(createRobot(robotData));
    } else {
      dispatch(updateRobot(currentId, robotData));
    }
    clearRobotData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Robot Details</DialogTitle>

      <DialogContent>
        {/* --- */}
        <DialogContentText>
          {`${
            currentId === 0 ? "Add" : "Update"
          } your robot details from here!`}
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={robotData.name}
          onChange={(e) => {
            setRobotData({ ...robotData, name: e.target.value });
            // console.log(robotData);
          }}
        />

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Fuel Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={robotData.fuelType}
            onChange={(e) =>
              setRobotData({ ...robotData, fuelType: e.target.value })
            }
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="electric">electric</MenuItem>
            <MenuItem value="gas">gas</MenuItem>
            <MenuItem value="diesel">diesel</MenuItem>
          </Select>
          <FormHelperText>Select one</FormHelperText>
        </FormControl>

        <div className={classes.root}>
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
        </div>

        <div className={classes.file}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setRobotData({ ...robotData, imageUrl: base64 })
            }
          />
        </div>

        <TextField
          margin="dense"
          id="assignedProjects"
          label="Assign Projects"
          type="number"
          fullWidth
          value={robotData.assignedProjects}
          onChange={(e) => {
            setRobotData({ ...robotData, assignedProjects: e.target.value });
            // console.log(robotData);
          }}
        />

        <DialogActions>
          <Button color="secondary" onClick={handleClickClose}>
            Close
          </Button>

          <Button color="primary" onClick={handleClickSubmit}>
            {`${currentId === 0 ? "Add" : "Update"} Robot`}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default RobotsForm;
