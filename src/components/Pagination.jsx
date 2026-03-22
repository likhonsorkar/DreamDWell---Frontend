import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ totalpages, currentpage, handlepagechange }) => {
    if (totalpages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalpages <= maxVisiblePages) {
            for (let i = 1; i <= totalpages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            let start = Math.max(2, currentpage - 1);
            let end = Math.min(totalpages - 1, currentpage + 1);

            if (currentpage <= 3) {
                end = 4;
            } else if (currentpage >= totalpages - 2) {
                start = totalpages - 3;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalpages - 1) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalpages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-16 mb-10">
            <div className="flex items-center gap-2">
                <div className="join shadow-sm border border-base-200 bg-base-100 rounded-xl overflow-hidden">
                    {/* First Page */}
                    <button 
                        onClick={() => handlepagechange(1)}
                        disabled={currentpage === 1}
                        className="join-item btn btn-md bg-transparent hover:bg-primary hover:text-white border-none disabled:bg-base-200/50"
                        title="First Page"
                    >
                        <ChevronsLeft size={18} />
                    </button>

                    {/* Prev Page */}
                    <button 
                        onClick={() => handlepagechange(currentpage - 1)}
                        disabled={currentpage === 1}
                        className="join-item btn btn-md bg-transparent hover:bg-primary hover:text-white border-none disabled:bg-base-200/50"
                        title="Previous Page"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <button key={`ellipsis-${index}`} className="join-item btn btn-md bg-transparent border-none cursor-default no-animation">
                                ...
                            </button>
                        ) : (
                            <button
                                key={page}
                                onClick={() => handlepagechange(page)}
                                className={`join-item btn btn-md border-none ${
                                    currentpage === page 
                                    ? 'bg-primary text-white hover:bg-primary' 
                                    : 'bg-transparent hover:bg-primary hover:text-white'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    {/* Next Page */}
                    <button 
                        onClick={() => handlepagechange(currentpage + 1)}
                        disabled={currentpage === totalpages}
                        className="join-item btn btn-md bg-transparent hover:bg-primary hover:text-white border-none disabled:bg-base-200/50"
                        title="Next Page"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* Last Page */}
                    <button 
                        onClick={() => handlepagechange(totalpages)}
                        disabled={currentpage === totalpages}
                        className="join-item btn btn-md bg-transparent hover:bg-primary hover:text-white border-none disabled:bg-base-200/50"
                        title="Last Page"
                    >
                        <ChevronsRight size={18} />
                    </button>
                </div>
            </div>
            
            <div className="text-sm font-medium text-base-content/50">
                Page <span className="text-primary font-bold">{currentpage}</span> of <span className="font-bold text-base-content">{totalpages}</span>
            </div>
        </div>
    );
};

export default Pagination;

