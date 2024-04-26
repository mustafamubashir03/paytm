import ButtonSecondary from "../components/ButtonSecondary";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import ProfileIcon from "../components/ProfileIcon";

export default function Send() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className=" bg-slate-100 flex flex-col  items-start rounded  max-w-md  px-6">
        <Heading text={"Send money"} />
        <div className=" flex  gap-2 mb-4 mt-4">
        <diV className="rounded-full h-8 w-8 bg-green-700 flex items-center justify-center text-slate-100">
        <p>M</p>
      </diV>
          <p className="self-center font-semibold text-lg">Mustafa</p>
        </div>
          <InputBox label={"Amount (in dollars $)"} type={"text"} />
      <ButtonSecondary label={"Initiate transfer"} />
      </div>
    </div>
  );
}
