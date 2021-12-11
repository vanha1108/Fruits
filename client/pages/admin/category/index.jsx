import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import toastr from "toastr";
import Cookies from "js-cookie";

import Admin from "../../../layouts/Admin";

const BASE_URL = process.env.BASE_URL

const AdminCategory = () => {

  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState([]);
  const [dataEditCategory,setDataEditCategory] = useState([])

  

  useEffect(() => {
    getData();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const getData = async () => {
    try {

      const res = await axios.get(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/category/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const category = res.data.data;
      setCategory(category);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };

  const setDataEdit = async (data) =>{

    await setDataEditCategory(data)
    await setIsEdit(true)
  }

  const handleAddNewCategory = async (values) => {
    try {
      await axios.post(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/category/add",
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
      await axios.put(
        "https://4388-14-186-59-143.ngrok.io/rest/admin/category/update",
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
        <ModalHeader toggle={toggle}>Thêm loại trái cây mới</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
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
                      Tên loại trái cây
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên loại trái cây"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  {/* <div className="mb-4">
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
                  </div> */}
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
          Cập nhập thông tin loại trái cây
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id:dataEditCategory.id,
              name: dataEditCategory.name,
              
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
                      Tên loại trái cây
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Tên loại trái cây"
                      className="form-control"
                      type="text"
                    />
                  </div>
                  {/* <div className="mb-4">
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
                  </div> */}
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
        <h2 className="py-3">Loại trái cây</h2>
        <div
          className="py-3 px-4 bg-pink text-white rounded-pill"
          style={{
            cursor: "pointer",
          }}
          onClick={() => setModal(true)}
        >
          Thêm loại trái cây
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Mã</th>
            <th scope="col">Tên thể loại</th>
          </tr>
        </thead>
        {category.length>0?<tbody>
          {category.length > 0 &&
            category.map((data, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => setDataEdit(data)}
              >
                <th scope="row">{data.id}</th>
                <td>{data.name}</td>
              </tr>
            ))}
        </tbody>:<div className="text-success mt-2">Đang lấy danh sách loại trái cây vui lòng đợi...</div>}
        
      </table>
      {addCategoryModal()}
      {updateCategoryModal()}
    </>
  );
};
AdminCategory.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default AdminCategory;
