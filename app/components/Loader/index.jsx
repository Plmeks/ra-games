import { AiOutlineLoading } from "react-icons/ai";

export default function Loader({ containerClass }) {
  return (
    <div
      className={`fixed top-0 left-0 w-[calc(100%+4rem)] h-screen fixed mx-[-2rem] bg-black ${containerClass} z-[100] flex items-center justify-center`}
    >
      <AiOutlineLoading className="animate-spin w-14 h-14 text-white" />
    </div>
  );
}
