import './TodoApp.css'

import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import UpdateTodoComponent from './UpdateTodoComponent'
import RegisterComponent from './RegisterComponent'
import FooterComponent from './FooterComponent'

  

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AuthProvider, { useAuth } from './security/AuthContext'



function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    
                    <Routes>
                    <Route path='/register' element={<RegisterComponent />}></Route>
                <Route path='/' element={<LoginComponent />}></Route>
                <Route path='/login' element={<LoginComponent />}></Route>
                        
                        <Route path='/welcome' element={
                            <AuthenticatedRoute>
                                <HeaderComponent />
                                <WelcomeComponent />
                                <FooterComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <HeaderComponent />
                                <ListTodosComponent />
                                <FooterComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <HeaderComponent />
                                  <UpdateTodoComponent />
                                <FooterComponent />
                            </AuthenticatedRoute>
                               }
                          />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <HeaderComponent />
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='*' element={<ErrorComponent />}></Route>

                    </Routes>
                </BrowserRouter>
                {/* <LoginComponent /> */}
                {/* <WelcomeComponent /> */}
            </AuthProvider>
        </div>

    )
}

