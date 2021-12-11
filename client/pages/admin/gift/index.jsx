import React, { useState,useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import toastr from "toastr";
import Cookies from "js-cookie";

import Admin from "../../../layouts/Admin";
import restConnector from "../../../axios/configAxios";
import axios from "axios";
import moment from "moment";

const AdminGift = () => {
  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit,setDataEdit] = useState([])
  const [promotion,setPromotion] = useState([])

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getPromotion();
    
  }, [])

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const getPromotion = async () => {
    try {

      const res = await restConnector.get("/admin/promotion/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const promotion = res.data.data;
      setPromotion(promotion);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };

  const handleAddNewPromotion = async (values) => {

    try {
      await restConnector.post("/admin/promotion/add",values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toastr.success("Thêm khuyến mãi thành công!")
      getPromotion()
    } catch (error) {

      toastr.error("thêm thất bại!");
    }
  };

  const handleUpdatePromotion = async (values) => {

    try {
      await restConnector.put("/admin/promotion/update",values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toastr.success("Sửa thành công")
      getPromotion()
    } catch (error) {

      toastr.error("Sửa thất bại!");
    }
  };

  const setPromotionEdit = async(data) =>{
    await setDataEdit(data);
    await setIsEdit(true);
  }

  const addPromotionModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm khuyến mãi</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: 0,
              start_date: "",
              end_date: "",
            }}
            onSubmit={handleAddNewPromotion}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="row">
                    <div className="col-6"><div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên khuyến mãi
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên khuyến mãi"
                      className="form-control"
                      type="text"
                    />
                  </div></div>
                    <div className="col-6"><div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Số phần trăm khuyến mãi
                    </label>
                    <Field
                      id="price"
                      name="price"
                      placeholder="Số phần trăm"
                      className="form-control"
                      type="number"
                    />
                  </div></div>
                  </div>
                  
                  
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="start_date"
                        >
                          Ngày bắt đầu
                        </label>
                        <Field
                          id="start_date"
                          name="start_date"
                          placeholder="Ngày bắt đầu"
                          className="form-control"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="start_date"
                        >
                          Ngày kết thúc
                        </label>
                        <Field
                          id="end_date"
                          name="end_date"
                          placeholder="Ngày kết thúc"
                          className="form-control"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Mô tả
                    </label>
                    <Field
                      id="description"
                      name="description"
                      placeholder="Mô tả"
                      className="form-control"
                      as="textarea"
                      rows="4"
                    />
                  </div>
                  
                  

                  <button
                    className="bg-pink px-4 py-3 rounded-3 border-0 text-white mt-3"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Thêm
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };

  const _viewDate = date => {

    const a = new Date(date)
    const b = new Date(0)
    if (a.getTime() !== b.getTime()) {
      var d = new Date(date)
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    } else {
      return ''
    }
  }

  const updatePromotionModal = () => {
    return (
      <Modal isOpen={isEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
          Cập nhập thông tin khuyến mãi
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id:dataEdit.id,
              name: dataEdit.name,
              description: dataEdit.description,
              price: dataEdit.price,
              start_date: moment(dataEdit.start_date).format("YYYY-MM-DD"),
              end_date: moment(dataEdit.end_date).format("YYYY-MM-DD"),
            }}
            onSubmit={handleUpdatePromotion}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                <div className="row">
                    <div className="col-6"><div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên khuyến mãi
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên khuyến mãi"
                      className="form-control"
                      type="text"
                    />
                  </div></div>
                    <div className="col-6"><div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Số phần trăm khuyến mãi
                    </label>
                    <Field
                      id="price"
                      name="price"
                      placeholder="Số phần trăm"
                      className="form-control"
                      type="number"
                    />
                  </div></div>
                  </div>
                  
                  
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="start_date"
                        >
                          Ngày bắt đầu
                        </label>
                        <Field
                          id="start_date"
                          name="start_date"
                          placeholder="Ngày bắt đầu"
                          className="form-control"
                          type="date"
                          // value={_viewDate(props.values.start_date)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="start_date"
                        >
                          Ngày kết thúc
                        </label>
                        <Field
                          id="end_date"
                          name="end_date"
                          placeholder="Ngày kết thúc"
                          className="form-control"
                          type="date"
                          // value={_viewDate(props.values.end_date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Mô tả
                    </label>
                    <Field
                      id="description"
                      name="description"
                      placeholder="Mô tả"
                      className="form-control"
                      as="textarea"
                      rows="4"
                    />
                  </div>
                  <button
                    className="bg-pink px-4 py-3 rounded-3 border-0 text-white mt-3"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Cập nhật
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="py-3">Khuyến mãi</h2>
        <div
          className="py-3 px-4 bg-pink text-white rounded-pill"
          style={{
            cursor: "pointer",
          }}
          onClick={() => setModal(true)}
        >
          Thêm khuyến mãi
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Mã</th>
            <th scope="col">Tên khuyến mãi</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Số phần trăm</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
          </tr>
        </thead>
        {promotion.length >0?<tbody>
          {promotion.length >0 && promotion.map((data,index)=>(
            <tr key={index} style={{ cursor: "pointer" }} onClick={() => setPromotionEdit(data)}>
            <th scope="row">{data.code}</th>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>{data.price}</td>
            <td>{moment(data.start_date).format('L')}</td>
            <td>{moment(data.end_date).format('L')}</td>
          </tr>
          )) }
        </tbody>:<div className="text-success mt-2">Đang lấy thông tin danh sách khuyến mãi vui lòng chờ...</div>}
        
      </table>
      {addPromotionModal()}
      {updatePromotionModal()}
    </>
  );
};

AdminGift.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default AdminGift;
