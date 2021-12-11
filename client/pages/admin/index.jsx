import React,{ useState, useEffect} from "react";
import Admin from "../../layouts/Admin";
import axios from "axios";
import toastr from "toastr";
import Cookies from "js-cookie";

const Dashboard = () => {
  
  const [token] = useState(Cookies.get("token"));
  const [statistic,setStatistic] = useState([])
  
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
 
      const res = await axios.get(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/statis",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statistic = res.data.data;
      setStatistic(statistic);
    } catch (error) {
  
      toastr.error("Lấy thông tin thống kê thất bại!");
    }
  };
  return (
    <>
    <h2 className="py-3">Thống kê</h2>
      <div className="row">
        <div className="col-3 px-2">
          <div className="card shadow-md p-3" style={{ borderRadius: "10px" }}>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-center align-items-center bg-dark"
                style={{ width: "70px", height: "70px", borderRadius: "10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-users"
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
                  <circle cx={9} cy={7} r={4} />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
              </div>
              <div className="text-end">
                <p className="text-secondary fs-5">Số lượng user</p>
                <p className="fw-bolder fs-4">{statistic.countCustomer}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="card shadow-md p-3" style={{ borderRadius: "10px" }}>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-center align-items-center bg-dark"
                style={{ width: "70px", height: "70px", borderRadius: "10px" }}
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
              </div>
              <div className="text-end">
                <p className="text-secondary fs-5">Số lượng SP</p>
                <p className="fw-bolder fs-4">{statistic.countProduct}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="card shadow-md p-3" style={{ borderRadius: "10px" }}>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-center align-items-center bg-dark"
                style={{ width: "70px", height: "70px", borderRadius: "10px" }}
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
              </div>
              <div className="text-end">
                <p className="text-secondary fs-5">Số lượng ĐH</p>
                <p className="fw-bolder fs-4">{statistic.countOrderInvoice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 px-2">
          <div className="card shadow-md p-3" style={{ borderRadius: "10px" }}>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-center align-items-center bg-dark"
                style={{ width: "70px", height: "70px", borderRadius: "10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-cash"
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
                  <rect x={7} y={9} width={14} height={10} rx={2} />
                  <circle cx={14} cy={14} r={2} />
                  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
              </div>
              <div className="text-end">
                <p className="text-secondary fs-5">Tổng tiền</p>
                <p className="fw-bolder fs-4">
                  {statistic.totalPriceOrderValue && new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "VND",
                      }).format(statistic.totalPriceOrderValue)}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};



export default Dashboard;
