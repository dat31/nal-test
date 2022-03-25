import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { APIStatus, Blog, QueryParams } from '../../model';
import { changePage, loadBlogs, filter } from './blogListSlice';
import BlogItem from './components/BlogItem';
import './blogList.css';
import { Pagination } from '../../components';
import BlogListHeader from './components/BlogListHeader';

function BlogList() {
    const dispatch = useAppDispatch();
    const blogs = useAppSelector(state => state.blogs.data);
    const pagination = useAppSelector(state => state.blogs.pagination);
    const currentPage = useAppSelector(state => state.blogs.pagination.page);
    const query = useAppSelector(state => state.blogs.queryParams);
    const isPending = useAppSelector(state => state.blogs.status === APIStatus.PENDING);
    const isIdle = useAppSelector(state => state.blogs.status === APIStatus.IDLE);
    const isFailure = useAppSelector(state => state.blogs.status === APIStatus.FAILURE);

    const nav = useNavigate();

    React.useEffect(() => {
        dispatch(loadBlogs({ page: currentPage, ...query }));
    }, [currentPage, query]);

    function onItemClick(id: Blog['id']) {
        nav(`/blogs/${id}`);
    }

    function handlePageChange(page: number): void {
        dispatch(changePage({ page }));
    }

    const handleFilter = React.useCallback(
        (f: QueryParams<Blog>) => {
            dispatch(filter(f));
        },
        [dispatch],
    );

    function handleCreateClick() {
        nav('/blogs/create');
    }

    function renderBlogs() {
        if (isPending) {
            return Array.from(new Array(10).keys()).map(k => (
                <div key={k} className='media pt-3 pb-3 pr-3'>
                    <div className='mr-3 skeleton skeleton-img' />
                    <div className='media-body'>
                        <h5 className='mt-0 mb-2 skeleton skeleton-title'></h5>
                        <div className='skeleton skeleton-subtitle' />
                    </div>
                </div>
            ));
        }
        if (isIdle && blogs.length === 0 && typeof query.search === 'string' && query.search !== '') {
            return 'Not result match '.concat(query.search);
        }
        if (isIdle && blogs.length === 0) {
            return 'Blog is empty';
        }

        if (isFailure) {
            return 'An error occurred';
        }
        return blogs?.map(b => <BlogItem blog={b} key={b.id} onClick={onItemClick} />);
    }

    return (
        <>
            <BlogListHeader
                isDisabled={isPending || isFailure}
                onCreateClick={handleCreateClick}
                filter={query}
                onFilterChange={handleFilter}
            />
            {renderBlogs()}
            {(pagination.count || 0) > 20 ? <Pagination pagination={pagination} onPageChange={handlePageChange} /> : null}
        </>
    );
}

export default BlogList;
