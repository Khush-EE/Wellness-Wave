import axios from "axios";
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loginSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom"

function AuthLayout({ children }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get("/api/v1/user/getCurrentUser");
                    console.log(response);
                    if (response.status !== 200) {
                        navigate("/login");
                    } else {
                        dispatch(loginSuccess(response.data.data))
                        setLoading(false);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            }
            fetchUser();
        }else{
            setLoading(false);
        }
    }, []);

    return ( !loading &&
        <div>
            {children}
        </div>
    )
}

export default AuthLayout