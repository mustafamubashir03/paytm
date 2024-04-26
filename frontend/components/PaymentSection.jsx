import Heading from "./Heading";
import UserTab from "./UserTab";

export default function PaymentSection(){
    return(<div className="py-4 px-4 bg-slate-100 text-slate-700 text-lg   max-w-screen-md mx-auto rounded-md">
            <Heading text={"Users"}/>
            <input className="inline-block w-full bg-slate-100 border-2 border-slate-300 rounded-sm py-0.5 px-2 italic" type="text" placeholder="Search users..."/>
            <UserTab username={"John"} letter={"J"} />

    </div>)
}