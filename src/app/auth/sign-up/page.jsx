"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import FooterSection from "@/components/shared/footer";
import ScrollToTop from "@/components/shared/scroll-to-top";

const SignUpPage = () => {
  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const phone = e.target.phone.value.trim();
    const password = e.target.password.value.trim();
    const checkBox = e.target.checkBox.checked;
    const name = `${firstName} ${lastName}`;

    if (!checkBox) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await fetch("/api/auth/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await res.json(); // ✅ Parse response JSON

      if (data.status === "fail") {
        toast.error(data.message); //
        return;
      }
      toast.success("User created successfully!"); //
      router.push("/auth/login");
      e.target.reset();
    } finally {
      // Handle any errors that occur during the fetch request
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-8 xl:py-16">
        <div className="container_fluid">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6 p-6">
              <div>
                <img src="/bd-logo.svg" alt="bd logo" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-black/75 xl:text-5xl">
                  Welcome
                </h3>
                <p className="text-lg text-black/60">
                  Enter your name, email and password to sign up
                </p>
              </div>
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      className="text-lg font-bold text-black/60"
                      htmlFor="firstName"
                    >
                      First Name:
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className="mt-2 max-h-[49px] rounded-lg border border-black/30 px-4 py-[18px] text-base"
                    />
                  </div>{" "}
                  <div>
                    <label
                      className="text-lg font-bold text-black/60"
                      htmlFor="lastName"
                    >
                      Last Name:
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      className="mt-2 max-h-[49px] rounded-lg border border-black/30 px-4 py-[18px] text-base"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-lg font-bold text-black/60"
                    htmlFor="email"
                  >
                    Phone:
                  </label>
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Enter your Phone"
                    className="mt-2 max-h-[49px] rounded-lg border border-black/30 px-4 py-[18px] text-base"
                  />
                </div>{" "}
                <div>
                  <label
                    className="text-lg font-bold text-black/60"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="mt-2 max-h-[49px] rounded-lg border border-black/30 px-4 py-[18px] text-base"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox name="checkBox" id="terms" />
                  <label
                    htmlFor="terms"
                    className="inline-flex items-center gap-1 text-lg leading-[30px] text-black/60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions and
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4 transition-all duration-300 ease-in-out hover:text-[#1173ff]"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
                <Button className="h-[72px] w-full rounded-lg bg-black/75 p-6 text-xl font-medium text-white">
                  Sign in
                </Button>
                <div className="space-x-1 text-center font-inter text-base">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-[#1173ff] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                </div>
              </form>
            </div>
            <div className="hidden lg:block">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src="/auth.png"
                alt="auth"
              />
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default SignUpPage;
