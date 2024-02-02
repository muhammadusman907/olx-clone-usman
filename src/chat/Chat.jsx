import { Row, Col, Card, Input, Button } from "antd";
import LOGO from "../Images/PROFILE.png";
import { IoMdSend } from "react-icons/io";
import { useState, useRef } from "react";
import {
  auth,
  collection,
  addDoc,
  db,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  getDocs,
  onAuthStateChanged,
  doc,
  getDoc,
  orderBy,
  ref,
  set,
} from "../config/firbase";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export const Chat = () => {
  const [chatValue, setChatValue] = useState("");
  const [searchParams] = useSearchParams();
  const [chatUserList, setChatUserList] = useState([]);
  const [getMessage, setGetMessage] = useState([]);
  const [singleUserData, setSingleUserData] = useState({});
  const topToBottom = useRef(null);


  // const [submit , setSubmit] = useState(true);
  // ==============================
  // =================== chat value

  let messageId = "";
  let submit = false;
  const submitChat = async () => {
    console.log("CHAT VALUE", chatValue);
    const currentUserId = auth.currentUser.uid;
    const sendUserId = localStorage.getItem("selectUserId");
    console.log(sendUserId);
    if (currentUserId > sendUserId) {
      messageId = currentUserId + sendUserId;
    } else {
      messageId = sendUserId + currentUserId;
    }
    console.log(messageId);

    // ==================================================
    // =============== message add fire store ===========
    // ==================================================

    const docRef = await addDoc(collection(db, "messages"), {
      chatValue,
      messageId,
      messageSender: currentUserId,
      watch: false,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    submit = true;
    getChat(messageId);
    setGetMessage([getMessage]);
    setChatValue("");
  };
  // ====================================================
  //================= get firestore messages ============
  // ====================================================

  // =========================================
  //=============== select user===============
  // =========================================
  let getMessageUserId = "";

  const setUserMessage = [];
  const selectUser = async (selectuserId) => {
    console.log(selectuserId);
    localStorage.setItem("selectUserId", selectuserId);
    const currentUserId = auth.currentUser.uid;
    if (selectuserId > currentUserId) {
      getMessageUserId = selectuserId + currentUserId;
    } else {
      getMessageUserId = currentUserId + selectuserId;
    }
    getChat(getMessageUserId);
    // const q = query(
    //   collection(db, "messages"),
    //   where("messageId", "==", getMessageUserId),
    //   orderBy("timestamp")

    // );
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       console.log("New city: ", change.doc.data());
    //       let getData = change.doc.data();
    //       let setId = getData;
    //       setId.senderId = selectuserId;
    //       console.log(setId);
    //       setUserMessage.push(setId);
    //       setGetMessage(setUserMessage);
    //     }
    //   });
    // });
    // setGetMessage([]);
    // console.log(getMessageUserId);
  };

  // =============================
  // ============= get single user
  // =============================
  const getSingleUser = async () => {
    const currentUserId = await authanticateUser();
    const docRef = doc(db, "users", currentUserId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSingleUserData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // ==================================================
  // ======================get users===================
  // ==================================================
  const authanticateUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        resolve(user.uid);
      });
    });
  };
  let usersList = [];
  const getUsers = async () => {
    const currentUserId = await authanticateUser();
    console.log(currentUserId);
    const q = query(
      collection(db, "users"),
      where("userId", "!=", currentUserId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      usersList.push(doc.data());
      setChatUserList(usersList);
    });
  };
  //  =============================== get chat
  // ========================================
  const getChat = (getMessageUserId) => {
    const q = query(
      collection(db, "messages"),
      where("messageId", "==", getMessageUserId),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New city:", change.doc.data());
          let getData = change.doc.data();
          setUserMessage.push(getData);
          setGetMessage((prev) => [...prev, getData]);
          // console.log("id checked " , selectuserId);
        }
      });
      // setGetMessage(setUserMessage);
      // console.log("a raha hai ya nahi state", getMessage);
    });
  };


  useEffect(() => {
    getUsers();
    getSingleUser();
  }, []);

 useEffect(() => {
   // 👇️ scroll to bottom every time messages change
  topToBottom.current?.scrollIntoView({ behavior: "smooth" });
 }, [getMessage]);
  useEffect(() => {
    if (submit) {
      console.log("submit");
      getChat(messageId);
    }
  }, [submitChat]);
  console.log({ getMessage });
  return (
    <>
      <Row className="ms-2 mt-2 me-2 ">
        <Col span={12} className="border-2">
          <Card>
            <Row align="middle" className="shadow-sm h-20">
              <Col span={3}>
                <div className="w-[60px] h-[60px] rounded-full border-2">
                  <img src={LOGO} alt="" />
                </div>
              </Col>
              <Col span={16}>
                <span className=" font-bold cursor-pointer">
                  {singleUserData.email}
                </span>
              </Col>
            </Row>
          </Card>
          <Card className="h-[400px] overflow-scroll">
            {chatUserList.map((value, index) => (
              <Row
                align="middle"
                className="shadow-sm"
                key={value.userId}
                onClick={() => selectUser(value.userId)}
              >
                <Col span={3}>
                  <div className="w-[60px] h-[60px] rounded-full border-2">
                    <img src={LOGO} alt="" />
                  </div>
                </Col>
                <Col span={16}>
                  <span className="font-bold cursor-pointer">
                    {value.email}
                  </span>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        {/*==================== second card ==================*/}

        <Col span={12} className="border-2 relative ">
          <div className="h-[515px] overflow-scroll" ref={topToBottom}>
            <Row>
              {getMessage.length  > 0 ?(
                <>
                  {getMessage.map((value, index) => (
                    <>
                      {console.log({
                        value,
                        currentUser: auth.currentUser.uid,
                        sender: value.messageSender,
                      })}
                      {auth.currentUser.uid !== value.messageSender && (
                        <Col span={24} className="h-fit " key={index}>
                          <div className="ms-2 mt-2 w-[50%]">
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {value.chatValue}
                            </span>
                          </div>
                        </Col>
                      )}
                      {auth.currentUser.uid === value.messageSender && (
                        <Col span={24} className="flex justify-end h-fit">
                          <div className="ms-2 mt-2 w-[50%] flex justify-end">
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-600 text-white ">
                              {value.chatValue}
                            </span>
                          </div>
                        </Col>
                      )}
                    </>
                  ))}
                </>
                
              ) : (<Col>not found</Col>) }
            </Row>
          </div>
          <Row align="bottom" className="">
            <Col span={24} className="flex container">
              <Input
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
              />
              <Button
                className="w-[70px] ms-2"
                onClick={() => {
                  submitChat();
                }}
              >
                <IoMdSend className="m-auto" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
