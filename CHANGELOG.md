# Changelog

## 0.1.1

- Widen `engines.dsh` to `>=0.2.1-rc.2 <0.3.0-0 || >=0.2.2-0 <0.3.0-0` so the declared host range admits the DSH 0.2.2 pre-release line this plugin is verified on. The previous single-clause range excluded 0.2.2 pre-releases even though the peer ranges already accepted them.
- Ship the MIT `LICENSE` file the README license badge links to, and list it in `files`.
- Unify the README badge row (npm, MIT license, Node, DSH range, `dsh-plugin` topic, powered by dsh) and sync the compatibility table with the declared range.

## 0.1.0

First release.

- Connects the CoThread remote MCP server (`https://cothread.z2l.top/mcp`) and registers the tools it publishes, so project, iteration, task, document, and message operations are available as `mcp__cothread-mcp__*`.
- Reads the account token from plugin config only; it is not written into source or logs.
- Verified against DeepSeek Harness 0.2.1-rc.5 and 0.2.2-rc.1: the `@deepseek-ai/dsh-mcp-client` bridge and schemastery APIs this plugin uses are unchanged between the two, and the peer ranges accept both.
