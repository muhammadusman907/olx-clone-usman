// import { Children } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export const Button = ({children}) =>{
    console.log(children)
    return (
        <button className="btn btn-info">{children}</button>
    )
}