import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState } from "@/src/store/states";
import throttle from "lodash/throttle";
import HeaderPageUI from "./header.presenter";
import axios from "axios";
import { BASE_URL } from "@/src/config/config";

export default function HeaderPage():JSX.Element {
    /* 내렸을때 true 올릴때 false */
    const [visible, setVisible] = useState(true);
    const [usertype, setUsertype] = useState('')

    const beforeScrollY = useRef(0);

    const router = useRouter();

    const [localLogin, setLocalLogin] = useRecoilState(loginState)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };    
      }, []);
    
      const handleScroll = useMemo(
        () =>
          throttle(() => {
            const currentScrollY = window.scrollY;
            if (beforeScrollY.current < currentScrollY) {
              setVisible(false);
            } else {
              setVisible(true);
            }
            beforeScrollY.current = currentScrollY;
          }, 250),
        [beforeScrollY]
      );

    useEffect(() => {
      if (localStorage.getItem('usertype') === 'admin'){
        setUsertype('admin')
      }else {
        setUsertype('')
      }
    },[usertype])

    const onClickHome = ()=> {
        router.push('/')
    }

    const onClickPurchase = () => {
        router.push('/purchase')
    }

    const onClickCenter = () => {
      router.push('/center')
    }

    const onClickRegister = () => {
      router.push('/register')
    }

    const onClickRecipe = () => {
      router.push('/purchase/recipe')
    }

    const onClickEvent = () => {
      router.push('/purchase/event')
    }

    const onClickPurchaseList = () => {
      router.push('/purchase/list')
    }

    const onClickBasket = () => {
      router.push('/purchase/basket/leekc')
    }

    const onClickCart = () => {
      router.push('/purchase/cart/leekc')
    }

    const onClickLogout = async () => {
      try{
        const response = await axios.delete(`${BASE_URL}users/logout/`)

        if (response.status === 200){
          console.log("로그아웃 성공")
        }

        localStorage.setItem('loginstate', 'false')
        setLocalLogin(false)
        localStorage.removeItem('nickname');
        localStorage.removeItem('usertype');
        localStorage.removeItem('id');
        alert('로그아웃 하였습니다.')
      }catch(error){
        console.log('error', error)
      }
    }

    return(
        <HeaderPageUI
            visible = {visible}
            onClickHome = {onClickHome}
            onClickPurchase = {onClickPurchase}
            onClickRegister = {onClickRegister}
            onClickLogout = {onClickLogout}
            localLogin = {localLogin}
            usertype = {usertype}
            onClickCenter = {onClickCenter}
            onClickRecipe = {onClickRecipe}
            onClickEvent = {onClickEvent}
            onClickPurchaseList = {onClickPurchaseList}
            onClickBasket = {onClickBasket}
            onClickCart = {onClickCart}
         />
    )
}