
declare interface PubSubPayload {
  id: string
  date: string | Date
  payload: {
    message: string
  }
}