import CardImage from "../../assets/images/car.jpg";
import { Rate } from "antd";
import Loader from "../loader/Loader";
const Card = ({
  classAdd,
  productData,
  prices,
  names,
  images,
  descriptions,
  imgAddClass,
  onLoads,
  imageLoading,
  ratings,
  ...prop
}) => {
  return (
    <>
      <div
        {...prop}
        className={`bg-white rounded h-[350px] overflow-hidden my-shadow ${classAdd} cursor-pointer`}
      >
        <div className="my-shadow overflow-hidden relative">
          {imageLoading && (
            <Loader classAdd="items-start justify-start top-1 absolute" />
          )}
          <img
            className={`w-full h-[200px] ${imgAddClass} `}
            src={images}
            alt="Sunset in the mountains"
            onLoad={onLoads}
          />
        </div>
        <div className="px-6 py-4">
          <p className=" font-bold text-[1.1rem]">{prices} </p>
          <p className="text-[gray] text-base">{descriptions}</p>
          <div className="font-bold text-[1rem] mb-2">{names}</div>
          <div>
            <Rate
              allowHalf
              defaultValue={ratings ? ratings : Math.random(10) * 10}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
