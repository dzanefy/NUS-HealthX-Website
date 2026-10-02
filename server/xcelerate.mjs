// Shared by the local Vite server and the deployed Vercel function.
export default async function submitApplication(req, res, env = process.env) {
  res.setHeader("Cache-Control", "no-store")
  res.setHeader("Content-Type", "application/json")
  const reply = (status, body) => {
    res.statusCode = status
    res.end(JSON.stringify(body))
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return reply(405, { error: "Method not allowed." })
  }
  if (!env.XCELERATE_SCRIPT_URL || !env.XCELERATE_SCRIPT_SECRET) {
    return reply(503, {
      error: "Applications are not available yet. Please try again later.",
    })
  }
  try {
    let body = req.body
    if (body === undefined) {
      const chunks = []
      let size = 0
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk)
        if (size > 3_000_000)
          return reply(413, { error: "Please use a résumé smaller than 2 MB." })
        chunks.push(chunk)
      }
      body = Buffer.concat(chunks).toString("utf8")
    }
    if (typeof body === "string") {
      try {
        body = JSON.parse(body)
      } catch {
        return reply(400, { error: "Invalid application." })
      }
    }
    if (!body || typeof body !== "object" || Array.isArray(body))
      return reply(400, { error: "Invalid application." })
    if (JSON.stringify(body).length > 3_000_000)
      return reply(413, { error: "Please use a résumé smaller than 2 MB." })
    if (body.website) return reply(400, { error: "Invalid application." })
    const response = await fetch(env.XCELERATE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret: env.XCELERATE_SCRIPT_SECRET }),
      signal: AbortSignal.timeout(25_000),
      redirect: "follow",
    })
    if (!response.ok) throw new Error("Upstream unavailable")
    const result = await response.json()
    if (result.ok === true && result.id === body.id)
      return reply(200, { ok: true, id: result.id })
    if (result.invalid === true)
      return reply(400, {
        error:
          "Check the required fields and upload a PDF or Word résumé under 2 MB.",
      })
    throw new Error("Save was not confirmed")
  } catch {
    return reply(502, {
      error:
        "We could not confirm your application was saved. Please retry; retrying will not create a duplicate.",
    })
  }
}
