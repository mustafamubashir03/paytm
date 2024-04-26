export default function Button({label,clickEvent}){
    return(
        <button onClick={clickEvent} className="w-full py-2 px-16 mt-4 mb-6 bg-slate-950 text-slate-50 font-semibold rounded-md hover:bg-slate-900 transition-all">{label}</button>
    )
}