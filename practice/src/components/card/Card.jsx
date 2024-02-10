import CardImage from "../../assets/images/car.jpg"
const Card = ({classAdd}) => {
    
    return (
      <>
        <div className={`rounded overflow-hidden shadow-lg ${classAdd}`}>
          <img
            className="w-full h-[150px] object-cover "
            src={CardImage}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
         
        </div>
      </>
    );
}
export default Card ;