import React, { useState, useEffect } from "react";

/* -----------------------------
   Presentational Component
   (тільки UI, ніякої логіки)
------------------------------ */
function UserList({ users, loading }: { users: string[]; loading: boolean }) {
  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u}>{u}</li>
      ))}
    </ul>
  );
}

/* -----------------------------
   Container Component
   (логіка, запити, state)
------------------------------ */
export default function UserListContainer() {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // імітація API-запиту
    setTimeout(() => {
      setUsers(["Bohdan", "Anna", "Marek"]);
      setLoading(false);
    }, 800);
  }, []);

  return <UserList users={users} loading={loading} />;
}
