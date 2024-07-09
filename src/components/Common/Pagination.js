import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const Pagination = (props) => {
  const data = [
    {
      label: 20,
      value: 20,
    },
    {
      label: 50,
      value: 50,
    },
    {
      label: 100,
      value: 100,
    },
  ];

  const changePage = (page) => {
    if (
      page > 0 &&
      page <=
      (props?.total % props?.rows === 0
        ? props?.total / props?.rows
        : props?.total / props?.rows + 1)
    ) {
      props?.onChange(page, props?.rows);
    }
  };

  const [drp_primary1, setDrp_primary1] = useState(false);

  return (
    <CardFooter className="d-flex py-1 px-2 col-12 justify-content-end">
      <div className="d-flex align align-items-center">
        <div className="d-flex mb-0  px-2">
          <Dropdown
            onClick={(e) => e.preventDefault()}
            isOpen={drp_primary1}
            toggle={() => setDrp_primary1(!drp_primary1)}
          >
            <DropdownToggle
              onClick={(e) => e.preventDefault()}
              tag="button"
              className="btn btn-outline-primary"
              style={{ padding: "0 5px 0 10px" }}
            >
              <span style={{ float: "left", lineHeight: "30px" }}>
                {props?.rowsPerPage ? props?.rowsPerPage : props?.rows} Rows{" "}
              </span>
              <span
                className="bx bx-chevron-up"
                style={{ fontSize: "24px", lineHeight: "28px" }}
              />
            </DropdownToggle>
            <DropdownMenu onClick={(e) => e.preventDefault()}>
              {data.map((d, key) => {
                const { label, value } = d;
                return (
                  <DropdownItem
                    onClick={(e) => {
                      e.preventDefault();
                      props?.onChange(1, value);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {label} Rows
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex align align-items-center">
          <div style={{ fontSize: "12px" }} className="d-flex mt-1 mb-0  mx-2">
            {props?.total === 0 ? '0' : (props?.page - 1) * props?.rows + 1} -{" "}
            {(props?.page * props?.rows) > props?.total
              ? props?.total
              : (props?.page * props?.rows)}{" "}
            of {props?.total}
          </div>
          <div>
            <i
              style={{ fontSize: "30px" }}
              role="button"
              className="page-item uil-angle-left  text-primary"
              onClick={(e) => {
                e.preventDefault();
                changePage(props?.page - 1);
              }}
            ></i>

            <i
              style={{ fontSize: "30px" }}
              color="primary"
              role="button"
              className="page-item text-primary uil-angle-right"
              onClick={(e) => {
                e.preventDefault();
                changePage(props?.page + 1);
              }}
            ></i>
          </div>
        </div>
      </div>
    </CardFooter>
  );
};

export default observer(Pagination);
