import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { swapToIndex } from "../..";

const Tab = (props) => {

  const { vertical, children, activeTab } = props;

  const [activeTabJustify, setactiveTabJustify] = useState(activeTab ? activeTab : 1);

  const [button, setButton] = useState(0);
  const [horizontalTabsUnit, setHorizontalTabsUnit] = useState(1);
  const [isVertical, setIsVertical] = useState(vertical);
  const [childrens, setChildrens] = useState(children);
  const TabRef = useRef();
  const [width, setWidth] = useState(

    (document.body.offsetWidth < 550) ? (210) :
      (document.body.offsetWidth < 875) ? (618) :
        (document.body.offsetWidth < 1350) ? (818)
          : (1020)
  );

  useEffect(() => {
    setChildrens(props.children)
  }, [props.children])

  const getTabSize = () => {
    const newWidth = TabRef?.current?.clientWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getTabSize);
  }, []);


  useEffect(() => {
    setactiveTabJustify(activeTab ? activeTab : 1);
  }, [activeTab]);

  useEffect(() => {
    width < 650 ? setIsVertical(false) : vertical ? setIsVertical(true) : setIsVertical(false);
    if (width < 420) setHorizontalTabsUnit(1)
    else if (width < 650) setHorizontalTabsUnit(2)
    else if (width < 825) setHorizontalTabsUnit(3)
    else if (width < 1050) setHorizontalTabsUnit(4)
    else if (width < 1250) setHorizontalTabsUnit(5)
    else if (width < 1450) setHorizontalTabsUnit(6)
    else setHorizontalTabsUnit(7)
  }, [width]);

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      if (tab > horizontalTabsUnit && !isVertical)
        setChildrens(swapToIndex(children, tab - 1, horizontalTabsUnit - 1))
      setactiveTabJustify(tab);
      props.onChange(tab);
    }
  }

  if (isVertical)
    return (
      <div ref={TabRef} className="d-flex mt-3 pt-2">

        {props?.left ? <Nav className="nav-tabs-custom flex-column" style={{ width: '15%' }}>
          {childrens.map((child, index) => {
            if (!child)
              return undefined;
            const { label, num } = child?.props;
            return (
              <NavItem className="d-block" >
                <NavLink
                  onClick={() => {
                    toggleCustomJustified(num);
                    setButton(index);
                  }}
                  className={button === index ? 'tab-active-left' : 'tab-inactive-left'}
                >
                  <span className="d-block d-sm-block ">{label}</span>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav> : null}

        <TabContent style={{ marginLeft: "20px", width: "100%" }} activeTab={activeTabJustify} >
          {children.map((child) => {
            if (!child)
              return undefined;
            const { num } = child?.props;
            if (num !== activeTabJustify) return undefined;
            return (
              <TabPane tabId={num} className="p-3 ">
                {child?.props?.children}
              </TabPane>
            );
          })}
        </TabContent>

        {!props?.left ? <Nav className="nav-tabs-custom   flex-column">
          {childrens.map((child, index) => {
            if (!child)
              return undefined;
            const { label, num } = child?.props;
            return (
              <NavItem className="d-block" >
                <NavLink
                  onClick={() => {
                    toggleCustomJustified(num);
                    setButton(index);
                  }}
                  className={button === index ? 'tab-active' : 'tab-inactive'}
                >
                  <span className="d-block d-sm-block ">{label}</span>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav> : null}
      </div>
    );

  return (
    <div ref={TabRef} className="mt-3 pt-2">
      <Nav tabs className="nav-tabs-custom nav-justified">

        {childrens.map((child, key) => {
          if (!child.props)
            return undefined;
          const { label, num } = child?.props;
          if (key < horizontalTabsUnit)
            return (
              <NavItem className={`${"d-block"}`}>
                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTabJustify === num })} onClick={() => { toggleCustomJustified(num) }} >
                  <span className="d-block d-sm-block">{label}</span>
                </NavLink>
              </NavItem>
            );
        })}

        {children.length > horizontalTabsUnit ?
          <NavItem className={`${"d-block"}`}>
            <div className="dropdown">
              <button className="mt-2 dropdown-transparent dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {childrens.map((child, key) => {
                  if (!child.props)
                    return undefined;
                  const { label, num } = child.props;
                  if (key > horizontalTabsUnit - 1)
                    return (
                      <li><a style={{ cursor: "pointer" }} className="dropdown-item d-block" href="#">
                        <div
                          className={activeTabJustify === num ? "active-dropdown" : ""}
                          onClick={() => { toggleCustomJustified(num) }} >
                          {label}
                        </div>
                      </a>
                      </li>
                    );
                })}
              </ul>
            </div>
          </NavItem> : null}

      </Nav>

      <TabContent activeTab={activeTabJustify}>
        {children.map((child) => {
          if (!child)
            return undefined;
          const { num } = child?.props;
          if (num !== activeTabJustify) return undefined;
          return (
            <TabPane tabId={num} className="p-3">
              {child.props?.children}
            </TabPane>);
        })}
      </TabContent>
    </div>
  );
};

export default observer(Tab);
