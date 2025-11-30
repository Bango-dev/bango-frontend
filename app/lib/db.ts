import Dexie, { Table } from "dexie";

// Define the shape of your commodity data
export interface Commodity {
  id?: number;
  commodityName: string;
  price: string;
  quantity: string;
  location: string;
  market: string;
  date: string;
  sellerName: string;
  sellerPhoneNumber: string;
  image?: string;
}

export class MyDatabase extends Dexie {
  commodities!: Table<Commodity>;

  constructor() {
    super("MyCommodityDB");
    this.version(1).stores({
      commodities: "++id, commodityName, location, price, date",
    });
  }
}

// Export a single instance
export const db = new MyDatabase();
