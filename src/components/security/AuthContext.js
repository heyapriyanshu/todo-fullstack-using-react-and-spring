import { createContext, useContext, useState } from "react";
import { apiClient } from "../../api/ApiClient";
// import { executeJwtAuthenticationService } from "../../api/AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState('')

    const [token, setToken] = useState(null)
    
    const [firstName, setFirstName] = useState('');
/* JWT
            // const response = await executeJwtAuthenticationService(username, password)

            // if(response.status===200){
                
            //     const jwtToken = 'Bearer ' + response.data.token
                
            //     setAuthenticated(true)
            //     setUsername(username)
            //     // setToken(jwtToken)

            //     apiClient.interceptors.request.use(
            //         (config) => {
            //             console.log('intercepting and adding a token')
            //             config.headers.Authorization = jwtToken
            //             return config
            //         }
            //     )

            //     return true 
*/
    async function login(email, password) {
        try {
            const response = await apiClient.post("/api/users/login", { email, password });
    
            if (response.status === 200) {
                const { firstName } = response.data;  // Extract first name from response
                setAuthenticated(true);
                setUsername(email);
                setFirstName(firstName);  // Store first name in state
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    }

    async function register(userData) {

        try {

           const response = await apiClient.post("/api/users/register",userData)
            if(response.status === 200){
                console.log("return true")
                return true
            }           
            else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }



    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login,register, logout, firstName,username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 
