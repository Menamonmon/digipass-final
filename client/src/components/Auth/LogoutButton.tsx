import React from "react";
import useAuth from "../../hooks/useAuth";

const LogoutButton: React.FC<{}> = () => {
  const { handleLogout } = useAuth();

  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
