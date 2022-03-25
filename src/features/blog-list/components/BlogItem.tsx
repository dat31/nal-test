import React from 'react';
import { Blog } from '../../../model';

type Props = {
    blog: Blog;
    onClick(id: Blog['id']): void;
};

function BlogItem({ blog, onClick }: Props) {
    const { title, content, image, id } = blog;

    return (
        <div onClick={() => onClick(id)} className='media pt-3 pb-3 pr-3' style={{ cursor: 'pointer' }}>
            <img width={64} height={64} src={image.url} className='mr-3' alt='Blog image' />
            <div className='media-body'>
                <h5 className='mt-0 mb-1'>{title}</h5>
                {content}
            </div>
        </div>
    );
}

export default BlogItem;
