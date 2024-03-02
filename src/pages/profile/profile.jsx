import { MyInput } from "../../components/input/Input.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import CAR from "../../assets/images/car.jpg";
import { FaUserEdit } from "react-icons/fa";
import { useRef, useState } from "react";
import { useContext } from "react";
import Auth from "../../context/AuthProvider.jsx";
import Loader from "../../components/loader/Loader.jsx";
import Swal from "sweetalert2";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  doc,
  updateDoc,
  auth,
  db
} from "../../config/firebase.js";
import Button from "../../components/button/Button.jsx";
const Profile = () => {
  const { userData } = useContext(Auth);
  const [loader, setLoader] = useState(false);
  const { control, defaultValue, handleSubmit } = useForm();
  const [profileImage, setProfileImage] = useState("");
  const refId = useRef();
  const edit = () => {
    // console.log(ref.current);
    refId.current.click();
  };
  const getProfilePicture = (file) => {
    // const PhotoUrl = URL.createObjectURL(file);
    // setProfileImage(PhotoUrl);
    setLoader(true);
    console.log(file);
    const storageRef = ref(storage, "profile_pictuer");
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileImage(downloadURL);
          setLoader(false);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const onSubmit = () => {};
  const updateProfile = async () => {
    const userRef = doc(db, "users", userData.userId);
    await updateDoc(userRef, {
      photoUrl: profileImage,
    });
   Swal.fire({
     position: "center",
     icon: "success",
     title: "profile update SuccessFully",
     showConfirmButton: false,
     timer: 1500,
   });
  };
  console.log(userData.photoUrl)
  return (
    <>
      <Navbar />
      {loader && <Loader />}
      <Row justify={"center"} className="mt-6">
        <Col
          className=" bg-secondary p-8 rounded-md"
          xs={22}
          sm={18}
          md={16}
          lg={14}
        >
          <Row justify={"center"}>
            <Col className=" relative">
              <img
                src={userData?.photoUrl ? userData?.photoUrl : profileImage ? profileImage : CAR}
                className="h-[160px] shadow-md w-[160px] rounded-full object-cover"
                alt=""
              />
              <FaUserEdit
                onClick={edit}
                className="rounded-full bg-secondary p-1 shadow-lg cursor-pointer
              text-primary absolute right-1 bottom-4 text-3xl"
              />
              <input
                type="file"
                ref={refId}
                id="file"
                className="hidden"
                onChange={(e) => getProfilePicture(e.target.files[0])}
              />
            </Col>
          </Row>
          <Row justify={"center"} className="mt-5">
            <Col sm={20} lg={20} xs={24}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <Button
                    btnName="Update Profile"
                    classAdd="w-[150px] m-auto font-bold"
                    onClick={updateProfile}
                  />
                </div>
                <MyInput
                  names="username"
                  controls={control}
                  placeholders="user Name"
                  errors="name is required"
                  classAdd="mb-2  h-[45px]"
                  label="Your Name"
                  types="text"
                  disabled={true}
                  defaultValue={userData.username}
                />
                <MyInput
                  value={userData.email}
                  names="email"
                  controls={control}
                  placeholders="email@gmail.com"
                  errors="email is required"
                  classAdd="mb-2  h-[45px]"
                  label="Your Email"
                  types="text"
                  disabled={true}
                  defaultValue={userData.email}
                />
                <MyInput
                  names="password"
                  controls={control}
                  placeholders="•••••••"
                  errors="password is required"
                  classAdd="mb-2  h-[45px]"
                  label="Your password"
                  types="password"
                  disabled={true}
                />
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
