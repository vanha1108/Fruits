import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import SidebarAdmin from "../containers/SidebarAdmin";

const Admin = ({ children }) => {
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token === undefined) {
      return router.replace("/login");
    }
  }, [router,token]);
  return (
    <>
      {token !== undefined && (
        <div
          className="row min-vh-100 mx-0"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <div className="col-2 p-2">
            <SidebarAdmin />
          </div>
          <div className="col-10 py-2 px-4">{children}</div>
        </div>
      )}
    </>
  );
};

export default Admin;
