import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: 'https://35eb6ulxb7.execute-api.us-west-2.amazonaws.com/graphql/',
    apiKey: '2mD5scpbBzZX9gk8E9poHrUpEcarEbYQTKM1Rr9yuHvZ', // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  };

  // 2mD5scpbBzZX9gk8E9poHrUpEcarEbYQTKM1Rr9yuHvZ

  