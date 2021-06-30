const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { User } = require("../models");
const { response } = require("express");
const AWS = require("aws-sdk");

module.exports = {
  index: async (req, res) => {
    const usuarios = await User.findAll();
    res.render("users", { users: usuarios });
  },

  storeLocal: async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    // Si no usaramos formidable (porque no tenemos imagenes, por ejemplo)
    // podriamos acceder a estas propiedades usando algo como: "req.body.firstname"

    form.parse(req, async (err, fields, files) => {
      // console.log(fields.firstname);
      // console.log(fields.lastname);
      // console.log(path.basename(files.avatar.path));

      await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        avatar: path.basename(files.avatar.path),
      });

      res.redirect("/usuarios");
    });
  },

  storeInS3: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log("Parse");
      // Configuración del SDK de Amazon para conectarnos a nuestra cuenta
      AWS.config.update({
        region: process.env.AWS_S3_BUCKET_REGION,
      });

      // Creo una instancia de S3 para conectarme con el bucket
      const s3 = new AWS.S3({
        apiVersion: process.env.AWS_S3_API_VERSION,
        accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
      });

      // Obtener extensión y nombre del archivo para subir
      const ext = path.extname(files.avatar.path);
      const filename = `image_${Date.now()}${ext}`; // Es lo mismo que: const filename = 'image_' + Date.now() + ext;

      // Subir archivo a S3
      await s3
        .upload({
          ACL: "public-read",
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `avatars/${filename}`,
          ContentType: files.avatar.type, // Sacar de formidable
          Body: fs.createReadStream(files.avatar.path), // Sacar de formidable
        })
        .promise();

      await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        avatar: filename,
      });

      res.redirect("/usuarios");
    });
  },

  create: async (req, res) => {
    res.render("createUser");
  },
};
