import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="center h-auto py-10">
      <ul className="nav-list">
        <Link href="/coming-soon" className="nav-link">
          <li>About Bango</li>
        </Link>
        <Link href="/coming-soon" className="nav-link">
          <li>Privacy & Policy</li>
        </Link>
        <Link href="/coming-soon" className="nav-link">
          <li>Contact Us</li>
        </Link>
        <Link href="/coming-soon" className="nav-link">
          <li>Download app (Comming Soon)</li>
        </Link>
      </ul>
      <div className="my-10">
        <Image
          src="/images/footer/footer-logo.png"
          alt="The footer logo"
          width={830}
          height={174}
          sizes="(max-width: 1024px) 263px, 830px"
          className="w-[263px]  lg:w-[830px] h-auto"
        />
      </div>
      <div className="flex items-center justify-center gap-10 xl:w-7xl w-full lg:card-border  rounded-full py-10 mb-5 ">
        <Link href="/coming-soon" className="social-link">
          <Image
            src="/images/footer/x-logo.png"
            alt="The footer logo"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/coming-soon" className="social-link">
          <Image
            src="/images/footer/instagram-logo.png"
            alt="The footer logo"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/coming-soon" className="social-link">
          <Image
            src="/images/footer/youtube-logo.png"
            alt="The footer logo"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/coming-soon" className="social-link">
          <Image
            src="/images/footer/linkedin-logo.png"
            alt="The footer logo"
            width={24}
            height={24}
          />
        </Link>
      </div>
      <span>&copy; Bango</span>
    </section>
  );
};
export default Footer;
