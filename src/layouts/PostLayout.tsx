import { Outlet, Link } from "react-router-dom";

const PostLayout = () => {
    return (
        <div>
            <div>
                <Link to="..">Back</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default PostLayout;
