import Axios from "axios";
import Cookies from "js-cookie";
import { TransactionData } from "~/components/Booking/Payment";
import { URL_ADD_TRANSACTION, URL_GET_TRANSACTIONS } from "./apiUrls";

const TransactionServices = {
  getTransactions: () => {
    return Axios({
      url: URL_GET_TRANSACTIONS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  },
  addTransaction: (transaction: TransactionData) => {
    return Axios({
      url: URL_ADD_TRANSACTION,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: transaction,
    });
  },
};

export default TransactionServices;
