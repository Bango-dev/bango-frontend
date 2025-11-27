import api from "./api";

export async function uploadToCloudinary(file: Blob | File) {
  const { data: sig } = await api.get("/upload/signature");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", sig.timestamp);
  formData.append("signature", sig.signature);
  formData.append("folder", sig.folder);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

  const uploadRes = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload to Cloudinary failed");
  }

  return uploadRes.json();
}
