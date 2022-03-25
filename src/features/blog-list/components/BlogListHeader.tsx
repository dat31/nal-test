import React from 'react';
import { Blog, QueryParams } from '../../../model';

type Props = {
    filter: QueryParams<Blog>;
    onFilterChange(query: QueryParams<Blog>): void;
    onCreateClick(evt: any): void;
    isDisabled: boolean;
};

const filterOptions: { key: keyof Blog; text: string }[] = [
    {
        text: 'Title',
        key: 'title',
    },
    {
        text: 'Content',
        key: 'content',
    },
    {
        text: 'Create time',
        key: 'created_at',
    },
    {
        text: 'Update time',
        key: 'updated_at',
    },
];

const SEARCH_DEBOUNCE_MS = 200;

function BlogListHeader({ filter, onFilterChange, onCreateClick, isDisabled }: Props) {
    const { sort_by, sort_direction, search = '' } = filter;
    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        setSearchValue(search);
    }, [search]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onFilterChange({ search: searchValue });
        }, SEARCH_DEBOUNCE_MS);
        return () => {
            clearTimeout(timeout);
        };
    }, [searchValue, onFilterChange]);

    return (
        <div className='form-row mb-3'>
            <div className='input-group col-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text' id='basic-addon1'>
                        <i className='bi bi-search'></i>
                    </span>
                </div>
                <input
                    disabled={isDisabled}
                    value={searchValue}
                    onChange={evt => {
                        setSearchValue(evt.target.value);
                    }}
                    type='text'
                    className='form-control'
                    placeholder='Search blog'
                    aria-describedby='basic-addon1'
                />
            </div>

            {filterOptions.map(({ key, text }) => {
                return (
                    <div key={key} className='col-auto'>
                        <div
                            className={'form-control '
                                .concat(sort_by === key ? ' border-primary text-primary' : '')
                                .concat(isDisabled ? ' cursor-not-allowed bg-light' : ' cursor-pointer')}
                            onClick={() =>
                                !isDisabled &&
                                onFilterChange({
                                    sort_by: key,
                                    sort_direction: filter.sort_direction === 'asc' ? 'desc' : 'asc',
                                })
                            }
                        >
                            {text}{' '}
                            {sort_by === key ? (
                                <i className={`ml-2 text-primary bi bi-sort-${sort_direction === 'asc' ? 'up' : 'down'}`} />
                            ) : null}
                        </div>
                    </div>
                );
            })}
            <div className='col-auto ml-auto'>
                <button onClick={onCreateClick} className='btn btn-primary'>
                    <i className='mr-2 bi bi-plus' />
                    Create Blog
                </button>
            </div>
        </div>
    );
}

export default BlogListHeader;
