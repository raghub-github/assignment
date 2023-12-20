import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/userReducer";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const host = process.env.REACT_APP_HOSTNAME;

    // Authentication
    const userAuthentication = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authToken")
                }
            });
            if (response.ok) {
                const data = await response.json();
                const redata = {
                    userId: data._id,
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    isAdmin: data.isAdmin,
                }
                dispatch({ type: "USER_DETAILS", payload: redata });
            } else {
                console.error("Response not OK:", response);
            }
        } catch (error) {
            console.error("Error while authenticating:", error);
        }
    };

    const getUser = () => {
        try {
            userAuthentication();
        } catch (error) {
            console.error("Error getting cart data:", error);
        }
    };

    useEffect(() => {
        getUser();
        //eslint-disable-next-line
    }, []);


    const initialState = {
        user: {},
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider
            value={{
                ...state,
                getUser,
            }}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };