module.exports = async function runSeeders() {
  console.log("Running seeders");
  await require("./userSeeder")();
};