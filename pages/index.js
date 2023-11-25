import { MainHeader } from "../components/common/MainHeader";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleQuiz = () => {
    router.push(`/quiz`);
  };
  return (
    <div className="">
      <MainHeader title="Undiscovered: Discover Ethiopia's Hidden Treasures with Undiscovered Ethiopia Tours." />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <h1 className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl my-5">Quiz</h1>
          <button onClick={() => handleQuiz()}>
            <h5 className={`font-bold font-monospace hover:border-black text-xl mt-1 w-40 items-center justify-center hover:scale-105 transition duration-400 p-2 text-white bg-gradient-to-r from-red-500 to-blue-500`}>
              Start Quiz
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
}
