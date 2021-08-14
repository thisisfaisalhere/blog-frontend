import { Footer } from "antd/lib/layout/layout";

const FooterComponent = () => {
  return (
    <Footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>developed by Faisal</p>
      <p>
        design library used <a href="https://ant.design/">antd</a>
      </p>
    </Footer>
  );
};

export default FooterComponent;
