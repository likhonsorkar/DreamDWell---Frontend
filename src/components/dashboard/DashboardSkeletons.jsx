export const StatsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <div className="skeleton h-4 w-24"></div>
                            <div className="skeleton h-10 w-16"></div>
                        </div>
                        <div className="skeleton h-14 w-14 rounded-2xl"></div>
                    </div>
                    <div className="mt-6 h-4 w-full skeleton rounded-full opacity-20"></div>
                </div>
            ))}
        </div>
    );
};

export const TableSkeleton = ({ rows = 5 }) => {
    return (
        <div className="w-full animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-base-200/50 border-b border-base-200">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <th key={i} className="p-5">
                                    <div className="skeleton h-4 w-20"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-100">
                        {Array.from({ length: rows }).map((_, i) => (
                            <tr key={i}>
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="skeleton w-16 h-16 rounded-2xl flex-shrink-0"></div>
                                        <div className="space-y-2">
                                            <div className="skeleton h-4 w-32"></div>
                                            <div className="skeleton h-3 w-24"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5"><div className="skeleton h-6 w-20 rounded-lg"></div></td>
                                <td className="p-5">
                                    <div className="space-y-1">
                                        <div className="skeleton h-5 w-16"></div>
                                        <div className="skeleton h-3 w-10"></div>
                                    </div>
                                </td>
                                <td className="p-5"><div className="skeleton h-6 w-24 rounded-full"></div></td>
                                <td className="p-5">
                                    <div className="flex justify-center gap-2">
                                        <div className="skeleton h-10 w-10 rounded-2xl"></div>
                                        <div className="skeleton h-10 w-10 rounded-2xl"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const WalletSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-64 bg-base-300 rounded-[3rem]"></div>
                <div className="h-64 bg-base-200 rounded-[3rem]"></div>
            </div>
            <div className="space-y-4">
                <div className="skeleton h-8 w-48 ml-4"></div>
                <div className="h-96 bg-base-100 rounded-[2.5rem] border border-base-200"></div>
            </div>
        </div>
    );
};

export const UserTableSkeleton = () => {
    return (
        <div className="w-full animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-base-200/50 border-b border-base-200">
                            {[1, 2, 3, 4].map((i) => (
                                <th key={i} className="p-6">
                                    <div className="skeleton h-4 w-24"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i}>
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="skeleton w-12 h-12 rounded-xl"></div>
                                        <div className="space-y-2">
                                            <div className="skeleton h-4 w-32"></div>
                                            <div className="skeleton h-3 w-16"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 space-y-2">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-3 w-24"></div>
                                </td>
                                <td className="p-6">
                                    <div className="skeleton h-4 w-32"></div>
                                </td>
                                <td className="p-6">
                                    <div className="flex justify-center">
                                        <div className="skeleton h-10 w-10 rounded-2xl"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const GeneralFormSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="bg-base-100 rounded-[2.5rem] p-8 md:p-12 border border-base-200 shadow-sm">
                <div className="flex items-center gap-3 border-b border-base-200 pb-6 mb-8">
                    <div className="skeleton h-8 w-8 rounded-lg"></div>
                    <div className="skeleton h-8 w-64"></div>
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="skeleton h-6 w-32"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="skeleton h-32 w-full rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-base-200">
                        <div className="skeleton h-6 w-40"></div>
                        <div className="skeleton h-14 w-full rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
