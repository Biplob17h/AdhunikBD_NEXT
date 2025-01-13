import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const LoginPage = () => {
  return (
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
                Enter your email and password to sign in
              </p>
            </div>
            <form action="#" id="#" className="space-y-6">
              <div>
                <label
                  className="text-lg font-bold text-black/60"
                  htmlFor="email"
                >
                  Email:
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
              <Button
                variant="outline"
                className="h-[72px] w-full rounded-lg border border-black/30 bg-white p-6 text-xl font-medium"
              >
                <img src="/google.svg" alt="google" /> Sign in with google
              </Button>
              <div className="space-x-1 text-center font-inter text-base">
                Not a Member yet?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-[#1173ff] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                >
                  Sign up
                </Link>{" "}
              </div>
            </form>
          </div>
          <div>
            <img
              className="h-full w-full object-cover"
              src="/auth.png"
              alt="auth"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
