import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import toastr from "toastr";

import restConnector from "../../../axios/configAxios";
import Admin from "../../../layouts/Admin";

const AdminOrder = () => {
  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [idDetail, setIsDetail] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const getOrder = async () => {
    try {
      const res = await restConnector.get("/admin/order/list", {
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
      const res = await restConnector.get("/admin/order/details/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orderDe = res.data.data;
      setOrderDetail(orderDe);
      setIsDetail(id);
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
  const changeStatus = async() =>{
    try {
        const res = await restConnector.get("/admin/order/status-finish/" + idDetail, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toastr.success("Xác nhận thành công")
        getOrder();
      } catch (error) {
        toastr.error("Lấy thông tin hóa đơn nhập thất bại!");
      }
  }
  const checkFinish = () =>{
      const data= listOrder.find(x=>x.id === idDetail)
      if(data){
          if(data.status===1){
              return true
          }
          else{return false}
      }
  }
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
            {checkFinish()?<div className="px-3 py-2 bg-success d-inline text-white rounded-3">Đơn hàng đã giao</div>: <div
              className="px-3 py-2 rounded-pill bg-success d-inline text-white"
              style={{ cursor: "pointer" }}
              onClick={() => changeStatus()}
            >
              Xác nhận đã giao
            </div>}
           
          </div>
        </ModalBody>
      </Modal>
    );
  };
  return (
    <>
      <h2 className="py-3">Đơn hàng</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Nguời nhận</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Tình trạng</th>
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
                <td>{moment(data.created_time).format("L")}</td>
                <td>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.final_price)}
                </td>
                <td>{getStatus(data.status)}</td>
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
      {orderDetailModal()}
    </>
  );
};
AdminOrder.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default AdminOrder;
