import { Button, ConfigProvider, Space } from "antd";
const Theme = ({ children }) => {
    // console.log(children);

 return (
   <ConfigProvider
     theme={{
       token: {
         // Seed Token

         colorPrimary: "#388087",
         borderRadius: 2,

         // Alias Token
         colorBgContainer: "#F6F6F2",
       },
     }}
   >
     {children}
   </ConfigProvider>
 );
};
export default Theme;
