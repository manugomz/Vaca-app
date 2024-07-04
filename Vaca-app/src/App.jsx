import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Expenses from './pages/Expenses';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import GroupDetails from './pages/GroupDetails';

import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import { registerAxiosInterceptors } from './interceptors/HttpInterceptor';


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
                    <Route path="/amigos" element={<ProtectedRoute Component={Friends} />} />
                    <Route path="/gastos" element={<ProtectedRoute Component={Expenses} />} />
                    <Route path="/grupos" element={<ProtectedRoute Component={Groups} />} />
                    <Route
                        path="/grupos/:id"
                        element={<ProtectedRoute Component={GroupDetails} />}
                    />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
