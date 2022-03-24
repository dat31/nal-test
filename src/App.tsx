import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './features/blog-list';
import BlogDetail from './features/blog-detail';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<BlogList />} path='/' />
                <Route element={<BlogDetail />} path='/detail' />
            </Routes>
        </Router>
    );
}

export default App;
