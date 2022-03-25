import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogList from './features/blog-list';
import BlogDetail from './features/blog-detail';
import { Header } from './components';
import { Slide, ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Router>
                <Header />
                <div className='container'>
                    <ToastContainer transition={Slide} position={'bottom-center'} />
                    <Routes>
                        <Route path='/' element={<Navigate to='/blogs' />} />
                        <Route element={<BlogList />} path='/blogs' />
                        <Route element={<BlogDetail isEdit />} path='blogs/:id' />
                        <Route element={<BlogDetail />} path='blogs/create' />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
