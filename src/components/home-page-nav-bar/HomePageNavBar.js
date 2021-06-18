import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AndroidIcon from "@material-ui/icons/Android";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "lightGrey",
  },
}));

const HomePageNavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Link to="/">
            <Paper className={classes.paper}>
              Home <HomeIcon />
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to="/robots">
            <Paper className={classes.paper}>
              Robots <AndroidIcon />
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to="/projects">
            <Paper className={classes.paper}>
              Projects <AssignmentIcon />
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePageNavBar;
