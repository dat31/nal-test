import { FormikConfig, FormikHelpers } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import BlogForm from '../../components/BlogForm';
import { APIStatus, Blog } from '../../model';
import { createBlog, updateBlog } from './blogDetailAPI';
import { loadBlogDetail, setBlog } from './blogDetailSlice';

type Props = {
    isEdit?: boolean;
};

function BlogDetail({ isEdit }: Props) {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const blog = useAppSelector(state => state.blogDetail.blog);
    const isPending = useAppSelector(state => state.blogDetail.status === APIStatus.PENDING);
    React.useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(loadBlogDetail(parseInt(id)));
    }, [id]);

    function onSubmit(
        blog: Partial<Blog>,
        formikHelpers: FormikHelpers<Partial<Blog>>,
    ): ReturnType<FormikConfig<Partial<Blog>>['onSubmit']> {
        if (blog.id) {
            return updateBlog(blog)
                .then(() => {
                    toast.success('Update success');
                    dispatch(setBlog(blog));
                })
                .catch(() => {
                    toast.error('Update failure');
                });
        }
        return createBlog(blog)
            .then(res => {
                toast.success('Create success');
                formikHelpers.resetForm();
                dispatch(setBlog(res.data));
            })
            .catch(() => {
                toast.error('Create failure');
            });
    }

    if (!id && isEdit) {
        return <div>Blog does not existed</div>;
    }

    if (isPending) {
        return <div className='text-muted'>Loading</div>;
    }

    return <BlogForm blog={isEdit ? blog : undefined} onSubmit={onSubmit} isEdit={isEdit} />;
}

export default BlogDetail;
