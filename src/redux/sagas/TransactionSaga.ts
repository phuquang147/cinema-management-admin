import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { TransactionData } from "~/components/Booking/Payment";
import TransactionServices from "~/services/transactionServices";
import { getTransactions } from "../reducers/TransactionReducer";
import {
  showTimeSagaActionTypes,
  snackSagaActionTypes,
  transactionSagaActionTypes,
} from "../sagaActionTypes";

function* workGetTransactions() {
  try {
    let { data, status } = yield call(() =>
      TransactionServices.getTransactions()
    );

    if (status === 200) {
      yield put(getTransactions({ transactions: data._transactions }));
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workAddTransaction(action: {
  payload: { transaction: TransactionData };
  type: string;
}) {
  const { transaction } = action.payload;

  try {
    let { data, status } = yield call(() =>
      TransactionServices.addTransaction(transaction)
    );

    if (status === 201) {
      toast.success(data.message);
    }
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

function* workGetDataForTransaction() {
  try {
    yield put({
      type: showTimeSagaActionTypes.GET_SHOW_TIMES_BY_DATE_SAGA,
      payload: {
        date: new Date().toISOString().slice(0, 10),
      },
    });
    yield put({ type: snackSagaActionTypes.GET_SNACKS_SAGA });
  } catch (err: any) {
    toast.error(err.response.data.message);
  }
}

export function* getTransactionsSaga() {
  yield takeLatest(
    transactionSagaActionTypes.GET_TRANSACTIONS_SAGA,
    workGetTransactions
  );
}

export function* addTransactionSaga() {
  yield takeLatest(
    transactionSagaActionTypes.ADD_TRANSACTION_SAGA,
    workAddTransaction
  );
}

export function* getDataForTransactionSaga() {
  yield takeLatest(
    transactionSagaActionTypes.GET_DATA_FOR_TRANSACTION,
    workGetDataForTransaction
  );
}
