const { User } = require("../models");

module.exports = async () => {
  const users = [];

  users.push({
    firstname: "Maria",
    lastname: "Perez",
    avatar: "avatar_1.png",
  });

  users.push({
    firstname: "Juan",
    lastname: "Lopez",
    avatar: "avatar_2.png",
  });

  users.push({
    firstname: "Victoria",
    lastname: "Gomez",
    avatar: "avatar_3.png",
  });

  users.push({
    firstname: "Pedro",
    lastname: "Rodriguez",
    avatar: "avatar_4.png",
  });
 
  await User.bulkCreate(users);

  console.log("[Database] Se corrió el seeder de Users.");
};
