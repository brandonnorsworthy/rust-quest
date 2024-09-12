import sendRequest from "@/lib/sendRequest"

export default {
  testGetRequest: async () => await sendRequest({
    method: 'GET',
    endpoint: '/',
  }),
}