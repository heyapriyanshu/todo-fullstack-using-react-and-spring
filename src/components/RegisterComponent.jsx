import './RegisterComponent.css' 
import {useNavigate} from 'react-router-dom'
export default function RegisterComponent() {
  const navigate = useNavigate();
  function handleSubmit(){
    navigate(`/login`)
  }
	return (
    <>
    {/* Section: Design Block */}
    <section className="" >
      {/* Jumbotron */}
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        
      >
        <div className="container fixed-height">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 ">
            <h1
								className="my-5 display-5 fw-bold ls-tight"
								style={{ color: "hsl(210, 29%, 25%)" }}
							>
								ToDo List  <br />
								<span style={{ color: "hsl(218, 81%, 75%)" }}>
									for your 
								</span>
                <span style={{ color: "hsl(210, 29%, 25%)",  marginLeft : 14}}>
									 business
								</span>
							</h1>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
              
                <div className="card-body py-5 px-md-5 text-center upper-layer">
                <h2 className="fw-bold mb-5" style={{ color: "hsl(210, 29%, 25%)" }} >Register Now!</h2>
                  <form>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example1">
                            First name
                          </label>
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                          />
                         
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init="" className="form-outline">
                        <label className="form-label" htmlFor="form3Example2">
                            Last name
                          </label>
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                          />
                         
                        </div>
                      </div>
                    </div>
                    {/* Email input */}
                    <div data-mdb-input-init="" className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                      />
                   
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init="" className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                      />
                     
                    </div>
          
                   
                    {/* Submit button */}
                    <button
                      type="submit"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-outline-primary btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                   
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Jumbotron */}
    </section>
    {/* Section: Design Block */}
  </>
  
	);
}
