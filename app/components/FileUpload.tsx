"use client";

import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { LuUpload } from "react-icons/lu";

type Props = {
  onFileSelect: (fileBase64: string | null) => void;
  initial?: string | File | null;
  readonly?: boolean;
};

export default function FileUpload({
  onFileSelect,
  initial = null,
  readonly = false,
}: Props) {
  // preview holds a data URL (string) used directly in <img src={preview} />
  const [preview, setPreview] = useState<string | null>(null);

  // Helper: convert File -> base64 data URL
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    // Normalize `initial` into a data URL preview if possible
    let mounted = true;
    (async () => {
      if (!initial) {
        if (mounted) setPreview(null);
        return;
      }

      // If initial is a string that looks like a data URL, use directly
      if (typeof initial === "string") {
        if (mounted) setPreview(initial);
        return;
      }

      // If initial is a File, convert to base64 and set preview
      if (initial instanceof File) {
        try {
          const b64 = await fileToBase64(initial);
          if (mounted) setPreview(b64);
        } catch {
          if (mounted) setPreview(null);
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
      onFileSelect(null);
      setPreview(null);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      // Send base64 string to parent (serializable, safe for storage)
      onFileSelect(base64);
      setPreview(base64);
    } catch {
      onFileSelect(null);
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label and description */}
      <label className="text-xs sm:text-xl font-bold text-[#1E1E1E]">
        Image
      </label>
      <p className="sm;text-base text-xs text-[#757575] mb-1">
        You can add a picture of the item you bought to help others identify it.
      </p>

      {/* Upload box */}
      {!readonly && (
        <label className="flex flex-col items-center justify-center border-2 border-dotted border-gray-400 rounded-md h-48 w-full cursor-pointer hover:border-gray-600 transition relative">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
              {/* Remove button */}
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

      {/* readonly mode: show preview only */}
      {readonly && preview && (
        <div className="w-full rounded-md overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}
