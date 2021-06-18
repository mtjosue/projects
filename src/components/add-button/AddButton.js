import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AddButton = ({ text, handleClickOpen, setCurrentId }) => {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "right" }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => {
          handleClickOpen();
          setCurrentId(0);
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default AddButton;
