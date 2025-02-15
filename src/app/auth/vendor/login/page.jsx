"use client";
import FooterSection from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const VendorLogin = () => {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    console.log({ phone, password });

    const res = await fetch("/api/auth/vendor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      localStorage.setItem("AdhunikToken", data.data.token); // Save token
      router.push("/dashboard/vendor");
    } else {
      toast.error(data.message);
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
                  Welcome Vendor
                </h3>
                <p className="text-lg text-black/60">
                  Enter your Phone and password to sign in
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
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
                    placeholder="Enter your phone"
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
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-lg leading-[30px] text-black/60 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-lg leading-[30px] text-[#1173ff] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  >
                    Forgot Password ?
                  </Link>
                </div>
                <Button className="h-[72px] w-full rounded-lg bg-black/75 p-6 text-xl font-medium text-white">
                  Sign in
                </Button>
                <div className="space-x-1 text-center font-inter text-base">
                  Not a Member yet?{" "}
                  <Link
                    href="/auth/vendor/sign-up"
                    className="text-[#1173ff] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                  >
                    Sign up
                  </Link>{" "}
                </div>
              </form>
            </div>
            <div className="hidden lg:block">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src="/worker.webp"
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

export default VendorLogin;
