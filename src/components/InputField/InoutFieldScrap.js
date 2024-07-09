import moment from "moment";
import React, { useState, useEffect, useContext, useRef } from "react";
import { yyyymmddtoTimeStamp } from "..";

import { getDateFromSeconds, getSecondsFromDate } from "..";
import { I18nContext } from "../../store/context/i18nContext";
import "./style.css";

export const InputField = (props) => {
    const [showClearState, setShowClearState] = useState(false);
    const [value, setValue] = useState(props?.type === "date" ? getDateFromSeconds(props?.value) : props?.value);


    useEffect(() => {
        if (props?.type == "date" && getDateFromSeconds(props?.value) != value) {
            props?.onChange(getSecondsFromDate(value));
        } else if (props?.type != "date" && props?.value !== value) {
            props?.onChange(value);
        }
        if (props?.showClear) {
            if (value) setShowClearState(true);
            else setShowClearState(false);
        }
    }, [value]);

    useEffect(() => {
        if (props?.type == "date" && getDateFromSeconds(props?.value) !== value)
            setValue(getDateFromSeconds(props?.value));
        else if (props?.type != "date" && props?.value !== value) {
            setValue(props?.value);
        }
        if (props?.showClear) setShowClearState(props?.value?.length !== 0);
    }, [props?.value]);

    return (
        <section
            style={props?.style}
            className={`inputfield__container my-auto ${props?.className}`}
        >
            {props?.suggestion && (
                <b className="inputfield__suggestion">{props?.suggestion}</b>
            )}

            <div className={props?.borderNone ? "border-0" : ""} style={props?.style}>

                {/* Left Component */}
                {props?.LeftComponent && (
                    <div
                        onClick={(e) => (props?.onClickLeft ? props?.onClickLeft(e) : null)}
                        className={props?.onClickLeft ? "component_pointer inputfield__leftComponent" : "inputfield__leftComponent"}
                    >
                        <props.LeftComponent />
                    </div>
                )}

                {props?.inline ? (
                    <InlineInputField {...props} setValue={setValue} />
                ) : props?.type == "password" ? (
                    <PassWordInputField {...props} setValue={setValue} />
                ) : (
                    <MainInputField {...props} setValue={setValue} showClearState={showClearState} />
                )}

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
                        <props.RightComponent />
                    </div>
                )}
            </div>

            {/* Error Line */}
            {props?.error && props?.showErr && (
                <em className="inputfield__error">
                    {props?.error ? props?.error : "Please enter Something"}
                </em>
            )}
        </section>
    );
};

const MainInputField = (props) => {
    const { t } = useContext(I18nContext);

    return (<div className="inputfield ps-3">
        <input
            disabled={props?.isDisabled}
            readonly={props?.isReadOnly}
            pattern={props?.pattern}
            style={props?.style}
            id={`custom-input-${props?.label}-${props?.value}-${props?.identifier}`}
            name={props?.name}
            type={props?.type}
            onFocus={props?.onFocus}
            onBlur={props?.onBlur}
            onChange={(e) => {
                if (props?.type == "file") {
                    props?.onChange(e.target.files);
                    return;
                }
                if (props?.checker && !props?.checker(e.target.value)) return;
                props?.setValue(e.target.value);
                if (props?.type != "date") props?.onChange(e.target.value);
            }}
            value={props?.value?.toString() ? props?.value : ""}
            className="inputfield__input"
            placeholder={`${props?.placeholder ? t(props?.placeholder) : " "
                }`}
        />

        {props?.showClearState && (
            <span
                className="inputfield__clear"
                onClick={() => props?.onChange("")}
            >
                <i className="dripicons-cross text-white" />
            </span>
        )}
        <Label {...props} />
    </div>)
}


const InlineInputField = (props) => {
    const [width, setWidth] = useState(0);
    const changeHandler = evt => {
        setWidth(evt.target.value.length);
    };
    const { t } = useContext(I18nContext);

    return (<div style={{ height: "32px" }} className="input-group">
        <div style={{ height: "32px" }} className="input-group-text">{t(props?.label)}</div>

        <input
            pattern={props?.pattern}
            disabled={props?.isDisabled}

            type={props?.type}
            onFocus={props?.onFocus}
            onBlur={props?.onBlur}
            onChange={(e) => {
                if (props?.checker && !props?.checker(e.target.value)) return;
                props?.setValue(e.target.value);
                changeHandler(e);
            }}
            name={props?.name}
            value={props.value}
            style={{
                ...props?.style,
                minWidth: "30px",
                height: "32px",
                paddingLeft: "3px",
                paddingRight: "3px",
                width: props?.type == "text" || props?.type == "email" ? (width + 0.5) + 'ch' : "auto",
                maxWidth: props?.type == "text" || props?.type == "email" ? (18) + 'ch' : "auto"
            }}
            className="form-control rounded-right-1"
            placeholder={t(props?.placeholder)}
        />
    </div>)
}


const PassWordInputField = (props) => {
    const [type, setType] = useState("password");
    const { t } = useContext(I18nContext);

    return (<div className="inputfield ps-3">
        <input
            pattern={props?.pattern}
            disabled={props?.isDisabled}
            style={{ ...props?.style }}
            id={`custom-pass-${props?.value}`}
            name={props?.name}
            type={type}
            onFocus={props?.onFocus}
            onBlur={props?.onBlur}
            onChange={(e) => {
                if (props?.checker && !props?.checker(e.target.value)) return;
                props?.setValue(e.target.value);
                if (props?.type != "date") props?.onChange(e.target.value);
            }}
            value={props?.value?.toString() ? props?.value : ""}
            className="inputfield__input"
            placeholder={`${props?.placeholder ? t(props?.placeholder) : " "
                }`}
        />
        {props?.type == "password" && props?.value?.length > 0 && (
            <span
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
            </span>
        )}

        <Label {...props} />
    </div>)
}

const Label = (props) => {
    const { t } = useContext(I18nContext);
    return (<label
        onClick={() => {
            document
                .getElementById(
                    `custom-input-${props?.label}-${props?.value}-${props?.identifier}`
                )
                .focus();
        }}
        className="inputfield__label px-2"
    >
        {t(props?.label)}
        {props?.required && <font color="#EC734B">*</font>}
    </label>)
}