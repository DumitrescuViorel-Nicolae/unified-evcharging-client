export interface AddEVStationDTO {
  brand: string;
  street: string;
  city: string;
  country: string;
  companyName: string;
  phone?: string;
  imageURL: string;
  connectorDetails: AddConnectorDetailDTO[];
  paymentMethods: PaymentMethodDTO;
}

export interface AddConnectorDetailDTO {
  id: number;
  supplierName: string;
  connectorType: string;
  chargeCapacity: string;
  maxPowerLevel: number;
  price: number;
  customerChargeLevel: string;
  customerConnectorName: string;
  numberOfConnectors: number;
}

interface PaymentType {
  accept: boolean;
  types: PaymentTypes;
}

interface PaymentTypes {
  type: string[];
}

interface PaymentMethodDTO {
  ePayment: PaymentType;
  other: PaymentType;
}
