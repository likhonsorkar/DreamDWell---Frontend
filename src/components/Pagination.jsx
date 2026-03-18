const Pagination = ({totalpages, currentpage, handlepagechange, setloading }) => {
    return (
        <div className="flex justify-center mt-16 mb-10">
        <div className="join shadow-sm border border-orange-100">
            <button className="join-item btn bg-white hover:bg-orange-50 border-none">«</button>
            {Array.from({length: totalpages}, (_, i) =>(
                <button disabled={currentpage == i+1}  key={i} onClick={() => {handlepagechange(i+1); setloading("wait")}} className={`join-item btn ${currentpage == i+1 ? 'bg-orange-500 text-white' : 'bg-white hover:bg-orange-50'}  border-none`}>{i+1}</button>
            ))}
            <button className="join-item btn bg-white hover:bg-orange-50 border-none">»</button>
        </div>
        </div>
    );
};
export default Pagination;