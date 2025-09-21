import Image from "next/image";
import Button from "../../components/ui/Button";

const ComingSoon = () => {
  return (
    <section className="center h-screen  ">
      <div className="mb-6">
        <Image
          src="/images/coming-soon/coming-soon-image.png"
          alt="An image of a clock"
          width={592}
          height={249}
        />
      </div>
      <div>
        <h3 className="sub-heading">Coming Soon!</h3>
      </div>
      <Button
        firstBtn="Back to Home"
        secondBtn="Submit a Price"
        className="mt-6"
      />
    </section>
  );
};
export default ComingSoon;
