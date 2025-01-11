import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TweeterIcon,
} from "../ui/svgs";

const FooterSection = () => {
  const year = new Date().getFullYear();

  // Dynamic data
  const footerLinks = [
    { name: "Overview", href: "/#" },
    { name: "Features", href: "/#" },
    { name: "Pricing", href: "/#" },
    { name: "Careers", href: "/#" },
    { name: "Help", href: "/#" },
    { name: "Privacy", href: "/privacy" },
  ];

  const socialLinks = [
    { Icon: TweeterIcon, href: "/#" },
    { Icon: LinkedinIcon, href: "/#" },
    { Icon: FacebookIcon, href: "/#" },
    { Icon: GithubIcon, href: "/#" },
  ];

  const appStores = [
    { src: "/app.svg", alt: "App Store", href: "/#" },
    { src: "/google-play.svg", alt: "Google Play", href: "/#" },
  ];

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
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className="font-heading text-sm font-semibold text-white underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex items-center gap-2 sm:block sm:max-w-[135px] sm:space-y-4">
            <h5 className="hidden font-inter text-xs font-medium text-white sm:block sm:text-base">
              Get the app
            </h5>
            {appStores.map((store, index) => (
              <Link href={store.href} className="block" key={index}>
                <img className="w-full" src={store.src} alt={store.alt} />
              </Link>
            ))}
          </div>
        </div>
        {/* Copyright */}
        <div className="flex flex-col-reverse justify-between gap-4 pb-12 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm font-light text-white">
            © {year} Sheba, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.href}>
                <social.Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
