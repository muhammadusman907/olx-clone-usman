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
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  // console.log(Object.keys(userData).length);

  const getProductIsLogin = async () => {
    try {
      if (Object.keys(userData).length !== 0) {
        let products = [];
        const q = query(
          collection(db, "products"),
          where("userName.userId", "!=", userData.userId)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          // console.log(doc.id, " => ", doc.data());
          products.push({ ...doc.data, id: doc.id });
          console.log("user login--------->", products);
        });
        setProductList(products);
        setIsLogin(false);
      }
    } catch (error) {
      console.error("Error getting products: ", error);
    } finally {
      setLoading(false);
    }
  };
  const getUser = async () => {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(() => docSnap.data());
      setIsLogin(true);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (user) => {
        console.log(user);
        if (user) {
          setCurrentUserId(user.uid);
        } else {
          setIsLogin(false);
        }
      },
      []
    );
  },[]);
  const getProduct = async () => {
    if (!isLogin) {
      try {
        let products = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach(async (doc) => {
          // console.log(doc.id, " => ", doc.data());
          products.push({ ...doc.data(), productId: doc.id });
          console.log("user not login ---------->", products);
        });
        setProductList(products);
        setIsLogin(false);
      } catch (error) {
        console.error("Error getting products: ", error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getProduct();
  }, [isLogin]);
  useEffect(() => {
    getProductIsLogin();
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
