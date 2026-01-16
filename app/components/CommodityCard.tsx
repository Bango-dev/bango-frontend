import Image from "next/image";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

type Commodity = {
  id?: string;
  photoUrl?: string;
  commodityName?: string;
  price?: string;
  bangos?: string;
  category?: string;
  quantity?: string;
  purchaseDate?: string;
};

type Props = {
  commodity: Commodity;
  onShare: () => void;
  onView: () => void;
};

const CommodityCard = ({ commodity, onShare, onView }: Props) => {
  const formatPrice = (price?: string) => {
    if (!price) return "";

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="form lg:w-[30%] md:w-[45%] w-[70%] rounded-4xl p-0 mx-auto sm:mx-2 md:mx-3 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white">
      {/* Uncomment when you have images */}
      {/* {commodity.photoUrl && (
        <div className="relative w-full h-40 overflow-hidden rounded-t-4xl">
          <Image
            src={commodity.photoUrl ?? ""}
            alt={commodity.commodityName || "Commodity"}
            fill
            className="object-cover"
          />
        </div>
      )} */}

      <div className="flex flex-col gap-3 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 w-full">
        {/* Commodity Name and Price */}
        <div className="flex items-start justify-between gap-2 min-h-10">
          <p className="text-[#1E1E1E] font-semibold text-sm sm:text-base md:text-lg leading-tight flex-1 break-word">
            {commodity.commodityName}
          </p>
          <p className="text-(--color-primary) font-semibold text-sm sm:text-lg md:text-2xl leading-tight whitespace-nowrap">
            {formatPrice(commodity.price)}
          </p>
        </div>

        {/* Quantity and Date */}
        <div className="flex items-center justify-between gap-2 text-[#757575]">
          <p className="text-xs sm:text-sm md:text-base truncate flex-1">
            {commodity.quantity}
          </p>
          <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
            {formatDate(commodity.purchaseDate)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-2 sm:gap-3 mt-1">
          <SecondaryButton
            text="Share"
            className="flex-1 py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-xs sm:text-sm md:text-base text-[#5C32D0]"
            onClick={onShare}
          />
          <PrimaryButton
            text="View"
            className="flex-1 py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-xs sm:text-sm md:text-base"
            onClick={onView}
          />
        </div>
      </div>
    </div>
  );
};

export default CommodityCard;
