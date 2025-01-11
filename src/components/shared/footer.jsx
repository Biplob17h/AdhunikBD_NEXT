import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TweeterIcon,
} from "../ui/svgs";

const FooterSection = () => {
  const year = new Date().getFullYear();
  return (
    <section className="bg-accent px-4 pt-16 lg:px-10 xl:px-20">
      <div className="container_fluid">
        <div className="justify-between gap-8 border-b border-[#EAECF0]/75 pb-8 sm:flex lg:pb-16">
          <div className="flex-1 space-y-8">
            <div>
              <img src="/logo-white.svg" alt="logo" />
            </div>
            <p className="max-w-[490px] text-base font-light text-white">
              At Sheba, your safety and convenience are our top priorities. We
              partner with verified and skilled professionals to ensure the
              highest quality of service.
            </p>
            <ul className="flex items-center gap-3 md:gap-4 xl:gap-8">
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/#"
                >
                  {" "}
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/#"
                >
                  {" "}
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/#"
                >
                  {" "}
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/#"
                >
                  {" "}
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/#"
                >
                  {" "}
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  href="/privacy"
                >
                  {" "}
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-8 flex items-center gap-2 sm:block sm:max-w-[135px] sm:space-y-4">
            <h5 className="hidden font-inter text-xs font-medium text-white sm:block sm:text-base">
              Get the app
            </h5>
            <div>
              <img className="w-full" src="/app.svg" alt="google" />
            </div>
            <div>
              <img className="w-full" src="/google-play.svg" alt="google" />
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="flex flex-col-reverse justify-between gap-4 pb-12 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm font-light text-white">
            © {year} Sheba, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#">
              <TweeterIcon />
            </Link>
            <Link href="/#">
              <LinkedinIcon />
            </Link>
            <Link href="/#">
              <FacebookIcon />
            </Link>
            <Link href="/#">
              <GithubIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
