export function SkeletonCard() {
    return (
        <div className="bg-zinc-800/50 backdrop-blur-md border border-white/5 p-5 rounded-2xl animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-5 w-16 bg-zinc-700 rounded"></div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
                    <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
                    <div className="h-5 bg-zinc-700 rounded w-1/6"></div>
                </div>
            </div>

            <div className="mt-4 h-1 bg-zinc-700 rounded w-full"></div>
        </div>
    )
}
