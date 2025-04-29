import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function SNSLinks() {
    const iconClass = "w-10 h-10 text-white hover:text-gray-600 hover:scale-110 transition-transform";
    return (
        <>
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
        </>

    )
}