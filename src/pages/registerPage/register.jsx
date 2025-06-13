import loginCss from "../loginPage/login.module.css"
import registerCss from "./register.module.css"
import { useForm } from "react-hook-form"
import WelcomeText from "../../component/welcomeText";
import ErrorDiv from "../../component/errorDiv";
import { signUpContext } from "../../context/setToken";
// --------------REACT IMPORTS------------------------------
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
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
import Alert from '@mui/material/Alert';
const RegisterComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })

    const [signUpLouder, setsignUpLouder] = useState(false)
    const [failSignUp, setfailSignUp] = useState('')

    // --------------------------------------------
    const { signUpToken, setSignUpToken } = useContext(signUpContext)

    useEffect(() => {

    }, [failSignUp])

    const registerSubmit = (data) => {
        console.log("input data", data);

        setfailSignUp('')
        setsignUpLouder(true)
        const sendData = axios.post("https://notification-web-app-opal.vercel.app/user", data).then((res) => {
            console.log("res of register", res, `send data is :: ${sendData}`)
            console.log(`token :${res.data.token}`);

            if (res.data.status == "success") {
                localStorage.setItem("token", res.data.token);
                setSignUpToken(res.data.token)
            }

        }).catch((error) => {
            console.log(error);
            if (error.status == 400 && error.message == "Request failed with status code 400") {
                setfailSignUp(" ☺ Make sure that all inputs is valid")
                console.log(failSignUp);

            }

            if (error.status == 404 && error.message == "Request failed with status code 404") {
                setfailSignUp(" 🔄 Please try again")
                console.log(failSignUp);

            }

            if (error.message == "Network Error") {
                setfailSignUp(" 🚫 You are offline ")
                console.log(failSignUp);
            }


        })

        setsignUpLouder(false)
        setSignUpToken(localStorage.getItem("token"))
        console.log(signUpToken);


    }

    return (
        <>
            <div className={loginCss.containerDiv}>
                <div className={registerCss.containerOfText}>
                    <WelcomeText className={registerCss.text} text="REGISTER" />
                </div>

                {
                    failSignUp != '' &&
                    <div className={loginCss.middleContainer}>
                        <ErrorDiv errorContent={failSignUp} />
                    </div>
                }

                <form onSubmit={handleSubmit(registerSubmit)} className={loginCss.theForm}>
                    <FormControl sx={{ mt: 5, mb: 5, ml: "auto", mr: "auto", width: "50%" }} variant="standard">

                        <TextField

                            {...register("password", { required: true, pattern: /[a-zA-Z]{1,}[0-9]{1,}/, maxLength: 8 })}
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

                            {...register("email", { required: true, pattern: /^[a-zA-Z]{3,}[0-9]{0,}(@)(gmail|yahoo|outlook)\.(com|org|eg|gov)$/ })}
                            id={errors.email ? "standard-error-helper-text" : "standard-adornment-email"}
                            label={errors.email ? "Invalid email" : "Email"}
                            type="email"
                            variant="standard"
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email?.type == "required" ? "please, enter your email" : errors.email && errors.email?.type == "pattern" ? "invalid email" : ''}
                        />

                    </FormControl>

                    <FormControl sx={{ ml: "auto", mr: "auto", mb: 2, width: "50%" }} variant="standard">

                        <TextField

                            {...register("userName", { required: true, pattern: /^\S+$/ })}
                            id={errors.userName ? "standard-error-helper-text" : "standard-adornment-userName"}
                            label={errors.userName ? "Invalid user name" : "User name"}
                            type="text"
                            variant="standard"
                            error={errors.userName ? true : false}
                            helperText={errors.userName && errors.userName?.type == "required" ? "please, enter your user name" : errors.userName && errors.userName?.type == "pattern" ? "Make sure there is no spaces" : ''}
                        />

                    </FormControl>

                    <Button type="submit" variant="outlined" size="large" sx={{ width: "50%", ml: "auto", mr: "auto", mt: 3, mb: 5 }}>
                        {
                            signUpLouder ?
                                <CircularProgress size="3rem" />
                                : "REGISTER NOW"
                        }
                    </Button>

                    <div className={loginCss.middleContainer}>
                        <span>Already have an account ?</span>
                        <Link to="/login" className={loginCss.linkCounter}> Login </Link>
                    </div>



                </form>
            </div>

        </>
    )
}
export default RegisterComponent