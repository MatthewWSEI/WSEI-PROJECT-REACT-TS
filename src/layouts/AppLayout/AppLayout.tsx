import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
    return (
        <div className="bg-slate-800 w-full min-h-screen h-full py-[10px] px-[20px]">
            <Header />
            <Outlet />
        </div>
    );
};

export default AppLayout;
