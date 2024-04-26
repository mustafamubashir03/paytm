export default function InputBox({label,placeholder,type,setter}){
    return(<div className="flex flex-col justify-start mb-2  self-start w-full">
        <label className="text-xs font-medium text-slate-700 mb-0.5">{label}</label>
        <input onChange={setter} className="inline-block max-w-90 bg-slate-100 border-2 border-slate-300 rounded-sm py-0.5 px-2 italic" type={type} placeholder={placeholder} />
    </div>)
}