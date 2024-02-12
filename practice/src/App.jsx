import Navbar from "./components/navbar/Navbar.jsx";
import Theme from "./components/theme/Theme.jsx";
import Home from "./pages/home/home.jsx";
import AppRouter from "./routes/AppRouter.jsx";

import React from "react";
const App = () => {
  return (
    
    <> 
    <Theme>
      <AppRouter />
    </Theme>
    </>
  
  );
};
export default App;
