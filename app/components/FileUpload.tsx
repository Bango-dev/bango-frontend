"use client";

import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { LuUpload } from "react-icons/lu";

type Props = {
  onFileSelect: (fileBase64: string | null) => void;
  initial?: string | File | null;
  readonly?: boolean;
  error?: string | null;
  label?: string;
  description?: string;
};

export default function FileUpload({
  onFileSelect,
  initial = null,
  readonly = false,
  error = null,
  label = "Image",
  description = "You can add a picture of the item you bought to help others identify it.",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileToBase64 = async (file: File) => {
    let processedBlob: Blob = file;

    // Convert HEIC/HEIF to JPEG
    if (file.type === "image/heic" || file.type === "image/heif") {
      const heic2any = (await import("heic2any")).default;
      processedBlob = (await heic2any({
        blob: file,
        toType: "image/jpeg",
      })) as Blob;
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(processedBlob);
    });
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!initial) return setPreview(null);

      if (typeof initial === "string") return setPreview(initial);

      if (initial instanceof File) {
        try {
          setLoading(true);
          const b64 = await fileToBase64(initial);
          if (mounted) setPreview(b64);
        } catch {
          if (mounted) setPreview(null);
        } finally {
          if (mounted) setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [initial]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPreview(null);
      onFileSelect(null);
      return;
    }

    try {
      setLoading(true);
      const base64 = await fileToBase64(file);
      setPreview(base64);
      onFileSelect(base64);
    } catch {
      setPreview(null);
      onFileSelect(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      <label className="text-xs sm:text-sm font-bold text-[#1E1E1E] flex items-center gap-1">
        {label}
        {error && <span className="text-red-500">*</span>}
      </label>

      {/* Description */}
      {description && (
        <p className="sm:text-sm text-xs text-[#757575] mb-1">{description}</p>
      )}

      {/* Upload box */}
      {!readonly && (
        <label
          className={`flex flex-col items-center justify-center border-2 border-dotted rounded-md h-48 w-full cursor-pointer transition relative
          ${
            error ? "border-red-500" : "border-gray-400 hover:border-gray-600"
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <div
                className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin"
                style={{ borderTopColor: "var(--color-primary)" }}
              ></div>
              <span className="text-gray-500 text-sm">Uploading image...</span>
            </div>
          ) : preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100"
                aria-label="Remove image"
              >
                <ImCancelCircle className="w-4 h-4 text-gray-600" />
              </button>
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
            className="hidden"
          />
        </label>
      )}

      {/* readonly mode */}
      {readonly && preview && (
        <div className="w-full rounded-md overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      )}

      {/* Error message */}
      {error && !readonly && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
