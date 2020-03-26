require("dotenv").config();

export const configuration = {
  baseUrl: process.env.BASEURL,
  username: process.env.EMAIL,
  password: process.env.PASSWORD,
};
