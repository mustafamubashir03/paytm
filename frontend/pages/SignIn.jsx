import Body from "../components/Body";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import LinkButton from "../components/LinkButton";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className=" h-screen flex justify-center items-center">
    <div className=" bg-slate-100 flex flex-col  items-start rounded  max-w-md  px-6">
      <Heading text={"Sign in"} />
      <Body text={"Enter your information to create an account"} />
      <InputBox label={"Email"} placeholder={"John@gmail.com"} type={"email"} />
      <InputBox label={"Password"} placeholder={"*****"} type={"text"} />
      <Button label={"Sign up"} />
      <div className="flex mb-4 gap-1 w-full justify-center items-center ">
        <span>Don't have an account?</span>
        <Link to="/sign-up">
          <LinkButton text={"Sign up"}/>
        </Link>
      </div>
    </div></div>
  );
}
