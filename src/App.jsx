import Navbar from "./components/navbar/Navbar.jsx";
import Theme from "./components/theme/Theme.jsx";
import Home from "./pages/home/home.jsx";
import AppRouter from "./routes/AppRouter.jsx";
import React, { useCallback, useEffect, useState } from "react";
import Auth from "./context/AuthProvider.jsx";

import {
  auth,
  onAuthStateChanged,
  getDoc,
  doc,
  db,
  query,
  where,
  collection,
  getDocs,
} from "./config/firebase.js";
const App = () => {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("userData")) ? true : false
  );
  const [userData, setUserData] = useState({});
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  // console.log(Object.keys(userData).length);
  console.log({ isLogin });
  const userIds = localStorage.getItem("userId");
  console.log({ userIds });
  const getUser = async () => {
    if (userIds) {
      const docRef = doc(db, "users", userIds);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        localStorage.setItem("userData", JSON.stringify(docSnap.data()));
        setUserData(() => docSnap.data());
        // setIsLogin(true);
      } else {
        console.log("No such document!");
      }
    }
    if (JSON.parse(localStorage.getItem("userData")) !== null) {
      const local_storage_data = JSON.parse(localStorage.getItem("userData"));
      console.log("local_storage_data  ------->", local_storage_data);
      if (`userId` in local_storage_data) {
        setIsLogin(true);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, [userIds]);
  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (user) => {
        console.log(user);
        if (user) {
          console.log({ user });
          setCurrentUserId(user.uid);
          localStorage.setItem("userId", user.uid);
        } else {
          if (localStorage.getItem("userId") !== true) {
            localStorage.setItem("hello", true);
            setIsLogin(false);
          }
        }
      },
      []
    );
  }, []);
  const getProduct = async () => {
    let products = [];
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(async (doc) => {
        // console.log(doc.id, " => ", doc.data());
        products.push({ ...doc.data(), productId: doc.id });
        console.log("user not login ---------->", products);
      });
      setProductList(products);
    } catch (error) {
      console.error("Error getting products: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Auth.Provider value={{ isLogin, userData, productList, loading }}>
        <Theme>
          <AppRouter />
        </Theme>
      </Auth.Provider>
    </>
  );
};
export default App;
