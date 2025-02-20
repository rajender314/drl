import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '@app/routes'
import { Layout } from '@app/components'
import { service } from '@app/@services/interceptor'
import { createContext, useEffect, useContext, useState } from "react"
import { MyGlobalContext } from '@app/contexts'
import { getUserDetail, getNewToken } from '@app/@services/user/user';
import { Spinner } from '@app/components/icon/icons';
function App() {


  const [isOpened, setCopy,] = useState<Boolean>(false)
  const [userInfo, setUserInfo,] = useState<Boolean>(false)
  const [spinner, setSpinner] = useState<Boolean>(true)
  const [cartCount, setCartCount] = useState<Number>(0)
  const resetTokenUrl = "api/auth/generate/token"

  useEffect(() => {
    GetAuthStatus()
    getUser()
  }, [])
  async function getUser() {

    await getUserDetail().then((res) => {
      if (res.status === 200) {
        //setTimeout(()=>{setCartCount(res.data.cartInItem)},2000)

        sessionStorage.setItem('patientId', res.data.patientId)
        sessionStorage.setItem('user', JSON.stringify(res.data));
        setUserInfo(res.data);

        let cartCnt = res.data.medicineItemInCart
        sessionStorage.setItem('isCartCountFetched', 'No')
        //console.log(cartCnt)
        //sessionStorage.setItem('fetchedCartCount', cartCnt.toString())
        setCartCount(cartCnt);

      }
    }).catch((error) => {
    }).finally(() => {
      setSpinner(false)
    })
  }
  const GetAuthStatus = () => {
    service.interceptors.response.use(
      (res) => {
        if (((res.config['url']).includes("auth"))) {
          setCopy(true);
        } else {
          setCopy(false)
        }

        //res.data['status_code'] = res.status;
        return res
      },
      (error: any) => {
        let config = error.config;
        const status = error.response ? error.response.status : null;
        // console.log(window.location.href);
        // if(window.location.href.includes('signup') || window.location.href.includes('forgot') ){
        //   setCopy(true);
        // }
        //console.log(error)
        if (status === 401) {
          resetToken(config.url)
          setCopy(true)
        }
        return Promise.reject(error.response);
      }
    );
  }

  async function resetToken(apiUrl) {
    console.log(apiUrl, resetTokenUrl)
    if (!window.location.href.includes('login') &&
      !window.location.href.includes('logout') &&
      !window.location.href.includes('signup') &&
      !window.location.href.includes('forgot') &&
      !window.location.href.includes('member') 
    ) {
      if (localStorage.getItem('refresh_token') && localStorage.getItem('access_token')) {
        if (apiUrl != '/api/auth/generate/token') {
          console.info("***Please wait resetting the token***")
          await getNewToken(resetTokenUrl).then((response) => {
            if (response.status == 200) {
              let access_token = response.data.access_token
              let refresh_token = response.data.refresh_token
              if (access_token && refresh_token) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                window.location.reload();
              }
            }
            //console.log(response)
          }, (error: any) => {
            console.log('error')
            //console.log(error)
          })
        }
      }

    }
  }

  return (
    <div className="App">
      {spinner ? (
        <div><Spinner size='3px' /></div>
      ) : (
        <>

          <MyGlobalContext.Provider value={{ isOpened, setCopy, userInfo, setUserInfo, cartCount }}>
            <Router basename={process.env.REACT_APP_HOMEPAGE}>
              <Layout />
            </Router>
          </MyGlobalContext.Provider>
        </>
      )
      }



    </div >
  );
}

export default App;
