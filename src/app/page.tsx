import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  const iconClass = "w-10 h-10 text-white hover:text-gray-600 hover:scale-110 transition-transform";
  
  return (
    <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative min-h-screen">
      <main className="relative z-10 p-8 flex flex-col gap-[20px] row-start-2 sm:items-start">
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl">
            About Me
          </h1>
          <p className="font-medium text-xl sm:text-2xl">
            Hello, I’m zawa-kun. <br />
            I’m a student at Faculty of Computer Science.
          </p>
        </div>
        <div>
          <ul className="flex gap-4">
            <li>
              <a
                href="https://github.com/zawa-kun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubLogoIcon className={ iconClass } />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/shu-yazawa-b90183327/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInLogoIcon className={ iconClass }/>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
