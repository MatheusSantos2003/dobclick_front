import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { ResponseModel } from "../../models/Response.model";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";




const apiURL = import.meta.env.VITE_APIURL;

const LoginPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const SubmitLoginForm = async (values: any) => {
  
    axios.post<ResponseModel<any>>(apiURL+"/usuarios/login",values).then((res)=>{
      if(res.data.success){
       
        // context.Login(values.email,values.login);
   
        toast.success(res.data.message ? res.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem('userToken', JSON.stringify(res.data.data));
       navigate("/Home");
      }else{
        toast.error(res.data.message ? res.data.message : "Sucesso!", {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })

  }

  const handleShowPassword = () =>{

    setShowPassword(!showPassword);

  }

  const handleRegister = () =>{
    navigate("/cadastro");
  }
  
  return (
    <div
      className=""
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#053259",
      }}
    >
      <div style={{marginTop:"20vh",marginBottom:"20vh"}} >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <div className=" w-100 " style={{margin: "auto"}}>
          <div className="col-md-6 mx-auto">
            <div className="card pt-3 px-3 rounded shadow-lg">
              <h1 className="mb-0 text-center">
                <strong>Login</strong>
              </h1>

              <div className="card-body pb-0 mb-0">
                <form onSubmit={handleSubmit(SubmitLoginForm)} className="form">
                  <div className="form-group">
                   
                        <label className="py-2 text-center" htmlFor="">
                          Email:{" "}
                        </label>
                    
                   
                        <input
                        {...register("email",{required:{value: false,message:"Necessário informar o Email"},pattern:{value:/[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/i,message:"Email Inválido!"}})}
                          name="email"
                          type="email"
                          className={`form-control rounded ${errors.email?.message != null ? "is-invalid" : ""}`}
                          required
                        />
                          {errors.email && <p className="text-danger">{errors.email.message}</p>}
                
                  </div>
                  <div className="form-group">
                   
                     
                        <label className="py-1 pe-5 " htmlFor="senha">
                          Senha:
                        </label>
                    
                    
                        <input
                        {...register("senha",{pattern:{value: /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,message:"Senha inválida! A Senha deve conter no mínimo 8 caracteres,sendo eles pelo menos 1 letra maiuscula, 1 letra minuscula, um numero e 1 caracter especial!"}})}
                          name="senha"
                          type={showPassword ? "text" : "password"}
                          className={`form-control rounded ${errors.senha?.message != null ? "is-invalid" : ""}`}
                          required
                        />
                         {errors.senha && <p className="text-danger">{errors.senha.message}</p>}
                    
                  </div>
                  <div className="pt-4 d-flex justify-content-center">
                    <button
                      className="btn btn-lg custom-login-btn"
                      type="submit"
                      style={{ backgroundColor: "#0b8ad9", color: "white" }}
                    >
                      <strong>Login</strong>
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-center">
                    <p className="fs-6">
                    <a onClick={handleRegister} style={{ cursor: "pointer" }}>  Não Tenha uma Conta?  Registre-se</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
