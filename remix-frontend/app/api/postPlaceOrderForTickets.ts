import axios from "axios";
import { Tickets } from "../../../services/types/types";

export const postPlaceOrderForTickets = async (
  tickets: Tickets,
  url: string
) => {
  try {
    const response = await axios.post(url, {
      tickets,
    });
    return { data: response.data, responseCode: response.status };
  } catch (error) {
    console.error(error);
  }
};
