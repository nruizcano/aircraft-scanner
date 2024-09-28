import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { base64Image } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `If there is an aircraft in the image, respond with information about it, regarding it's model, manufacturer and main characteristics. If there is no aircraft in the image, response with "No aircraft defected...".`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();

    if (response.ok) {
      return NextResponse.json(responseData);
    } else {
      console.error("API response error:", response.status, response.statusText, responseData);
      return NextResponse.json({ error: response.statusText, details: responseData }, { status: response.status });
    }
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    return NextResponse.json({ error: "Error processing the image" }, { status: 500 });
  }
}