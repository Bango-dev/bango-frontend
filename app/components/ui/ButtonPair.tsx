"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type ButtonPairProps = {
  firstBtn: React.ReactNode;
  secondBtn: React.ReactNode;
  firstHref?: string;
  secondHref?: string;
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
  onClick?: () => void;
  secondIconSrc?: string; // new prop for secondary button icon
};

export default function ButtonPair({
  firstBtn,
  secondBtn,
  firstHref,
  secondHref,
  className,
  firstClassName,
  secondClassName,
  secondIconSrc,
  onClick,
}: ButtonPairProps) {
  const router = useRouter();

  const [loadingFirst, setLoadingFirst] = useState(false);
  const [loadingSecond, setLoadingSecond] = useState(false);

  const handleFirstClick = async () => {
    setLoadingFirst(true);
    onClick?.();
    await Promise.resolve(); // ensures spinner renders
    if (firstHref) router.push(firstHref);
  };

  const handleSecondClick = async () => {
    setLoadingSecond(true);
    onClick?.();
    await Promise.resolve();
    if (secondHref) router.push(secondHref);
  };

  return (
    <div className={`btns flex gap-4 ${className}`}>
      <PrimaryButton
        text={firstBtn}
        onClick={handleFirstClick}
        className={firstClassName}
        loading={loadingFirst}
        disabled={loadingFirst || loadingSecond}
      />

      <SecondaryButton
        text={secondBtn}
        onClick={handleSecondClick}
        className={secondClassName}
        loading={loadingSecond}
        disabled={loadingFirst || loadingSecond}
        iconSrc={secondIconSrc} // icon now passed here
      />
    </div>
  );
}
