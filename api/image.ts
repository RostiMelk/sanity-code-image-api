import { createImage } from "../src/createImage";
import { Snippet } from "../src/types";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = Snippet.parse(body);
  const imageResponse = await createImage(parsedBody);

  if (!imageResponse) {
    return new Response("Failed to generate image", { status: 500 });
  }

  return imageResponse;
}
