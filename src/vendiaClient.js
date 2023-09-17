import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: 'https://35eb6ulxb7.execute-api.us-west-2.amazonaws.com/graphql/',
    apiKey: '3w5mCF5FhEdqKShgjkWeGLQKKNbzYU2WfYCjNjbZpkoQ', // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  };