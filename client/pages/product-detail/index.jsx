import React, { useState, useEffect } from "react";
import Link from "next/link";
import toastr from "toastr";
import Cookies from "js-cookie";

import User from "../../layouts/User";
import BannerProductDetail from "../../containers/BannerProductDetail";
import { setCookie } from "../../cookie/cookie";
import { CartState } from "../../context/Context";
import { useRouter } from "next/router";
import restConnector from "../../axios/configAxios";

const CARD = "CARD";

const ProductDetail = () => {
  const [token] = useState(Cookies.get("token"));
  const [productDetail, setProductDetail] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  const [count, setCount] = useState(1);
  const countDown = () => {
    if (count === 1) {
      alert("Phai lon hon 1");
    } else {
      setCount(count - 0.5);
    }
  };

  useEffect(() => {
    getProductDetail();
    getCategory();
  }, [id]);

  const getProductDetail = async () => {
    if (id) {
      try {
        const res = await restConnector.get("/product/detail/" + id);

        const product = res.data.data;
        setProductDetail(product);
        try {
          const res1 = await restConnector.get(
            "/product/list-by-category/" + res.data.data.id_category
          );

          const product = res1.data.data;

          const updatedProduct = [...product];
          const updatedItemIndex = updatedProduct.findIndex(
            (item) => item.id === res.data.data.id
          );
          updatedProduct.splice(updatedItemIndex, 1);

          setProduct(updatedProduct);
        } catch (error) {
          toastr.error("Lấy thông tin loại trái cây thất bại!");
        }
      } catch (error) {
        toastr.error("Lấy thông tin loại trái cây thất bại!");
      }
    }
  };

  const getCategory = async () => {
    try {
      const res = await restConnector.get("/category/list");

      const category = res.data.data;
      setCategory(category);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };

  const viewCategory = (id) => {
    const categoryFind = category.find((x) => x.id == id);
    if (categoryFind) {
      return categoryFind.name;
    }
  };

  const addProductToCart = () => {
    if (productDetail.amount === 0) {
      toastr.warning("Hiện sản phẩm của chúng tôi đang hết hàng");
    } else {
      if (count > productDetail.amount) {
        toastr.warning("Hàng tồn kho không đủ");
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: { id: productDetail.id, amount: count },
        });
        toastr.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
    }
  };

  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <>
      <BannerProductDetail nameP={productDetail.name} />
      <div className="container my-5">
        {productDetail.length == 0 ? (
          <div className="text-success">
            Đang lấy thông tin sản phẩm xin vui lòng chờ giây lát...
          </div>
        ) : (
          <div className="row">
            <div className="col-6">
              <img src={productDetail.image} alt="" className="w-100" />
            </div>
            <div className="col-6">
              <div className="fw-bolder mb-4">
                Tên trái cây:{" "}
                <span className="fw-normal">{productDetail.name}</span>
              </div>
              <div className="fw-bolder mb-4">
                Mã Sku:{" "}
                <span className="fw-normal text-uppercase">
                  {productDetail.code}
                </span>
              </div>
              <div className="fw-bolder mb-4">
                Loại trái cây:{" "}
                <span className="fw-normal">
                  {viewCategory(productDetail.id_category)}
                </span>
              </div>
              <div className="fw-bolder mb-4">
                Giá:{" "}
                <span className="fw-normal">{productDetail.price}đ/kg</span>
              </div>
              <div className="fw-bolder mb-4">
                Tồn kho:{" "}
                <span className="fw-normal">{productDetail.amount}kg</span>
              </div>
              <div className="d-flex">
                <div
                  className="px-4 py-2 fs-3 border border-dark border-end-0 d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setCount(count + 0.5)}
                >
                  +
                </div>
                <input
                  type="text"
                  name="count"
                  value={count}
                  className="ps-4"
                  style={{ width: "70px" }}
                />
                <div
                  className="px-4 py-2 border border-dark border-start-0 fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => countDown()}
                >
                  -
                </div>
              </div>
              <div
                id="add-cart-2"
                className="p-3 bg-warning d-inline-flex align-items-center mt-4"
                onClick={() => addProductToCart()}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shopping-cart me-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx={6} cy={19} r={2} />
                  <circle cx={17} cy={19} r={2} />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
                Thêm vào giỏ hàng
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="fw-bolder fs-3"> Thông tin chi tiết </div>
              <p>{productDetail.long_description}</p>
            </div>
            <div className="col-12 mt-3">
              <div className="fw-bolder fs-3">Sản phẩm liên quan</div>
              <div className="row mt-4">
                {product.length > 0 ? (
                  <div className="row">
                    {product.length > 0 &&
                      product.map((data, index) => (
                        <div key={index} className="col-4 mb-4">
                          <div id="card-pr" className="card h-100">
                            <div className="w-100" style={{ height: "300px" }}>
                              <img
                                src={data.image}
                                className="card-img-top"
                                alt="..."
                                style={{ height: "100%" }}
                              />
                            </div>

                            <div className="card-body text-center">
                              <span className="card-text text-secondary fw-light">
                                {viewCategory(data.id_category)}
                              </span>
                              <p className="card-text fw-bolder fs-4">
                                {data.name}
                              </p>
                              <Link href={`/product-detail?id=${data.id}`}>
                                <a href="#">Xem chi tiết</a>
                              </Link>
                              <div
                                id="add-cart"
                                href="#"
                                className="p-3 bg-warning position-absolute top-50 start-50 d-flex align-items-center"
                                onClick={() => addToCart(data)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-shopping-cart me-2"
                                  width={40}
                                  height={40}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#2c3e50"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <circle cx={6} cy={19} r={2} />
                                  <circle cx={17} cy={19} r={2} />
                                  <path d="M17 17h-11v-14h-2" />
                                  <path d="M6 5l14 1l-1 7h-13" />
                                </svg>
                                Thêm vào giỏ hàng
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-success">
                    Đang lấy thông tin danh sách sản phẩm xin đợi trong giây
                    lát....
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
ProductDetail.getLayout = function getLayout(page) {
  return <User>{page}</User>;
};
export default ProductDetail;
