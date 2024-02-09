const Button = ({btnName , classAdd}) =>{
    return(
        <button className={`w-[70px] p-2 bg-primary text-secondary rounded-md ${classAdd}`}>
            {btnName}
        </button>
    )
}

export default Button ;