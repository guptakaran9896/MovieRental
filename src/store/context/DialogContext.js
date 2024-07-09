import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import toastr from "toastr";

export const DialogContext = React.createContext();

export const DialogProvider = (props) => {
  const [isDontSave, setIsDontSave] = useState(false);
  const [showLogsP, setShowLogsP] = useState(false);
  const [conf, setConf] = useState(false);


  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: 10000,
    extendedTimeOut: 1000,
    closeButton: true,
    progressBar: true,
    preventDuplicates: false,
    newestOnTop: true,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "slideDown",
    hideMethod: "slideUp",
    showDuration: 300,
    hideDuration: 1000,
  };
  const showMessage = async (toastType, message, title) => {
    if (message?.message) {
      try {
        message = JSON.parse(message?.message);
        message = message?.message + " " + message?.customMessage;
      } catch (e) { }
    }
    if (toastType === "info") toastr.info(message, title);
    else if (toastType === "warning") toastr.warning(message, title);
    else if (toastType === "error") toastr.error(message, title);
    else toastr.success(message, title);
  };

  const showError = async (e) => {
    if (typeof e === "string") {
      toastr.error(e, "Error");
      return;
    }
    if (e.message.includes("{")) {
      toastr.error(
        JSON.parse(e.message).customMessage
          ? JSON.parse(e.message).customMessage
          : JSON.parse(e.message).message,
        "Error"
      );
    } else {
      toastr.error(e.message, "Error");
    }
  };

  function promise(props) {
    return new Promise(function (resolve, reject) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <>
              <Card style={{ width: "300px" }}>
                <CardBody style={{ zIndex: "1" }}>
                  <CardTitle style={{ marginTop: "10px" }}>
                    <div>{props?.title}</div>
                  </CardTitle>
                  <div style={{ fontSize: "15px", marginTop: "20px" }}>
                    {props?.description}
                  </div>
                  <div className="row d-flex justify-content-end">
                    {props?.isSaveWarn ? (
                      <Button
                        type="button"
                        color="dark"
                        outline
                        className=" col-4 mt-3 waves-effect waves-light"
                        onClick={() => {
                          setIsDontSave(true);
                          resolve();
                          onClose();
                        }}
                      >
                        Don't Save
                      </Button>
                    ) : null}
                    <div
                      style={{ fontSize: "15px", marginTop: "30px" }}
                      className=" d-flex justify-content-between"
                    >
                      <Button
                        type="button"
                        color="dark"
                        outline
                        className=" col-5  mt-3 waves-effect waves-light"
                        onClick={() => {
                          reject();
                          onClose();
                        }}
                      >
                        {props?.reject ? props?.reject : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="col-5 mx-2  mt-3 waves-effect waves-light"
                        onClick={() => {
                          resolve();
                          onClose();
                        }}
                      >
                        {props?.isSaveWarn
                          ? "Save"
                          : props?.proceed
                            ? props?.proceed
                            : "OK"}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          );
        },
      });
    });
  }
  function newpromise(props) {
    console.log(props);
    return new Promise(function (resolve, reject) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <>
              <Card style={{ width: "400px", borderRadius: "8px" }}>
                <CardBody style={{ zIndex: "1" }}>
                  <div className="d-flex justify-content-center" >
                    <div className=" text-center uil-check" style={{ fontSize: "25px", marginTop: "20px", backgroundColor: "rgba(255, 182, 25, 1)", height: "50px", padding: "6px", width: "50px", borderRadius: "30px" }}>

                    </div>
                  </div>
                  <CardTitle className="text-center" style={{ marginTop: "10px", fontSize: "20px", }}>
                    <div>{props?.title}</div>
                  </CardTitle>
                  <div className="text-center" style={{ fontSize: "12px", marginTop: "20px" }}>
                    {props?.description}
                  </div>
                  <div className="row d-flex justify-content-center">
                    <Button
                      type="button"
                      style={{ backgroundColor: "rgba(255, 182, 25, 1)", color: "black", border: "none", borderRadius: "8px" }}
                      outline
                      className=" col-4 mt-3 waves-effect waves-light"
                      onClick={() => {
                        resolve();
                        onClose();
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </>
          );
        },
      });
    });
  }
  const showConfirm = async (props) => {
    let isConfirm = true;
    await promise(props)
      .then(function () {
        isConfirm = isDontSave ? 2 : true;
      })
      .catch(function () {
        isConfirm = false;
      });
    return isConfirm;
  };
  const showAlert = async (props) => {
    let isConfirm = true;
    await newpromise(props)
      .then(function () {
        isConfirm = isDontSave ? 2 : true;
      })
      .catch(function () {
        isConfirm = false;
      });
    return;
  };
  return (
    <DialogContext.Provider
      value={{
        showMessage,
        showConfirm,
        showError, setShowLogsP, showLogsP, setConf, conf,
        showAlert
      }}
    >
      {props?.children}
    </DialogContext.Provider>
  );
};
