import React, { useEffect, useState } from "react";
import restConnector from "../../axios/configAxios";
import BannerOrderDetail from "../../containers/BannerOrderDetail";
import toastr from "toastr";
import moment from "moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import User from "../../layouts/User";
import Cookies from "js-cookie";

const OrderDetail = () => {
  const [token] = useState(Cookies.get("token"));
  const [listOrder, setListOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getOrder();
  }, []);
  const toggle = () => {
    setModal(!modal);
  };

  const getOrder = async () => {
    try {
      const res = await restConnector.get("/user/order-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const order = res.data.data;
      setListOrder(order.reverse());
    } catch (error) {
      toastr.error("Lấy thông tin hóa đơn bán thất bại!");
    }
  };
  const setViewDetail = async (id) => {
    try {
      const res = await restConnector.get("/user/order-details/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orderDe = res.data.data;
      setOrderDetail(orderDe);
      setModal(true);
    } catch (error) {
      toastr.error("Lấy thông tin hóa đơn nhập thất bại!");
    }
  };
  const getStatus = (status) => {
    if (status === 0) {
      return (
        <div className="p-2 bg-warning d-inline rounded-pill text-white">
          Đang xử lý
        </div>
      );
    } else {
      return (
        <div className="p-2 bg-success d-inline rounded-pill text-white">
          Đã giao
        </div>
      );
    }
  };

  const orderDetailModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Chi tiết hóa đơn bán</ModalHeader>
        <ModalBody>
          <div className="w-100 mt-4">
            <h4 className="my-3">Danh sách sản phẩm bán:</h4>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Mã sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá bán</th>
                </tr>
              </thead>
              {/* amount: 2
                    id: 13
                    id_product: 5
                    id_sell: 20
                    price: 60000 */}
              <tbody>
                {orderDetail.length > 0 &&
                  orderDetail.map((data, index) => (
                    <tr key={index} style={{ cursor: "pointer" }}>
                      <th scope="row">{data.code}</th>
                      <td>{data.amount}</td>
                      <td>{data.price} đ/Kg</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  return (
    <>
      <BannerOrderDetail />
      <div className="container my-5">
        <h3 className="fs-1 fw-bolder mb-3">Danh sách các đơn hàng</h3>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Người nhận</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Ngày đặt</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listOrder.length > 0 &&
              listOrder.map((data, index) => (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <th className="text-uppercase" scope="row">
                    {data.code}
                  </th>

                  <td>{data.receive_name}</td>
                  <td>{data.receive_address}</td>
                  <td>{data.receive_phone_number}</td>
                  <td>{data.final_price}</td>
                  <td>{getStatus(data.status)}</td>
                  <td>{moment(data.created_time).format("L")}</td>
                  <td>
                    <div
                      className="text-decaration-underline text-danger"
                      onClick={() => setViewDetail(data.id)}
                    >
                      Xem chi tiết
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {orderDetailModal()}
    </>
  );
};

OrderDetail.getLayout = function getLayout(page) {
  return <User>{page}</User>;
};

export default OrderDetail;
