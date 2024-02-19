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
        className={`rounded overflow-hidden shadow-lg ${classAdd}`}
      >
        <img
          className={`w-full h-[150px] ${imgAddClass}`}
          src={images}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{names}</div>
          <p className=" font-bold text-[1.2rem]">{prices} </p>
          <p className="text-gray-700 text-base">{descriptions}</p>
        </div>
      </div>
    </>
  );
};
export default Card;
