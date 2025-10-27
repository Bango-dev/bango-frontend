
import Input from "../form/Input";
import Image from "next/image";
import Button from "../components/ui/Button";
import Link from "next/link";
import { Figtree, Poppins } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});



const SignUp = () => {
  return (
    <div
      className={`flex  justify-around  min-h-screen mx-auto w-full ${figtree.className} `}
    >
      <form className="form shadow-none border border-none  ">
        <h2
          className={` font-bold md:text-2xl text-base  text-center leading-4 border border-none ${poppins.className}  `}
        >
          Sign-Up to Bango
        </h2>
        <h3 className={`text-[#757575] text-center sm:text-base text-sm  `}>
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
          label="Phone Number"
          type="tel"
          placeholder="08134534543"
          name="phone"
          autoComplete="tel"
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="XXXXXXXXX"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="XXXXXXXXX"
          required
        />

        <Button
          firstBtn="Sign Up"
          secondBtn="Sign Up with Google"
          firstHref="#"
          secondHref="#"
          className=" px-0 w-full flex flex-col  "
          src="/images/on-boarding/google-icon.svg"
        />
        <p className="text-center text-[#757575] text-sm">
          Already have an account ?
          <Link
            href="/sign-in"
            className="  ml-2 text-[var(--color-primary)] font-bold"
          >
            Sign in
          </Link>
        </p>
      </form>
      <div className="hidden md:flex h-screen   ">
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
export default SignUp;
