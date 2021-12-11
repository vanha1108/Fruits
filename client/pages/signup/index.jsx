import React, { useState } from "react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import toastr from "toastr";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const handleSignup = async (values) => {
    if (values.passwordRE !== values.confirmPassword) {
      toastr.error("Nhập lại mật khẩu không đúng");
    } else {
      let newSex = true;
      if (values.sex === "FEMALE") {
        newSex = false;
      }
      const data = {
        username: values.usernameRE,
        password: values.passwordRE,
        first_name: values.firstName,
        last_name: values.lastName,
        sex: newSex,
        dob: values.dob,
        phone_number: values.phone,
        address: values.address,
        email: values.email,
      };

      try {
        await axios.post(
          "https://4388-14-186-59-143.ngrok.io/rest/signup-new",
          data
        );
        toastr.success("Đăng ký thành công!");
        router.replace("/login");
      } catch (error) {
        toastr.error("Thêm thất bại!");
      }
    }
  };
  return (
    <div
      className="min-vh-100 justify-content-center align-items-center d-flex"
      style={{
        backgroundImage: 'url("/static/images/banner-list-product.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-75 p-5 row">
        <div className="col-5 pe-0">
          <img className="w-100 h-100" src="/static/images/bo.jpg" alt="" />
        </div>
        <div className="col-7 ps-0 bg-white">
          <div className="h-100 w-100 p-3">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div className="h-100 w-100">
                <div className="card-body text-center">
                  <h3 className="mb-5">Đăng ký tài khoản!</h3>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      sex: "MALE",
                      address: "",
                      dob: "",
                      phone: "",
                      usernameRE: "",
                      passwordRE: "",
                      confirmPassword: "",
                    }}
                    onSubmit={handleSignup}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <div className="form-outline mb-4">
                              <Field
                                type="text"
                                name="firstName"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="First Name"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-outline mb-4">
                              <Field
                                type="text"
                                name="lastName"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="Last Name"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <Field
                            type="text"
                            name="email"
                            className="form-control form-control-lg rounded-pill fs-6"
                            placeholder="Email Address"
                            style={{
                              paddingBottom: "0.7rem",
                              paddingTop: "0.7rem",
                            }}
                          />
                        </div>

                        <div className="mb-4 text-start">
                          <div role="group" aria-labelledby="my-radio-group">
                            <label className="me-4">
                              <Field
                                className="me-2"
                                type="radio"
                                name="sex"
                                value="MALE"
                              />
                              Nam
                            </label>
                            <label>
                              <Field
                                className="me-2"
                                type="radio"
                                name="sex"
                                value="FEMALE"
                              />
                              Nữ
                            </label>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <Field
                            type="text"
                            name="address"
                            className="form-control form-control-lg rounded-pill fs-6"
                            placeholder="Nhập địa chỉ"
                            style={{
                              paddingBottom: "0.7rem",
                              paddingTop: "0.7rem",
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-outline mb-4">
                              <Field
                                type="text"
                                name="phone"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="Nhập số điện thoại"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-outline mb-4">
                              <Field
                                type="date"
                                name="dob"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="Nhập ngày sinh"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <Field
                            type="text"
                            name="usernameRE"
                            className="form-control form-control-lg rounded-pill fs-6"
                            placeholder="Nhập tài khoản đăng ký"
                            style={{
                              paddingBottom: "0.7rem",
                              paddingTop: "0.7rem",
                            }}
                          />
                        </div>

                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <div className="form-outline mb-4">
                              <Field
                                type="password"
                                name="passwordRE"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="nhập mật khẩu đăng ký"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-outline mb-4">
                              <Field
                                type="password"
                                name="confirmPassword"
                                className="form-control form-control-lg rounded-pill fs-6"
                                placeholder="Reapeat Password"
                                style={{
                                  paddingBottom: "0.7rem",
                                  paddingTop: "0.7rem",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-lg w-100 rounded-pill fs-6"
                          type="submit"
                        >
                          Đăng ký
                        </button>
                        <hr className="my-4" />
                        <div className="d-flex flex-column">
                          <Link className="text-decoration-none" href="/login">
                            Bạn đã có tài khoản? Đăng nhập!
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
