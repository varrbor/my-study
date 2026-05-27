import React, { useState, useEffect } from "react";

/* -----------------------------------
   Component with Render Props
   (містить логіку, але не UI)
------------------------------------ */
function FetchUsers({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // імітація API-запиту
    setTimeout(() => {
      setUsers(["Bohdan", "Anna", "Marek"]);
      setLoading(false);
    }, 800);
  }, []);

  // children — це функція (render prop)
  return children({ users, loading });
}

/* -----------------------------------
   Використання Render Props
------------------------------------ */
export default function App() {
  return (
    <FetchUsers>
      {({ users, loading }) => (
        <div>
          {loading && <p>Loading...</p>}
          {!loading && (
            <ul>
              {users.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </FetchUsers>
  );
}
