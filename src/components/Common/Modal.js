import { observer } from "mobx-react-lite";
import { Button } from "reactstrap";

const Modal = (props) => {
  return (
    <div style={{ position: "fixed" }} className="__backdrop">
      <div
        style={{ position: "relative", ...props?.style }}
        className={"__modal " + props?.className}
      >
        <Button
          color="danger"
          className="waves-effect waves-light __modal-close-btn"
          onClick={() => {
            props?.onChange();
          }}
        >
          <i style={{ fontSize: "38px" }} className="bx bx-x" />
        </Button>

        {props?.children}
      </div>
    </div>
  );
};

// Accordion.Title = (props) => <div className="title">{props?.children}</div>

export default observer(Modal);
