import { useState } from "react";
import Form from "antd/lib/form";
import Button from "antd/lib/button/button";
import TextArea from "antd/lib/input/TextArea";

const Editor: React.FC<{
  handleSubmit: Function;
  btnText: string;
  submitting: boolean;
  placeholderText: string;
}> = ({ handleSubmit, btnText, submitting, placeholderText }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Form.Item>
        <TextArea
          placeholder={placeholderText}
          rows={2}
          onChange={handleChange}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(value, setValue);
          }}
          type="primary"
        >
          {btnText}
        </Button>
      </Form.Item>
    </>
  );
};

export default Editor;
