import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

/** Resolve MIME type from file extension */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap: Record<string, string> = {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".heic": "image/heic",
    ".heif": "image/heif",
  };
  return mimeMap[ext] || "application/octet-stream";
}

function videoRangeRequestPlugin() {
  return {
    name: "video-range-request",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url?.startsWith("/videos/")) return next();

        const filePath = path.resolve(
          __dirname,
          "public",
          req.url.slice(1) // strips leading "/"
        );

        if (!fs.existsSync(filePath)) return next();

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers["range"] as string | undefined;
        const contentType = getMimeType(filePath);

        if (range) {
          const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
          const start = parseInt(startStr, 10);
          const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
          const chunkSize = end - start + 1;

          res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": contentType,
          });
          fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
          res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": contentType,
            "Accept-Ranges": "bytes",
          });
          fs.createReadStream(filePath).pipe(res);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    videoRangeRequestPlugin(),
  ].filter(Boolean),
  assetsInclude: ["**/*.MOV", "**/*.mov", "**/*.heic", "**/*.HEIC"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
