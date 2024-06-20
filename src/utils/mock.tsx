import { EVStation } from "../interfaces/EVStation";

export const stations: EVStation[] = [
  {
    stationID: 3,
    stripeAccountID: "stripe_account_id",
    brand: "Tesla",
    companyName: "Tesla",
    distance: 5.2,
    imageURL: null,
    totalNumberOfConnectors: 6,
    address: {
      street: "Bulevardul Unirii",
      city: "Bucharest",
      country: "Romania",
    },
    contacts: {
      adminPhone: "+4980012189556",
      website: "https://www.tesla.com/supercharger",
    },
    position: {
      latitude: 44.4268,
      longitude: 26.1025,
    },
    connectorDetails: [
      {
        supplierName: "Tesla",
        connectorType: "Tesla Supercharger",
        chargeCapacity: "400-480VAC, 3-phase at max 250A",
        maxPowerLevel: 150,
        price: 3.5,
        customerChargeLevel: "3",
        customerConnectorName: "DC EV connector (Supercharger)",
        connectorsStatuses: [
          {
            physicalReference: "02020",
            state: "AVAILABLE",
          },
          {
            physicalReference: "02020",
            state: "OCCUPIED",
          },
          {
            physicalReference: "02025",
            state: "OUT_OF_SERVICE",
          },
          {
            physicalReference: "02025",
            state: "OUT_OF_SERVICE",
          },
        ],
      },
    ],
    paymentMethods: {
      ePayment: {
        accept: true,
        types: {
          type: ["online-tesla-app"],
        },
      },
      other: {
        accept: true,
        types: {
          type: ["rfid-reader", " app", " contactless-card"],
        },
      },
    },
  },
  {
    stationID: 4,
    stripeAccountID: "stripe_account_id",
    brand: "ChargePoint",
    companyName: "ChargePoint",
    distance: 4.78,
    imageURL: null,
    totalNumberOfConnectors: 2,
    address: {
      street: "Calea Victoriei",
      city: "Bucharest",
      country: "Romania",
    },
    contacts: {
      adminPhone: "+4980012189557",
      website: "https://www.chargepoint.com/",
    },
    position: {
      latitude: 44.4397,
      longitude: 26.0963,
    },
    connectorDetails: [
      {
        supplierName: "ChargePoint",
        connectorType: "SAE J1772",
        chargeCapacity: "208-240VAC, single-phase at max 80A",
        maxPowerLevel: 19,
        price: 1.5,
        customerChargeLevel: "2",
        customerConnectorName: "AC EV connector (J1772)",
        connectorsStatuses: [
          {
            physicalReference: "03030",
            state: "AVAILABLE",
          },
          {
            physicalReference: "03030",
            state: "OCCUPIED",
          },
          {
            physicalReference: "03035",
            state: "OUT_OF_SERVICE",
          },
          {
            physicalReference: "03035",
            state: "OUT_OF_SERVICE",
          },
        ],
      },
    ],
    paymentMethods: {
      ePayment: {
        accept: true,
        types: {
          type: ["online-chargepoint-app"],
        },
      },
      other: {
        accept: true,
        types: {
          type: ["rfid-reader", " app", " contactless-card"],
        },
      },
    },
  },
];
