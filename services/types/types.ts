export type Order = Array<string>;

export type TakeOrder = {
  order: Order;
};

export type ProcessOrder = {
  version: string;
  id: string;
  source: EventSource.ORDER;
  account: string;
  time: string;
  region: string;
  resources: Order;
  detail: TakeOrder;
  "detail-type": EventType.DETAIL_TYPE;
};

export enum EventSource {
  ORDER = "event-driven-ticket-ordering.order",
}

export enum EventType {
  DETAIL_TYPE = "orderPlaced",
}
