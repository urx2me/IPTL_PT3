import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/users", { withCredentials: true })
            .then(response => setUsers(response.data))
            .catch(() => navigate("/"));
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
        navigate("/");
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <table>
                <thead>
                    <tr><th>Name</th><th>Email</th></tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
