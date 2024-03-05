import CardImage from "../../assets/images/car.jpg";

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
        className={`rounded overflow-hidden my-shadow ${classAdd} cursor-pointer`}
      >
        <img
          className={`w-full h-[250px] ${imgAddClass}`}
          src={images}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <p className=" font-bold text-[1.1rem]">{prices} </p>
          <p className="text-[gray] text-base">{descriptions}</p>
          <div className="font-bold text-[1rem] mb-2">{names}</div>
        </div>
      </div>
    </>
  );
};
export default Card;
