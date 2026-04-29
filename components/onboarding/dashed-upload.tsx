"use client"

import { useId, useRef, useState } from "react"
import { FileText, Upload } from "lucide-react"

type DashedUploadProps = {
  /** Placeholder shown when no file is selected. */
  placeholder?: string
  /** Accept attribute forwarded to the file input. */
  accept?: string
  /** Optional label rendered above the upload box. */
  label?: string
}

/**
 * Dashed-bordered upload control matching the marketing/onboarding forms.
 * Self-contained: handles its own selected-file state and click forwarding.
 */
export function DashedUpload({
  placeholder = "Office photo in image format",
  accept = "image/*,application/pdf",
  label,
}: DashedUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-base font-semibold text-slate-900"
        >
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-between gap-3 rounded-md border-2 border-dashed border-slate-300 bg-white px-4 py-2.5 text-left transition-colors hover:border-slate-400 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200"
      >
        <span className="flex items-center gap-3 truncate">
          <FileText
            className="h-5 w-5 shrink-0 text-rose-400"
            aria-hidden="true"
          />
          <span className="truncate text-sm text-slate-400">
            {file ? file.name : placeholder}
          </span>
        </span>
        <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
          <Upload className="h-4 w-4" aria-hidden="true" />
          Upload
        </span>
      </button>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
    </div>
  )
}
