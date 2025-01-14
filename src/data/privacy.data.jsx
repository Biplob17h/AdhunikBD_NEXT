import Link from "next/link";

export const privacyData = [
  {
    id: "introduction",
    title: "Types of  information we collect",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
 irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur 
adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis auteirure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.`,
  },
  {
    id: "information-you-provider",
    title: "Information you provider",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
 irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur 
adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore `,
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or ‘break’ certain elements of the sites functionality.",
  },
  {
    id: "how-we-use-cookies",
    title: "How We Use Cookies",
    content:
      "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.",
  },
  {
    id: "the-cookies-we-set",
    title: "The Cookies We Set",
    content: (
      <>
        <p>
          When you create an account with us, we use cookies to manage the
          signup process and handle general administrative tasks. While these
          cookies are usually deleted upon logging out, some may persist to
          retain your site preferences even after you've logged out.
        </p>
        <p>
          We also use cookies to recognize when you're logged in, saving you
          from having to log in again on every new page you visit. These cookies
          are typically cleared upon logout, ensuring restricted areas and
          features remain secure.
        </p>
        <p>
          If you subscribe to our newsletter or email services, cookies may be
          used to track your subscription status and display notifications
          relevant to your preferences, such as reminders or offers for
          unsubscribed users.
        </p>
        <p>
          For e-commerce and payment features, essential cookies help process
          your orders by remembering details as you navigate between pages.
        </p>
        <p>
          Occasionally, we may conduct user surveys or questionnaires to gather
          insights, offer helpful tools, or better understand our audience.
          Cookies may be used to track survey participation or display accurate
          results as you browse.
        </p>
        <p>
          When you submit data through forms, such as contact or comment forms,
          cookies may store your details to streamline future interactions. To
          enhance your experience on our site, we provide tools to customize
          your preferences. Cookies store these settings so they can be applied
          whenever you interact with the site.
        </p>
      </>
    ),
  },
  {
    id: "third-party-cookies",
    title: "Third Party Cookies",
    content: (
      <>
        <p>
          We use Google Analytics, one of the most popular and trusted analytics
          solutions on the web, to help us understand how you interact with our
          site and identify ways to enhance your experience. These cookies track
          data such as the time you spend on the site and the pages you visit,
          enabling us to create engaging content.Additionally, third-party
          analytics cookies are used to monitor and measure site usage, helping
          us continuously improve by analyzing user behavior like time spent on
          pages and navigation patterns.
        </p>
        <p>
          When testing new features or adjusting site functionality, we may use
          cookies to provide you with a consistent experience while gathering
          insights into the optimizations and changes our users value most.
        </p>
        <p>
          As we offer products for sale, we use cookies to understand visitor
          behavior related to purchases. These cookies help track data such as
          how many visitors complete a purchase, enabling us to make informed
          business decisions, monitor advertising effectiveness, and optimize
          product pricing for your benefit.
        </p>
        <p>
          We use the Google AdSense service to display advertisements. AdSense
          uses the DoubleClick cookie to deliver relevant ads and limit the
          frequency of ad displays. For more information. Behavioral advertising
          cookies are employed to provide you with personalized ads by
          anonymously tracking your interests and presenting ads that align with
          them. These cookies help fund our site’s operation and development.
        </p>
        <p>
          In some cases, we may tailor content based on the information you
          provide, either directly (e.g., through forms) or indirectly (e.g.,
          linking a social media account). Cookies enable us to deliver content
          that aligns with your interests
        </p>
        <p>
          Some of our advertising partners use affiliate tracking cookies to
          ensure we can attribute visitors who came through their platforms.
          This allows us to credit our partners appropriately and, where
          applicable, provide you with affiliate bonuses for purchases made
          through their links.
        </p>
        <p>
          We integrate social media buttons and plugins to allow you to connect
          with your networks. Platforms like Facebook, Twitter, and Google+ may
          set cookies via our site, which can enhance your profile on their
          platforms or contribute to the data they collect as outlined in their
          respective privacy policies.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us. Margin Inc.
        </p>
        <div className="flex flex-col space-y-0.5 pt-3">
          <p>50 N 1, #4i, 1000, Buet, Dhaka</p>
          <Link
            className="underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
            href="tel:+15179903020"
          >
            +1 5179903020
          </Link>
          <Link
            className="text-[#77a1d3] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
            href="mailto:info@Pixelperfect.com"
          >
            info@Pixelperfect.com
          </Link>
        </div>
      </>
    ),
  },
];
