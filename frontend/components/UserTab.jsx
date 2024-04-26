import { Link } from "react-router-dom";
import Button from "./Button";
import ButtonSmall from "./ButtonSmall";
import ProfileIcon from "./ProfileIcon";

export default function UserTab({ letter, username }) {
  return (
    <div className="border-2 rounded-md px-4 flex justify-between mt-4 items-center">
      <div className=" flex  gap-2">
        <ProfileIcon letter={letter} />
        <p className="self-center">{username}</p>
      </div>
      <Link to="/send">
        <ButtonSmall label={"Send money"} />
      </Link>
    </div>
  );
}
