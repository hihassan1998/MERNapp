import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                    setShowError(true) // Set flag to show error message
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
    }, [persist, refresh, token])

    useEffect(() => {
        if (!token) navigate('/') // Redirect to home page when token is cleared
    }, [token, navigate])

    let content
    if (!persist) { 
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { 
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError && showError) { // Show error message only if showError flag is set
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { 
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { 
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin
