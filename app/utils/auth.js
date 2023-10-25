import axios from "axios";
import { parseCookies, setCookie } from "nookies";

export async function getTokenOrRefresh() {
  const cookies = parseCookies();
  const speechToken = cookies["speech-token"];

  if (!speechToken) {
    try {
      const res = await axios.get("/api/get-speech-token");
      const token = res.data.token;
      const region = res.data.region;
      setCookie(null, "speech-token", region + ":" + token, {
        maxAge: 540,
        path: "/",
      });

      console.log("Token fetched from back-end: " + token);
      return { authToken: token, region: region };
    } catch (err) {
      console.error(err.response.data);
      return { authToken: null, error: err.response.data };
    }
  } else {
    console.log("Token fetched from cookie: " + speechToken);
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  }
}
