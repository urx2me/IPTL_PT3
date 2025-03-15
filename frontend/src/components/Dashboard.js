import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/users", { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                navigate("/");
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h1>Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">
                {users.length > 0 && (
                    <div className="current-user">
                        <p>Currently logged in as: <strong>{users[0].email}</strong></p>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Dashboard;