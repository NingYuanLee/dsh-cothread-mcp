/**
 * @module dsh-cothread-mcp
 *
 * 把共序 CoThread 的远程 MCP（Streamable HTTP）挂到 DeepSeek Harness。
 *
 * 令牌只从插件配置读取，不写进源码，也不写进日志：连接失败时只报地址与状态，
 * 不打印 Authorization 头的值。
 */
import { apply as connectMcp, Config as McpConfig } from "@deepseek-ai/dsh-mcp-client";
import z from "@deepseek-ai/schemastery";

export const name = "cothread-mcp";
export const inject = ["tools"];

const DEFAULT_URL = "https://cothread.z2l.top/mcp";
const SERVER_NAME = /^[A-Za-z0-9_-]{1,32}$/;
const TOOL_CALL_TIMEOUT_MS = 180_000;

export const Config = z.object({
  url: z.string().default(DEFAULT_URL),
  serverName: z.string().pattern(SERVER_NAME).default("cothread-mcp"),
  token: z.string().default(""),
  toolCallTimeoutMs: z.number().default(TOOL_CALL_TIMEOUT_MS),
});

const mcpPlugin = {
  name: "cothread-mcp-connection",
  inject: ["tools"],
  Config: McpConfig,
  apply: connectMcp,
};

export function cothreadHeaders(token) {
  const key = String(token || "").trim();
  if (key === "") return undefined;
  if (/[\r\n]/.test(key)) throw new Error("CoThread 令牌必须是单行文本");
  return { Authorization: `Bearer ${key}` };
}

export function cothreadEndpoint(raw) {
  const url = new URL(String(raw || DEFAULT_URL));
  if (url.protocol !== "https:" && url.protocol !== "http:")
    throw new Error("CoThread MCP 地址必须使用 http 或 https");
  if (url.username !== "" || url.password !== "")
    throw new Error("CoThread MCP 地址不能携带账号密码");
  return url.href;
}

export async function apply(ctx, config) {
  let endpoint;
  let headers;
  try {
    endpoint = cothreadEndpoint(config.url);
    headers = cothreadHeaders(config.token);
  } catch (error) {
    ctx.logger.error("CoThread MCP 配置无效。请检查 url 与令牌，不要把令牌写进地址。");
    ctx.logger.error(String(error?.message || error));
    return;
  }
  if (!headers)
    ctx.logger.warn("CoThread MCP 未填写令牌，将在未授权状态下连接（服务端会返回 401）。");

  const fiber = ctx.plugin(mcpPlugin, {
    transport: "streamable-http",
    serverName: config.serverName,
    url: endpoint,
    ...(headers ? { headers } : {}),
    toolCallTimeoutMs: Number(config.toolCallTimeoutMs) || TOOL_CALL_TIMEOUT_MS,
    failOnStartupError: false,
  });
  void Promise.resolve(fiber).catch((error) => {
    ctx.logger.error("CoThread MCP 连接失败。请检查地址与令牌是否有效（令牌不会写入日志）。");
    ctx.logger.error(String(error?.message || error));
  });
}
