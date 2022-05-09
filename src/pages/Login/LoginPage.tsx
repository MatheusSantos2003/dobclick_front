import { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";





const LoginPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword,setShowPassword] = useState(false);
  const SubmitLoginForm = async (values: any) => {
  
    console.log(values);

  }

  const handleShowPassword = () =>{

    setShowPassword(!showPassword);

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
      <div className="login-form">
        <div className="row py-5 mx-auto  ">
          <div className="col-md-6 mx-auto">
            <div className="card pt-3 px-3 rounded shadow-lg">
              <h1 className="mb-0 text-center">
                <strong>Login</strong>
              </h1>

              <div className="card-body pb-0 mb-0">
                <form onSubmit={handleSubmit(SubmitLoginForm)} className="form">
                  <div className="form-group">
                    <div className="row my-2">
                      <div className="col-md-1 col-lg-1 col-sm-12">
                        <label className="py-2 text-center" htmlFor="">
                          Email:{" "}
                        </label>
                      </div>
                      <div className="col-md-9 col-lg-9 col-sm-12">
                        <input
                        {...register("email",{required:{value: false,message:"Necessário informar o Email"},pattern:{value:/[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/i,message:"Email Inválido!"}})}
                          name="email"
                          type="text"
                          className={`form-control rounded ${errors.email?.message != null ? "is-invalid" : ""}`}
                          required
                        />
                          {errors.email && <p className="text-danger">{errors.email.message}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row my-2">
                      <div className="col-md-1 col-lg-1 col-sm-12">
                        <label className="py-2 " htmlFor="senha">
                          Senha:
                        </label>
                      </div>
                      <div className="col-md-9 col-lg-9 col-sm-12">
                        <input
                        {...register("senha",{pattern:{value: /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,message:"Senha inválida"}})}
                          name="senha"
                          type={showPassword ? "text" : "password"}
                          className={`form-control rounded ${errors.senha?.message != null ? "is-invalid" : ""}`}
                          required
                        />
                         {errors.senha && <p className="text-danger">{errors.senha.message}</p>}
                        <div className="pt-3">
                          <a style={{ cursor: "pointer" }}>Esqueceu a Senha?</a>
                        </div>
                      </div>
                      <div className="col-md-1 col-lg-1 col-sm-12">
                        <button onClick={handleShowPassword}  type="button" className="btn btn-sm btn-primary">V</button>
                      </div>
                    </div>
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
                    <a style={{ cursor: "pointer" }}>  Não Tenha uma Conta?  Registre-se</a>
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
