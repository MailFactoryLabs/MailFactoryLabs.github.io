const REPO = 'MailFactoryLabs/MailFactoryLabs.github.io';
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

let cachedRelease = null;
let fetchPromise = null;

export async function getLatestRelease() {
  if (cachedRelease) return cachedRelease;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error('Release not found or API limit');
      return res.json();
    })
    .then(data => {
      const tag = data.tag_name || 'v0.0.0';
      let downloadUrl = null;
      if (data.assets && data.assets.length > 0) {
        const apk = data.assets.find(a => a.name.endsWith('.apk'));
        downloadUrl = apk ? apk.browser_download_url : data.assets[0].browser_download_url;
      }
      cachedRelease = { tag, downloadUrl, raw: data };
      return cachedRelease;
    })
    .catch(err => {
      console.warn('GitHub release fetch failed:', err);
      cachedRelease = { tag: 'v0.0.0', downloadUrl: null, raw: null };
      return cachedRelease;
    });

  return fetchPromise;
}
