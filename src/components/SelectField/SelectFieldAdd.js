import Select, { components } from "react-select";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "./style.css";

const Menu = (props) => {
  return (
    <Fragment>
      <components.Menu {...props}>
        <div>
          {props?.selectProps.fetchingData ? (
            <span className="fetching">Fetching data...</span>
          ) : (
            <div>{props?.children}</div>
          )}
          <button
            className={"change-data"}
            onClick={props?.selectProps.changeOptionsData}
          >
            Add Entity
          </button>
        </div>
      </components.Menu>
    </Fragment>
  );
};

const Option = (props) => {
  return (
    <Fragment>
      <components.Option {...props}>{props?.children}</components.Option>
    </Fragment>
  );
};



export const SelectFieldAdd = (props) => {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState(props?.value);
  const [inputValue, setInputValue] = useState(props?.value);
  //   const [object, setObject] = useState('')

  useEffect(() => {
    document
      .querySelectorAll(".css-yk16xz-control")
      .forEach((ele) => (ele.style.border = "none"));
  }, []);

  useEffect(() => {
    if (props?.value != value) props?.onChange(value);
  }, [value]);

  useEffect(() => {
    if (props?.value != value) setValue(props?.value);
  }, [props?.value]);

  return (
    <React.Fragment>
      <section className={`selectfield__wrapper ${props?.className}`}>
        <div style={props?.style} className="selectfield__container">
          {props?.suggestion && (
            <b className="selectfield__suggestion">{props?.suggestion}</b>
          )}
          <div>
            {props?.LeftComponent && (
              <div
                onClick={(e) =>
                  props?.onClickLeft ? props?.onClickLeft(e) : null
                }
                className={
                  props?.onClickLeft
                    ? "component_pointer Selectfield__leftComponent"
                    : "selectfield__leftComponent"
                }
              >
                <props.LeftComponent />
              </div>
            )}

            <div className="selectfield">
              <Select
                onInputChange={(v) => setInputValue(v)}
                components={{ Menu, Option }}
                setValue={value}
                changeOptionsData={props?.changeOptionsData}
                value={props?.data.filter((d) => d.value === value)}
                isClearable={true}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
                options={props?.data}
                onChange={(v) => (v ? setValue(v.value) : setValue(""))}
                styles={{
                  control: base => ({
                    ...base,
                    border: 0,
                    boxShadow: 'none'
                  })
                }}
                className="selectfield__select"
                placeholder={""}
              />
              <label
                className={
                  props?.value || onFocus
                    ? "selectfield__label selectfield__notempty_input"
                    : "selectfield__label"
                }
              >
                {props?.label}
                {props?.required && <font color="red">*</font>}
              </label>
            </div>
            

            {props?.RightComponent && (
              <div
                onClick={(e) =>
                  props?.onClickRight ? props?.onClickRight(e) : null
                }
                className={
                  props?.onClickRight
                    ? "component_pointer Selectfield__rightComponent"
                    : "selectfield__rightComponent"
                }
              >
                <props.RightComponent />
              </div>
            )}
          </div>
          {props?.error && <em className="selectfield__error">{props?.error}</em>}
        </div>
        {props?.flexible && (
          <button style={{}} onClick={() => setShowAddComponent(true)}>Add Entity</button>
        )}
      </section>
      {showAddComponent && props?.flexible && props?.AddEntityComponent && (
        <section
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "white",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "1500",
          }}
        >
          <props.AddEntityComponent setShowAddComponent={setShowAddComponent} />
        </section>
      )}
    </React.Fragment>
  );
};