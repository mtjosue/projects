import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePage from "./pages/HomePage";
import RobotsIndex from "./pages/RobotsIndex";
import ProjectsIndex from "./pages/ProjectsIndex";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRobots } from "./redux/actions/robotActions";
import { getProjects } from "./redux/actions/projectActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRobots());
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <Container>
      <Router>
        <Route
          path="/"
          exact
          render={() => <HomePage title={`RobotProjects Home Page`} />}
        />
        <Route path="/robots" exact component={RobotsIndex} />
        <Route path="/projects" exact component={ProjectsIndex} />
      </Router>
    </Container>
  );
}

export default App;
