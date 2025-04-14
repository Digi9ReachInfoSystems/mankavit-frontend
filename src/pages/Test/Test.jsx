import React from 'react'
import { logoutUser } from '../../api/authApi'
import { clearCookies } from '../../utils/cookiesService'
import { useNavigate } from 'react-router-dom'

export default function Test() {
    const naviagte =useNavigate();
    return (
        <>
            <button
                onClick={async() => {
                  await logoutUser({email:'jayanthbr@digi9.co.in'})

                  naviagte('/login');
                }}
            >
             logout
            </button>
        </>
    )
}
