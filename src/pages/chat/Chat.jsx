import { Row, Col } from "antd";
import Navbar from "../../components/navbar/Navbar";
import { MyInput } from "../../components/input/Input.jsx";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import Button from "../../components/button/Button.jsx";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Auth from "../../context/AuthProvider.jsx";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  db,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  setDoc,
  arrayUnion,
  updateDoc,
} from "../../config/firebase.js";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const { userData, productList } = useContext(Auth);
  const { control, handleSubmit, reset } = useForm();
  const [senderUser, setSenderUser] = useState({});
  const [messageRender, setMessageRender] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [searchParams] = useSearchParams();
  const ref = useRef();
  const queryParamId = searchParams.get("id");
  if (localStorage.getItem("getChatId") === null) {
    localStorage.setItem("getChatId", queryParamId);
  }
  const senderUserId = localStorage.getItem("getChatId");
  //------***** jis sa hum chat kar rha hai wo user ****-------//
  const getSenderUser = async (selectUserId) => {
    const userRef = doc(db, "users", selectUserId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setSenderUser(docSnap.data());
      console.log("user data message:", docSnap.data());
    } else {
      console.log("No such document!");
      console.log("check!");
    }
  };
  const getUsers = async () => {
    // alert("ha");
    console.log("user id ---------->", userData.userId);
    const q = query(
      collection(db, "chatUser"),
      where(`userId`, "==", localStorage.getItem("userId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // chatUserArr.push(doc.data()?.users);
      console.log("user", " => ", doc.data());
      setChatRoom(() => doc.data()?.users);
    });
  };
  useEffect(() => {
    getSenderUser(senderUserId);
    getUsers();
  }, []);

  let margeTwoUserId = "";
  if (localStorage.getItem("getChatId") === queryParamId) {
    if (senderUserId > userData.userId) {
      margeTwoUserId = senderUserId + userData.userId;
      localStorage.setItem("margeTwoUserId", margeTwoUserId);
    } else {
      margeTwoUserId = userData.userId + senderUserId;
      localStorage.setItem("margeTwoUserId", margeTwoUserId);
    }
  }
  console.log(margeTwoUserId);
  const selectUser = (selectUserId) => {
    // alert(selectUserId);
    localStorage.setItem("getChatId", selectUserId);
    const getChatUserId = localStorage.getItem("getChatId");
    console.log("select user id--------->", selectUserId);
    if (getChatUserId > userData.userId) {
      margeTwoUserId = getChatUserId + userData.userId;
    } else {
      margeTwoUserId = userData.userId + getChatUserId;
    }
    console.log("margeuserid", margeTwoUserId);

    getMessage(margeTwoUserId);
    localStorage.setItem("margeTwoUserId", margeTwoUserId);
    getSenderUser(getChatUserId);
  };

  const onSubmit = async (data) => {
    const docRef = await addDoc(collection(db, "messages"), {
      senderUserData: { ...senderUser },
      message: data.message,
      currentUser: userData.userId,
      senderUserId,
      timestamp: serverTimestamp(),
      margeTwoUserId,
      chatUser: true,
    });

    const senderUserRef = doc(db, "chatUser", senderUserId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(senderUserRef, {
      timestamp: serverTimestamp(),
      ...senderUser,
      users: arrayUnion({ ...userData }),
    });
    const currentUserRef = doc(db, "chatUser", userData.userId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(currentUserRef, {
      ...userData,
      timestamp: serverTimestamp(),
      users: arrayUnion({ ...senderUser }),
    });
    // const uniqueUsers = new Set();
    // messageRender.forEach(async (value) => {
    //   if (value?.chatUser !== true) {
    //      uniqueUsers.add({ ...userData });
    //     const uniqueUsersArray = Array.from(uniqueUsers);
    //     await setDoc(doc(db, "chatUser", senderUserId), {
    //       timestamp: serverTimestamp(),
    //       ...senderUser,
    //       users: arrayUnion({ ...uniqueUsersArray }),
    //     });
    //     await setDoc(doc(db, "chatUser", userData.userId), {
    //       ...userData,
    //       timestamp: serverTimestamp(),
    //       users: arrayUnion({ ...senderUser }),
    //     });
    //   }
    // });
    console.log(data.message);
    reset();
  };
  const getMessage = (userId) => {
    const q = query(
      collection(db, "messages"),
      where("margeTwoUserId", "==", userId),
      orderBy("timestamp")
    );
    let allMessages = [];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New city: ", change.doc.data());
          allMessages.push(change.doc.data());
        }
      });
      setMessageRender((prev) => [prev, ...allMessages]);
    });
  };
  useEffect(() => {
    getMessage(localStorage.getItem("margeTwoUserId"));
  }, [onsubmit]);
  useLayoutEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  });
  return (
    <>
      <Navbar />
      <Row className="mt-2 h-[500px]">
        <Col className="my-shadow" lg={10}>
          <Row className="">
            <Col className="my-shadow w-full p-3 flex items-center">
              <div className="h-[60px] w-[60px] my-shadow rounded-full">
                <FaUser className="w-full h-full rounded-full p-1 " />
              </div>
              <p className="ps-1 font-bold text-[1.3rem]">
                {userData.username}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="w-full p-2">
              {chatRoom &&
                chatRoom.map((value, index) => (
                  // console.log("chat room--------->", value)
                  <div
                    key={value.userId}
                    onClick={() => selectUser(value.userId)}
                    className=" my-shadow mt-2 p-2 flex items-center hover:bg-[#faf8f8] cursor-pointer"
                  >
                    <div className="h-[50px] w-[50px] my-shadow rounded-full">
                      <FaUser className="w-full h-full rounded-full p-1" />
                    </div>
                    <div className="ps-2">
                      <p className="font-bold text-[1rem]">{value.username}</p>
                      <p className="text-[gray]">{}</p>
                    </div>
                  </div>
                ))}
            </Col>
          </Row>
        </Col>
        <Col className="my-shadow relative" lg={14}>
          <Row>
            <Col className="border-b w-full p-2 flex items-center">
              <div className="my-shadow w-[50px] h-[50px] rounded-full ">
                <FaUser className="w-full h-full rounded-full p-1" />
              </div>
              <div className="ps-2 font-bold text-[1.1rem]">
                {senderUser?.email}
              </div>
            </Col>
          </Row>
          <div ref={ref} className="overflow-y-scroll  h-[390px]">
            {messageRender.map((value) => (
              <>
                {/* {console.log({ value })} */}
                {value.currentUser !== userData.userId ? (
                  <>
                    {value.message && (
                      <div
                        key={value.userId}
                        className="p-2 flex justify-start gap-2 mt-1"
                      >
                        <div className="w-[50px] h-[50px] rounded-full my-shadow">
                          <FaUser className="w-full h-full rounded-full p-1" />
                        </div>
                        <div className="w-[50%] h-auto">
                          <span className="bg-primary text-[white] p-2 rounded-l-md rounded-tr-md break-words">
                            {value.message && value.message}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {value.message && (
                      <div
                        key={value.userId}
                        className="p-2 flex justify-end gap-2"
                      >
                        <div className="w-[50%] h-auto relative">
                          <span className="bg-[gray] text-[white] p-2 rounded-r-md rounded-tl-md break-words absolute right-0">
                            {value.message && value?.message}
                          </span>
                        </div>
                        <div className="w-[50px] h-[50px] rounded-full my-shadow">
                          <FaUser className="w-full h-full rounded-full p-1" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ))}
          </div>
          <div className="absolute bottom-0 w-full">
            <form
              action=""
              className="my-shadow w-full flex justify-center h-fit items-center gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <MyInput
                names="message"
                controls={control}
                placeholders="message"
                errors="message is required"
                classAdd="h-[45px] w-[92%] "
                types="text"
              />
              <Button btnName="send" classAdd="rounded-tr-md ms-[-8px]" />
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Chat;
