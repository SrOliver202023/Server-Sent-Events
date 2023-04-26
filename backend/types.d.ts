declare type MessageRbtDTO = {
  queue: string
  message: string
}

declare interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
