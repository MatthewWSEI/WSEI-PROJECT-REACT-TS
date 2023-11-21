import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
    return (
        <div className="screen w-full min-h-screen h-full flex items-start justify-center">
            <div className="w-full max-w-screen-xl h-full py-[10px] px-[20px]">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
