import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Select, { components } from "react-select";
import { I18nContext } from "../../store/context/i18nContext";
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
            <props.selectProps.bottomBarChildren />
          </button>
        </div>
      </components.Menu>
    </Fragment>
  );
};
export const SelectField = (props) => {
  const { t } = useContext(I18nContext);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState(
    props?.data?.find((d) => d?.value == props?.value) ? props?.data?.find((d) => d?.value == props?.value) : ""
  );
  const selectRef = useRef(null);

  useEffect(() => {
    // console.log(props.data, value, props.value, 'props.valueChanged')
    if (props?.value != value?.value && props?.data?.length) {
      if (props?.value==null) setValue("");
      else if (props?.data?.find((d) => d.value === props?.value))
        setValue(props?.data?.find((d) => d.value === props?.value));
    }
  }, [props?.value, props?.data]);

  useEffect(() => {
    // console.log(props.data, value, props.value, 'valueChanged')
    if (props?.value != value?.value && props?.data?.length) {
      if (!value) {
        props.onChange("");
      } else props.onChange(value);
    }
  }, [value]);


  return (
    <React.Fragment>
      <div
        style={{
          maxHeight: "min-content",
          minHeight: "max-content",
          
          ...props.wrapperStyle, ...props.style
        }} className={`${props?.inline ? "" : "selectfield__wrapper "} ${props?.className}`}>

        <div
          style={props?.containerStyle}
          className={
            `selectfield__container ` +
            (props.plain && !onFocus ? "selectfield__plain " : "") +
            props.containerClassName
          }
        >
          {props?.suggestion && (
            <b className="selectfield__suggestion">{props?.suggestion}</b>
          )}
          <div
            id="x1"
            className={
              "selectfield__innercontainer " + props.innerContainerClassName
            }
            style={{
              ...props?.innerContainerStyle,
              backgroundColor: props?.isDisabled ? "hsl(0, 0%, 95%)" : "",
            }}
          >
            {props?.LeftComponent && (
              <div
                id="x2"
                onClick={(e) =>
                  props?.onClickLeft ? props?.onClickLeft(e) : null
                }
                className={
                  props?.onClickLeft
                    ? "component_pointer Selectfield__leftComponent"
                    : "selectfield__leftComponent"
                }
                style={{ height: props.inline ? "19px" : "28px" }}
              >
                <props.LeftComponent />
              </div>
            )}

            <div
              className={props.inline ? "input-group" : "selectfield x1"}
              id="x5"
            >
              {props.inline && (
                <div
                  style={{ height: "19px", border: "none", fontSize: 11 }}
                  className="input-group-text"
                >
                  {t(props?.label)}
                </div>
              )}

              <Select
                components={
                  props?.showBottomBar
                    ? value
                      ? {
                        IndicatorSeparator: () => null,
                        components,
                        Menu,
                        DropdownIndicator: () => null,
                      }
                      : { IndicatorSeparator: () => null, Menu }
                    : value
                      ? {
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => null,
                      }
                      : { IndicatorSeparator: () => null }
                }
                bottomBarChildren={props?.bottomBarChildren}
                changeOptionsData={props?.changeOptionsData}
                optionComponent={props?.renderFunc}
                menuPlacement="auto"
                onInputChange={props?.onInputChange}
                setValue={props.inputValue}
                value={value}
                styles={props.inline ? stylesForInline : stylesForMain}
                ref={selectRef}
                isClearable={props?.showClear && !props.plain && !props.inline}
                onFocus={() => {
                  if (props.onFocus) props.onFocus();
                  setOnFocus(true);
                }}
                onBlur={() => {
                  if (props.onBlur) props.onBlur();
                  setOnFocus(false);
                }}
                options={props.data}
                onChange={(v) => (v ? setValue(v) : setValue(""))}
                className={
                  !props.inline
                    ? "selectfield__select"
                    : "form-control px-0 py-0 rounded-right-1"
                }
                // placeholder={
                //   props.noLabel || onFocus || props.plain || props.inline
                //     ?  t(props?.label)
                //     : ""
                // }
                placeholder={
                  props.placeholder 
                    ?  t(props?.placeholder)
                    : ""
                }
                isDisabled={props?.isDisabled || false}
              />
              {/* {!props.plain && !props.noLabel && !props.inline && (
                <label
                  onClick={() => (!onFocus ? selectRef.current.focus() : null)}
                  style={
                    props?.isDisabled
                      ? { backgroundColor: "hsl(0, 0%, 95%)" }
                      : {}
                  }
                  className={
                    value || onFocus
                      ? "selectfield__label px-2 selectfield__notempty_input"
                      : "selectfield__label px-2"
                  }
                >
                  {t(props?.label)}
                  {props?.required && <font color="red">*</font>}
                </label>
              )} */}
            </div>

            {props?.RightComponent && (
              <div
                id="x6"
                onClick={(e) =>
                  props?.onClickRight ? props?.onClickRight(e) : null
                }
                style={{ height: props.inline ? "19px" : "28px" }}
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
          {props?.error && props?.showErr && (
            <em className="selectfield__error">{props?.error}</em>
          )}
        </div>
        {props?.flexible && (
          <button onClick={() => setShowAddComponent(true)}>Add Entity</button>
        )}
      </div>
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

const stylesForMain = {
  control: (base) => ({
    ...base,
    border: 0,
    boxShadow: "none",
    height: 30,
    maxHeight: 30,
    minHeight: 30,
  }),
  singleValue: (base) => ({ ...base, paddingLeft: "calc(1rem - 3px)" }),
  indicatorsContainer: (base) => ({ ...base, height: 30 }),
  valueContainer: (base) => ({ ...base, padding: 0 }),
  placeholder: (base) => ({ ...base, paddingLeft: "calc(1rem - 3px)" }),
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: state.selectProps.menuColor,
    // padding: 20,
  }),
  input: (base) => ({ ...base, margin: 0, paddingLeft: "calc(1rem - 3px)" }),
};

const stylesForInline = {
  control: (base) => ({
    ...base,
    border: "none",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
    minHeight: "18px",
    height: "18px",
    // width:'100%'
  }),
  container: (base) => ({
    ...base,
    border: "none",
  }),
  placeholder: (base) => ({ ...base, fontSize: 12 }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "18px",
    minWidth: "40px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    // height: "10px",
    padding: 0,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "18px",
  }),
};
