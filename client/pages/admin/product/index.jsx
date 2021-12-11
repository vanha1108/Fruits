import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import toastr from "toastr";
import Cookies from "js-cookie";

import Admin from "../../../layouts/Admin";
import restConnector from "../../../axios/configAxios";

const AdminProduct = () => {
  const [token] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);
  const [imageView, setImageView] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [productEdit, setProductEdit] = useState([]);
  const [category, setCategory] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const toggle = () => {
    setModal(!modal);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const togglePurchase = () => {
    setIsPurchase(!isPurchase);
  };
  useEffect(() => {
    getCategory();
    getProduct();
    getSupplier();
  }, []);
  const getProduct = async () => {
    try {
      const res = await restConnector.get("/admin/product/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const product = res.data.data;
      setProduct(product);
      setProductSelect(product[0]);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };
  const getCategory = async () => {
    try {
      const res = await restConnector.get("/admin/category/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const category = res.data.data;
      setCategory(category);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };
  const getSupplier = async () => {
    try {
      const res = await restConnector.get("/admin/supplier/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const supplier = res.data.data;
      setSupplier(supplier);
    } catch (error) {
      toastr.error("Lấy thông tin loại trái cây thất bại!");
    }
  };

  const handleAddNewProduct = async (values) => {
    const data = {
      id_supplier: values.supplier,
      id_category: values.type,
      name: values.name,
      image: imageView,
      short_description: "",
      long_description: values.description,
    };
    try {
      const res = await restConnector.post("/admin/product/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getProduct();
      toastr.success("Thêm thành công");
    } catch (error) {
      toastr.error(`${error}`);
      toastr.error("lỗi");
    }
  };

  const handleAddNewPurchase = async (values) => {
    try {
      const res = await restConnector.post(
        "/admin/product/purchase-cargo",
        listProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastr.success("Thêm thành công");
      getProduct();
    } catch (error) {
      toastr.error(`${error}`);
      toastr.error("lỗi");
    }
  };

  const onChangeValueImage = (data) => {
    if (data) {
      var reader = new FileReader();
      var a = document.querySelector(".imageView");

      reader.onload = function (e) {
        setImageView(e.target.result);
        a.src = e.target.result;
      }.bind(this);
      reader.readAsDataURL(data);
    }
  };

  const setAddListProduct = (values) => {
    const productFind = product.find((x) => x.id == values.name);

    if (productFind) {
      const valuesNew = {
        id: productFind.id,
        name: productFind.name,
        image: productFind.image,
        amount: values.quantity,
        purchase_price: values.purchasePrice,
        price: values.sellPrice,
      };
      const newList = [...listProduct, valuesNew];
      setListProduct(newList);
    }
  };

  const deleteProductImport = (id) => {
    const updateList = [...listProduct];
    const productIndex = updateList.findIndex((item) => item.id == id);

    updateList.splice(productIndex, 1);

    setListProduct(updateList);
  };
  const handleUpdateProduct = async (values) => {
    const data = {
      id: values.id,
      name: values.name,
      image: imageView,
      id_category: values.id_category,
      id_supplier: values.id_supplier,
      price: values.price,
      long_description: values.long_description,
    };
    try {
      const res = await restConnector.put("/admin/product/update", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastr.success("Sửa thành công");
      getProduct();
    } catch (error) {
      toastr.error(`${error}`);
      toastr.error("lỗi");
    }
  };

  const addProductModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm sản phẩm</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
              image: null,
              type: category[0],
              supplier: supplier[0],
              description: "",
            }}
            onSubmit={handleAddNewProduct}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="image"
                        >
                          Hình ảnh minh họa
                        </label>
                        <div className="gr-img">
                          <input
                            id="image"
                            name="image"
                            className="form-control fileupload"
                            type="file"
                            onChange={(event) => {
                              // props.setFieldValue(
                              //   "image",
                              //   converBase64Image(event.currentTarget.files[0])
                              // );
                              onChangeValueImage(event.currentTarget.files[0]);
                            }}
                          />
                          <img
                            className="imageView shadow-md"
                            alt="main-image"
                            src="/static/images/bo.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Tên trái cây
                        </label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Tên trái cây"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          Loại trái cây
                        </label>
                        <Field
                          id="type"
                          name="type"
                          placeholder="Loại trái cây"
                          className="form-control"
                          as="select"
                        >
                          {category.length > 0 &&
                            category.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          Nhà cung cấp
                        </label>
                        <Field
                          id="type"
                          name="supplier"
                          placeholder="Nhà cung cấp"
                          className="form-control"
                          as="select"
                        >
                          {supplier.length > 0 &&
                            supplier.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                        </Field>
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
                    </div>
                  </div>
                  <button
                    className="bg-pink px-4 py-3 rounded-3 border-0 text-white mt-3"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Thêm sản phẩm
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };

  const setChosePr = (id) => {
   
    const data = product.find(x => x.id == id);
    if (data) {
      setProductSelect(data);
    }
    return data
  };
  

  const purchaseModal = () => {
    return (
      <Modal isOpen={isPurchase} toggle={togglePurchase}>
        <ModalHeader toggle={togglePurchase}>Nhập hàng</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: productSelect.id,
              quantity: "",
              purchasePrice: productSelect.purchase_price,
              sellPrice: productSelect.price,
            }}
            onSubmit={handleAddNewPurchase}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          chọn trái cây
                        </label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Loại trái cây"
                          className="form-control"
                          as="select"
                          onChange={(event) => {
                            props.setFieldValue("name", event.target.value)
                            if(event.target.value){
                              setChosePr(event.target.value)
                              props.setFieldValue("purchasePrice", setChosePr(event.target.value).purchase_price)
                              props.setFieldValue("sellPrice", setChosePr(event.target.value).price)
                            }
                          }}
                        >
                          {product.length > 0 &&
                            product.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="quantity"
                        >
                          Số lượng
                        </label>
                        <Field
                          id="quantity"
                          name="quantity"
                          placeholder="Số lượng nhập"
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="sellPrice"
                        >
                          Giá bán
                        </label>
                        <Field
                          id="sellPrice"
                          name="sellPrice"
                          placeholder="Giá bán"
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="purchasePrice"
                        >
                          Giá nhập
                        </label>
                        <Field
                          id="purchasePrice"
                          name="purchasePrice"
                          placeholder="Giá nhập"
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-success px-4 py-3 rounded-3 border-0 text-white mt-3 d-inline"
                    style={{ cursor: "pointer" }}
                    onClick={() => setAddListProduct(props.values)}
                  >
                    Thêm sản phẩm nhập
                  </div>

                  <div className="w-100 mt-4">
                    <h4 className="my-3">Danh sách sản phẩm nhập:</h4>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Giá bán</th>
                          <th scope="col">Giá nhập</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listProduct.length > 0 &&
                          listProduct.map((data, index) => (
                            <tr key={index} style={{ cursor: "pointer" }}>
                              <th scope="row">
                                <img
                                  src={data.image}
                                  alt=""
                                  style={{
                                    height: "80px",
                                    width: "120px",
                                    objectFit: "cover",
                                  }}
                                />
                              </th>
                              <td>{data.name}</td>

                              <td>{data.amount} Kg</td>
                              <td>{data.price} đ/kg</td>
                              <td>{data.purchase_price} đ/kg</td>
                              <td
                                onClick={() => deleteProductImport(data.id)}
                                className="text-danger"
                              >
                                Xóa sản phẩm
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    className="bg-pink px-4 py-3 rounded-3 border-0 text-white mt-3"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Nhập hàng
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };

  const updateModal = () => {
    return (
      <Modal isOpen={isEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Cập nhập sản phẩm</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id: productEdit.id,
              name: productEdit.name,
              image: productEdit.image,
              amount: productEdit.amount,
              id_category: productEdit.id_category,
              id_supplier: productEdit.id_supplier,
              price: productEdit.price,
              long_description: productEdit.long_description,
            }}
            onSubmit={handleUpdateProduct}
          >
            {(props) => (
              <div className="w-full max-w-md">
                <Form onSubmit={props.handleSubmit} className="">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="image"
                        >
                          Hình ảnh minh họa
                        </label>
                        <div className="gr-img">
                          <input
                            id="image"
                            name="image"
                            className="form-control fileupload"
                            type="file"
                            onChange={(event) => {
                              props.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                              onChangeValueImage(event.currentTarget.files[0]);
                            }}
                          />
                          <img
                            className="imageView shadow-md"
                            alt="main-image"
                            src={props.values.image}
                          />
                          <div className="d-flex">
                            <button
                              className="bg-pink px-4 py-3 rounded-3 border-0 text-white mt-3 me-3"
                              type="submit"
                              disabled={props.isSubmitting}
                            >
                              Cập nhật
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Tên trái cây
                        </label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Tên trái cây"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          Loại trái cây
                        </label>
                        <Field
                          id="id_category"
                          name="id_category"
                          placeholder="Loại trái cây"
                          className="form-control"
                          as="select"
                        >
                          {category.length > 0 &&
                            category.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          Nhà cung cấp
                        </label>
                        <Field
                          id="id_supplier"
                          name="id_supplier"
                          placeholder="Nhà cung cấp"
                          className="form-control"
                          as="select"
                        >
                          {supplier.length > 0 &&
                            supplier.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="quantity"
                        >
                          Số lượng
                        </label>
                        <Field
                          id="amount"
                          name="amount"
                          placeholder="Số lượng nhập"
                          className="form-control"
                          type="text"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="price"
                        >
                          Giá bán
                        </label>
                        <Field
                          id="price"
                          name="price"
                          placeholder="Giá bán"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="description"
                        >
                          Mô tả
                        </label>
                        <Field
                          id="long_description"
                          name="long_description"
                          placeholder="Mô tả"
                          className="form-control"
                          as="textarea"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  };
  const viewCategory = (id) => {
    const categoryFind = category.find((x) => x.id == id);
    if (categoryFind) {
      return categoryFind.name;
    }
  };
  const setDataEditProduct = async (data) => {
    await setProductEdit(data);
    await setImageView(data.image);
    await setIsEdit(true);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="py-3">Sản phẩm</h2>
        <div className="d-flex">
          <div
            className="py-3 px-4 bg-pink text-white rounded-pill"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setModal(true)}
          >
            Thêm sản phẩm
          </div>
          <div
            className="ms-3 py-3 px-4 bg-success text-white rounded-pill"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setIsPurchase(true)}
          >
            Nhập hàng
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">SKU</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Tên</th>
            <th scope="col">Loại trái cây</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Giá bán</th>
            <th scope="col">Mô tả</th>
          </tr>
        </thead>
        {product.length > 0 ? (
          <tbody>
            {product.length > 0 &&
              product.map((data, index) => (
                <tr
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => setDataEditProduct(data)}
                >
                  <th className="text-uppercase" scope="row">
                    {data.code}
                  </th>
                  <th>
                    <img src={data.image} alt="" style={{ height: "100px" }} />
                  </th>
                  <td>{data.name}</td>
                  <td>{viewCategory(data.id_category)}</td>
                  <td>{data.amount} kg</td>
                  <td>{data.price} đ/kg</td>
                  <td>{data.long_description}</td>
                </tr>
              ))}
          </tbody>
        ) : (
          <div className="text-success mt-2">
            Đang lấy thông tin danh sách sản phẩm xin vui lòng chờ...
          </div>
        )}
      </table>
      {addProductModal()}
      {updateModal()}
      {purchaseModal()}
    </>
  );
};
AdminProduct.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};
export default AdminProduct;
