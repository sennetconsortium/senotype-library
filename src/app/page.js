
'use client'
import {useContext, useEffect } from 'react'
import BasicLayout from "@/components/layout/BasicLayout";
import Login from "@/components/Login";
import AppContext from "@/context/AppContext";
import URLS from '@/lib/urls';
import useAuth from '@/hooks/useAuth';


export default function Home() {
  const { authInfo } = useContext(AppContext)
  const { isAuthorized, setAuthInfo } = useAuth({ authInfo })
  

  useEffect(() => {
    setAuthInfo(authInfo)
  }, [authInfo])

  useEffect(() => {
    if (isAuthorized) {
      window.location = URLS.edit
    }
  }, [isAuthorized])

  return (
    <div>
     <BasicLayout>
       <Login />
     </BasicLayout>
    </div>
  );
}
