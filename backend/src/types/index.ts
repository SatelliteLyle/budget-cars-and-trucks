export interface Vehicle {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  type: 'car' | 'truck';
  price: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
  images?: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    latitude: number;
    longitude: number;
  };
  sellerType: 'dealership' | 'private';
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  sold: boolean;
}

export interface Inquiry {
  id: string;
  buyerId: string;
  vehicleId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  status: 'new' | 'contacted' | 'interested' | 'deal_closed' | 'no_deal';
  createdAt: Date;
  updatedAt: Date;
}
