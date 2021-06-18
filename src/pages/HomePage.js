import React from "react";
import HomePageAppBar from "../components/home-page-app-bar/HomePageAppBar";
import HomePageNavBar from "../components/home-page-nav-bar/HomePageNavBar";

const HomePage = ({ title }) => {
  // const [text, setText] = useState([

  // ])

  return (
    <div>
      <HomePageAppBar title={title} />
      <HomePageNavBar />
    </div>
  );
};

export default HomePage;
