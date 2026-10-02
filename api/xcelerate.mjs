import submitApplication from "../server/xcelerate.mjs"

export default function handler(req, res) {
  return submitApplication(req, res)
}
