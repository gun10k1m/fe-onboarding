import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import dotenv from "dotenv";
import { Buffer } from "node:buffer";

dotenv.config();

const CONFLUENCE_API = process.env.VITE_CONFLUENCE_API;

if (!CONFLUENCE_API) {
  throw new Error("❌ VITE_CONFLUENCE_API is not defined in environment.");
}

export default defineConfig({
  plugins: [tailwindcss(), react(), mdx()],
  // 개발 환경에서만 작동함
  server: {
    proxy: {
      "/api/confluence": {
        target: CONFLUENCE_API,
        changeOrigin: true,

        rewrite: (path) => {
          const url = new URL("http://localhost" + path);
          const pageId = url.searchParams.get("pageId");
          const spaceKey = url.searchParams.get("spaceKey") || "P10K1M";
          const list = url.pathname.includes("/pages");
          const isSearch = url.pathname.includes("/search");
          const query = url.searchParams.get("q");

          // ✅ [1] 검색용: /api/confluence/search?q=Frontend
          if (isSearch && query) {
            return `/content/search?cql=title~"${query}" AND space="${spaceKey}"`;
          }

          // ✅ [2] 페이지 목록: /api/confluence/pages?spaceKey=P10K1M
          if (list) {
            return `/content?spaceKey=${spaceKey}&type=page&expand=version,ancestors`;
          }

          // ✅ [3] 단일 페이지 내용: /api/confluence?pageId=801406992
          if (pageId) {
            return `/content/${pageId}?expand=body.view`;
          }

          return ""; // fallback
        },

        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            const email = process.env.CONFLUENCE_EMAIL;
            const token = process.env.CONFLUENCE_TOKEN;

            if (!email || !token) {
              console.error("🚨 Missing Confluence credentials in .env");
              return;
            }

            const auth = Buffer.from(`${email}:${token}`).toString("base64");
            proxyReq.setHeader("Authorization", `Basic ${auth}`);
            proxyReq.setHeader("Accept", "application/json");

            console.log("🔐 Confluence Auth Set");
          });
        },
      },
    },
  },
});
