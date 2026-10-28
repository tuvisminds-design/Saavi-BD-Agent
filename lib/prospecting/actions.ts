"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { addManualSignal, deleteCompany, pasteLinkedIn, resolveReview } from "@/lib/prospecting/db"

function safeNext(value: FormDataEntryValue | null, fallback: string) {
  const next = String(value ?? "")
  if (next.startsWith("/") && !next.startsWith("//") && !next.includes("://")) return next
  return fallback
}

export async function pasteLinkedInAction(formData: FormData) {
  const companyId = String(formData.get("companyId") ?? "")
  const back = safeNext(formData.get("next"), `/companies/${companyId}`)
  const result = pasteLinkedIn({
    executiveId: Number(formData.get("executiveId")),
    url: String(formData.get("url") ?? ""),
    pastedBy: String(formData.get("pastedBy") ?? ""),
  })
  if (!result.ok) {
    redirect(`${back}?error=${encodeURIComponent(result.error)}`)
  }
  revalidatePath(`/companies/${companyId}`)
  revalidatePath(`/m/companies/${companyId}`)
  revalidatePath("/")
  revalidatePath("/m")
  revalidatePath("/review")
  revalidatePath("/m/review")
}

export async function addSignalAction(formData: FormData) {
  const result = addManualSignal({
    companyId: Number(formData.get("companyId")),
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
    publishedAt: String(formData.get("publishedAt") ?? ""),
  })
  const back = safeNext(formData.get("next"), "/signals")
  if (!result.ok) redirect(`${back}?error=${encodeURIComponent(result.error)}`)
  revalidatePath("/signals")
  revalidatePath("/m/signals")
  revalidatePath("/")
  revalidatePath("/m")
}

export async function deleteCompanyAction(formData: FormData) {
  const back = safeNext(formData.get("next"), "/")
  if (formData.get("confirm") !== "on") {
    redirect(`${back}?error=${encodeURIComponent("Confirm the deletion.")}`)
  }
  deleteCompany(Number(formData.get("id")))
  revalidatePath("/")
  revalidatePath("/m")
  revalidatePath("/review")
  revalidatePath("/m/review")
  revalidatePath("/signals")
  revalidatePath("/m/signals")
  redirect(back === `/m/companies/${String(formData.get("id") ?? "")}` ? "/m" : back.startsWith("/m") ? "/m" : "/")
}

export async function resolveReviewAction(formData: FormData) {
  const decision = String(formData.get("decision") ?? "")
  if (decision !== "accepted" && decision !== "rejected") return
  resolveReview(Number(formData.get("id")), decision)
  revalidatePath("/review")
  revalidatePath("/m/review")
  revalidatePath("/")
  revalidatePath("/m")
}
