import React from "react";

const BannerOrderDetail = () => {
  return (
    <section
      id="banner-about"
      className="position-relative d-flex align-items-center"
    >
      <div className="container">
        <div
          className="fw-bolder text-white card px-4 py-2 d-inline"
          style={{ fontSize: "5rem", backgroundColor: "#0e0d0d73" }}
        >
          Thông tin các đơn hàng
        </div>
      </div>
      <div className="cloud-bn"></div>
    </section>
  );
};

export default BannerOrderDetail;
