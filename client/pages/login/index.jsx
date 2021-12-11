import React from "react";
import Link from "next/link";
import axios from "axios"
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { Formik, Field, Form } from "formik";
import toastr from "toastr";
import restConnector from "../../axios/configAxios";
const BASE_URL = process.env.BASE_API_URL
const test = process.env.NEXT_PUBLIC_GAID

const Login = () => {

  const router = useRouter();
  const handleLogin = async(values) => {
    
    try {
      
      const res = await restConnector.post('/login',values);
      
      const user = res.data;
      
      Cookies.set('token',user.data.token)
     
      const role = user.data.roles[0]
      
      if(role === "ADMIN"){
        router.replace('/admin')
      }
      else{
        router.replace('/')
      }
      toastr.success('Đăng nhập thành công')
    } catch (error) {
      toastr.error(`${error}`)
      toastr.error('Sai tài khoản hoặc mật khẩu')
    }
    
  };
  return (
    <div
      className="p-5 min-vh-100 justify-content-center align-items-center d-flex"
      style={{
        backgroundImage: 'url("/static/images/banner-list-product.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-75 p-5 row">
        <div className="col-6 pe-0">
          <img
            className="w-100 h-100"
            src="/static/images/dau-tay.jpg"
            alt=""
          />
        </div>
        <div className="col-6 ps-0 bg-white">
          <div className="h-100 w-100 p-5">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div className="h-100 w-100">
                <div className="card-body text-center">
                  <h3 className="mb-5">Chào mừng bạn quay trở lại!</h3>
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    onSubmit={handleLogin}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <div className="form-outline mb-4">
                          <Field
                            id="username"
                            type="text"
                            name="username"
                            className="form-control form-control-lg rounded-pill fs-6"
                            placeholder="Tài khoản"
                            style={{
                              paddingBottom: "0.7rem",
                              paddingTop: "0.7rem",
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <Field
                            id="password"
                            type="password"
                            name="password"
                            className="form-control form-control-lg rounded-pill fs-6"
                            placeholder="Mật khẩu"
                            style={{
                              paddingBottom: "0.7rem",
                              paddingTop: "0.7rem",
                            }}
                          />
                        </div>
                        <button
                          className="btn btn-primary btn-lg w-100 rounded-pill fs-6"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                        <hr className="my-4" />
                        <div className="d-flex flex-column">
                          <Link className="text-decoration-none" href="/signup">
                            Đăng ký tài khoản mới!
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  {/* <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg rounded-pill fs-6"
                      placeholder="Tài khoản"
                      style={{
                        paddingBottom: "0.7rem",
                        paddingTop: "0.7rem",
                      }}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg rounded-pill fs-6"
                      placeholder="Mật khẩu"
                      style={{
                        paddingBottom: "0.7rem",
                        paddingTop: "0.7rem",
                      }}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
