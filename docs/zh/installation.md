# 安装

CineRename 支持 **Windows**、**macOS**、**Linux desktop** 和 **Linux headless/NAS**。

## 下载

请使用官方[下载](https://cinerename.app/zh/download)页面或最新 release：

https://github.com/CineRename/CineRename-Releases/releases/latest

| 系统 | 推荐格式 |
| :--- | :--- |
| Windows 10/11 x64 | `.exe` 安装程序、`.msi`、便携 `.zip` |
| macOS Apple Silicon | arm64 `.dmg` 或 `.pkg` |
| macOS Intel | x64 `.dmg` 或 `.pkg` |
| Linux desktop | AppImage、`.deb`、`.rpm`、便携 `.tar.xz` |
| NAS / Linux headless | x64 或 arm64 `.tar.xz` |
| Docker | x64 或 arm64 镜像归档 |

::: tip
如果不确定，请在 Windows 上使用 `.exe`，macOS 上使用 `.dmg`，Linux 上使用 AppImage。
:::

## Windows

1. 下载 `.exe` 安装程序。
2. 运行它。
3. 如果 Windows SmartScreen 显示警告，请点击 **更多信息** -> **仍要运行**。

Windows build 目前尚未签名，因此首次启动时出现此提示是正常的。

## macOS

1. 下载适合您 Mac 的 `.dmg`：Apple Silicon 或 Intel。
2. 打开 `.dmg`。
3. 将 **CineRename** 拖入 `Applications`。
4. 首次启动时，右键点击 **CineRename** -> **打开**，然后确认。

macOS build 目前尚未签名/公证，因此 Gatekeeper 可能会在首次启动时要求确认。

## Linux Desktop

### AppImage

1. 下载 AppImage。
2. 使其可执行：

```bash
chmod +x CineRename_*.AppImage
```

3. 运行：

```bash
./CineRename_*.AppImage
```

### deb / rpm

Debian/Ubuntu 使用 `.deb`，Fedora/openSUSE/RHEL 使用 `.rpm`。

## NAS / Linux Headless

下载 x64 或 arm64 NAS 归档，在服务器上解压，然后运行其中的 `cinerename` 二进制文件。

服务器用法请参阅 [CLI 和 headless](/zh/cli)。

## 更新

直接桌面 build 包含 CineRename 内置 updater。您可以在 **Preferences -> General -> Updates** 中检查更新。

商店和包管理器 build 发布后，应通过各自渠道更新。

## 卸载

- **Windows**：设置 → 应用 → CineRename → 卸载。
- **macOS**：将 `CineRename.app` 移至废纸篓。
- **Linux AppImage / portable**：删除下载的文件或解压出的文件夹。
- **Linux deb / rpm**：使用包管理器卸载。

本地设置、历史记录、日志和许可证状态存储在系统的 app-data 位置。删除本地数据前，可以在 Support 页面复制 logs/config。
