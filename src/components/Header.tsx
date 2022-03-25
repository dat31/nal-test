import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
    const l = useLocation();

    function getTitle() {
        if (!isNaN(parseInt(l.pathname.split('/')[l.pathname.split('/').length - 1]))) {
            return 'Edit Blog';
        }
        if (l.pathname.includes('create')) {
            return 'Create Blog';
        }
        return 'Blogs';
    }

    return (
        <div className='jumbotron jumbotron-fluid'>
            <div className='container'>
                <h1 className='display-4'>{getTitle()}</h1>
                <p className='lead'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor justo, maximus pellentesque ultricies sed,
                    facilisis eleifend lacus.
                </p>
            </div>
        </div>
    );
}

export default Header;
