import Select from "react-select";
import React, { useState, useEffect } from "react";
import "./style.css";

export const SearchInput = (props) => {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState(props?.value);
  const [inputValue, setInputValue] = useState(props?.value);
  const [dc, setDc] = useState({})
  //   const [object, setObject] = useState('')

  useEffect(() => {
    document
      .querySelectorAll(".css-yk16xz-control")
      .forEach((ele) => (ele.style.border = "none"));
  }, []);

  useEffect(() => {
    if (props?.value !== value) props?.onChange(value);
  }, [value, props]);

  useEffect(() => {
    props?.onInputChange(inputValue);
  }, [inputValue, props]);

  useEffect(() => {
    if (props?.value !== value)
      setValue(props?.value);
    if (props?.value) {
      setDc({
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      });
    } else {
      setDc({});
    }

  }, [props?.value, value]);


  return (
    <React.Fragment>
      <section className={`selectfield__wrapper ${props?.className}`}>
        <div style={props?.style} className="selectfield__container">
          {props?.suggestion && (
            <b className="selectfield__suggestion">{props?.suggestion}</b>
          )}
          <div className={props?.borderNone ? "border-0" : ""}>
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

            {props?.inline ? (
              <div className="input-group">
                <div className="input-group-text">{props?.label}</div>
                <Select
                  onInputChange={(v) => setInputValue(v)}
                  setValue={value}
                  value={value}
                  components={dc}
                  isClearable={props?.showClear}
                  onFocus={() => setOnFocus(true)}
                  onBlur={() => setOnFocus(false)}
                  options={props?.data}
                  onChange={(v) => {
                    if (v) {
                      setDc({
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      });
                      setValue(v);
                    } else {
                      setDc({});
                      setValue("");
                    }
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      boxShadow: "none",
                      // width:'100%'
                    }),
                  }}
                  className="form-control px-0 py-0"
                  // className="selectfield__select"
                  placeholder={'Select ' + props?.label}
                />
              </div>
            ) : (
              <div className="selectfield">
                <Select
                  onInputChange={(v) => setInputValue(v)}
                  setValue={value}
                  value={value}
                  components={dc}
                  isClearable={props?.showClear}
                  onFocus={() => setOnFocus(true)}
                  onBlur={() => setOnFocus(false)}
                  options={props?.data}
                  onChange={(v) => {
                    if (v) {
                      setDc({
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      });
                      setValue(v);
                    } else {
                      setDc({});
                      setValue("");
                    }
                  }}
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
                      ? "selectfield__label px-2 selectfield__notempty_input"
                      : "selectfield__label px-2"
                  }
                >
                  {props?.label}
                  {props?.required && <font color="red">*</font>}
                </label>
              </div>
            )}


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
          <button onClick={() => setShowAddComponent(true)}>Add Entity</button>
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
