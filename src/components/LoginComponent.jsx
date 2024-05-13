import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import Typewriter from "typewriter-effect";
import TodoList from './TodoList';

function LoginComponent() {

    const [username, setUsername] = useState('Priyanshu')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
	<section className="" style={{ 
		background: 'rgba(224,224,224,1)', 
		// background: 'radial-gradient(circle, rgba(235,193,255,1) 7%, rgba(224,224,224,1) 64%, rgba(70,204,252,1) 98%)', 
		width: '100%',
		height: '100vh'
	  }}>
	{/* Jumbotron */}
	<div className="px-4 py-5 px-md-5 text-center text-lg-start">
		<div className="container">
			<div
				className="row gx-lg
  -5 align-items-center"
			>
				<div className="col-lg-6 mb-5 mb-lg-0">
					{/* <h1	style={{ color: "hsl(210, 29%, 25%)", fontSize : 85, textAlign: 'center' }}
					>  ToDo List 
						<span style={{ color: "hsl(218, 81%, 75%)" }}> For</span>
						
						<span style={{ color: "hsl(210, 29%, 25%)", marginLeft: 14 }}>
						
						</span>
					</h1> */}
					<h1	style={{ color: "hsl(210, 29%, 25%)", fontSize : 85, textAlign: 'center' }}
					>
					<Typewriter
						options={{
							strings: ["TODO List", "Tommorow List", "Bucket List", "Grocery List"],
							autoStart: true,
							loop: true,
							
						}}
						/>
						</h1>
					
				</div>
				<div className="col-lg-6 mb-5 mb-lg-0">
					<div className="card">
						<div className="card-body py-5 px-md-5">
							<div className="text-center">
								{" "}
								<h2
									className="fw-bold mb-5"
									style={{ color: "hsl(210, 29%, 25%)" }}
								>
									Time for Login Now!
								</h2>
								
							</div>

							<form>
								{/* 2 column grid layout with text inputs for the first and last names */}

								{/* Email input */}
								{/* Conditionally displaying */}

								{showErrorMessage && (
									<div
										className="errorMessage text-center"
										style={{ color: "#880808" }}
									>
										Authentication Failed. Please check your credentials.
									</div>
								)}
								<div data-mdb-input-init="" className="form-outline mb-4">
									<label className="form-label" htmlFor="form3Example3">
										Username
									</label>
									<input
										type="text"
										value={username}
										onChange={handleUsernameChange}
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
										value={password}
										onChange={handlePasswordChange}
										type="password"
										id="form3Example4"
										className="form-control"
									/>
								</div>

								{/* Submit button */}
								<div className="text-center">
								<button className = "btn btn-outline-primary btn-block mb-4" type="button" name="login" onClick={handleSubmit}>Login</button>
									
										
									
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</section>)
        	
    
}

export default LoginComponent