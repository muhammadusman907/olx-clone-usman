import { Row, Col } from "antd";
import Navbar from "../../components/navbar/Navbar";
import { MyInput } from "../../components/input/Input.jsx";
import { useForm } from "react-hook-form";
const Chat = () => {
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <Navbar />
      <Row className="border-2 gap-">
        <Col className="border-2" lg={10}>
          <Row className="p-1">
            <Col className="border-2 w-full p-3">
              <div className="h-[40px] w-[40px] border-2 rounded-full"></div>
            </Col>
          </Row>
          <Row>
            <Col className="w-full p-2">
              <div className=" border-2 mt-2 p-2 flex items-center">
                <div className="h-[50px] w-[50px] border-2 rounded-full"></div>
                <div className="ps-2">
                  <p>email@gmail.com</p>
                  <p className="text-[gray]">last messaage </p>
                </div>
              </div>
              <div className=" border-2 mt-2 p-2 flex items-center">
                <div className="h-[50px] w-[50px] border-2 rounded-full"></div>
                <div className="ps-2">
                  <p>email@gmail.com</p>
                  <p className="text-[gray]">last messaage </p>
                </div>
              </div>{" "}
              <div className=" border-2 mt-2 p-2 flex items-center">
                <div className="h-[50px] w-[50px] border-2 rounded-full"></div>
                <div className="ps-2">
                  <p>email@gmail.com</p>
                  <p className="text-[gray]">last messaage </p>
                </div>
              </div>{" "}
              <div className=" border-2 mt-2 p-2 flex items-center">
                <div className="h-[50px] w-[50px] border-2 rounded-full"></div>
                <div className="ps-2">
                  <p>email@gmail.com</p>
                  <p className="text-[gray]">last messaage </p>
                </div>
              </div>{" "}
              <div className=" border-2 mt-2 p-2 flex items-center">
                <div className="h-[50px] w-[50px] border-2 rounded-full"></div>
                <div className="ps-2">
                  <p>email@gmail.com</p>
                  <p className="text-[gray]">last messaage </p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="border-2 relative" lg={14}>
          <div className="p-2 flex justify-start">
            <div className="w-[50%] h-auto">
              <div className="bg-primary text-[white] p-2 rounded-l-md rounded-tr-md break-words">
                hellodsjkfsdjkdsfkjdsssssssaaaaaakkwerwerwerwerwerewrewrwwerwerwerwerewrewrewrewrwe
              </div>
            </div>
          </div>
          <div className="p-2 flex justify-end">
            <div className="w-[50%] h-auto">
              <div className="bg-[gray] text-[white] p-2 rounded-l-md rounded-tr-md break-words">
                hellodsjkfsdjkdsfkjdsssssssaaaaaakkwerwerwerwerwerewrewrwwerwerwerwerewrewrewrewrwe
              </div>
            </div>
          </div>{" "}
          <div className="p-2 flex justify-start">
            <div className="w-[50%] h-auto">
              <div className="bg-primary text-[white] p-2 rounded-l-md rounded-tr-md break-words">
                hellodsjkfsdjkdsfkjdsssssssaaaaaakkwerwerwerwerwerewrewrwwerwerwerwerewrewrewrewrwe
              </div>
            </div>
          </div>
          <div className="p-2 flex justify-end">
            <div className="w-[50%] h-auto">
              <div className="bg-[gray] text-[white] p-2 rounded-l-md rounded-tr-md break-words">
                hellodsjkfsdjkdsfkjdsssssssaaaaaakkwerwerwerwerwerewrewrwwerwerwerwerewrewrewrewrwe
              </div>
            </div>
          </div>
          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <MyInput
                names="message"
                controls={control}
                placeholders="message"
                errors="message is required"
                classAdd="mb-2 h-[45px] absolute bottom-0"
                types="text"
              />
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Chat;
