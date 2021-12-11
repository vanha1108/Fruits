import React from "react";
import BannerContact from "../../containers/BannerContact";
import User from "../../layouts/User";

const Contact = () => {
  return (
    <>
      <BannerContact />
      <div className="container my-5">
        <div className="row">
          <div className="col-5">
            <h3 className="fs-1 fw-bolder">Thông tin liên hệ</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              amet, a non cumque dolor repudiandae praesentium ipsum ea
              eligendi. Eius eum voluptate iusto blanditiis voluptates enim ad
              laudantium optio praesentium.
              <div className="d-flex mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-map-pin me-2"
                  width={36}
                  height={36}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00b341"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={12} cy={11} r={3} />
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                </svg>
                <div>
                  <p className="fs-4" style={{ fontWeight: "600" }}>
                    Vị trí của chúng tôi
                  </p>
                  <p>Tp.Hồ Chí Minh</p>
                </div>
              </div>
              <div className="d-flex mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone-call me-2"
                  width={36}
                  height={36}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00b341"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 7a2 2 0 0 1 2 2" />
                  <path d="M15 3a6 6 0 0 1 6 6" />
                </svg>
                <div>
                  <p className="fs-4" style={{ fontWeight: "600" }}>
                    Số điện thoại của chúng tôi
                  </p>
                  <p>+84 56565656</p>
                  <p>+84 56565654</p>
                </div>
              </div>
              <div className="d-flex mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail me-2"
                  width={36}
                  height={36}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00b341"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x={3} y={5} width={18} height={14} rx={2} />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                <div>
                  <p className="fs-4" style={{ fontWeight: "600" }}>
                    Email của chúng tôi
                  </p>
                  <p>contact@gmail.com</p>
                </div>
              </div>
            </p>
          </div>
          <div className="col-7">
            <img
              src="/static/images/house.png"
              className="card-img-top"
              alt="..."
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
Contact.getLayout = function getLayout(page) {
  return <User>{page}</User>;
};
export default Contact;
