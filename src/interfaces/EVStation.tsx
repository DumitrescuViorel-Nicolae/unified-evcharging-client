export interface EVStation {
  stationID: number;
  stripeAccountID: string;
  brand: string;
  totalNumberOfConnectors: number;
  address: Address;
  distance: number;
  contacts: Contacts;
  position: Position;
  connectorDetails: ConnectorDetail[];
  paymentMethods: PaymentMethod;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

interface Contacts {
  adminPhone: string;
  website: string;
}

interface Position {
  latitude: number;
  longitude: number;
}

export interface ConnectorDetail {
  supplierName: string;
  connectorType: string;
  chargeCapacity: string;
  maxPowerLevel: number;
  price: number;
  customerChargeLevel: string;
  customerConnectorName: string;
  connectorsStatuses: ConnectorStatus[];
}

export interface ConnectorStatus {
  physicalReference: string;
  state: string;
}

interface PaymentMethod {
  ePayment: PaymentType;
  other: PaymentType;
}

interface PaymentType {
  accept: boolean;
  types: PaymentTypes;
}

interface PaymentTypes {
  type: string[];
}
