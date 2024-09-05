const db = require("../lib/db");
const sprintf = require("sprintf-js").sprintf;

/* POST /users : add new users data */
const postusers = async (req, res) => {
  /* get user input */
  const { name, birthDate, gender, phone, email, hireDate, position, image } =
    req.body;
  /* new users id generator */
  try {
    let getData = await db("tb_users").select("id").orderBy("id", "asc");
    let lastId = await getData.at(-1);
    let lastIdSplit = lastId.id.split("_").at(-1);
    nextId = ++lastIdSplit;
  } catch (error) {
    nextId = "0001";
    console.log(error);
  }
  let code = "emp_";
  const newId = code + sprintf("%04s", nextId);
  /* image url check */
  const defaultImage =
    "https://res.cloudinary.com/dydjwts7v/image/upload/c_thumb,w_200,g_face/v1724313771/blank-profile-picture-973460_640_cbftdd.png";
  const imageUrl = image.length > 1 ? image : defaultImage;
  // /* number check */
  // const phoneInt = parseInt(phone);
  // const phoneCheck =
  //   isNaN(phoneInt) || phoneInt < 0 || phone[0] == 0 ? 0 : phoneInt;
  /* insert into table product */
  const users = await db("tb_users")
    .insert({
      id: newId,
      name: name,
      birth_date: birthDate,
      gender: gender,
      phone: phone,
      email: email,
      hire_date: hireDate,
      position: position,
      image: imageUrl,
    })
    .returning([
      "id",
      "name",
      "birth_date",
      "gender",
      "phone",
      "email",
      "hire_date",
      "position",
      "image",
    ]);
  // console.log("users", users);
  /* response */
  res.status(200).json({
    status: true,
    message: "Berhasil Menambahkan Data Karyawan",
    data: users,
  });
};

/* GET /users : get all data users */
const getusers = async (req, res) => {
  /* get all users from table users */
  const users = await db("tb_users").select("*").orderBy("id", "asc");
  /* response */
  res.status(200).json({
    status: true,
    message: "Berhasil Mengambil Semua Data Karyawan",
    data: users,
  });
};

/* GET /users/:id get users data by id */
const getusersId = async (req, res) => {
  /* get users by id */
  const users = await db("tb_users")
    .select("*")
    .where({ id: req.params.id })
    .first();
  console.log(users);
  /* response */
  res.status(200).json({
    status: true,
    message: `Behasil Mengambil Data Karyawan Dengan ID : ${req.params.id}`,
    data: users,
  });
};

/* PUT /users/update/:id update users data by id */
const updateusers = async (req, res) => {
  /* get user input */
  const { name, birthDate, gender, phone, email, hireDate, position, image } =
    req.body;
  console.log(name);
  /* number check */
  // const phoneInt = parseInt(phone);
  // const phoneCheck =
  //   isNaN(phoneInt) || phoneInt < 0 || phone[0] == 0 ? 0 : phoneInt;
  /* update table users */
  const users = await db("tb_users")
    .where({ id: req.params.id })
    .update({
      name: name,
      birth_date: birthDate,
      gender: gender,
      phone: phone,
      email: email,
      hire_date: hireDate,
      position: position,
      image: image,
    })
    .returning([
      "id",
      "birth_date",
      "gender",
      "phone",
      "email",
      "hire_date",
      "position",
      "image",
    ]);
  /* response */
  res.status(200).json({
    status: true,
    message: `Behasil Mengubah Data Karyawan Dengan ID : ${req.params.id}`,
    data: users,
  });
};

/* DELETE /users/delete/:id delete users data by id */
const deleteusersId = async (req, res) => {
  /* delete users by id from table users */
  await db("tb_users").where({ id: req.params.id }).del();
  /* response */
  res.status(200).json({
    status: true,
    message: `Data Karyawan Dengan ID : ${req.params.id}, Berhasil Dihapus`,
  });
};

module.exports = {
  postusers,
  getusers,
  getusersId,
  updateusers,
  deleteusersId,
};
