import "./LoginPage.css";
const LoginPage = () => {
  return (
    // background:red;
    // position:absolute;
    // top:0px;
    // right:0px;
    // bottom:0px;
    // left:0px;
    <div className="" style={{position: "absolute",top:0,right:0,bottom:0,left:0,backgroundColor:"#053259"}}>
        <div className="login-form">
        <div className="row py-5 mx-auto  ">
        <div className="col-md-6 mx-auto">
          <div className="card p-3 rounded shadow-lg">
         
              <h1 className="mb-0 text-center">Login</h1>
         
            <div className="card-body">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control rounded-0"
                    required
                  />
                </div>
                <button className="btn btn-success float-right">Login</button>
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
