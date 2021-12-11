import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import toastr from "toastr";
import Link from "next/link";

import User from "../../layouts/User";
import { getCookie } from "../../cookie/cookie";
import { CartState } from "../../context/Context";
import restConnector from "../../axios/configAxios";
import Cookies from "js-cookie";
const CARD = "CARD";

const ShoppingCart = () => {
  const [token] = useState(Cookies.get("token"));
  const [promotion, setPromotion] = useState("");
  const [promotionNumber, setPromotionNumber] = useState(0);
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    getProduct();
    getUser();
  }, []);
  const getProduct = async () => {
    try {
      const res = await restConnector.get("/product/list");

      const product = res.data.data;
      product = product.slice(0, 6);
      setProduct(product);
    } catch (error) {
      toastr.error("Lấy thông tin trái cây thất bại!");
    }
  };
  const getUser = async () => {
    if (token !== undefined) {
      try {
        const res = await restConnector.get("/user/information", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.data;
        setUser(user);
      } catch (error) {
        toastr.error("Lấy thông tin khách hàng thất bại!");
      }
    }
  };
  const decrement = (data, quantity) => {
    if (quantity === 1) {
      alert("khong dc giam nua");
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { id: data, amount: -0.5 },
      });
    }
  };

  const countMoney = (cart, money) => {
    const price = cart * money;
    // const newSum = [...sumPrice,price]
    // newSum.push(price)
    // setSumPrice(newSum)
    return price;
  };

  const checkPromotion = async () => {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      
      const res = await restConnector.get("/promotion/" + promotion);
      const endDate = res.data.data.end_date;
      if (Date.parse(today) > Date.parse(endDate)) {
        
      } else {
        setPromotionNumber(res.data.data.price);
      }
    } catch (error) {
      toastr.error("Mã không tồn tại");
    }
  };
  const getName = (id) => {
    const data = product.find((x) => x.id === id);
    if (data) {
      return data.name;
    }
  };
  const setImage = (id) => {
    const data = product.find((x) => x.id === id);
    if (data) {
      return data.image;
    }
  };

  const getPrice = (id) => {
    const data = product.find((x) => x.id === id);
    if (data) {
      return data.price;
    }
  };
  const countMoneyAll = () => {
    var sum = 0;
    const dataS = cart.map((data, index) => {
      if (index < cart.length) {
        
        const z = product.find((x) => x.id === data.id);
        if (z) {
          
          sum += z.price * data.amount;
        }
      }
    });
    return sum;
  };

  const sumMoney = () => {
    if (promotionNumber > 0) {
      return countMoneyAll() - countMoneyAll() * (promotionNumber / 100);
    } else return countMoneyAll();
  };

  const handleOrder = async (values) => {
    const data = {
      receive_name: values.name,
      receive_phone_number: values.phoneNumber,
      receive_address: values.address,
      promotion_code: promotion,
      product_list: cart,

      
    };

    try {

      const res = await restConnector.post("/user/order", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      toastr.success("Đặt hàng thành công");
      cart.map((data, index) => {
        if (index <= cart.length) {
          dispatch({
            type: "REMOVE_TO_CART",
            payload: { productId: data.id },
          });
        }
      });
      // const user = res.data.data;
      // setUser(user);
    } catch (error) {
      
      toastr.error("Thêm thất bại!");
    }
  };

  

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-8">
          <div className="card p-3">
            <h4 className="mb-3">Danh sách sản phẩm</h4>
            <div className="row py-3 bg-dark text-white mx-0 mb-1">
              <div className="col-2">Hình ảnh</div>
              <div className="col-2">Tên trái cây</div>

              <div className="col-2">Số lượng</div>
              <div className="col-2">Đơn Giá</div>
              <div className="col-2">Tổng tiền</div>
              <div className="col-2">Thao tác</div>
            </div>
            {cart && cart.length > 0 ? (
              <div>
                {product.length > 0 ? (
                  <div className="w-100">
                    {cart.map((data, index) => (
                      <div key={index} className="card p-2 mb-2 text-dark">
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={setImage(data.id)}
                              className="w-100"
                              alt=""
                            />
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            {getName(data.id)}
                          </div>

                          <div className="col-2 d-flex align-items-center">
                            <div className="d-flex">
                              <div
                                className="px-2 py-1 fs-4 border border-dark border-end-0 d-flex align-items-center justify-content-center"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  dispatch({
                                    type: "ADD_TO_CART",
                                    payload: {
                                      id: data.id,
                                      amount: 0.5,
                                    },
                                  });
                                }}
                              >
                                +
                              </div>
                              <input
                                type="text"
                                name="count"
                                value={data.amount}
                                className=""
                                style={{ width: "40px" }}
                              />
                              <div
                                className="px-2 py-1 border border-dark border-start-0 fs-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  decrement(data.id, data.amount);
                                }}
                              >
                                -
                              </div>
                            </div>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(getPrice(data.id))}
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              countMoney(data.amount, getPrice(data.id))
                            )}
                          </div>
                          <div
                            className="col-2 d-flex align-items-center text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_TO_CART",
                                payload: { productId: data.id },
                              });
                            }}
                          >
                            Xóa sản phẩm
                          </div>
                        </div>
                      </div>
                    ))}

                    <h5 className="mt-2 text-dark">
                      Tổng tiền:{" "}
                      <span className="fw-normal">
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "VND",
                        }).format(countMoneyAll())}
                      </span>{" "}
                    </h5>
                    <h5 className="mt-2 text-dark">
                      Khuyến mãi:{" "}
                      <span className="fw-normal">{promotionNumber}%</span>{" "}
                    </h5>
                    <h5 className="mt-2 text-dark">
                      Tổng tiền phải trả:{" "}
                      <span className="fw-normal">
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "VND",
                        }).format(sumMoney())}
                      </span>{" "}
                    </h5>
                  </div>
                ) : (
                  <div>Đang lấy thông tin sản phẩm</div>
                )}
              </div>
            ) : (
              <div className="mt-2 text-success">
                Hiện không có sản phẩm nào cả hãy tiến hành mua sắm!!!!
              </div>
            )}
          </div>
          <div className="input-group my-3">
            <input
              id="ip-none-shadow"
              type="text"
              className="form-control"
              placeholder="Nhập mã giảm giá"
              onChange={(e) => setPromotion(e.target.value)}
            />
            <span
              className="input-group-text bg-success text-white border-success"
              style={{ cursor: "pointer" }}
              onClick={() => checkPromotion()}
            >
              Áp dụng
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-3">
            <h4>Thông tin khách hàng</h4>
            {token !== undefined ? (
              <div>
                {user.length === 0 ? (
                  <div>Đang lấy thông tin khách hàng</div>
                ) : (
                  <Formik
                    initialValues={{
                      name: user.first_name.concat(" ", user.last_name),
                      email: user && user.email,
                      address: user.address,
                      phoneNumber: user.phone_number,
                    }}
                    onSubmit={handleOrder}
                  >
                    {(props) => (
                      <div className="w-full max-w-md">
                        <Form onSubmit={props.handleSubmit} className="">
                          <div className="mb-4">
                            <label className="form-label" htmlFor="name">
                              Họ và tên
                            </label>
                            <Field
                              id="name"
                              name="name"
                              placeholder="Nguyễn Văn A"
                              className="form-control"
                              type="text"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="form-label" htmlFor="email">
                              Địa chỉ email
                            </label>
                            <Field
                              id="email"
                              name="email"
                              placeholder="nguyenvana@gmail.com"
                              className="form-control"
                              type="text"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label" htmlFor="phoneNumber">
                              Số điện thoại
                            </label>
                            <Field
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="0987898926"
                              className="form-control"
                              type="text"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label" htmlFor="address">
                              Địa chỉ nhận hàng
                            </label>
                            <Field
                              id="address"
                              name="address"
                              placeholder="123 đường abc, phường z, quận d, thành phố v"
                              className="form-control"
                              type="text"
                            />
                          </div>
                          <button type="submit" className="btn btn-success">
                            Đặt hàng
                          </button>
                        </Form>
                      </div>
                    )}
                  </Formik>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-2">Hãy đăng nhập tước khi đặt hàng</div>
                <Link href="/login">
                  <a className="btn btn-outline-success">Login</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
ShoppingCart.getLayout = function getLayout(page) {
  return <User>{page}</User>;
};

export default ShoppingCart;
