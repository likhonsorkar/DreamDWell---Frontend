export const ListingCardSkeleton = () => {
    return (
        <div className="card bg-base-100 border border-base-200 overflow-hidden rounded-lg">
            <div className="skeleton h-56 w-full rounded-none"></div>
            <div className="card-body p-5 space-y-3">
                <div className="skeleton h-6 w-3/4"></div>
                <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t border-base-200">
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-16"></div>
                </div>
            </div>
        </div>
    );
};

export const PropertyDetailSkeleton = () => {
    return (
        <main className="container mx-auto px-4 py-8 animate-pulse">
            {/* Image Gallery Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[600px]">
                <div className="md:col-span-3 skeleton rounded-3xl h-full w-full"></div>
                <div className="hidden md:grid grid-rows-2 gap-4">
                    <div className="skeleton rounded-3xl h-full w-full"></div>
                    <div className="skeleton rounded-3xl h-full w-full"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="skeleton h-8 w-24 rounded-full"></div>
                            <div className="skeleton h-8 w-40 rounded-full"></div>
                        </div>
                        <div className="skeleton h-12 w-3/4"></div>
                        <div className="skeleton h-6 w-1/2"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-base-200 rounded-3xl">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="skeleton h-8 w-8 rounded-full"></div>
                                <div className="skeleton h-4 w-20"></div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="skeleton h-8 w-32"></div>
                        <div className="space-y-2">
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-3/4"></div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <div className="p-8 bg-base-100 rounded-[2.5rem] border border-base-200 space-y-6">
                        <div className="space-y-2">
                            <div className="skeleton h-4 w-24"></div>
                            <div className="skeleton h-10 w-32"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="skeleton h-12 w-full"></div>
                            <div className="skeleton h-12 w-full"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="skeleton h-12 flex-1 rounded-xl"></div>
                            <div className="skeleton h-12 flex-1 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
