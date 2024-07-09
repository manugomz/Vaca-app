import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Expenses from './pages/Expenses';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import GroupDetails from './pages/GroupDetails';
import Home from './pages/Home';
import Register from './pages/Register';

import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

import { registerAxiosInterceptors } from './interceptors/HttpInterceptor';
import UserInformation from './pages/UserInformaiton';

const Login = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import('./pages/Login')), 1000);
    });
});

function App() {
    useEffect(() => {
        registerAxiosInterceptors();
    }, []);
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/gastos" element={<ProtectedRoute Component={Expenses} />} />
                    <Route path="/amigos" element={<ProtectedRoute Component={Friends} />} />
                    <Route path="/grupos" element={<ProtectedRoute Component={Groups} />} />
                    <Route
                        path="/grupos/:id"
                        element={<ProtectedRoute Component={GroupDetails} />}
                    />
                    <Route path="/" element={<ProtectedRoute Component={Home} />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/user-info"
                        element={<ProtectedRoute Component={UserInformation} />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
