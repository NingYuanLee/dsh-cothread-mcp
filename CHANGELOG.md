# Changelog

## 0.1.0

First release.

- Connects the CoThread remote MCP server (`https://cothread.z2l.top/mcp`) and registers the tools it publishes, so project, iteration, task, document, and message operations are available as `mcp__cothread-mcp__*`.
- Reads the account token from plugin config only; it is not written into source or logs.
- Verified against DeepSeek Harness 0.2.1-rc.5 and 0.2.2-rc.1: the `@deepseek-ai/dsh-mcp-client` bridge and schemastery APIs this plugin uses are unchanged between the two, and the peer ranges accept both.
