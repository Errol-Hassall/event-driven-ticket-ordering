export enum EVENT_BUS_NAME {
  order = "order",
}

export enum EVENT_SOURCE {
  order = "event-driven-ticket-ordering.order",
}

export enum EVENT_DETAIL_TYPE {
  order = "Order",
}

export const takeOrderEvent = (orderDetails) => {
  return [
    {
      EventBusName: process.env.busName,
      Source: EVENT_SOURCE.order,
      DetailType: EVENT_DETAIL_TYPE.order,
      Detail: JSON.stringify({ orderDetails }),
    },
  ];
};
