import { NextRequest } from "next/server";

function getContentType(filename: string): string {
  if (filename.endsWith(".msi")) return "application/x-msi";
  if (filename.endsWith(".exe")) return "application/vnd.microsoft.portable-executable";
  if (filename.endsWith(".dmg")) return "application/x-apple-diskimage";
  if (filename.endsWith(".deb")) return "application/vnd.debian.binary-package";
  if (filename.endsWith(".AppImage")) return "application/x-executable";
  if (filename.endsWith(".tar.xz")) return "application/x-xz";
  if (filename.endsWith(".zip")) return "application/zip";
  return "application/octet-stream";
}

async function handleDownload(
  request: NextRequest,
  paramsPromise: Promise<{ version: string; filename: string }>
) {
  const { version, filename } = await paramsPromise;

  if (!version || !filename || filename.includes("/") || filename.includes("..")) {
    return new Response("Invalid file request", { status: 400 });
  }

  const upstreamUrl = `https://github.com/CineRename/CineRename-Releases/releases/download/${version}/${filename}`;

  try {
    const upstreamRes = await fetch(upstreamUrl, {
      method: request.method === "HEAD" ? "HEAD" : "GET",
      redirect: "follow",
    });

    if (!upstreamRes.ok) {
      return new Response("Release file not found", { status: upstreamRes.status });
    }

    const headers = new Headers();
    headers.set("Content-Type", getContentType(filename));
    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");

    if (request.method === "HEAD") {
      return new Response(null, {
        status: 200,
        headers,
      });
    }

    return new Response(upstreamRes.body, {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(`Failed to fetch release file: ${err instanceof Error ? err.message : String(err)}`, {
      status: 502,
    });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ version: string; filename: string }> }
) {
  return handleDownload(request, context.params);
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<{ version: string; filename: string }> }
) {
  return handleDownload(request, context.params);
}
