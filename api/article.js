export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const userMessage = req.body.message;
    const userApiKey = req.headers['x-api-key'];

    if (!userApiKey) {
      return res.status(401).json({ error: 'Missing API key.' });
    }

    if (typeof userMessage !== 'string' || userMessage.trim() === '') {
      return res.status(400).json({ error: 'Invalid or empty message content.' });
    }

    const baseHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userApiKey}`,
    };

    // First call: Generate the article content
    const articlePayload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Generate a detailed article based on the following input.",
        },
        { role: "user", content: userMessage },
      ],
    };

    const articleResponse = await fetch(
      "https://is215-openai.upou.io/v1/chat/completions",
      {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(articlePayload),
      }
    );

    const articleData = await articleResponse.json();
    console.log("DEBUG: Article content response", JSON.stringify(articleData, null, 2));

    const articleContent = articleData.choices?.[0]?.message?.content;
    if (!articleContent) {
      return res
        .status(500)
        .json({ error: "Failed to generate article content" });
    }

    // Second call: Generate the title based on the article content
    const titlePayload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Generate a suitable title for this article.",
        },
        { role: "user", content: articleContent },
      ],
    };

    const titleResponse = await fetch(
      "https://is215-openai.upou.io/v1/chat/completions",
      {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(titlePayload),
      }
    );

    const titleData = await titleResponse.json();
    console.log("DEBUG: Title generation response", JSON.stringify(titleData, null, 2));

    const articleTitle = titleData.choices?.[0]?.message?.content;
    if (!articleTitle) {
      return res
        .status(500)
        .json({ error: "Failed to generate article title" });
    }

    return res.status(200).json({
      title: articleTitle.trim(),
      content: articleContent.trim(),
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
