'use strict';

/* Background code rain (light, respects reduced-motion). */
(function rain() {
  const c = document.getElementById('rain');
  if (!c) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = c.getContext('2d');
  const glyphs = '01</>{}[]#$*+=:.ABCDEF0123456789アカサタナ';
  let cols, drops;
  const fontSize = 16;
  function resize() {
    c.width = innerWidth; c.height = innerHeight;
    cols = Math.floor(c.width / fontSize);
    drops = Array(cols).fill(0).map(() => Math.random() * -50);
  }
  function frame() {
    ctx.fillStyle = 'rgba(5,6,8,0.09)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#00ace6';
    ctx.font = fontSize + "px 'IBM Plex Mono', monospace";
    for (let i = 0; i < cols; i++) {
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    }
  }
  resize();
  addEventListener('resize', resize);
  if (!reduce) setInterval(frame, 60);
})();

/* Terminal boot intro: types a few lines, then reveals the site. */
(function boot() {
  const boot = document.getElementById('boot');
  if (!boot) return;
  const term = document.getElementById('boot-text');
  const skip = document.getElementById('boot-skip');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.documentElement.classList.contains('no-boot')) {
    boot.remove(); if (skip) skip.remove();
    return;
  }
  try { sessionStorage.setItem('sc-booted', '1'); } catch (e) {}
  const lines = [
    'Scintilla // the notebook of K1m1k',
    'Loading reflections............  ok',
    'Loading projects...............  ok',
    'Compiling ideas in real time...  ok',
    '',
    'Welcome.',
  ];
  let done = false;
  function finish() {
    if (done) return;
    done = true;
    boot.classList.add('done');
    if (skip) skip.remove();
    setTimeout(() => boot.remove(), 650);
    document.body.style.overflow = '';
  }
  document.body.style.overflow = 'hidden';
  if (skip) skip.addEventListener('click', finish);
  addEventListener('keydown', finish, { once: true });
  boot.addEventListener('click', finish);
  if (reduce) { term.textContent = lines.join('\n'); setTimeout(finish, 400); return; }
  let li = 0, ci = 0;
  (function type() {
    if (done) return;
    if (li < lines.length) {
      const line = lines[li];
      if (ci <= line.length) {
        term.textContent = lines.slice(0, li).join('\n') + (li ? '\n' : '') + line.slice(0, ci) + '█';
        ci++; setTimeout(type, 26);
      } else { li++; ci = 0; setTimeout(type, 240); }
    } else { term.textContent = lines.join('\n'); setTimeout(finish, 850); }
  })();
})();

/* Shared helpers. */
function scEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* Render a "body" array of blocks (shared by articles and project pages).
   Supported blocks:
     "text"                       -> <p>
     { h2: "..." }                -> <h2>
     { ul: ["...", "..."] }       -> <ul>
     { code: "...", caption:"" }  -> <figure class="snippet">  */
function scRenderBody(body) {
  const esc = scEsc;
  return (body || []).map((b) => {
    if (typeof b === 'string') return `<p>${esc(b)}</p>`;
    if (b.h2) return `<h2>${esc(b.h2)}</h2>`;
    if (b.ul) return `<ul>${b.ul.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    if (b.code) {
      const cap = b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : '';
      return `<figure class="snippet"><pre><code>${esc(b.code)}</code></pre>${cap}</figure>`;
    }
    return '';
  }).join('');
}

/* Home page: render projects, the featured article and the article list. */
(function homeContent() {
  const S = window.SITE || {};
  const esc = scEsc;

  const pc = document.getElementById('projects-grid');
  if (pc && S.projects) {
    pc.innerHTML = S.projects.map((p) => {
      const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
      const href = `projects/project.html?id=${encodeURIComponent(p.id)}`;
      return `<a class="card reveal" href="${href}">
        <h3>${esc(p.name)}</h3>
        <div class="meta">${esc(p.meta)}</div><p>${esc(p.desc)}</p>
        <div class="tags">${tags}</div>
        <span class="card-cta">read more →</span></a>`;
    }).join('');
  }

  const articles = (S.articles || []);
  const link = (a) => `writing/article.html?id=${encodeURIComponent(a.id)}`;

  const fc = document.getElementById('featured');
  const featured = articles.find((a) => a.featured);
  if (fc && featured) {
    fc.innerHTML = `<span class="label">Featured — long read</span>
      <h3>${esc(featured.title)}</h3>
      <p>${esc(featured.excerpt || '')}</p>
      <div><a class="btn ghost" href="${link(featured)}">Read the essay →</a></div>`;
  }

  const ac = document.getElementById('articles-list');
  if (ac) {
    ac.innerHTML = articles.filter((a) => !a.featured).map((a) =>
      `<a class="article" href="${link(a)}">
        <span class="t">${esc(a.title)}</span>
        <span class="d">${esc(a.date)}${a.read ? ' · ' + esc(a.read) : ''}</span></a>`).join('');
  }
})();

/* Article page: render the body of the article named by ?id=. */
(function articlePage() {
  const root = document.getElementById('article-body');
  if (!root) return;
  const S = window.SITE || {};
  const id = new URLSearchParams(location.search).get('id');
  const a = (S.articles || []).find((x) => x.id === id);
  if (!a) {
    document.getElementById('article-title').textContent = 'Article not found';
    return;
  }
  document.title = a.title + ' — Scintilla';
  document.getElementById('article-title').textContent = a.title;
  document.getElementById('article-byline').textContent =
    'By K1m1k · Scintilla' + (a.date ? ' · ' + a.date : '') + (a.read ? ' · ' + a.read : '');
  const body = a.body || [];
  if (!body.length) {
    root.innerHTML = '<p class="mono-faint">The full text is coming soon on this site.</p>';
    return;
  }
  root.innerHTML = scRenderBody(body);
})();

/* Project page: render the project named by ?id=. */
(function projectPage() {
  const root = document.getElementById('project-body');
  if (!root) return;
  const S = window.SITE || {};
  const esc = scEsc;
  const id = new URLSearchParams(location.search).get('id');
  const p = (S.projects || []).find((x) => x.id === id);
  if (!p) {
    document.getElementById('project-title').textContent = 'Project not found';
    return;
  }
  document.title = p.name + ' — Scintilla';
  document.getElementById('project-title').textContent = p.name;
  document.getElementById('project-meta').textContent = p.meta || '';
  const tagHost = document.getElementById('project-tags');
  if (tagHost) tagHost.innerHTML = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const tagline = document.getElementById('project-tagline');
  if (tagline) tagline.textContent = (p.detail && p.detail.tagline) || p.desc || '';
  const body = (p.detail && p.detail.body) || [];
  root.innerHTML = body.length
    ? scRenderBody(body)
    : '<p class="mono-faint">More details coming soon.</p>';
})();

/* Mobile menu. */
(function nav() {
  const t = document.getElementById('nav-toggle');
  const l = document.getElementById('nav-links');
  if (!t || !l) return;
  t.addEventListener('click', () => l.classList.toggle('open'));
  l.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => l.classList.remove('open')));
})();

/* Contact form: if an email is set in content.js, compose a pre-filled
   email; otherwise send the visitor to GitHub. No backend needed. */
(function contact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const note = document.getElementById('form-note');
  const email = (window.SITE && window.SITE.contactEmail || '').trim();
  const github = (window.SITE && window.SITE.github) || 'https://github.com';
  if (!email && note) note.textContent = 'Tip: the quickest way to reach me is on GitHub.';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const from = form.email.value.trim();
    const msg = form.message.value.trim();
    if (!msg) { if (note) note.textContent = 'Write a message first.'; return; }
    if (!email) {
      if (note) note.textContent = 'Email not set yet — opening GitHub instead…';
      window.open(github, '_blank', 'noopener');
      return;
    }
    const subject = encodeURIComponent('Scintilla — message from ' + (name || 'a visitor'));
    const body = encodeURIComponent(msg + '\n\n— ' + (name || '') + (from ? ' (' + from + ')' : ''));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    if (note) note.textContent = 'Opening your email app…';
  });
})();

/* Reveal sections on scroll. */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
})();
