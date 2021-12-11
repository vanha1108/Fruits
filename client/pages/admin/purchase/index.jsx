import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import toastr from "toastr";
import restConnector from "../../../axios/configAxios";

import Admin from "../../../layouts/Admin";

const PurchaseBill = () => {
  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [purchaseDetail, setPurchaseDetail] = useState([]);
  useEffect(() => {
    getPurchase();
  }, []);
  const getPurchase = async () => {
    try {

      const res = await restConnector.get("/admin/purchase/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const perchase = res.data.data;
      setPurchase(perchase.reverse());
    } catch (error) {
      toastr.error("Lấy thông tin hóa đơn nhập thất bại!");
    }
  };
  const toggle = () => {
    setModal(!modal);
  };

  const setViewDetail = async (id) => {
    try {

      const res = await restConnector.get("/admin/purchase/detail/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const perchaseDe = res.data.data;
      setPurchaseDetail(perchaseDe);
      setModal(true);
    } catch (error) {
      toastr.error("Lấy thông tin hóa đơn nhập thất bại!");
    }
  };

  const purchaseDetailModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Chi tiết hóa đơn nhập</ModalHeader>
        <ModalBody>
          <div className="w-100 mt-4">
            <h4 className="my-3">Danh sách sản phẩm nhập:</h4>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Mã sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá bán</th>
                </tr>
              </thead>
              <tbody>
                {purchaseDetail.length > 0 &&
                  purchaseDetail.map((data, index) => (
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
      <h2 className="py-3">Hóa đơn nhập hàng</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {purchase.length > 0 &&
            purchase.map((data, index) => (
              <tr key={index} style={{ cursor: "pointer" }}>
                <th className="text-uppercase" scope="row">
                  {data.code}
                </th>
                <td>{moment(data.created_time).format("L")}</td>
                <td>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.total_price)}
                </td>
                <td>
                  <div
                    className="text-decaration-underline text-danger"
                    onClick={() => setViewDetail(data.id)}
                  >
                    Xem chi tiết
                  </div>
                </td>
              </tr>
              // code: "D79927E3"
              // created_time: "2021-12-07T00:00:00"
              // id: 12
              // id_account: 1
              // total_price: 384000
            ))}
        </tbody>
      </table>
      {purchaseDetailModal()}
    </>
  );
};

PurchaseBill.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default PurchaseBill;
