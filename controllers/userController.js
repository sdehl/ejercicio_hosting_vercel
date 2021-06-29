const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { User } = require("../models");
const { response } = require("express");

module.exports = {
  index: async (req, res) => {
    const usuarios = await User.findAll();
    res.render("users", { users: usuarios });
  },

  store: async (req, res) => {    
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

      res.redirect('/usuarios');
    
    });
  },

  create: async (req, res) => {
    res.render("createUser");
  },
};
