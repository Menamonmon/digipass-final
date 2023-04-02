import Link from "next/link";
import React from "react";

export const PageNotFound = () => {
  return (
    <div>
      The page you're looking for doesn't exist or you do not have the proper
      permissions to access it.{" "}
      <Link href="/">Click here to go back to the main page.</Link>
    </div>
  );
};
