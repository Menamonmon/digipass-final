import Link from "next/link";
import React, { PropsWithChildren } from "react";

export const Header: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex justify-between h-16 p-2 border-b border-b-secondary-dark drop-shadow-md">
      <Link href="/">
        <div className="inline-flex gap-3">
          <img src="/images/standalone-icon.png" height="100%" />
          <img src="/images/logo-text.png" height="100%" className="" />
        </div>
      </Link>
      {children}
    </div>
  );
};
