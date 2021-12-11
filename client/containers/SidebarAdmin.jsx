import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SidebarAdmin = () => {
  const router = useRouter();
  const getSidebarClass = (path) => {
    const matched =
      path === "/admin"
        ? router.pathname === path
        : router.pathname.match(new RegExp(`^${path}($|/.*)`));
    return matched ? " bg-pink" : "";
  };

  const logout = () =>{
    Cookies.remove('token')
    router.replace('/login')
  }
  return (
    <div
      className="bg-primary vh-100 position-fixed"
      style={{
        backgroundImage: "linear-gradient(195deg,#42424a,#191919)",
        borderRadius: "15px",
        width:"15%",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light py-3 shadow-sm flex-column h-100">
        <a
          className="navbar-brand fw-bold text-uppercase border-bottom w-100 me-0 text-center text-white pb-3"
          href="#"
        >
          Fruits admin
        </a>

        <ul className="navbar-nav flex-column mt-3 w-100">
          <li className="nav-item px-2">
            <Link href="/admin">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-dashboard me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={13} r={2} />
                  <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                  <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                </svg>
                Dashboard
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/product">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/product")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-apple me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={14} r={7} />
                  <path d="M12 11v-6a2 2 0 0 1 2 -2h2v1a2 2 0 0 1 -2 2h-2" />
                  <path d="M10 10.5c1.333 .667 2.667 .667 4 0" />
                </svg>
                Sản phẩm
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/order">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/order")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-license me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                  <line x1={9} y1={7} x2={13} y2={7} />
                  <line x1={9} y1={11} x2={13} y2={11} />
                </svg>
                Đơn hàng
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/purchase">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/purchase")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-license me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                  <line x1={9} y1={7} x2={13} y2={7} />
                  <line x1={9} y1={11} x2={13} y2={11} />
                </svg>
                Hóa đơn nhập
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/category">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/category")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circles me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={7} r={4} />
                  <circle cx="6.5" cy={17} r={4} />
                  <circle cx="17.5" cy={17} r={4} />
                </svg>
                Loại trái cây
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/supplier">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/supplier")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circles me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={7} r={4} />
                  <circle cx="6.5" cy={17} r={4} />
                  <circle cx="17.5" cy={17} r={4} />
                </svg>
                Nhà cung cấp
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link href="/admin/gift">
              <a
                id="side-bar-ad"
                className={
                  "d-flex align-items-center nav-link px-4 rounded-3 text-white" +
                  getSidebarClass("/admin/gift")
                }
                aria-current="page"
                href="#"
                style={{
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-gift me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x={3} y={8} width={18} height={4} rx={1} />
                  <line x1={12} y1={8} x2={12} y2={21} />
                  <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
                </svg>
                Khuyến mãi
              </a>
            </Link>
          </li>
        </ul>
        <div className="p-1 mt-auto w-100">
          <div
            className="py-2 text-white w-100 px-4 text-center bg-pink rounded-3 d-flex align-items-center justify-content-center"
            style={{ cursor: "pointer" }}
            onClick={()=> logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-big-left me-2"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
            </svg>
            Đăng xuất
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
