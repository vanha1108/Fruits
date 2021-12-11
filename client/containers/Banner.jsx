import React from "react";
import Image from "next/image";
const Banner = () => {
  return (
    <section id="banner" className="position-relative">
      <Image
        src="/static/images/banner.jpg"
        alt="Picture of the author"
        layout="responsive"
        width={1200}
        height={600}
      />
      <div
        className="w-100 h-100 position-absolute top-0 start-0 bg-dark"
        style={{ opacity: "0.3" }}
      ></div>
      <div className="w-100 h-100 position-absolute top-0 start-0 text-white  d-flex justify-content-center align-items-center flex-column">
        <div className="px-4 py-5 card bg-opacity-10 text-center" style={{backgroundColor:"#0e0e0e7d"}}>
          <div className="fw-bolder fs-1">
            Cửa hàng chuyên bán trái cây tươi xanh
          </div>
          <div className="fw-normal fs-3">
            Mang đến sự hài lòng cho khách hàng là hạnh phúc của chúng tôi
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
