import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blogs from '../features/blog-list/blogListSlice';
import blogDetail from '../features/blog-detail/blogDetailSlice';

export const store = configureStore({
    reducer: {
        blogs,
        blogDetail,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
