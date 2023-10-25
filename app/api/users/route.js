export async function POST(request) {
  const res = await fetch(`https://api.oneai.com/api/v0/pipeline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": "874a8f24-ce81-428e-9c4b-19b6c829edd3",
    },
    body: JSON.stringify({
      input:
        "Whether to power translation to document summarization, enterprises are increasing their investments in natural language processing (NLP) technologies. According to a 2021 survey from John Snow Labs and Gradient Flow, 60% of tech leaders indicated that their NLP budgets grew by at least 10% compared to 2020, while a third said that spending climbed by more than 30%",
      steps: [
        {
          skill: "summarize",
        },
      ],
    }),
  });
  const product = await res.json();

  return Response.json({ product });
}
