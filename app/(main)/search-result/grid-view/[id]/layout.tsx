// app/(main)/search-result/grid-view/[id]/layout.tsx (or in page.tsx)
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product data for metadata
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/submissions/${params.id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    const product = data?.entity || data?.data;

    if (product) {
      return {
        title: `${product.commodityName} - ₦${Number(
          product.price
        ).toLocaleString()} | Bango`,
        description: `${product.commodityName} available at ${
          product.market
        }, ${product.location} for ₦${Number(
          product.price
        ).toLocaleString()} (${product.quantity})`,
        openGraph: {
          title: `${product.commodityName} - ₦${Number(
            product.price
          ).toLocaleString()}`,
          description: `Found at ${product.market}, ${product.location}`,
          images: product.photoUrl ? [product.photoUrl] : [],
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/p/${params.id}`,
        },
        twitter: {
          card: "summary_large_image",
          title: `${product.commodityName} - ₦${Number(
            product.price
          ).toLocaleString()}`,
          description: `${product.market}, ${product.location} - ${product.quantity}`,
          images: product.photoUrl ? [product.photoUrl] : [],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Product Details | Bango",
    description: "View crowdsourced commodity prices from across Nigeria",
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
