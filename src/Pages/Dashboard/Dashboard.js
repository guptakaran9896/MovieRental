import React, { useContext, useState } from "react";
import { Button, Card, Navbar } from "reactstrap";
import Modal from "../../components/Common/Modal";
import Nav from "./Navbar";
import Nf_ori from "./Net";
import CardContainer from "../Carousel/CardContainer";
import "./style.css";
import { UserContext } from "../../store/context/userContext";
const Dashboard = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Card className="background-main">
        <Nav isAuthenticated={isLoggedIn} />
      </Card>
      <div className="slider_container">
        <CardContainer />
      </div>
    </>
  );
};

export default Dashboard;
