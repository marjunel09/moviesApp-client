import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Logout() {
    const { unsetUser, setUser } = useContext(UserContext);

    useEffect(() => {
        // Clear local storage and unset user
        localStorage.clear(); // Clear local storage
        unsetUser(); // Reset user context
        setUser({ id: null, isAdmin: false }); // Ensure user is set to null and isAdmin is false
    }, [unsetUser, setUser]); // Dependency array to avoid infinite loop

    // Redirect to login after logging out
    return <Navigate to="/login" />;
}
