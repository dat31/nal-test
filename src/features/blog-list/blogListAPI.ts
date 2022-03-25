import service from '../../service';
import { Blog, PaginatedRes } from '../../model';
import { AxiosResponse } from 'axios';

export function getBlogs(query: string): Promise<AxiosResponse<PaginatedRes<Blog>>> {
    return service.get('blogs'.concat(query ? `?${query}` : ``));
}
