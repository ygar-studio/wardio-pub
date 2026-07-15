import { Injectable, signal } from '@angular/core';

/** Where release.yml (in the private wardio-app repo) publishes the public
 * Windows builds. The stable asset name lets us deep-link the installer
 * without knowing the version. */
const RELEASES_API =
  'https://api.github.com/repos/ygar-studio/wardio-pub/releases/latest';
const RELEASES_PAGE = 'https://github.com/ygar-studio/wardio-pub/releases';
const INSTALLER_URL = `${RELEASES_PAGE}/latest/download/wardio-setup.exe`;

export interface AppRelease {
  /** Version without the leading `v`, e.g. "0.1.0". */
  version: string;
  /** Direct download of the Windows installer. */
  installerUrl: string;
  /** The human release page (fallback / "all downloads"). */
  pageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ReleaseService {
  /** Latest published release, or null while loading / when none exists yet.
   * Download CTAs render only when a real release is available — no dead
   * links before the first one is cut. */
  readonly latest = signal<AppRelease | null>(null);

  async load(): Promise<void> {
    try {
      const res = await fetch(RELEASES_API, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) return; // 404 = no release yet → keep CTAs hidden
      const rel = (await res.json()) as {
        tag_name?: string;
        html_url?: string;
        draft?: boolean;
        prerelease?: boolean;
        assets?: { name: string; browser_download_url: string }[];
      };
      if (rel.draft || rel.prerelease) return;
      const setup = rel.assets?.find((a) => a.name === 'wardio-setup.exe');
      if (!setup) return; // a release without the installer is not shippable
      this.latest.set({
        version: (rel.tag_name ?? '').replace(/^v/i, ''),
        installerUrl: INSTALLER_URL,
        pageUrl: rel.html_url ?? RELEASES_PAGE,
      });
    } catch {
      /* offline / rate-limited — the site works fine without the button */
    }
  }
}
