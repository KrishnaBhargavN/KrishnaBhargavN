import { AZURE_REGION, AZURE_SPEECH_KEY } from "@/app/utils/constants";
import axios from "axios";

export async function GET(request) {
  const speechKey = AZURE_SPEECH_KEY;
  const speechRegion = AZURE_REGION;

  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    const token = tokenResponse.data;
    return token;
  } catch (err) {
    console.log(err);
  }
  const product = await res.json();

  return Response.json({ product });
}
