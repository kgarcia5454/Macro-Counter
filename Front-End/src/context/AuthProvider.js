import { createContext,useState,useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [auth, setAuth] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
                const foundUser = loggedInUser;
                setAuth(foundUser);
            }
    }, [])

    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;