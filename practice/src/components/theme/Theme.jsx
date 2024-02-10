import { Button, ConfigProvider, Space } from "antd";
const Theme = ({ children }) => {
    console.log(children);

 return (<ConfigProvider
    theme={{
      token: {
        // Seed Token

        colorPrimary: "#4a5759",
        borderRadius: 2,

        // Alias Token
        colorBgContainer: "#f6ffed",
      },
    }}
  >
    {children}
  </ConfigProvider>)
};
export default Theme;
