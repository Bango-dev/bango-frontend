type Props = {
  commodity: Commodity;
  onShare: () => void;
  onView: () => void;
};

const CommodityCard = ({ commodity, onShare, onView }: Props) => {
  return (
    <div className="form w-md rounded-4xl p-0 mx-0">
      <Image
        src={commodity.photoUrl}
        alt={commodity.commodityName}
        width={400}
        height={146}
        className="w-full"
      />

      <div className="flex flex-col gap-2 px-6 pb-6 w-full">
        <div className="flex items-center justify-between font-semibold">
          <p className="text-[#1E1E1E] text-lg">
            {commodity.commodityName}
          </p>
          <p className="text-(--color-primary) text-2xl">
            {commodity.price}
          </p>
        </div>

        <div className="flex items-center justify-between text-[#757575]">
          <p>{commodity.category}</p>
          <p>{commodity.quantity}</p>
        </div>

        <p className="text-[#757575]">{commodity.purchaseDate}</p>

        <div className="w-full flex gap-3">
          <SecondaryButton
            text="Share"
            className="w-full text-[#5C32D0]"
            onClick={onShare}
          />
          <PrimaryButton
            text="View"
            className="w-full"
            onClick={onView}
          />
        </div>
      </div>
    </div>
  );
};

export default CommodityCard;
