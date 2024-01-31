import { MyNavbar } from "./component/Navbar.jsx"
import MyCard from "./component/Card.jsx"

export const Home = ({checkIsLogin}) => {
    //   console.log(checkIsLogin);
    return (
       
        <>
            <MyNavbar />
            <div>
                <MyCard />
            </div>
        </>
    )
}