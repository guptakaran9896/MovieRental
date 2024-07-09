import React, { useState, useEffect, useContext, useRef } from "react";
import "./style.css";

export const InputField = (props) => {
  const [showClearState, setShowClearState] = useState(false);
  const inputFieldRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (

    <section

      style={{ ...props?.style }}
      className={`inputfield__container my-auto ${props?.className}`}>

      {props?.suggestion && (
        <b className="inputfield__suggestion">{props?.suggestion}</b>)}

      <div ref={inputFieldRef}
        className={(props.plain && !isFocused ? "inputfield__plain " : "") + (!props.inline ? 'inputfield__innercontainer ' : 'inputfield__innerInline ') + props.innerContainerClassName} style={props.inline ? { height: '21px', ...props?.style } : props.style}>
        {/* Left Component */}
        {props?.LeftComponent && (
          <div
            onClick={(e) => (props?.onClickLeft ? props?.onClickLeft(e) : null)}
            className={props?.onClickLeft ? "component_pointer inputfield__leftComponent" : "inputfield__leftComponent"}>
            <props.LeftComponent />
          </div>
        )}

        <MainInputField inputFieldRef={inputFieldRef} isFocused={isFocused} setIsFocused={setIsFocused}  {...props} setShowClearState={setShowClearState} showClearState={showClearState} />

        {/* Right Component */}
        {props?.RightComponent && (
          <div
            onClick={(e) =>
              props?.onClickRight ? props?.onClickRight(e) : null
            }
            style={{ height: "32px" }}
            className={
              props?.onClickRight
                ? "component_pointer inputfield__rightComponent"
                : "inputfield__rightComponent"
            }
          >
            <props.RightComponent {...props} />
          </div>
        )}
      </div>


      {/* Error Line */}
      {
        props?.error && props?.showErr && (
          <em className="inputfield__error">
            {props?.error ? props?.error : "Please enter Something"}
          </em>
        )
      }
    </section >

  );
};

const MainInputField = (props) => {
  const { setShowClearState, isFocused, setIsFocused } = props;

  const [value, setValue] = useState(props.value)
  const [width, setWidth] = useState(props?.value?.length);
  const [type, setType] = useState(props.type);
  const inputRef = useRef(null)

  useEffect(() => {
    if (props?.value !== value) {
      props?.onChange(value);
    }
    // console.log(value, "1", props.value, "1");
    if (props?.showClear) {
      setShowClearState(value ? true : false);
    }
  }, [value]);

  useEffect(() => {
    if (props?.value !== value) {
      setValue(props.value);
    }
    // console.log(value, "2", props.value, "2");
    if (props?.showClear) {
      setShowClearState(props.value ? true : false);
    }
  }, [props.value]);

  const changeHandler = evt => {
    setWidth(evt.target.value.length);
  };

  return (<div className={props.inline ? "input-group" : "inputfield ps-3"} style={props.inline ? { height: "21px" } : {}}>
    {props.inline && <div style={{ height: "20px", fontSize: 11 }} className="input-group-text">{props?.label}</div>}
    <input
      ref={inputRef}
      disabled={props?.isDisabled}
      readonly={props?.isReadOnly}
      pattern={props?.pattern}
      id={`custom-input-${props?.label}-${value}-${props?.identifier}`}
      name={props?.name}
      type={type}
      required={props?.required}
      onFocus={() => {
        if (props?.onFocus)
          props?.onFocus()
        setIsFocused(true)
      }}
      onBlur={() => {
        if (props?.onBlur)
          props?.onBlur()
        setIsFocused(false)
      }}
      onChange={(e) => {
        if (props?.checker && !props?.checker(e.target.value)) return;
        setValue(props?.type == "file" ? e.target.files : e.target.value);
        if (props.inline)
          changeHandler(e)
      }}
      style={props.inline ? {
        ...props?.style,
        minWidth: "40px",
        height: "20px",
        paddingLeft: "3px",
        // paddingTop: 2,
        paddingRight: "3px",
        width: props?.type == "text" || props?.type == "email" ? (width + 0.5) + 'ch' : "auto",
        maxWidth: props?.type == "text" || props?.type == "email" ? (18) + 'ch' : "auto"
      } : { ...props.style }}
      value={value?.toString() ? value : ""}
      className={props.inline ? "form-control rounded-right-1" : "inputfield__input"}
      // placeholder={`${props?.placeholder && (isFocused || props.plain || props.noLabel) ? t(props?.placeholder) : " "
      placeholder={`${props?.placeholder  ? props?.placeholder : " "

        }`}
    />
    {props?.type == "password" ? (
      value ? <span
        className="inputfield__eye"
        onClick={() =>
          type == "text" ? setType("password") : setType("text")
        }
      >
        {type === "text" ? (
          <i className="uil-eye text-primary" />
        ) : (
          <i className="uil-eye-slash text-primary" />
        )}
      </span> : undefined
    ) :
      props?.showClearState ? (
        <span
          className="inputfield__clear"
          onClick={() => setValue("")}
        >
          <i className="dripicons-cross text-white" />
        </span>
      ) : undefined
    }
    {/* {!(props.inline || props.plain) && !props.noLabel && <Label {...props} />} */}
  </div>)
}

// const Label = (props) => {
//   const { t } = useContext(I18nContext);
//   return (<label
//     onClick={() => {
//       document
//         .getElementById(
//           `custom-input-${props?.label}-${props?.value}-${props?.identifier}`
//         )
//         .focus();
//     }}
//     className="inputfield__label px-2"
//   >
//     {t(props?.label)}
//     {props?.required && <font color="#EC734B">*</font>}
//   </label>)
// }