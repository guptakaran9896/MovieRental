import Select from "react-select";
import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { I18nContext } from "../../store/context/i18nContext";

export const SelectFieldMultiple = (props) => {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState(props?.value);
  const [dc, setDc] = useState({})
  const { t } = useContext(I18nContext);
  useEffect(() => {
    document
      .querySelectorAll(".css-yk16xz-control")
      .forEach((ele) => (ele.style.border = "none"));
  }, []);

  useEffect(() => {
    if (JSON.stringify(props?.value) != JSON.stringify(value))
      props?.onChange(value);
  }, [value]);

  useEffect(() => {
    if (JSON.stringify(props?.value) != JSON.stringify(value))
      setValue(props?.value);
    if (props?.value?.length > 0) {
      setDc({
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      });

    } else {
      setDc({});
    }

  }, [props?.value]);


  return (
    <React.Fragment>
      <section style={{
        maxHeight: 'min-content',
        minHeight: ' max-content'
      }} className={`selectfield__wrapper ${props?.className}`}>
        <div style={props?.style} className=" my-2 selectfield__container">
          {props?.suggestion && (
            <b className="selectfield__suggestion">{props?.suggestion}</b>
          )}
          <div className={props?.borderNone ? "border-0 " : "" + 'selectfield__innercontainer '}>
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
                <div className="input-group-text">{t(props?.label)}</div>
                {props?.required && <font color="red">*</font>}
                <Select
                  components={dc}
                  setValue={value}
                  value={value}
                  // value={props?.data.filter((d) => d.value  ===  value)}
                  isClearable={props?.showClear}
                  onFocus={() => setOnFocus(true)}
                  onBlur={() => setOnFocus(false)}
                  options={props?.data}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  onChange={(v) => {
                    if (v.length > 0) {
                      setDc({
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      });
                      setValue(v);
                    } else {
                      setDc({});
                      setValue("");
                    }
                  }} styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      boxShadow: "none",
                    }),
                  }}
                  className="form-control px-0 py-0 rounded-right-1"
                  placeholder={"Select " + t(props?.label)}
                  isDisabled={props?.isDisabled || false}
                />
              </div>
            ) : (
              <div className="selectfield">
                <Select
                  components={dc}
                  setValue={value}
                  value={value}
                  // value={props?.data.filter((d) => d.value  ===  value)}
                  isClearable={props?.showClear}
                  onFocus={() => setOnFocus(true)}
                  onBlur={() => setOnFocus(false)}
                  options={props?.data}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  onChange={(v) => (v ? setValue(v) : setValue(""))}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: 0,
                      boxShadow: "none",
                      height: 'max-content',
                      maxHeight: 'max-content',
                      minHeight: 21
                    }),
                    container: (base) => ({
                      ...base, height: 'max-content'
                    }),
                    indicatorsContainer: (base) => ({
                      ...base, height: 30
                    }),
                    valueContainer: (base) => ({ ...base, padding: 0 }),
                    placeholder: (base) => ({ ...base, paddingLeft: "calc(1rem - 3px)" }),
                    menu: (provided, state) => ({
                      ...provided,
                      width: state.selectProps.width,
                      color: state.selectProps.menuColor,
                      // padding: 20,
                    }),
                    input: (base) => ({ ...base, margin: 0, paddingLeft: "calc(1rem - 3px)" })
                  }}
                  className="selectfield__select"
                  placeholder={" "}
                />
                <label
                  className={
                    props?.value || onFocus
                      ? "selectfield__label px-2 selectfield__notempty_input"
                      : "selectfield__label px-2"
                  }
                >
                  {t(props?.label)}
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
          {props?.error && props?.showErr && <em className="selectfield__error">{props?.error}</em>}
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
