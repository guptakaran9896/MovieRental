import React, { useEffect, useState, useRef, useMemo } from "react";
import { ApiHandler } from "../apiHandler/apiHandler";
import { doGET } from "../util/httpUtil";
import { ENDPOINTS, API_METHODS } from "../../utils/Constants";
export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [authToken, setAuthToken] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const adminLogin = async (data) => {
    try {
      const response = await ApiHandler({
        reqParam: data,
        method: API_METHODS.POST,
        endPoint: ENDPOINTS.adminLogin,
      });
      console.log(response.data);
      if (response.status === 200) {
        setAuthToken(response.data.token);
        setIsLoggedIn(true);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id",response.data._id)
        setIsAdmin(true);
        return response;
      } else {
        return response;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      // const response = await doGET(ENDPOINTS.logout);
      setIsLoggedIn(false)
      localStorage.clear();
    } catch (err) {}
  };
  return (
    <UserContext.Provider
      value={{
        authToken,
        adminName,
        setAdminName,
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn,
        adminLogin,
        logout,
        isAdmin,
      }}
    >
      {props?.children}
    </UserContext.Provider>
  );
};
