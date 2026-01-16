import api from "./api";

export async function uploadToCloudinary(file: Blob | File) {
  try {
    console.log("=== CLOUDINARY UPLOAD DEBUG ===");
    console.log("1. Requesting signature from backend...");

    const response = await api.get("/upload/signature");

    // ✅ Log the ENTIRE response
    // console.log("2. Full response:", response);
    // console.log("3. Response data:", response.data.entity);

    const sig = response.data.entity;

    // ✅ Log each field individually
    // console.log("4. Signature object:", sig);
    // console.log("5. cloudName:", sig.cloudName);
    // console.log("6. apiKey:", sig.apiKey);
    // console.log("7. timestamp:", sig.timestamp);
    // console.log("8. signature:", sig.signature);
    // console.log("9. folder:", sig.folder);

    // ✅ Check what's undefined
    // console.log("10. Type checks:");
    // console.log("   - cloudName is undefined?", sig.cloudName === undefined);
    // console.log("   - cloudName is null?", sig.cloudName === null);
    // console.log("   - cloudName type:", typeof sig.cloudName);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", sig.timestamp);
    formData.append("signature", sig.signature);
    formData.append("folder", sig.folder);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

    // console.log("11. Cloudinary URL:", cloudinaryUrl);
    // console.log("=== END DEBUG ===");

    const uploadRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error("Cloudinary upload failed:", {
        status: uploadRes.status,
        statusText: uploadRes.statusText,
        response: errorText,
      });
      throw new Error("Upload to Cloudinary failed");
    }

    return uploadRes.json();
  } catch (error) {
    console.error("=== UPLOAD ERROR ===");
    console.error("Error details:", error);
    throw error;
  }
}
