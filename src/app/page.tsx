import HomeProfile from "@/features/home/homeProfile";
import SNSLinks from "@/features/home/snsLinks";

export default function Home() {
  return (
    <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative min-h-screen">
      <main className="relative z-10 p-8 flex flex-col gap-[20px] row-start-2 sm:items-start">
        <HomeProfile />
        <SNSLinks />
      </main>
    </div>
  );
}
