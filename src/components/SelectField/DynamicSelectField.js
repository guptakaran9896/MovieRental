import React, { useState, useEffect } from "react";
import { Button, Col } from "reactstrap";
import { SelectField, InputField } from "../../components/index";

export default function DynamicSelectField(props) {
  const [data, setData] = useState(
    props?.value && props?.data?.findIndex((x) => x.value === props?.value) === -1
      ? [...props?.data, { value: props?.value, label: props?.value }]
      : props?.data
  );
  const [value, setValue] = useState(props?.value ? props?.value : undefined);
  const [inpValue, setInpValue] = useState("");

  //   useEffect(() => {
  //     console.log(value,props?.value,data,pro);
  //     setData(
  //       props?.value &&
  //         props?.data?.findIndex((x) => x.value === props?.value) === -1
  //         ? [...props?.data, { value: props?.value, label: props?.value }]
  //         : props?.data
  //     );
  //   }, [props?.data]);

  useEffect(() => {
    if (value !== props?.value)
      props?.onChange(data?.find((x) => x.value === value));
  }, [value]);
  useEffect(() => {
    if (value !== props?.value) setValue(props?.value);
  }, [props?.value]);

  return (
    <Col className={props?.className}>
      <SelectField
        render={props?.renderFunc}
        onChange={(v) => setValue(v.value)}
        data={[...data, { value: null, label: "Custom" }]}
        value={value}
        required={props?.required}
        showClear={props?.showClear}
        label={props?.label}
        error={!value ? "Please Select" + props?.label : ""}
        showErr={props?.showErr}
        inline={props?.inline}
        borderNone={props?.borderNone}
        RightComponent={props?.RightComponent}
        onClickRight={props?.onClickRight}
      />
      {value === null && (
        <InputField

          className={props?.classNameI}
          style={{ position: "absolute", background: "white", zIndex: "50" }}
          value={inpValue}
          required={true}
          label={"Custom Value"}
          onChange={(v) => setInpValue(v)}
          error={inpValue.length === 0 ? "Please enter Custom Value" : ""}
          showClear={true}
          type="text"
          RightComponent={() => <Button>Add</Button>}
          onClickRight={() => {
            if (inpValue) {
              if (data?.findIndex((x) => x.value === inpValue) === -1) {
                setData([...data, { value: inpValue, label: inpValue }]);
                setValue(inpValue);
                setInpValue("");
                props?.onChange({ value: inpValue, label: inpValue });
              }
            }
          }}
        />
      )}
    </Col>
  );
}
