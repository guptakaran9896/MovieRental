import React, { useContext, useState } from "react";
import { doPOST } from "../../store/util/httpUtil";
import { ENDPOINTS } from "../../utils/Constants";
import { DialogContext } from "../../store/context/DialogContext";
import { UserContext } from "../../store/context/userContext";
import { useNavigate } from "react-router-dom";

const MovieDescription = ({ movie }) => {
  const { showMessage } = useContext(DialogContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const RentMovie = async () => {
    try {
      const data = {
        customerId: localStorage.getItem("id"),
        movieId: movie?._id,
      };
      const response = await doPOST(ENDPOINTS.rentMovie, data);
      if (response.status == 200) {
        showMessage("Movie Rented Successfully");
      }
    } catch (error) {}
  };
  return (
    <div className="popup_movie">
      <div>
        <img
          src={movie?.image_path}
          alt={movie?.imgUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div>
          <h2 style={{ color: "white" }}>{movie?.description}</h2>
        </div>
        <div>
          <button
            style={{
              border: "1px solid red",
              margin: "10px",
              padding: "8px 24px",
              fontSize: "13px",
              backgroundColor: "red",
              color: "white",
              textDecoration: "none",
            }}
            onClick={() => {
              if (isLoggedIn) RentMovie();
              else navigate("/");
            }}
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
