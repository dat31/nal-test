import { AxiosResponse } from 'axios';
import { Blog } from '../../model';
import service from '../../service';

export function getBlogById(id: Blog['id']): Promise<AxiosResponse<{ data: Blog }>> {
    if (!id) {
        return Promise.reject();
    }
    return service.get(`/blogs/${id}`);
}

export async function createBlog(blog: Partial<Blog>): Promise<AxiosResponse<Blog>> {
    return service.post(`/blogs`, await mapBlogToFormData(blog as Blog), { headers: { 'Content-Type': 'multipart/form-data' } });
}

export async function updateBlog(blog: Partial<Blog>): Promise<void> {
    if (!blog?.id) {
        return Promise.reject();
    }
    return service.put(`/blogs/${blog.id}`, await mapBlogToFormData(blog as Blog), { headers: { 'Content-Type': 'multipart/form-data' } });
}

async function mapBlogToFormData(b: Blog): Promise<FormData> {
    const { content, title, image } = b;
    const formData = new FormData();
    formData.append('blog[title]', title as string);
    formData.append('blog[content]', content as string);
    if (!image) {
        return formData;
    }
    const { file } = image as any;
    if (!file) {
        return formData;
    }
    formData.append('blog[image]', file, (file as File).name);
    return formData;
}
