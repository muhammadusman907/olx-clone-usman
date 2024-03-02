const Button = ({ btnName, classAdd, btnIcons , ...prop }) => {
  return (
    <button
    {...prop}  className={`mx-w-[100px] h-fit p-2 bg-primary text-secondary font-bold
      rounded-md ${classAdd} 
      `}
    >
      {btnName}
      {btnIcons && btnIcons}
    </button>
  );
};

export default Button;
