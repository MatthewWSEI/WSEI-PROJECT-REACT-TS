const NotFound = () => {
    return (
        <div className="bg-slate-800 w-full h-screen p-6 flex justify-center items-center">
            <div className="bg-slate-700  max-w-sm w-full rounded-lg px-4 py-2 ring-slate-900/5 shadow-lg">
                <h1 className="text-white font-bold text-4xl flex justify-center mb-4">
                    404
                </h1>
                <p className="text-slate-400 font-bold">Ooops...</p>
                <p className="text-slate-400">Page not found </p>
            </div>
        </div>
    );
};

export default NotFound;
