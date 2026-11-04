# dsh-cothread-mcp

连接 **共序 CoThread** 远程 MCP 服务器，让 DeepSeek Harness 直接读写项目、迭代、任务、文档与群聊消息。

CoThread 是按账号身份和项目成员权限协作的 MCP 服务。本插件把该服务注册成 `mcp__cothread-mcp__*` 工具，模型即可在会话里调用。

## 安装

```bash
dsh plugin --profile web add dsh-cothread-mcp
```

安装后重启 DeepSeek Harness。

## 配置

插件在 profile 配置里声明以下字段：

| 字段 | 说明 |
| --- | --- |
| `url` | CoThread MCP 端点，默认 `https://cothread.z2l.top/mcp` |
| `serverName` | 工具前缀名，默认 `cothread-mcp`，工具名形如 `mcp__cothread-mcp__list_projects` |
| `token` | 账号令牌。只保存在插件配置里，不写入源码或日志 |

```yaml
- id: cothread-mcp
  name: dsh-cothread-mcp
  config:
    url: https://cothread.z2l.top/mcp
    serverName: cothread-mcp
    token: <你的账号令牌>
```

## 安全说明

- 令牌仅在该插件的配置中保存，不会出现在工具参数、源码或日志里。
- 服务端按账号身份与项目成员权限校验，插件不额外放大权限。
- 只读成员可读取，写入类操作受服务端权限约束。

## 兼容性

- DeepSeek Harness：`>=0.2.1-rc.2 <0.3.0-0`，已在 0.2.1-rc.5 与 0.2.2-rc.1 上验证。
- Node.js：`>=22.19.0`。

## 卸载

```bash
dsh plugin --profile <name> remove dsh-cothread-mcp
```

## 许可证

MIT
