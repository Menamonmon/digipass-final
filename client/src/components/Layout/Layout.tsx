import React, { PropsWithChildren } from "react";
import useAuth from "../../hooks/useAuth";
import LogoutButton from "../Auth/LogoutButton";
import LogInButton from "../Navbar/LogInButton";
import { UserProfileMenu } from "../UserProfileMenu";
import { Header } from "./Header";

export const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { authStatus } = useAuth();
  return (
    <div className="max-w-5xl mx-auto">
      <Header>
        {authStatus === "not_authenticated" ? (
          <div className="flex gap-2">
            <LogInButton />
          </div>
        ) : (
          <div className="flex gap-2">
            <UserProfileMenu />
            <LogoutButton />
          </div>
        )}
      </Header>
      {children}
    </div>
  );
};
