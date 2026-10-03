import type { IncomingMessage, ServerResponse } from 'node:http';
export default function submitApplication(req: IncomingMessage & { body?: unknown }, res: ServerResponse, env?: Record<string, string | undefined>): Promise<void>;
