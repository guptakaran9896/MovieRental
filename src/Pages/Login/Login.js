import { ThreeBounce } from "better-react-spinkit";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { DialogContext } from "../../store/context/DialogContext";
import { InputField } from "../../components/InputField/InputField";
import { UserContext} from "../../store/context/userContext";

const Login = (props) => {
  let navigate = useNavigate();
  const  adminLogin  = useContext(UserContext);
  const loginData = useRef( {
    authType: "password",
    countryCode: 91,
    password: "",
    language: "en",
    phone: null,
    email: "",
    emailPhone: "",
  })
  const [isEmail, setIsEmail] = useState(false);
  const  showMessage  = useContext(DialogContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    authType: "password",
    countryCode: 91,
    password: "",
    language: "en",
    phone: null,
    email: "",
    emailPhone: "",
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onLogin = async () => {
    if (loading) return;
    if (!validateEmail(loginData.current.email)) {
      setData((data) => { return { ...data, phone: loginData.email, email: null } });
      loginData.current = { ...loginData.current, phone: loginData.current.email, email: null }

    }
    try {
      setLoading(true);
      var response = await adminLogin(loginData.current);
      if (response.status === 200) {
        navigate("/dashboard", { replace: true });
      } else {
        showMessage(
          "error",
          "Error",
          response?.data?.message
        );
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.body.className = "authentication-bg";

    return function cleanup() {
      document.body.className = "";
    };
  }, []);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
      </div>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={6}>
              <Card style={{padding:"48px 68px" ,minHeight:"60vh"}}>
                <CardBody className="p-0">
                  <div className="text-center">
                    {/* <img src={logo} height="80" width={""} alt=""/> */}
                  </div>
                  <div className="text-center mt-4">
                    <h1 className="text-primary" style={{ fontWeight: 'bold', fontSize: '30px' }}>Sign In</h1>
                  </div>
                  <div className="p-2 mt-4">
                    <div className="form-horizontal">
                      <div className="mb-1">
                        <Row>
                          <Col className="col-lg-12">
                            <InputField
                              value={data?.email}
                              onChange={(v) => {
                                loginData.current = { ...loginData.current, email: v, emailPhone: v }
                                setData({ ...data, email: v, emailPhone: v });
                              }}
                              // style={{
                              //   height: "40px",
                              // }}
                              required
                              label={"Email"}
                              placeholder="Enter email"
                              type="text"
                              error={
                                data?.email?.length === 0
                                  ? "Please enter office name"
                                  : ""
                              }
                              // showErr={hasErr}
                              showClear={true}
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className="mb-1">
                        <InputField
                          value={data?.password}
                          onChange={(v) => { loginData.current = { ...loginData.current, password: v }; setData({ ...data, password: v }) }}
                          required
                          label={"Password"}
                          className="col-12 mt-3"
                          placeholder="Password"
                          type="password"
                          error={
                            data?.password?.length === 0
                              ? "Please enter Password"
                              : ""
                          }
                          // showErr={hasErr}
                          showClear={true}
                        />
                      </div>
                      <div
                        className="mb-1 float-end mt-2"
                      >
                        <Link to="/forgot-password" className="text-muted">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          style={{background:"#e50914"}}
                          type="submit"
                          onClick={onLogin}
                        >
                          {loading ? (
                            <ThreeBounce size={12} color="#fff" />
                          ) : (
                            "Log In"
                          )}
                        </button>
                      </div>
                      <h4 className="mt-4">
                      New to MovieRental? <span  style={{ fontWeight: 'bold', fontSize: '15px' }}>Sign up now</span> 
                      </h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;