import React, { useState } from "react";
import { Button, Card, Navbar } from "reactstrap";
import Modal from "../../components/Common/Modal";
import Nav from "./Navbar";
import Nf_ori from "./Net";

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  return (
    <Card className="background-main">
      <Nav isAuthenticated={false} />
    </Card>
  );
};

export default Dashboard;
