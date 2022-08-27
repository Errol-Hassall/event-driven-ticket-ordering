import axios from "axios";
import { Tickets } from "../../../services/types/types";

const orderTicketsUrl =
  `${process.env.REACT_APP_API_URL}/order-tickets` ||
  "http://localhost:3000/order-tickets";

export const postPlaceOrderForTickets = async (tickets: Tickets) => {
  console.log("URL", orderTicketsUrl);
  try {
    const response = await axios.post(orderTicketsUrl, {
      tickets,
    });
    return { data: response.data, responseCode: response.status };
  } catch (error) {
    console.error(error);
  }
};
