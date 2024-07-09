import { ThreeBounce } from "better-react-spinkit";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import { API_METHODS, ENDPOINTS } from "../../common/utils/Constants";
// import { InputField } from "../../components";
import { ApiHandler } from "../../store/apiHandler/apiHandler";
import { UserContext } from "../../store/context/userContext";
import { API_METHODS,ENDPOINTS } from "../../utils/Constants";
import { InputField } from "../../components/InputField/InputField";

const ForgetPasswordPage = () => {
  const [data, setData] = useState({
    captchaQuery: "",
    countryCode: 91,
    email: "",
    emailPhone: "",
    phone: null,
  });
  const [imageURL, setImageUrl] = useState();
  const [errType, setErrType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Enter your Email and instructions will be sent to you!"
  );
  const  webContent  = useContext(UserContext);

  useEffect(() => {
    document.body.className = "authentication-bg";
    return function cleanup() {
      document.body.className = "";
    };
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const getCaptcha = () => {
    let url;
    fetch(ENDPOINTS.getCaptcha).then((response) => {
      response.blob().then((blob) => {
        url = window.URL.createObjectURL(blob);
        setImageUrl(url);
      });
    });
  };

  const save = async () => {
    if (loading) return;
    setLoading(true);
    if (!validateEmail(data.email)) {
      setData({ ...data, phone: data.email, email: null });
    }
    const reqParam = data;
    const method = API_METHODS.POST;
    const endPoint = ENDPOINTS.validateCaptcha;

    try {
      const response = await ApiHandler({ reqParam, method, endPoint });
      setLoading(false);
      if (response.status === 200) {
        setMessage(
          data?.email
            ? "Email Sent successfully!"
            : "Sent successfully on phone!"
        );
        setErrType("success");
      } else {
        if (JSON.parse(response?.data).customMessage) {
          setMessage(JSON.parse(response?.data).customMessage);
        } else {
          setMessage(JSON.parse(response?.data).message);
        }
        setErrType("danger");
      }
    } catch (err) {
      setMessage(err);
    }
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  return (
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div> */}

      <div className="account-pages my-5  pt-sm-5">
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-6">
              <div>
                <a href="/" className="mb-5 d-block auth-logo">
                  <img
                    src={webContent?.corp_pic}
                    alt=""
                    height="50"
                    className="logo logo-dark"
                  />
                  <img
                    src={webContent?.corp_pic}
                    alt=""
                    height="50"
                    className="logo logo-light"
                  />
                </a>
                <Card>
                  <CardBody className="p-3">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Reset Password</h5>
                      {/* <p className="text-muted">Reset Password with Zoyride.</p> */}
                    </div>
                    {/* <div className="p-2 mt-4">
                      <div
                        className={`alert alert-${errType} text-center mb-1`}
                        role="alert"
                      >
                        {message}
                      </div>
                    </div> */}
                    <div className="p-2 mt-2">
                      <div className="form-horizontal">
                        <div className="mb-1">
                          <Row>
                            <InputField
                              value={data?.email}
                              onChange={(v) =>
                                setData({ ...data, email: v, emailPhone: v })
                              }
                              required
                              label={"Email"}
                              className="col-12"
                              placeholder="Email"
                              type="email"
                              error={
                                data?.email?.length === 0
                                  ? "Please enter office name"
                                  : ""
                              }
                              // showErr={hasErr}
                              showClear={true}
                            />
                          </Row>
                        </div>
                        <Row>
                          <Card className="col-5 p-1 mt-3 ps-5">
                            <div className="d-flex ">
                              <img src={imageURL} alt="" height="28" />
                              <i
                                onClick={() => getCaptcha()}
                                style={{ fontSize: "22px" }}
                                className="mt-1 uil-refresh"
                              ></i>
                            </div>
                          </Card>
                          <InputField
                            value={data?.captchaQuery}
                            onChange={(v) =>
                              setData({ ...data, captchaQuery: v })
                            }
                            required
                            label={"Captcha"}
                            className="col-7"
                            placeholder="Captcha"
                            type="text"
                            error={
                              data?.captchaQuery?.length === 0
                                ? "Please enter Captcha"
                                : ""
                            }
                            // showErr={hasErr}
                            showClear={true}
                          />
                        </Row>

                        <Row className="row mb-0">
                          <Col className="col-12 text-end">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              style={{background:"#e50914"}}
                              type="submit"
                              onClick={() => {
                                setLoading(true);
                                save();
                                setLoading(false);
                              }}
                            >
                              {loading ? (
                                <ThreeBounce size={12} color="#fff" />
                              ) : (
                                "Reset"
                              )}
                            </button>
                          </Col>
                        </Row>
                        <div className="mt-4 text-center">
                          <p className="mb-0">
                           I have Login Id and Password?{" "}
                            <Link
                              to="/"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Login Here{" "}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ForgetPasswordPage;
