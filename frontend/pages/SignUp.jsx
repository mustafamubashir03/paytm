import { useState } from "react";
import Body from "../components/Body";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import LinkButton from "../components/LinkButton";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className=" bg-slate-100 flex flex-col  items-start rounded  max-w-md  px-6">
        <Heading text={"Sign up"} />
        <Body text={"Enter your information to sign into your account"} />
        <InputBox
          setter={(e) => setFirstName(e.target.value)}
          label={"First Name"}
          placeholder={"John"}
          type={"text"}
        />
        <InputBox
          setter={(e) => setLastName(e.target.value)}
          label={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
        />
        <InputBox
          setter={(e) => setUsername(e.target.value)}
          label={"Email"}
          placeholder={"John@gmail.com"}
          type={"email"}
        />
        <InputBox
          setter={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={"*****"}
          type={"text"}
        />
        <Button
          clickEvent={async () => {
            await axios.post("http://localhost:3000/api/v1/user/signup", {
              firstName,
              lastName,
              username,
              password,
            });
          }}
          label={"Sign up"}
        />
        <div className="flex mb-4 gap-1 w-full justify-center items-center ">
          <span>Already have an account?</span>
          <Link to="/sign-in">
            <LinkButton text={"Sign in"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
