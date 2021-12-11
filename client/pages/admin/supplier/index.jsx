import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import toastr from "toastr";
import Cookies from "js-cookie";

import Admin from "../../../layouts/Admin";

const Supplier = () => {
  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [dataEditSupplier, setDataEditSupplier] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/supplier/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const supplier = res.data.data;
      setSupplier(supplier);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };

  const setDataEdit = async (data) => {
    await setDataEditSupplier(data);
    await setIsEdit(true);
  };

  const handleAddNewCategory = async (values) => {
    try {
      const res = await axios.post(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/supplier/add",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastr.success("Thêm loại trái cây thành công!");
      getData();
    } catch (error) {
      toastr.error("Thêm thất bại!");
    }
  };

  const handleUpdateCategory = async (values) => {
    try {
      const res = await axios.put(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/supplier/update",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toastr.success("Sửa loại trái cây thành công!");
      getData();
    } catch (error) {
      toastr.error("Sửa thất bại!");
    }
  };

  const addCategoryModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm nhà cung cấp mới</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              phone_number: "",
              address: "",
            }}
            onSubmit={handleAddNewCategory}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên nhà cung cấp
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên nhà cung cấp"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Số điện thoại
                    </label>
                    <Field
                      id="phone_number"
                      name="phone_number"
                      placeholder="Số điện thoại nhà cung cấp"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Địa chỉ
                    </label>
                    <Field
                      id="address"
                      name="address"
                      placeholder="Địa chỉ nhà cung cấp"
                      className="form-control"
                      type="text"
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

  const updateCategoryModal = () => {
    return (
      <Modal isOpen={isEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
          Cập nhập thông tin nhà cung cấp
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id: dataEditSupplier.id,
              name: dataEditSupplier.name,
              phone_number: dataEditSupplier.phone_number,
              address: dataEditSupplier.address,
            }}
            onSubmit={handleUpdateCategory}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên nhà cung cấp
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên nhà cung cấp"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Số điện thoại
                    </label>
                    <Field
                      id="phone_number"
                      name="phone_number"
                      placeholder="Số điện thoại nhà cung cấp"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Địa chỉ
                    </label>
                    <Field
                      id="address"
                      name="address"
                      placeholder="Địa chỉ nhà cung cấp"
                      className="form-control"
                      type="text"
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
        <h2 className="py-3">Nhà cung cấp</h2>
        <div
          className="py-3 px-4 bg-pink text-white rounded-pill"
          style={{
            cursor: "pointer",
          }}
          onClick={() => setModal(true)}
        >
          Thêm nhà cung cấp
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Mã</th>
            <th scope="col">Tên nhà cung cấp</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Địa chỉ</th>
          </tr>
        </thead>
        {supplier.length > 0 ? (
          <tbody>
            {supplier.length > 0 &&
              supplier.map((data, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => setDataEdit(data)}
                >
                  <th scope="row">{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.address}</td>
                </tr>
              ))}
          </tbody>
        ) : (
          <div className="text-success mt-2">
            Đang lấy thông tin nhà cung cấp vui lòng chờ...
          </div>
        )}
      </table>
      {addCategoryModal()}
      {updateCategoryModal()}
    </>
  );
};
Supplier.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default Supplier;
