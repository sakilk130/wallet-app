export const API_ENDPOINTS = {
  CREATE_TRANSACTION: `${process.env.EXPO_PUBLIC_API_URL}/transactions`,
  GET_TRANSACTIONS: (userId: string) =>
    `${process.env.EXPO_PUBLIC_API_URL}/transactions/${userId}`,
  DELETE_TRANSACTION: (transactionId: string) =>
    `${process.env.EXPO_PUBLIC_API_URL}/transactions/${transactionId}`,
  GET_SUMMARY: (userId: string) =>
    `${process.env.EXPO_PUBLIC_API_URL}/transactions/summary/${userId}`,
};
