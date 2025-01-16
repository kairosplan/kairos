// /api/health endpoint with astro
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      health: "ok",
      time: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
