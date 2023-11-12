import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: 'https://35eb6ulxb7.execute-api.us-west-2.amazonaws.com/graphql/',
    apiKey: 'C4ZZoUsTx6BUKWviw2cQKxV3D6PgBWD8qfsk3nVMio8g', // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  };