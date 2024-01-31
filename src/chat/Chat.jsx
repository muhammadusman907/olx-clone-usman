import { Row, Col, Card } from "antd";
import LOGO from "../Images/PROFILE.png";
export const Chat = () => {
  return (
    <>
      <Row className="ms-2 mt-2 me-2">
        <Col span={12} className="border-2">
          <Card className="h-[550px]">
            <Row align="middle" className="shadow-sm">
              <Col span={3}>
                <div className="w-[60px] h-[60px] rounded-full border-2">
                  <img src={LOGO} alt="" />
                </div>
              </Col>
              <Col span={16}>
                <span className=" font-bold cursor-pointer">
                  user@gamil.com
                </span>
              </Col>
            </Row>
            <Row align="middle" className="shadow-sm">
              <Col span={3}>
                <div className="w-[60px] h-[60px] rounded-full border-2">
                  <img src={LOGO} alt="" />
                </div>
              </Col>
              <Col span={16}>
                <span className=" font-bold cursor-pointer">
                  user@gamil.com
                </span>
              </Col>
            </Row>
            <Row align="middle" className="shadow-sm">
              <Col span={3}>
                <div className="w-[60px] h-[60px] rounded-full border-2">
                  <img src={LOGO} alt="" />
                </div>
              </Col>
              <Col span={16}>
                <span className=" font-bold cursor-pointer">
                  user@gamil.com
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
        {/*==================== second card ==================*/}

        <Col span={12} className="border-2">
          <Row >
            <Col span={24}>
              <div className="ms-2 mt-2 w-[50%]">
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                  yes, I have a mac. I never had issues with root permission as
                  well, but this helped me to solve the problem
                </span>
              </div>
            </Col>
            <Col span={24} className="border-2 flex justify-end">
              <div className="ms-2 mt-2 w-[50%]">
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-600 text-white ">
                  yes, I have a mac. I never had issues with root permission as
                  well, but this helped me to solve the problem
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
