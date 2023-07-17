import * as http from 'http';
export type Handler = (
  req: http.IncomingMessage;
  res: http.ServerResponse;
) => void;
