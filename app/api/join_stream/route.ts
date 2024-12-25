import { Controller, JoinStreamParams } from "@/app/libs/controller";

// TODO: validate request with Zod

export async function POST(req: Request) {
  const controller = new Controller();

  try {
    const reqBody = await req.json();
    const response = await controller.joinStream(reqBody as JoinStreamParams);

    return Response.json(response);
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}