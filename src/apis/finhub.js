import axios from "axios";

const TOKEN = "cf2ubqqad3i7csbbqii0cf2ubqqad3i7csbbqiig";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
