import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router"

const companies = [
  "No preference",
  "A*STAR",
  "Abbott",
  "Biofourmis",
  "Boston Scientific",
  "GE HealthCare",
  "National University Hospital",
  "Philips",
  "SingHealth",
  "Synapxe",
]
const sectors = [
  "MedTech",
  "Digital health",
  "Biotech and life sciences",
  "Healthcare services",
  "Clinical research",
  "Health innovation",
]
export default function XcelerateApply() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const applicationId = useRef(crypto.randomUUID())
  const busy = useRef(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy.current) return
    const form = new FormData(e.currentTarget)
    const resume = form.get("resume")
    if (
      !(resume instanceof File) ||
      !resume.size ||
      resume.size > 2 * 1024 * 1024 ||
      !/\.(pdf|doc|docx)$/i.test(resume.name)
    ) {
      setError("Please upload a PDF or Word résumé smaller than 2 MB.")
      return
    }
    busy.current = true
    setSubmitting(true)
    setError("")
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result).split(",")[1])
        reader.onerror = () =>
          reject(
            new Error("Could not read your résumé. Please select it again."),
          )
        reader.readAsDataURL(resume)
      })
      const response = await fetch("/api/xcelerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: applicationId.current,
          name: form.get("name"),
          email: form.get("email"),
          school: form.get("school"),
          year: form.get("year"),
          major: form.get("major"),
          company: form.get("company"),
          sectors: form.getAll("sectors"),
          availability: form.get("availability"),
          website: form.get("website"),
          resume: { name: resume.name, base64 },
        }),
        signal: AbortSignal.timeout(35000),
      })
      const result = await response.json().catch(() => null)
      if (
        !response.ok ||
        result?.ok !== true ||
        result.id !== applicationId.current
      )
        throw new Error(
          result?.error ||
            "We could not confirm your application was saved. Please retry.",
        )
      setSent(true)
    } catch (err) {
      setError(
        err instanceof Error && err.name === "Error"
          ? err.message
          : "We could not confirm your application was saved. Please retry; retrying will not create a duplicate.",
      )
    } finally {
      busy.current = false
      setSubmitting(false)
    }
  }
  if (sent)
    return (
      <div className="grain-bg min-h-[65vh] px-6 py-32 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-6xl">✓</p>
          <h1 className="serif mb-5 text-5xl font-bold text-white">
            Application received
          </h1>
          <p className="leading-relaxed text-navy-200">
            Thank you for your interest in X'ccelerate. Our team will review
            your details and get in touch with the next steps.
          </p>
          <Link
            to="/xcelerate"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-950"
          >
            Back to directory
          </Link>
        </div>
      </div>
    )
  return (
    <div className="bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/xcelerate" className="text-sm font-bold text-teal-700">
          ← Back to partner directory
        </Link>
        <div className="mb-10 mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-teal-600">
            X'ccelerate application
          </p>
          <h1 className="serif text-5xl font-bold text-navy-950">
            Tell us about yourself
          </h1>
          <p className="mt-4 leading-relaxed text-slate-500">
            Share a few details so we can understand your interests and explore
            suitable opportunities with our partner organisations.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <fieldset disabled={submitting} className="space-y-6">
            <div className="initiative-card grid gap-5 p-7 md:grid-cols-2">
              {[
                ["Full name", "text", true, "name"],
                ["Email address", "email", true, "email"],
                ["School or institution", "text", false, "school"],
                ["Year of study", "text", false, "year"],
              ].map(([label, type, required, name]) => (
                <label
                  key={String(label)}
                  className="text-sm font-bold text-navy-950"
                >
                  {String(label)}
                  <input
                    name={String(name)}
                    maxLength={
                      name === "year" ? 100 : name === "email" ? 254 : 200
                    }
                    required={Boolean(required)}
                    type={String(type)}
                    className="mt-2 w-full rounded-xl border border-navy-100 p-3 font-normal outline-none focus:border-teal-500"
                    placeholder={required ? "" : "Optional"}
                  />
                </label>
              ))}
              <label className="text-sm font-bold text-navy-950 md:col-span-2">
                Major or area of study
                <input
                  name="major"
                  maxLength={200}
                  required
                  className="mt-2 w-full rounded-xl border border-navy-100 p-3 font-normal outline-none focus:border-teal-500"
                />
              </label>
            </div>
            <div className="initiative-card p-7">
              <label className="block text-sm font-bold text-navy-950">
                Preferred company
                <select
                  name="company"
                  className="mt-2 w-full rounded-xl border border-navy-100 p-3 font-normal outline-none focus:border-teal-500"
                >
                  {companies.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <p className="mb-3 mt-6 text-sm font-bold text-navy-950">
                Interested sectors
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {sectors.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <input
                      name="sectors"
                      value={s}
                      type="checkbox"
                      className="h-4 w-4 accent-teal-600"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className="initiative-card p-7">
              <label className="block text-sm font-bold text-navy-950">
                Resume
                <input
                  name="resume"
                  required
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 block w-full rounded-xl border border-dashed border-navy-200 bg-slate-50 p-4 font-normal"
                />
              </label>
              <p className="mt-2 text-xs text-slate-500">
                PDF or Word document, up to 2 MB. Your résumé is shared with the
                HealthX team for application review.
              </p>
              <label className="mt-6 block text-sm font-bold text-navy-950">
                Interview availability{" "}
                <span className="font-normal text-slate-400">(optional)</span>
                <textarea
                  name="availability"
                  maxLength={3000}
                  className="mt-2 min-h-28 w-full rounded-xl border border-navy-100 p-3 font-normal outline-none focus:border-teal-500"
                  placeholder="Share a few dates and times that generally work for you, or leave blank for our team to arrange a time."
                />
              </label>
            </div>
          </fieldset>
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            disabled={submitting}
            type="submit"
            className="rounded-full bg-navy-950 px-8 py-4 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit application →"}
          </button>
        </form>
      </div>
    </div>
  )
}
