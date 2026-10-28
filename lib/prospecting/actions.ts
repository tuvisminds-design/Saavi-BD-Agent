"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { addManualSignal, deleteCompany, pasteLinkedIn, resolveReview } from "@/lib/prospecting/db"

export async function pasteLinkedInAction(formData: FormData) {
  const companyId = String(formData.get("companyId") ?? "")
  const result = pasteLinkedIn({
    executiveId: Number(formData.get("executiveId")),
    url: String(formData.get("url") ?? ""),
    pastedBy: String(formData.get("pastedBy") ?? ""),
  })
  if (!result.ok) {
    redirect(`/companies/${companyId}?error=${encodeURIComponent(result.error)}`)
  }
  revalidatePath(`/companies/${companyId}`)
  revalidatePath("/")
  revalidatePath("/review")
}

export async function addSignalAction(formData: FormData) {
  const result = addManualSignal({
    companyId: Number(formData.get("companyId")),
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
    publishedAt: String(formData.get("publishedAt") ?? ""),
  })
  if (!result.ok) redirect(`/signals?error=${encodeURIComponent(result.error)}`)
  revalidatePath("/signals")
  revalidatePath("/")
}

export async function deleteCompanyAction(formData: FormData) {
  if (formData.get("confirm") !== "on") {
    redirect(`/companies/${String(formData.get("id") ?? "")}?error=${encodeURIComponent("Confirm the deletion.")}`)
  }
  deleteCompany(Number(formData.get("id")))
  revalidatePath("/")
  revalidatePath("/review")
  revalidatePath("/signals")
  redirect("/")
}

export async function resolveReviewAction(formData: FormData) {
  const decision = String(formData.get("decision") ?? "")
  if (decision !== "accepted" && decision !== "rejected") return
  resolveReview(Number(formData.get("id")), decision)
  revalidatePath("/review")
  revalidatePath("/")
}
