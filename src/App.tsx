import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogList from './features/blog-list';
import { Header } from './components';
import { Slide, ToastContainer } from 'react-toastify';

const BlogDetail = React.lazy(() => import('./features/blog-detail'));

function App() {
    return (
        <>
            <Router>
                <Header />
                <div className='container'>
                    <ToastContainer transition={Slide} position={'bottom-center'} autoClose={2000} />
                    <Suspense fallback={<span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>}>
                        <Routes>
                            <Route path='/' element={<Navigate to='/blogs' />} />
                            <Route element={<BlogList />} path='/blogs' />
                            <Route element={<BlogDetail isEdit />} path='blogs/:id' />
                            <Route element={<BlogDetail />} path='blogs/create' />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </>
    );
}

export default App;
