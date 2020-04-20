import React from "react";

export default ({pagesCount, currentPage, setPage}) => {
    const [pages, setPages] = React.useState([]);

    React.useEffect(() => {
        prepareButtons()
    }, [currentPage, pagesCount])

    const prepareButtons = () => {
        if (pagesCount >= 9) {
            if (currentPage <= 4) {
                setPages([
                    ...range(1, 5),
                    null,
                    ...range(pagesCount - 2, pagesCount)
                ])
            } else if ((pagesCount - currentPage) <= 4) {
                setPages([
                    1, 2, null, ...range(pagesCount - 5, pagesCount)
                ])
            } else {
                setPages([
                    1,
                    2,
                    null,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    null,
                    pagesCount - 1,
                    pagesCount
                ])
            }
        } else {
            setPages(range(1, pagesCount))
        }


    }

    return (
        <div className={"ant-pagination"}>
            {pages.map((page, idx) => {
                return (
                    <li key={idx}
                        onClick={() => setPage(page)}
                        className={`ant-pagination-item ant-pagination-item-${page} ${parseInt(currentPage) === page ? 'ant-pagination-item-active' : ''} ${(null === page || currentPage === page) ? 'ant-pagination-disabled' : ''} `}>
                        <a>{null === page ? '...' : page}</a>
                    </li>
                )
            })}
        </div>
    )
}

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}