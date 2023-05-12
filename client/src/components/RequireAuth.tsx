import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/auth/authSlice";

const RequireAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const location = useLocation()

    return (
        isLoggedIn 
            ? <Outlet />
            : <Navigate to='/login' state={{from: location}} replace />
    )
}

export default RequireAuth