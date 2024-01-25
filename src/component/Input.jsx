export const Input = ({Children , ...prop}) =>{
    return (
        <input type="text" {...prop}/>
        // <button>{Children}</button>
    )
}