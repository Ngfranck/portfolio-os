import { NextRequest } from "next/server";

import { handlers } from "@/auth";

const appBasePath =
  process.env.NODE_ENV === "production" ? "/admin" : "";

function withAppBasePath(handler: typeof handlers.GET) {
  return (request: NextRequest) => {
    if (!appBasePath) {
      return handler(request);
    }

    const url = new URL(request.url);
    if (
      url.pathname !== appBasePath &&
      !url.pathname.startsWith(`${appBasePath}/`)
    ) {
      url.pathname = `${appBasePath}${url.pathname}`;
    }

    return handler(new NextRequest(url, request));
  };
}

export const GET = withAppBasePath(handlers.GET);
export const POST = withAppBasePath(handlers.POST);
