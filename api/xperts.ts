import submitXperts from '../server/xperts.ts';
import type { IncomingMessage, ServerResponse } from 'node:http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return submitXperts(req, res);
}
