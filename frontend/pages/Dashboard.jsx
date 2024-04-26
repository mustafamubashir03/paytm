import PaymentSection from "../components/PaymentSection";
import TopBar from "../components/TopBar";

export default function Dashboard() {
  return (
    <div className="bg-slate-800  ">
      <TopBar HeadingText={"PaymentApp"} SecondaryText={"Hello"} />
      <div className="py-4 px-4 mb-4 bg-slate-100 text-slate-700 flex text-lg  items-center max-w-screen-md mx-auto rounded-md">
        <p>
          Your balance is
          <span className="text-xl font-bold text-slate-800"> $500</span>
        </p>
      </div>
      <PaymentSection />
    </div>
  );
}
