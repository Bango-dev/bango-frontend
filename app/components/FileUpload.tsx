"use client";

import React, { useState, useRef, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { LuUpload } from "react-icons/lu";

type Props = {
  onFileSelect: (file: Blob | null) => void;
  initial?: string | File | Blob | null;
  readonly?: boolean;
  label?: string;
  description?: string;
  error?: string ;
};

export default function FileUpload({
  onFileSelect,
  initial = null,
  readonly = false,
  label = "Image",
  description = "You can add a picture of the item you bought to help others identify it.",
  error = null,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Convert HEIC to JPEG if needed */
  const processFile = async (file: File): Promise<Blob> => {
    const { isHeic, heicTo } = await import("heic-to");

    if (await isHeic(file)) {
      return heicTo({
        blob: file,
        type: "image/jpeg",
        quality: 0.8,
      });
    }

    return file; // already fine
  };

  /** Load initial value (string URL or File/Blob) */
  useEffect(() => {
    if (!initial) return setPreviewUrl(null);

    // Clean old URL
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (typeof initial === "string") {
      setPreviewUrl(initial);
      return;
    }

    if (initial instanceof File || initial instanceof Blob) {
      const url = URL.createObjectURL(initial);
      setPreviewUrl(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  /** Handle user selecting a file */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setPreviewUrl(null);
      onFileSelect(null);
      return;
    }

    try {
      setLoading(true);

      const processedBlob = await processFile(file);

      // Clean old preview
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const url = URL.createObjectURL(processedBlob);
      setPreviewUrl(url);

      onFileSelect(processedBlob); // send Blob, not base64
    } catch (err) {
      console.error("Image processing error:", err);
      setPreviewUrl(null);
      onFileSelect(null);
    } finally {
      setLoading(false);
    }
  };

  /** Remove file */
  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onFileSelect(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs sm:text-sm font-bold text-[#1E1E1E] flex items-center gap-1">
        {label}
        <span className="text-red-500">*</span>
      </label>

      {description && (
        <p className="sm:text-base text-xs text-[#757575] mb-1">
          {description}
        </p>
      )}

      {/* Preview UI */}
      {previewUrl && (
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover rounded-md"
          />

          {!readonly && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100 cursor-pointer"
            >
              <ImCancelCircle className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      )}

      {/* Upload Box */}
      {!readonly && !previewUrl && (
        <label
          className={`flex flex-col items-center justify-center border-2 border-dotted rounded-md h-48 w-full cursor-pointer transition
             ${
               error
                 ? "border-red-500 bg-red-50"
                 : "border-gray-300 hover:border-(--color-primary)"
             }
           `}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin"
                style={{ borderTopColor: "var(--color-primary)" }}
              ></div>
              <span className="text-gray-500 text-sm">Processing image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <LuUpload className="w-8 h-8" />
              <span className="text-sm">Click to upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            required
          />
        </label>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
