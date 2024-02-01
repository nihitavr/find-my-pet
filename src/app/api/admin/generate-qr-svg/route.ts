import { type NextRequest } from "next/server";
import { api } from "~/lib/trpc/server";

export async function GET(request: NextRequest) {
  const qrCount = request.nextUrl.searchParams.get("qrCount") ?? 1;

  const petTags = await api.petTag.generatePetTags.mutate({
    qrCount: +qrCount,
  });

  return new Response(JSON.stringify(petTags), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
