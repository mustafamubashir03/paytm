import Body from "./Body";
import Heading from "./Heading";
import ProfileIcon from "./ProfileIcon";

export default function TopBar({HeadingText,SecondaryText}){
    return (<div className="bg-slate-300   mb-4 px-4 pt-4 w-screen ">
        <div className="flex justify-between items-center max-w-screen-md mx-auto">
        <h1 className="text-xl font-semibold mb-4 mt-4">{HeadingText}</h1>
        <div className="flex gap-2 items-center">
            <p>{SecondaryText}</p>
            <ProfileIcon letter={"M"}/>
        </div></div></div>)
}