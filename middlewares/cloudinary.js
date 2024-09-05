const cloudinary = require("cloudinary").v2;
const fs = require("fs");

/* setup cloudinary */
cloudinary.config({
  cloud_name: "defg75zo5",
  api_key: "956915941397839",
  api_secret: "bWznWXOmgiWbUC25YS26n2UCpFw",
});

// fungsi upload ke cloudinary
async function uploadClodinary(filePath) {
  let result;
  try {
    result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      /* Tambahan Untuk Upload Video */
      resource_type: "auto",
    });
    // hapus file yang sudah diupload
    fs.unlinkSync(filePath);
    return result.url;
  } catch (err) {
    console.log("err", err);
    // hapus file yang gagal diupload
    fs.unlinkSync(filePath);
    return null;
  }
}

module.exports = uploadClodinary;
