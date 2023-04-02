import Link from "next/link";
import React from "react";

const LogInButton: React.FC = () => {
  return (
    <Link href="/login">
      <button className="btn">Login</button>
    </Link>
  );
};

export default LogInButton;
