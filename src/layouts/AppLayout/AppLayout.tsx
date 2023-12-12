import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
    return (
        <div className="screen">
            <div className="container">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
