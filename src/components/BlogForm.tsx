import { FormikConfig, FormikErrors, useFormik } from 'formik';
import { Blog } from '../model';
import React, { ChangeEvent, RefObject, useRef } from 'react';

type Props = {
    blog?: Partial<Blog>;
    onSubmit: FormikConfig<Partial<Blog>>['onSubmit'];
    readOnly?: boolean;
    isEdit?: boolean;
};

function BlogForm({ blog = { content: '', title: '' }, onSubmit, readOnly, isEdit }: Props) {
    const { handleSubmit, handleChange, touched, errors, values, isSubmitting, setValues } = useFormik({
        initialValues: blog,
        onSubmit,
        enableReinitialize: true,
        validate: formValidator,
    });

    const isTitleInvalid = touched?.title && errors?.title;
    const isContentInvalid = touched.content && errors?.content;
    const isDisableSubmit =
        (blog.title === values.title && blog.content === values.content && blog.image?.url === values.image?.url) || isSubmitting;
    const inputFileRef = useRef();

    function onUploadImg(evt: ChangeEvent<HTMLInputElement>): void {
        if (!evt.target.files) {
            return;
        }
        const file = evt.target.files[0];
        const { image = {} } = values;
        const reader = new FileReader();
        reader.onload = e => {
            setValues({
                ...values,
                image: {
                    ...image,
                    url: e.target?.result as string,
                    file,
                } as Blog['image'],
            });
        };
        reader.readAsDataURL(file);
    }

    function isShowImg(): boolean {
        if (isEdit) {
            return true;
        }
        return values.image !== undefined;
    }

    function onInputClick(): void {
        (inputFileRef?.current as unknown as { click(): void })?.click();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    {isShowImg() ? (
                        <img
                            onClick={onInputClick}
                            style={{ width: 245, height: 234 }}
                            className='col-auto cursor-pointer'
                            src={values.image?.url}
                        />
                    ) : (
                        <div
                            onClick={onInputClick}
                            style={{ width: 245, height: 234 }}
                            className='cursor-pointer col-auto bg-light d-flex justify-content-center align-items-center'
                        >
                            <i className='bi bi-cloud-arrow-up p-3 h1' />
                        </div>
                    )}

                    <input
                        onChange={onUploadImg}
                        ref={inputFileRef as unknown as RefObject<HTMLInputElement>}
                        type={'file'}
                        accept='image/png, image/jpeg'
                        className='d-none'
                    />

                    <div className='col'>
                        <div className='mb-3'>
                            <label htmlFor='title' className='form-label'>
                                Title
                            </label>
                            <input
                                readOnly={readOnly}
                                value={values.title}
                                onChange={handleChange}
                                name='title'
                                className={'form-control'.concat(isTitleInvalid ? ' is-invalid' : '')}
                                id='title'
                            />
                            {isTitleInvalid ? (
                                <div id='title' className='invalid-feedback'>
                                    {errors.title}
                                </div>
                            ) : null}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='content' className={'form-label'.concat(isContentInvalid ? ' is-invalid' : '')}>
                                Content
                            </label>
                            <textarea
                                readOnly={readOnly}
                                value={values.content}
                                onChange={handleChange}
                                name='content'
                                className='form-control'
                                id='content'
                            />
                            {isContentInvalid ? (
                                <div id='content' className='invalid-feedback'>
                                    {errors.content}
                                </div>
                            ) : null}
                        </div>
                        <button disabled={isDisableSubmit} type='submit' className='btn btn-primary d-flex ml-auto'>
                            {isSubmitting ? (
                                <span className='spinner-border spinner-border-sm mr-2 my-auto' role='status' aria-hidden='true'></span>
                            ) : null}
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

function formValidator(values: Partial<Blog>): FormikErrors<Partial<Blog>> | undefined {
    const er: FormikErrors<Partial<Blog>> = {};
    if (!values.title) {
        er.title = 'Title is required';
    }
    if (!values.content) {
        er.content = 'Content is required';
    }
    return er;
}

export default BlogForm;
