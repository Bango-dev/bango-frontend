export type Commodity = {
  id: string;
  commodityName: string;
  price: string;
  quantity: string;
  unit: string;
  location: string;
  market: string;
  photoUrl?: string;
  purchaseDate?: string;
  BuyerName: string;
  sellerName: string;
  sellerPhoneNumber: string;
  createdAt: string;
  viewCount?: number;
  user: { firstName: string };
};

