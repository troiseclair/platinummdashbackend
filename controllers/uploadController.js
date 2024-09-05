const uploadClodinary = require("../middlewares/cloudinary");

const uploadImage = async (req, res) => {
  try {
    url = await uploadClodinary(req.file.path);
    console.log("Ini controller upload", url);
  } catch (error) {
    url =
      "https://res.cloudinary.com/dydjwts7v/image/upload/c_thumb,w_200,g_face/v1724279963/blank-profile-picture-973460_640_wr3fyq.png";
    console.log(error);
  }
  let imageUrl = url;

  if (imageUrl) {
    return res.json({
      message: "Upload berhasil",
      image: imageUrl,
    });
  } else {
    return res.json({
      message: "Upload Gagal",
    });
  }
};

module.exports = { uploadImage };
