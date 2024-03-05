const Button = ({ btnName, classAdd, btnIcons, ...prop }) => {
  return (
    <button
      {...prop}
      className={`mx-w-[100px] h-fit p-2 bg-primary text-white font-bold
      rounded-md ${classAdd} ease-in-out hover:bg-hover hover:scale-[1.02] duration-500
      `}
    >
      {btnName}
      {btnIcons && btnIcons}
    </button>
  );
};

export default Button;
