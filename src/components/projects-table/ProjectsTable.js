import React from "react";
import Card from "@material-ui/core/Card";
import { useSelector } from "react-redux";
// import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../redux/actions/projectActions";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titlePaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    fontWeight: "bold",
    height: "110px",
    // marginTop: "50px",
    display: "flex",
    direction: "column",
    justify: "center",
    alignItems: "center",
    marginRight: "10px",
    marginLeft: "-3px",
  },
  card: {
    // marginLeft: "20px",
  },
  deadline: {
    fontSize: "0.6rem",
    fontWeight: "bold",
  },
  deadlineLabel: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  completed: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    width: "100%",
  },
  priority: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    width: "100%",
  },
  actionsPaper: {
    marginLeft: "-35px",
  },
  robots: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "left",
  },
}));

const ProjectsTable = ({
  handleClickOpen,
  setCurrentId,
  handleTransferClickOpen,
}) => {
  const classes = useStyles();

  const projects = useSelector(({ projects }) => projects.projects);

  console.log("All the projects shown on the projectsTable : ", projects);

  const dispatch = useDispatch();
  const removeProject = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {projects.length >= 1 ? (
            projects.map((project) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  key={project._id}
                  className={classes.gridItem}
                >
                  <Card className={classes.card}>
                    <Grid
                      container
                      spacing={4}
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid
                        item
                        // container
                        // direction="column"
                        // justify="center"
                        // alignItems="center"
                        xs={4}
                        md={4}
                        lg={4}
                      >
                        <Paper className={classes.titlePaper}>
                          {project.title}
                        </Paper>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={4}
                        md={7}
                        lg={4}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                        style={{ paddingLeft: "30px" }}
                      >
                        <Grid item container xs={4} md={12} lg={4}>
                          <Typography className={classes.completed}>
                            Completed : {project.completed ? "Yes" : "No"}
                          </Typography>
                        </Grid>
                        <Grid item container xs={4} md={12} lg={4}>
                          <Typography className={classes.deadlineLabel}>
                            Deadline :
                          </Typography>

                          <Typography className={classes.deadline}>
                            {project.deadline.slice(0, 34)}
                          </Typography>
                          <Typography className={classes.deadline}>
                            {project.deadline.slice(34)}
                          </Typography>
                        </Grid>
                        <Grid item container xs={4} md={12} lg={4}>
                          <Typography className={classes.priority}>
                            Priority : {project.priority}
                          </Typography>
                        </Grid>
                        <Grid item container xs={4} md={12} lg={4}>
                          <Typography className={classes.robots}>
                            Robots assigned : {project.assignedRobots.length}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={2}
                        md={1}
                        lg={2}
                        direction="column"
                        justify="center"
                        alignItems="flex-end"
                      >
                        <Paper className={classes.actionsPaper}>
                          <Grid
                            container
                            // xs={12}
                            // md={12}
                            // lg={12}
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={0}
                          >
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setCurrentId(project._id);
                                  // console.log(robot._id);
                                  handleTransferClickOpen();
                                }}
                              >
                                <FolderSharedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setCurrentId(project._id);
                                  handleClickOpen();
                                  console.log("on click event");
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="secondary"
                                onClick={() => {
                                  removeProject(project._id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <div style={{ margin: "0 auto", fontWeight: "bold" }}>
              No Projects
            </div>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default ProjectsTable;
