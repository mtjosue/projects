import React from "react";
import Card from "@material-ui/core/Card";
import { useSelector } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deleteRobot } from "../../redux/actions/robotActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-18px",
    paddingTop: "-18px",
    flexGrow: 1,
  },
  media: {
    height: "75px",
    width: "75px",
    margin: "5px 5px",
  },
  gridItem: {
    marginTop: "10px",
  },
  card: {
    display: "flex",
  },
  title: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  detail: {
    textAlign: "center",

    fontSize: "13px",
  },
  detailsContainer: {
    marginLeft: "5px",
  },
}));

const RobotsTable = ({
  handleClickOpen,
  setCurrentId,
  handleTransferClickOpen,
}) => {
  const classes = useStyles();

  const robots = useSelector(({ robots }) => robots.robots);

  // console.log(robots);

  const dispatch = useDispatch();
  const removeRobot = (id) => {
    dispatch(deleteRobot(id));
  };

  return (
    <Container>
      <Grid container className={classes.root} spacing={2}>
        {robots.length >= 1 ? (
          robots.map((robot) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                key={robot._id}
                className={classes.gridItem}
              >
                <Card className={classes.card}>
                  <Paper>
                    {robot.imageUrl ? (
                      <CardMedia
                        className={classes.media}
                        image={robot.imageUrl}
                      />
                    ) : (
                      <div className={classes.media}>No Image</div>
                    )}
                  </Paper>
                  <div className={classes.detailsContainer}>
                    <div className={classes.title}>
                      <div>{robot.name}</div>
                    </div>
                    <div className={classes.detail}>
                      Type : {robot.fuelType}
                    </div>
                    <div className={classes.detail}>
                      Fuel Level : {robot.fuelLevel}%
                    </div>
                    <div className={classes.detail}>
                      Assigned Projects : {robot.assignedProjects}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      margin: "0 auto",
                      paddingTop: "18px",
                    }}
                  >
                    <Paper>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setCurrentId(robot._id);
                          console.log(robot._id);
                          handleTransferClickOpen();
                        }}
                      >
                        <FolderSharedIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setCurrentId(robot._id);
                          handleClickOpen();
                          console.log("on click event");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          removeRobot(robot._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </div>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div style={{ margin: "0 auto", fontWeight: "bold" }}>No Robots</div>
        )}
      </Grid>
    </Container>
  );
};

export default RobotsTable;
