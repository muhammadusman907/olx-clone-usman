import CardImage from "../../assets/images/car.jpg";
import { Rate } from "antd";
const Card = ({
  classAdd,
  productData,
  prices,
  names,
  images,
  descriptions,
  imgAddClass,
  ...prop
}) => {
  return (
    <>
      <div
        {...prop}
        className={`bg-white rounded h-[350px] overflow-hidden my-shadow ${classAdd} cursor-pointer`}
      >
        <div className="my-shadow overflow-hidden">
          <img
            className={`w-full h-[200px] ${imgAddClass} `}
            src={images}
            alt="Sunset in the mountains"
          />
        </div>
        <div className="px-6 py-4">
          <p className=" font-bold text-[1.1rem]">{prices} </p>
          <p className="text-[gray] text-base">{descriptions}</p>
          <div className="font-bold text-[1rem] mb-2">{names}</div>
          <div>
            <Rate allowHalf defaultValue={5} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
