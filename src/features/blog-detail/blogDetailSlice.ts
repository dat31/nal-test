import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIStatus, Blog } from '../../model';
import { getBlogById } from './blogDetailAPI';

type State = {
    status: APIStatus;
    blog?: Blog;
};

const initialState: State = {
    status: APIStatus.IDLE,
};

export const loadBlogDetail = createAsyncThunk('blogDetail', async (id: number) => {
    const { data } = await getBlogById(id);
    return data.data;
});

const blogDetailSlice = createSlice({
    name: 'blogDetail',
    initialState,
    reducers: {
        setBlog: (state, action) => {
            state.blog = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadBlogDetail.pending, state => {
                state.status = APIStatus.PENDING;
            })
            .addCase(loadBlogDetail.fulfilled, (state, action) => {
                state.status = APIStatus.SUCCESS;
                state.blog = action.payload;
            })
            .addCase(loadBlogDetail.rejected, state => {
                state.status = APIStatus.FAILURE;
            });
    },
});

export const { setBlog } = blogDetailSlice.actions;

export default blogDetailSlice.reducer;
