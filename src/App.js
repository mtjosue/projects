import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePage from "./pages/HomePage";
import RobotsIndex from "./pages/RobotsIndex";
import ProjectsIndex from "./pages/ProjectsIndex";

function App() {
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
