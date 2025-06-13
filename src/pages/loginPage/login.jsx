import loginCss from "./login.module.css"
import { useForm } from "react-hook-form"
import WelcomeText from "../../component/welconTextFolder/welcomeText";
import ErrorDiv from "../../component/errorDiv";
import { signUpContext } from "../../context/setToken";
// --------------REACT IMPORTS------------------------------
import { useContext, useEffect, useState } from "react"
// --------------IMPORT PACKAGES----------------------------
import axios from 'axios';
// -------------MATERIAL UI IMPORTS-------------------------
import * as React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const LoginComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })

    const [loginLouder, setloginLouder] = useState(false)
    const [failLogin, setfailLogin] = useState('')

    // --------------------------------------------
    const { signUpToken, setSignUpToken } = useContext(signUpContext)


    const login = async (data) => {
        console.log(data);

        console.log("input data", data);

        setloginLouder(true)
        setfailLogin('')
        try {

            const res = await axios.post("https://notification-web-app-opal.vercel.app/user/login", data)

            console.log("res of register", res)
            console.log(`token :${res.data}`);

            if (res.data.status == "success") {
                localStorage.setItem("token", res.data);
                setSignUpToken(res.data)
            }

        } catch (error) {

            console.log(error);
            if (error.status == 400 && error.message == "Request failed with status code 400") {
                setfailLogin(" ☺ Make sure that all inputs is valid")
                console.log(failLogin);

            }

            if (error.status == 404 && error.message == "Request failed with status code 404") {
                setfailLogin(" 🔄 Please try again")
            }

            if (error.message == "Network Error") {
                setfailLogin(" 🚫 You are offline ")
                console.log(failLogin);
            }

            if (error.message == "Request failed with status code 401") {
                setfailLogin(" 🚫 You are not authorized ")
                console.log(failLogin);
            }


        }

        setloginLouder(false)
        setSignUpToken(localStorage.getItem("token"))
        console.log(signUpToken);

    }

    return (
        <>
            <div className={loginCss.containerDiv}>
                <div >
                    <WelcomeText text="LOGIN" textLetterNumber={14} />
                </div>

                {
                    failLogin != '' &&
                    <div className={loginCss.errorContainer}>
                        <ErrorDiv errorContent={failLogin} />
                    </div>
                }

                <form onSubmit={handleSubmit(login)} className={loginCss.theForm}>
                    <FormControl sx={{ mt: 5, mb: 5, ml: "auto", mr: "auto", width: "50%" }} variant="standard">

                        <TextField

                            {...register("password", { required: true, pattern: /^[a-z]{1,}[0-9]{1,}$/, maxLength: 8 })}
                            label={errors.password ? "Invalid password" : "Passsword"}
                            variant="standard"
                            error={errors.password ? true : false}
                            helperText={errors.password && errors.password?.type == "required" ? "please, enter your password" : errors.password && errors.password?.type == "maxLength" ? "the max length is 8 characters" : errors.password && errors.password?.type == "pattern" ? "should contain letters and numbers" : ''}
                            id={errors.password ? "standard-error-helper-text" : "standard-adornment-password"}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}

                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                    </FormControl>
                    {/* ============================================================================ */}

                    <FormControl sx={{ ml: "auto", mr: "auto", mb: 5, width: "50%" }} variant="standard">

                        <TextField

                            {...register("email", { required: true, pattern: /^[a-z]{3,}(@)(gmail|yahoo|outlook)\.(com|org|eg|gov)$/ })}
                            id={errors.email ? "standard-error-helper-text" : "standard-adornment-email"}
                            label={errors.email ? "Invalid email" : "Email"}
                            type="email"
                            variant="standard"
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email?.type == "required" ? "please, enter your email" : errors.email && errors.email?.type == "pattern" ? "invalid email" : ''}
                        />

                    </FormControl>

                    <Button type="submit" variant="outlined" size="large" sx={{ width: "40%", ml: "auto", mr: "auto", mt: 5, mb: 5 }}>
                        {
                            loginLouder ?
                                <CircularProgress size="3rem" />
                                : "LOGIN"
                        }
                    </Button>

                </form>
            </div>

        </>
    )
}
export default LoginComponent