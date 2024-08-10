import sendRequest from "@/lib/sendRequest"

export default {
  testGetRequest: async () => {
    return await sendRequest({
      method: 'GET',
      endpoint: '/',
    });
  },
}