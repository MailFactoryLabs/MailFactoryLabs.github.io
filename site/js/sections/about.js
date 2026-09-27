const showcase = document.querySelector('[data-code-showcase]');
if (showcase) {
  const tabs = [...showcase.querySelectorAll('[data-code-tab]')];
  const code = showcase.querySelector('[data-code-content]');
  const filename = showcase.querySelector('[data-code-filename]');
  const language = showcase.querySelector('[data-code-language]');
  const count = showcase.querySelector('[data-code-count]');
  const scroll = showcase.querySelector('.editor-code-scroll');
  const cache = new Map();
  let requestId = 0;
  let sourceRequest = null;

  const languageFor = (file) => file.endsWith('.cpp') ? 'C++' : 'Kotlin';
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const keywords = new Set(['package', 'import', 'private', 'public', 'protected', 'internal', 'const', 'val', 'var', 'class', 'object', 'fun', 'override', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw', 'new', 'static', 'bool', 'void', 'int', 'long', 'false', 'true', 'null', 'this', 'auto']);
  const tokenPattern = /(\/\/.*|\/\*.*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|#[A-Za-z_][\w]*|\b[A-Za-z_][\w]*\b|\b\d+(?:\.\d+)?\b)/g;
  const tokenClass = (token) => {
    if (token.startsWith('//') || token.startsWith('/*')) return 'code-comment';
    if (/^["'`]/.test(token)) return 'code-string';
    if (token.startsWith('#')) return 'code-preprocessor';
    if (/^\d/.test(token)) return 'code-number';
    if (keywords.has(token)) return 'code-keyword';
    if (/^[A-Z][A-Za-z0-9_]*$/.test(token)) return 'code-type';
    return '';
  };
  const highlightLine = (line) => line.split(tokenPattern).map((part) => {
    if (!part) return '';
    const cls = tokenClass(part), escaped = escapeHtml(part);
    return cls ? `<span class="${cls}">${escaped}</span>` : escaped;
  }).join('');

  function paint(file, source) {
    const normalized = source.replace(/\r\n?/g, '\n');
    const lines = normalized.split('\n');
    const trailingNewline = lines.at(-1) === '';
    if (trailingNewline) lines.pop();
    code.innerHTML = lines.map((line, index) => `<span class="code-line">${highlightLine(line)}${index < lines.length - 1 || trailingNewline ? '\n' : ''}</span>`).join('');
    filename.textContent = file;
    language.textContent = languageFor(file).toUpperCase();
    count.textContent = `${lines.length} LINES`;
    showcase.dataset.activeFile = file;
    code.dataset.language = languageFor(file).toLowerCase();
    scroll.scrollTop = 0;
    scroll.scrollLeft = 0;
    code.classList.remove('is-swapping');
  }

  async function selectFile(file) {
    const current = ++requestId;
    code.classList.add('is-swapping');
    tabs.forEach((tab) => {
      const selected = tab.dataset.codeTab === file;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    filename.textContent = file;
    language.textContent = languageFor(file).toUpperCase();
    try {
      let source = cache.get(file);
      if (source === undefined) {
        if (!sourceRequest) {
          const url = new URL('../../code/source-files.json', import.meta.url);
          sourceRequest = fetch(url).then((response) => {
            if (!response.ok) throw new Error(`Source request failed (${response.status})`);
            return response.json();
          });
        }
        const files = await sourceRequest;
        source = files[file];
        if (typeof source !== 'string') throw new Error(`Source file is missing (${file})`);
        cache.set(file, source);
      }
      if (current === requestId) paint(file, source);
    } catch (error) {
      if (current !== requestId) return;
      code.textContent = 'Unable to load this source file.';
      count.textContent = 'SOURCE UNAVAILABLE';
      code.classList.remove('is-swapping');
      console.warn('[about] source file could not be loaded', file, error);
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectFile(tab.dataset.codeTab));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + delta + tabs.length) % tabs.length];
      next.focus();
      selectFile(next.dataset.codeTab);
    });
  });
  selectFile(tabs[0].dataset.codeTab);
}

export function init() {}
