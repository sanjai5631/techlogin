// src/Component/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://localhost:7267/api/Users/GetAllUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to fetch users.");
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ paddingTop: "80px" }}>
      <h2>All Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.userid}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
