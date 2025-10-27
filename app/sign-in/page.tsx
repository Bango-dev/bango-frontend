import Input from "../form/Input";
import Image from "next/image";
import Button from "../components/ui/Button";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex  justify-around  min-h-screen mx-auto w-full ">
      <form className="form shadow-none border border-none  ">
        <h2 className=" font-bold md:text-2xl text-base  text-center leading-4 border border-none  ">
          Sign-In to Bango
        </h2>
        <h3 className="text-[#757575] text-center sm:text-base text-sm  ">
          Crowdsourced prices for all your needs
        </h3>
        <Input
          label="Email"
          type="email"
          placeholder="Johndoe@gmail.com"
          name="email"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="XXXXXXXXX"
          required
        />
        <div className="flex items-center ">
        <input
          type="checkbox"
          className="  border-1 border-[#757575] rounded-md"
        />
        <label className="text-sm text-[#757575] ml-2 ">Remember me</label>
        <Link
          href="/forgot-password"
          className="text-[var(--color-primary)] font-bold ml-auto "
        >
          Forgot Password?
        </Link>
        </div>
        <Button
          firstBtn="Sign In"
          secondBtn="Sign In with Google"
          firstHref="#"
          secondHref="#"
          className="sm:w-full w-full flex flex-col px-0 "
          src="/images/on-boarding/google-icon.svg"
        />
        <p className="text-center text-sm text-[#757575]">
          Don&apos;t have an account ?
          <Link
            href="/sign-up"
            className="  ml-2 text-[var(--color-primary)] font-bold"
          >
            Sign up
          </Link>
        </p>
      </form>
      <div className="hidden md:flex h-screen  ">
        <Image
          src="/images/on-boarding/on-boarding-image.png"
          alt="onboarding image"
          width={686}
          height={50}
        />
      </div>
    </div>
  );
};
export default SignIn;
