import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { loginState, userState } from "@/src/store/states";
import RegisterPageUI from "./register.presenter";
import axios from "axios";
import { BASE_URL } from "@/src/config/config";


export default function RegisterPage(): JSX.Element {
    const router = useRouter()

    const [nickName, setNickName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLogin, setIsLogin] = useState(true) /* 로그인창 true, 회원가입창 false */

    const [localLogin, setLocalLogin] = useRecoilState(loginState)
    const [localUser, setLocalUser] = useRecoilState(userState)

    const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onClickLoginState = () => {
        setIsLogin((prev) => !prev)
    }

    const onClickMoveHome = () => {
        router.push('/')
    }


    const submitLogin = async () => {
        try{
            console.log(BASE_URL)
            const response = await axios.post(`${BASE_URL}users/login/` ,{
                email : email,
                password : password,
            })
            localStorage.setItem('nickname', response.data.user.nickname)
            localStorage.setItem('loginstate', 'true')
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('usertype',response.data.user.user_type)
            localStorage.setItem('userstate',response.data.user.user_type)
            setLocalUser(response.data.user.user_type)
            console.log(response)
            console.log(document.cookie)
            setLocalLogin(true)
            if (localStorage.getItem('usertype') === 'buyer') {
                router.push('/purchase')
                return
            }
    
            if (localStorage.getItem('usertype') === 'seller') {
                router.push('/seller')
                return
            }

            if (localStorage.getItem('usertype') === 'admin') {
                router.push('/center')
                return
            }

        }catch(error){
            console.log('error',error)
        }    
    }

    const submitRegister = async () => {

        try {
            const response = await axios.post(`${BASE_URL}users/register/`,{
            nickname : nickName,
            email : email,
            password : password,
            user_type : localStorage.getItem('userstate')
            })

            if (response.status === 201){
                setNickName('')
                setEmail('')
                setPassword('')
                onClickLoginState()
            }
        }catch(error){
            console.log(error,'error')
        }
    }

    return (
        <RegisterPageUI
            onChangeNickName={onChangeNickName}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onClickLoginState={onClickLoginState}
            onClickMoveHome={onClickMoveHome}
            submitLogin={submitLogin}
            isLogin={isLogin}
            nickName={nickName}
            email={email}
            password={password}
            submitRegister = {submitRegister}
        />
    )
}