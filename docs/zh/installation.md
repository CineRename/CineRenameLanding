# 安装

得益于 Tauri v2，CineRename 原生支持 **Windows**、**macOS** 和 **Linux**。

## 下载

您可以从官方下载页面下载二进制文件。

| 操作系统 | 格式 |
| :--- | :--- |
| Windows 10/11 (x64) | `.exe` (安装程序) |
| macOS (Intel + Apple Silicon) | `.dmg` |
| Linux (通用) | `.AppImage` |

::: tip 您也可以通过网站上的 [下载](/zh/download) 页面进行下载，它会自动检测您的系统。
:::

## Windows

1. 下载安装程序 `CineRename-Setup.exe`。
2. 运行它。如果 Windows SmartScreen 显示警告，请点击 **更多信息** → **仍要运行** *(扩展签名证书正在验证中)*。
3. 安装程序会将 CineRename 放置在 `%LOCALAPPDATA%\Programs\CineRename` 目录下。

## macOS

1. 打开 `.dmg` 文件，然后将 **CineRename** 拖入 `Applications` 文件夹。
2. 首次启动时，**右键单击 → 打开**（并确认）以授权执行 *(该应用程序目前正在 Apple 进行公证处理)*。
3. 对于后续启动，双击即可。

::: warning Apple Silicon
当前版本被编译为通用二进制文件 (universal binary)。如果您遇到性能问题，请在 **关于本机 → 系统报告** 中检查该应用程序是否以原生方式运行（而不是通过 Rosetta）。
:::

## Linux

1. 下载 `CineRename.AppImage`。
2. 使文件可执行：
   ```bash
   chmod +x CineRename.AppImage
   ```
3. 运行：
   ```bash
   ./CineRename.AppImage
   ```

::: tip
要将 CineRename 集成到您的应用程序菜单中，请使用 [`AppImageLauncher`](https://github.com/TheAssassin/AppImageLauncher)。
:::

## 包管理器 (即将推出)

CineRename 将很快通过标准包管理器提供下载：

- **macOS**：`brew install --cask cinerename`
- **Windows**：`winget install CineRename`

## 从源码编译

您也可以在本地编译 CineRename。

```bash
npm install
npm run tauri:dev
```

## 更新

自动更新功能尚未启用。要进行更新，请下载最新版本并覆盖旧的安装。

## 卸载

- **Windows**：设置 → 应用 → CineRename → 卸载。
- **macOS**：将 `CineRename.app` 移至废纸篓。
- **Linux**：删除 `.AppImage` 文件。

本地设置（重命名预设、历史记录、自定义 API 密钥）存储在：

| 操作系统 | 文件夹 |
| --- | --- |
| Windows | `%APPDATA%\CineRename\` |
| macOS | `~/Library/Application Support/CineRename/` |
| Linux | `~/.config/CineRename/` |

如果您想从头开始，请删除此文件夹。
