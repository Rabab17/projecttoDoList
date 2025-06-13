import { createContext, useState, useEffect } from "react";
export const signUpContext = createContext();
function SignUpProvider({ children }) {
    const [signUpToken, setSignUpToken] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token")
        setSignUpToken(token);


    }, []);

    return (
        <signUpContext.Provider value={{ signUpToken, setSignUpToken }}>
            {children}
        </signUpContext.Provider>
    );
}

export default SignUpProvider;