import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: 'https://35eb6ulxb7.execute-api.us-west-2.amazonaws.com/graphql/',
    apiKey: '2U3zy2YvD3P9uzZE4ua5hb36twkcCoCGoEs2TeKjwaVL', // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  };