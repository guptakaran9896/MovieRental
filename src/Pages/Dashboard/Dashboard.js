import React, { useState } from "react";
import { Button, Card, Navbar } from "reactstrap";
import Modal from "../../components/Common/Modal";
import Nav from "./Navbar";
import Nf_ori from "./Net";
import CardContainer from "../Carousel/CardContainer";
import "./style.css"
const Dashboard = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
    <Card className="background-main">
      <Nav isAuthenticated={false} />
    </Card>
      <div className="slider_container">   
        <CardContainer/>
      </div>
    </>
  );
};

export default Dashboard;
