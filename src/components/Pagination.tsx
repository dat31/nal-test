import React from 'react';
import { Pagination as Ipagination } from '../model';

type Props = {
    pagination?: Partial<Ipagination>;
    onPageChange(p: number): void;
};

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

function Pagination({ pagination, onPageChange }: Props) {
    const pages = getPageNumbers(pagination);
    const { page = 1 } = pagination || {};
    const pageNeighbours = 1;

    function moveLeft(): void {
        onPageChange(page - pageNeighbours * 2 - 1);
    }

    function moveRight(): void {
        onPageChange(page + pageNeighbours * 2 + 1);
    }

    return (
        <nav aria-label='Page navigation example'>
            <ul className='pagination'>
                {pages.map((p, i) => {
                    if (p === LEFT_PAGE) {
                        return (
                            <li onClick={moveLeft} key={i} className='page-item cursor-pointer'>
                                <div className='page-link'>Previous</div>
                            </li>
                        );
                    }

                    if (p === RIGHT_PAGE) {
                        return (
                            <li onClick={moveRight} key={i} className='page-item cursor-pointer'>
                                <div className='page-link'>Next</div>
                            </li>
                        );
                    }

                    return (
                        <li
                            onClick={() => {
                                onPageChange(p as number);
                            }}
                            key={i}
                            className='page-item cursor-pointer'
                        >
                            <div className={'page-link'.concat(page === p ? ' bg-primary text-white' : '')}>{p}</div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function getPageNumbers(p: Partial<Ipagination> | undefined): (number | string)[] {
    const { total = 0, page = 1 } = p || {};
    const pageNeighbours = 1;
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (total > totalBlocks) {
        let pages = [];

        const leftBound = page - pageNeighbours;
        const rightBound = page + pageNeighbours;
        const beforeLastPage = total - 1;

        const startPage = leftBound > 2 ? leftBound : 2;
        const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

        pages = range(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;

        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

        const leftSpillPage = LEFT_PAGE;
        const rightSpillPage = RIGHT_PAGE;

        if (leftSpill && !rightSpill) {
            const extraPages = range(startPage - singleSpillOffset, startPage - 1);
            pages = [leftSpillPage, ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
            const extraPages = range(endPage + 1, endPage + singleSpillOffset);
            pages = [...pages, ...extraPages, rightSpillPage];
        } else if (leftSpill && rightSpill) {
            pages = [leftSpillPage, ...pages, rightSpillPage];
        }

        return [1, ...pages, total];
    }

    return range(1, total);
}

function range(from: number, to: number, step = 1): (number | string)[] {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

export default Pagination;
