
import { Button1, Button2 } from "./components/buttons/loginButton";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between overflow-hidden">
      <Body />
      <Footer />
    </div>
  );
}

function Body() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-5 overflow-hidden">
      <div>
        <img src="/x.jpg" className="h-[450px]" alt="X logo" />
      </div>
      <div className="ml-10 md:ml-40">
        <h1 className="text-6xl font-bold leading-[1.2] font-[system-ui] mb-10">Happening now</h1>
        <h3 className="font-black leading-[1.2] font-[system-ui] text-2xl mb-10 self-start">Join today.</h3>
        <Button1/>
        <Button2/>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all">
          Create account
        </button>
      </div>
    </div>
  );
}
function Footer(){
  return (
    <div className="w-full text-center text-gray-400 text-sm py-4 absolute bottom-0 left-0">
      <p>About • Download the X app • Help Center • Terms of Service • Privacy Policy • Cookie Policy • Accessibility</p>
    </div>
  );
}

