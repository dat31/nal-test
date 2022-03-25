import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { APIStatus, Blog, Pagination, QueryParams } from '../../model';
import { getBlogs } from './blogListAPI';

type State = {
    data: Blog[];
    pagination: Partial<Pagination>;
    status: APIStatus;
    queryParams: QueryParams<Blog>;
};

const initialState: State = {
    data: [],
    status: APIStatus.IDLE,
    pagination: {
        page: 1,
    },
    queryParams: {
        sort_by: 'title',
        sort_direction: 'asc',
    },
};

export const loadBlogs = createAsyncThunk('blogs', async (params: (Partial<Pagination> & QueryParams<Blog>) | undefined) => {
    const res = await getBlogs(new URLSearchParams(params as URLSearchParams).toString());
    const {
        data: { items },
        pagination,
    } = res.data;
    return {
        blogs: items,
        pagination,
    };
});

const blogListSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.pagination.page = action.payload.page;
        },
        filter: (state, action) => {
            Object.keys(action.payload as QueryParams<Blog>).forEach((k: string) => {
                state.queryParams[k as keyof QueryParams<Blog>] = action.payload[k];
            });
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadBlogs.fulfilled, (state, action) => {
                const { blogs, pagination } = action.payload;
                state.data = blogs;
                state.pagination = pagination;
                state.status = APIStatus.IDLE;
            })
            .addCase(loadBlogs.rejected, state => {
                state.status = APIStatus.FAILURE;
            })
            .addCase(loadBlogs.pending, state => {
                state.status = APIStatus.PENDING;
            });
    },
});

export const selectBlogsState = (state: RootState) => state.blogs;

export const { changePage, filter } = blogListSlice.actions;

export default blogListSlice.reducer;
