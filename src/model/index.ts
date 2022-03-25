export type Blog = {
    id: number;
    title: string;
    content: string;
    image: {
        url: string;
    };
    created_at: string;
    updated_at: string;
};

export type Pagination = {
    count: number;
    page: number;
    offset: number;
    total: number;
    prev: number;
    next: number;
};

export type PaginatedRes<T> = {
    data: { items: T[] };
    pagination: Pagination;
};

export type QueryParams<T> = {
    search?: string;
    sort_by?: keyof T;
    sort_direction?: 'asc' | 'desc';
};

export enum APIStatus {
    IDLE,
    PENDING,
    FAILURE,
    SUCCESS,
}
