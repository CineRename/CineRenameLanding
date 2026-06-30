import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com/repos/CineRename/CineRename/releases';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // Fetch all releases to find the latest one (including pre-releases if needed)
    // If you add a GITHUB_TOKEN to .env.local, you can fetch drafts too, 
    // but the asset download links won't work for public users if it's a draft.
    const headers: HeadersInit = {
      'User-Agent': 'CineRename-Website',
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_API_URL, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const releases = await response.json();
    
    if (!releases || releases.length === 0) {
      return NextResponse.json({ error: 'No releases found' }, { status: 404 });
    }

    // Sort to get the most recent one. 
    // If you want to include drafts (assuming token is set) or pre-releases, we just take the first one.
    // GitHub API returns them ordered by creation date.
    const latestRelease = releases[0];

    const assets = latestRelease.assets || [];

    // Helper to find asset URL by suffix
    const getAssetUrl = (suffix: string) => {
      const asset = assets.find((a: any) => a.name.endsWith(suffix));
      return asset ? asset.browser_download_url : null;
    };

    // Construct the payload expected by the frontend
    const payload = {
      version: latestRelease.tag_name ? latestRelease.tag_name.replace('v', '') : latestRelease.name,
      releaseUrl: latestRelease.html_url,
      downloads: {
        windowsExe: { url: getAssetUrl('setup.exe') },
        windowsMsi: { url: getAssetUrl('en-US.msi') },
        windowsPortable: { url: getAssetUrl('portable_windows_x64.zip') },
        macArmDmg: { url: getAssetUrl('aarch64.dmg') },
        macX64Dmg: { url: getAssetUrl('x64.dmg') },
        macArmPkg: { url: getAssetUrl('macos_arm64.pkg') },
        macX64Pkg: { url: getAssetUrl('macos_x64.pkg') },
        linuxAppImage: { url: getAssetUrl('amd64.AppImage') },
        linuxDeb: { url: getAssetUrl('amd64.deb') },
        linuxRpm: { url: getAssetUrl('x86_64.rpm') },
        posixPortable: { url: getAssetUrl('portable_posix_x64.tar.xz') },
        nasX64: { url: getAssetUrl('nas_linux_x86_64.tar.xz') },
        nasArm64: { url: getAssetUrl('nas_linux_aarch64.tar.xz') },
        dockerX64: { url: getAssetUrl('docker_linux_amd64.tar.gz') },
        dockerArm64: { url: getAssetUrl('docker_linux_arm64.tar.gz') },
        macAppArchive: { url: getAssetUrl('app.tar.gz') },
      }
    };

    // Clean up null URLs so they fall back to 'Coming Soon' on the frontend
    Object.keys(payload.downloads).forEach((key) => {
      if (!payload.downloads[key as keyof typeof payload.downloads].url) {
        delete payload.downloads[key as keyof typeof payload.downloads];
      }
    });

    return NextResponse.json(payload);

  } catch (error) {
    console.error('Failed to fetch latest release:', error);
    return NextResponse.json({ error: 'Failed to fetch release info' }, { status: 500 });
  }
}
