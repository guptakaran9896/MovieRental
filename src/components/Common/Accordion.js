import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Collapse } from "reactstrap";

const Accordion = ({ children }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    function onChange(value) {
        setIsExpanded(value)
    }

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { isExpanded, onChange });
        }
        return child;
    });
    
    return (
        <div className="mt-0 pt-0">
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    {childrenWithProps}
                </div>
            </div>
        </div>
    );
};

// Accordion.Title = (props) => <div className="title">{props?.children}</div>
Accordion.Title = (props) => {
    const { children, isExpanded, onChange } = props;


    return (
        <>
            <h2 style = {{backgroundColor : "rgba(0, 0, 0, 0.03)"}} className="accordion-header" id={`heading`}>
                <button className="accordion-button collapsed" type="button"
                    onClick={() => {
                        onChange(!isExpanded)
                    }}
                    style={{ cursor: "pointer" }}>
                    {children}
                </button>
            </h2>

        </>
    );
}

Accordion.Body = (props) => {
    const { children, isExpanded } = props;
    return (
        <>
            <Collapse id="collapseTwo" className="accordion-collapse" isOpen={isExpanded}>
                <div className="accordion-body">
                    <div style={{ color: "#5b73e8" }}> {children}</div>
                </div>
            </Collapse>
        </>
    );
}

export default observer(Accordion);


