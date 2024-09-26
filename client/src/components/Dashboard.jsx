import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
        console.log(userData);

    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    return (
        <>
            <div style={{color:"yellow"}}>
            <h1>Welcome {userInfo?.name}</h1><br />
            <div style={{ display: "flex", gap: "20px" }}>
                <img style={{ border: "2px solid gray", borderRadius: "50px" }} src={userInfo?.image} alt={userInfo?.name} /><br />
                <h3>{userInfo?.email}</h3><br />
            </div>
            <button style={{ marginLeft: "80%", border: "2px solid black", backgroundColor: "gray", }} onClick={handleLogout}
            >Logout
            </button>
            </div>
        </>
    )
}

export default Dashboard