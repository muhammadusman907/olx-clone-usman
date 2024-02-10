import Navbar from "./components/navbar/Navbar.jsx";
import Theme from "./components/theme/Theme.jsx";
import Home from "./pages/home/home.jsx";
import AppRouter from "./routes/AppRouter.jsx";

import React from "react";
const App = () => {
  return (
    
    <> 
    <Theme >
      <AppRouter />
    </Theme>
    </>
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       // Seed Token

    //       colorPrimary: "#4a5759",
    //       borderRadius: 2,

    //       // Alias Token
    //       colorBgContainer: "#f6ffed",
    //     },
    //   }}
    // >

    //     <AppRouter />

    // </ConfigProvider>
 
  );
};
export default App;
