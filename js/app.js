(function () {
  const { main, cases, categories } = PORTFOLIO_DATA;

  const TABS = (categories || []).map((c) => ({ id: c.id, label: c.name }));
  let activeTab = TABS[0]?.id || 'performance';
  let lastFocusedElement = null;

  const TAG_RULES = [
    { pattern: /яндекс\.?директ|директ/i, tag: 'Яндекс.Директ' },
    { pattern: /google\s*(ads|реклам)/i, tag: 'Google Ads' },
    { pattern: /яндекс\.?метрик/i, tag: 'Метрика' },
    { pattern: /google analytics|ga4/i, tag: 'GA4' },
    { pattern: /\bb2b\b/i, tag: 'B2B' },
    { pattern: /\bb2c\b/i, tag: 'B2C' },
    { pattern: /\bseo\b|органик|поисков/i, tag: 'SEO' },
    { pattern: /crm|sap|битрикс|mailganer/i, tag: 'CRM' },
    { pattern: /email|рассыл/i, tag: 'Email' },
    { pattern: /roi|romi|cpl/i, tag: 'ROI' },
    { pattern: /\bai\b|generative|ии|нейрос/i, tag: 'AI' },
    { pattern: /telegram|smm/i, tag: 'SMM' },
    { pattern: /tilda|лендинг|landing|1с/i, tag: 'Web' },
    { pattern: /коллтрекинг|callibri/i, tag: 'Calltracking' },
    { pattern: /serm|wikipedia|википед|репутац/i, tag: 'SERM' },
    { pattern: /аналитик|сквозн|utm/i, tag: 'Analytics' },
    { pattern: /рся|контекст/i, tag: 'Performance' },
  ];

  const lines = main.split('\n').map((l) => l.trim()).filter(Boolean);

  function parseMain() {
    const heroTitle = lines[0] || 'Digital-маркетолог';
    const heroSubtitle = lines[1] || '';
    const compIdx = lines.findIndex((l) => l.startsWith('Основные компетенции'));
    const statsIdx = lines.findIndex((l) => l.startsWith('Я в цифрах'));
    const careerIdx = lines.findIndex((l) => l.startsWith('Карьерный путь'));
    const certIdx = lines.findIndex((l) => l.startsWith('Я и мои сертификаты'));
    const contactIdx = lines.findIndex((l) => l.startsWith('Контакты'));

    const competencies =
      compIdx >= 0 && lines[compIdx + 1]
        ? lines[compIdx + 1].split('·').map((s) => s.trim()).filter(Boolean)
        : [];

    const stats = [];
    if (statsIdx >= 0) {
      const end = careerIdx >= 0 ? careerIdx : certIdx >= 0 ? certIdx : lines.length;
      for (let i = statsIdx + 1; i < end; i++) {
        const m = lines[i].match(/^(\d[\d,\.\s+]*(?:\+)?(?:\s*(?:млн|млрд|лет|проектов))?\s*₽?)(.+)$/i);
        if (m) stats.push({ value: m[1].trim(), label: m[2].trim().replace(/^[—–-]\s*/, '') });
      }
    }

    const experience = [];
    if (careerIdx >= 0) {
      const end = certIdx >= 0 ? certIdx : contactIdx >= 0 ? contactIdx : lines.length;
      let i = careerIdx + 1;
      while (i < end) {
        const company = lines[i];
        const period = lines[i + 1] || '';
        const desc = lines[i + 2] || '';
        if (company && /^\d{4}/.test(period)) {
          experience.push({ company, period, desc });
          i += 3;
        } else {
          i += 1;
        }
      }
      experience.reverse();
    }

    const certificates = { yandex: [], google: [], other: [] };
    if (certIdx >= 0) {
      let group = 'other';
      for (let i = certIdx + 1; i < (contactIdx >= 0 ? contactIdx : lines.length); i++) {
        const l = lines[i];
        if (l.startsWith('Яндекс')) group = 'yandex';
        else if (l.startsWith('Google')) group = 'google';
        else if (!l.startsWith('Все основные')) certificates[group].push(l);
      }
    }

    const contacts = [];
    if (contactIdx >= 0) {
      for (let i = contactIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        if (l.startsWith('Я всегда') || l.startsWith('Всегда рад')) continue;
        if (/^https?:\/\//.test(l)) {
          contacts.push({
            type: 'link',
            value: l,
            label: l.includes('t.me') ? 'Telegram' : 'VK',
          });
        } else if (l.includes('@')) {
          contacts.push({ type: 'email', value: l, label: 'Email' });
        } else if (/[\d()]/.test(l)) {
          contacts.push({ type: 'phone', value: l, label: 'Телефон' });
        }
      }
    }

    return { heroTitle, heroSubtitle, competencies, stats, experience, certificates, contacts };
  }

  function extractTags(c) {
    const text = `${c.title} ${c.description} ${c.content}`;
    const found = new Set();
    for (const rule of TAG_RULES) {
      if (rule.pattern.test(text)) found.add(rule.tag);
    }
    if (found.size === 0) found.add(c.categoryName);
    return [...found].slice(0, 4);
  }

  function getCardSummary(c) {
    const paras = c.content.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const p of paras) {
      if (/^(Клиент:|Сайт:|Кейс:|Кейс \d+:|Landing)/i.test(p)) continue;
      if (/^(Задачи:|Каналы|География|Период|\*|\d+\.)/i.test(p)) continue;
      const clean = p.replace(/^(Ситуация:|Проблема:|Контекст:|Задача:)\s*/i, '');
      if (clean.length > 40) return truncate(clean, 140);
    }
    const desc = (c.description || '').replace(/^(Клиент:|Ситуация:|Проблема:|Контекст:|Задача:)\s*/i, '');
    return truncate(desc, 140);
  }

  function truncate(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.slice(0, len).replace(/\s+\S*$/, '') + '…';
  }

  function displayTitle(c) {
    if (c.title === 'Landing') {
      return 'Продуктовые лендинги: от воронки до UX/UI';
    }
    return c.title;
  }

  function parseCaseContent(text) {
    const paras = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const meta = {};
    const solution = [];
    const results = [];
    let section = 'solution';
    let tasksBuffer = [];

    const metaKeys = {
      'Клиент:': 'client',
      'Сайт:': 'site',
      'Каналы и инструменты:': 'tools',
      'География показа рекламы:': 'geo',
      'География показа:': 'geo',
      'Период кейса:': 'period',
      'Задача:': 'task',
    };

    for (const p of paras) {
      if (/^Кейс:/i.test(p) || /^Кейс \d+:/i.test(p)) continue;

      let matched = false;
      for (const [prefix, key] of Object.entries(metaKeys)) {
        if (p.startsWith(prefix)) {
          meta[key] = p.slice(prefix.length).trim();
          matched = true;
          break;
        }
      }
      if (matched) continue;

      if (p.startsWith('Задачи:')) {
        section = 'tasks';
        tasksBuffer = [];
        continue;
      }

      if (section === 'tasks') {
        if (
          /^(Каналы|География|Период|Трудности|Шаг|Стратегия|Подготов|С чего|Проблема|Ситуация|Контекст|Действия|Что сделал|Как шла|Нюансы|Аналитика|Разработка|Проектирование|Масштаб|Запуск|Итог|Результат)/i.test(
            p
          )
        ) {
          meta.tasks = tasksBuffer.join('\n');
          section = 'solution';
          solution.push(p);
        } else {
          tasksBuffer.push(p.replace(/^[-–•*]\s*/, ''));
        }
        continue;
      }

      if (/^(Результат|Итог|Итоговые|Главный бизнес)/i.test(p)) {
        section = 'results';
        results.push(p);
      } else if (section === 'results') {
        results.push(p);
      } else {
        solution.push(p);
      }
    }

    if (tasksBuffer.length && !meta.tasks) meta.tasks = tasksBuffer.join('\n');
    return { meta, solution, results };
  }

  function extractMetrics(text) {
    const metrics = [];
    const seen = new Set();
    const patterns = [
      [/(\d[\d\s,\.+]*)\s*(?:уникальных?\s*)?(?:лидов?|заявок?|заявки)\b/gi, 'лидов'],
      [/(?:CPL|цена за(?:явку| лид))[:\s]*(\d[\d\s,\.]*)\s*(?:руб\.?|₽)/gi, 'CPL'],
      [/(\d[\d,\.\s]*(?:млн|млрд))\s*₽/gi, 'оборот'],
      [/(?:конверси[яи]|Open Rate|открыти[яй])[:\s]*\+?(\d[\d,\.]*)\s*%/gi, 'конверсия'],
      [/(\d[\d,\.]*)\s*%/g, '%'],
    ];

    for (const [re, label] of patterns) {
      let m;
      const rx = new RegExp(re.source, re.flags);
      while ((m = rx.exec(text)) !== null && metrics.length < 4) {
        const val = m[1].trim();
        const key = val + label;
        if (seen.has(key)) continue;
        seen.add(key);
        metrics.push({ value: val, label });
      }
    }
    return metrics.slice(0, 4);
  }

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  function getCoverMetric(c) {
    const highlights = {
      'performance-1': { value: '2×', label: 'дешевле агентств', sub: 'A/B in-house' },
      'performance-2': { value: '110+', label: 'лидов в месяц', sub: 'CPL 215 ₽' },
      'performance-3': { value: '15', label: 'лидов · старт с нуля', sub: 'CPL 466 ₽' },
      'performance-4': { value: '278', label: 'уникальных лидов', sub: 'CPL 253 ₽ · CR 11%' },
      'performance-5': { value: '30+', label: 'лидов за месяц', sub: 'CPL 433 ₽' },
      'performance-6': { value: '7', label: 'лидов · B2B с нуля', sub: 'CPL 1 648 ₽' },
      'performance-7': { value: '81', label: 'B2B-лидов за месяц', sub: 'CPL 411 ₽' },
      'performance-8': { value: '99', label: 'заявок на ремонт', sub: 'CPL 836 ₽' },
      'performance-9': { value: '529', label: 'лидов на курсы 1С', sub: 'CPL 483 ₽' },
      'performance-10': { value: '+333%', label: 'рост аудитории', sub: '600 → 2 600' },
      'analytics-11': { value: '40%', label: 'атрибуции восстановлено' },
      'web-seo-12': { value: '+900%', label: 'рост визитов' },
      'web-seo-13': { value: 'TOP-3', label: 'поисковая выдача' },
      'web-seo-14': { value: '+67%', label: 'рост лидов' },
      'web-seo-15': { value: 'UX/UI', label: 'лендинги под ключ' },
      'crm-email-16': { value: '104 млн', label: 'нового бизнеса' },
      'serm-ai-17': { value: '0 ₽', label: 'бюджет продакшена' },
      'serm-ai-18': { value: 'SERM', label: 'цифровой актив' },
    };
    if (highlights[c.id]) return highlights[c.id];

    const metrics = extractMetrics(`${c.title}\n${c.content}`);
    if (metrics.length) {
      const leads = metrics.find((m) => m.label === 'лидов');
      const cpl = metrics.find((m) => m.label === 'CPL');
      const conv = metrics.find((m) => m.label === 'конверсия' || m.label === '%');
      if (leads && cpl) {
        return {
          value: leads.value,
          label: 'лидов',
          sub: `CPL ${cpl.value} ₽${conv ? ` · CR ${conv.value}%` : ''}`,
        };
      }
      const metric = metrics[0];
      const suffix =
        metric.label === 'CPL' ? ' ₽' :
        metric.label === '%' || metric.label === 'конверсия' ? '%' : '';
      return { value: `${metric.value}${suffix}`, label: metric.label };
    }

    const fallback = {
      performance: { value: 'PPC', label: 'performance' },
      analytics: { value: 'B2B', label: 'analytics' },
      'web-seo': { value: 'SEO', label: 'web & search' },
      'crm-email': { value: 'CRM', label: 'retention' },
      'serm-ai': { value: 'AI', label: 'innovation' },
    };
    return fallback[c.category] || { value: '01', label: c.categoryName };
  }

  function coverHTML(c, index) {
    const metric = getCoverMetric(c);
    const variant = (index % 4) + 1;
    const number = String(index + 1).padStart(2, '0');

    return `
      <div class="case-cover-custom" data-tone="${esc(c.category)}" data-variant="${variant}" aria-hidden="true">
        <div class="cover-grid"></div>
        <div class="cover-orb cover-orb-a"></div>
        <div class="cover-orb cover-orb-b"></div>
        <div class="cover-topline">
          <span>${esc(c.categoryName)}</span>
          <span>${number}</span>
        </div>
        <div class="cover-center">
          <div class="cover-metric-main">
            <strong>${esc(metric.value)}</strong>
            <span>${esc(metric.label)}</span>
          </div>
          ${metric.sub ? `<div class="cover-metric-sub">${esc(metric.sub)}</div>` : ''}
        </div>
        <div class="cover-footer">
          <span>CASE STUDY</span>
          <img src="assets/signature.png?v=2" alt="" class="cover-signature" aria-hidden="true">
        </div>
      </div>`;
  }

  const SKILL_TO_TAB = {
    Performance: 'performance',
    Analytics: 'analytics',
    CRM: 'crm-email',
    SEO: 'web-seo',
    Web: 'web-seo',
    Email: 'crm-email',
    AI: 'serm-ai',
    'Digital Strategy': 'performance',
  };

  function setActiveTab(tabId) {
    const exists = TABS.some((t) => t.id === tabId);
    activeTab = exists ? tabId : TABS[0]?.id || 'performance';
    renderTabs();
    renderCards();
    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderHero(data) {
    document.getElementById('hero-title').textContent = data.heroTitle;
    document.getElementById('hero-subtitle').textContent = data.heroSubtitle;
    const tagsRoot = document.getElementById('hero-tags');
    const tags = data.competencies
      .map((c) => {
        const tabId = SKILL_TO_TAB[c] || TABS[0]?.id || 'performance';
        return `<a href="#cases" data-tab="${esc(tabId)}" class="hero-skill">${esc(c)}</a>`;
      })
      .join('');
    tagsRoot.innerHTML = `
      <div class="hero-track">
        <div class="hero-track-set">${tags}</div>
        <div class="hero-track-set" aria-hidden="true">${tags}</div>
      </div>`;

    tagsRoot.querySelectorAll('.hero-skill').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveTab(link.dataset.tab);
      });
    });
  }

  function renderStats(stats) {
    document.getElementById('stats').innerHTML = stats
      .map((s, index) => {
        const valueParts = s.value.match(/^([\d,.]+\+?)(.*)$/);
        const number = valueParts ? valueParts[1] : s.value;
        const suffix = valueParts ? valueParts[2].trim() : '';
        return `
      <div class="stat-card">
        <div class="card-index"><span>0${index + 1}</span><span>Impact</span></div>
        <div class="stat-value">
          <span class="stat-number-accent">${esc(number)}</span>
          ${suffix ? `<span class="stat-value-suffix">${esc(suffix)}</span>` : ''}
        </div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`;
      })
      .join('');
  }

  function renderTabs() {
    document.getElementById('tabs').innerHTML = TABS.map(
      (t) => `
      <button
        type="button"
        role="tab"
        aria-selected="${activeTab === t.id}"
        data-tab="${t.id}"
        class="tab-btn${activeTab === t.id ? ' active' : ''}"
      >${esc(t.label)}</button>`
    ).join('');

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
    });
  }

  function renderCards() {
    const filtered = cases.filter((c) => c.category === activeTab);
    const grid = document.getElementById('cards-grid');

    if (!filtered.length) {
      grid.innerHTML = `<p class="text-muted col-span-full py-12 text-center">В этой категории пока нет кейсов</p>`;
      return;
    }

    grid.innerHTML = filtered
      .map((c, i) => {
        const tags = extractTags(c);
        const summary = getCardSummary(c);
        return `
        <article
          class="card-item group cursor-pointer card-enter"
          style="animation-delay:${i * 40}ms"
          data-id="${esc(c.id)}"
          tabindex="0"
          role="button"
          aria-label="Открыть кейс: ${esc(displayTitle(c))}"
        >
          <div class="card-cover-wrap">
            ${coverHTML(c, i)}
            <div class="card-glow" aria-hidden="true"></div>
          </div>
          <div>
            <div class="card-index">
              <span>${String(i + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}</span>
              <span>${esc(c.categoryName)}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              ${tags.map((t) => `<span class="tag-pill">${esc(t)}</span>`).join('')}
            </div>
            <h3>${esc(displayTitle(c))}</h3>
            <p class="text-sm leading-relaxed line-clamp-2 mb-5">${esc(summary)}</p>
            <div class="card-index">
              <span>Подробнее</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </article>`;
      })
      .join('');

    grid.querySelectorAll('.card-item').forEach((card) => {
      card.addEventListener('click', () => openCase(card.dataset.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCase(card.dataset.id);
        }
      });
    });

    initCardEffects(grid);
  }

  function renderExperience(list) {
    const root = document.getElementById('experience-list');
    if (!list.length) {
      root.innerHTML = '<p class="text-muted">Опыт будет добавлен позже</p>';
      return;
    }

    root.innerHTML = list
      .map(
        (job) => `
      <div class="experience-item">
        <div class="experience-period">${esc(job.period)}</div>
        <div>
          <h3 class="experience-company">${esc(job.company)}</h3>
          <p class="experience-desc">${esc(job.desc)}</p>
        </div>
      </div>`
      )
      .join('');
  }

  function renderCertificates(certs) {
    const groups = [
      { key: 'yandex', label: 'Яндекс' },
      { key: 'google', label: 'Google' },
    ];
    let html = '';
    for (const g of groups) {
      if (!certs[g.key]?.length) continue;
      html += `<p class="sm:col-span-2 text-xs font-medium tracking-wide text-muted mt-6 first:mt-0 mb-2">${g.label}</p>`;
      html += certs[g.key]
        .map((c) => `<div class="cert-item">${esc(c)}</div>`)
        .join('');
    }
    document.getElementById('certificates-grid').innerHTML = html;
  }

  function renderContacts(contacts) {
    document.getElementById('contacts-grid').innerHTML = contacts
      .map((c) => {
        const href =
          c.type === 'phone'
            ? `tel:${c.value.replace(/\s/g, '')}`
            : c.type === 'email'
              ? `mailto:${c.value}`
              : c.value;
        return `
        <a href="${href}" ${c.type === 'link' ? 'target="_blank" rel="noopener"' : ''}
           class="contact-card">
          <div class="text-xs font-medium tracking-wide text-muted mb-3">${esc(c.label)}</div>
          <div class="text-sm font-semibold text-ink break-all">${esc(c.value)}</div>
        </a>`;
      })
      .join('');
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((el) => observer.observe(el));
  }

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initNavSpy() {
    const links = [...document.querySelectorAll('.nav-link[data-section]')];
    if (!links.length) return;

    const sections = links
      .map((link) => document.getElementById(link.dataset.section))
      .filter(Boolean);

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.section === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initMotion() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => document.body.classList.add('is-ready'));

    const progress = document.querySelector('.scroll-progress');
    const portrait = document.querySelector('.portrait-frame img');
    let ticking = false;

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      progress?.style.setProperty('--scroll-progress', ratio);

      if (!reducedMotion && portrait && window.innerWidth >= 768) {
        const heroHeight = document.querySelector('.hero-section')?.offsetHeight || window.innerHeight;
        const offset = Math.min(heroHeight, window.scrollY) * 0.055;
        portrait.style.setProperty('--portrait-y', `${offset}px`);
      }
      ticking = false;
    };

    updateScroll();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateScroll);
        }
      },
      { passive: true }
    );

    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursorLight = document.querySelector('.cursor-light');
    window.addEventListener(
      'pointermove',
      (event) => {
        cursorLight?.style.setProperty('--cursor-x', `${event.clientX}px`);
        cursorLight?.style.setProperty('--cursor-y', `${event.clientY}px`);
        cursorLight?.classList.add('is-active');
      },
      { passive: true }
    );

    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }

  function initCardEffects(root = document) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    root.querySelectorAll('.card-item').forEach((card) => {
      card.addEventListener(
        'pointermove',
        (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--card-x', `${event.clientX - rect.left}px`);
          card.style.setProperty('--card-y', `${event.clientY - rect.top}px`);
        },
        { passive: true }
      );
    });
  }

  function sidebarField(label, value) {
    if (!value) return '';
    return `
      <div>
        <dt class="text-xs font-medium tracking-wide text-muted mb-2">${label}</dt>
        <dd class="text-sm text-ink/80 leading-relaxed whitespace-pre-line">${esc(value)}</dd>
      </div>`;
  }

  function openLightbox(src, alt) {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    img.alt = alt || '';
    box.classList.remove('hidden');
    box.classList.add('flex');
    box.setAttribute('aria-hidden', 'false');
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    const box = document.getElementById('lightbox');
    box.classList.add('hidden');
    box.classList.remove('flex');
    box.setAttribute('aria-hidden', 'true');
    document.getElementById('lightbox-img').src = '';
  }

  function openCase(id) {
    const c = cases.find((x) => x.id === id);
    if (!c) return;
    lastFocusedElement = document.activeElement;

    const { meta, solution, results } = parseCaseContent(c.content);
    const images = c.images || [];
    const labels = c.imageLabels || [];

    document.getElementById('modal-category').textContent = c.categoryName;
    document.getElementById('modal-title').textContent = displayTitle(c);

    const hero = document.getElementById('modal-hero');
    const caseIndex = Math.max(0, cases.findIndex((x) => x.id === c.id));
    hero.innerHTML = coverHTML(c, caseIndex);

    const gallery = document.getElementById('modal-gallery');
    const galleryWrap = document.getElementById('modal-gallery-wrap');
    if (images.length) {
      galleryWrap.classList.remove('hidden');
      gallery.innerHTML = images
        .map((src, idx) => {
          const label = labels[idx] || `Иллюстрация ${idx + 1}`;
          return `
          <figure class="gallery-thumb group" data-src="${esc(src)}" data-alt="${esc(label)}" title="${esc(label)}">
            <div class="gallery-thumb-frame">
              <img src="${esc(src)}" alt="${esc(label)}" loading="lazy">
            </div>
            <figcaption>${esc(label)}</figcaption>
          </figure>`;
        })
        .join('');

      gallery.querySelectorAll('.gallery-thumb').forEach((el) => {
        el.addEventListener('click', () => openLightbox(el.dataset.src, el.dataset.alt));
      });
    } else {
      galleryWrap.classList.add('hidden');
      gallery.innerHTML = '';
    }

    document.getElementById('modal-sidebar').innerHTML = `
      <dl class="space-y-6 bg-highlight rounded-2xl border border-line p-6">
        ${sidebarField('Клиент', meta.client)}
        ${sidebarField('Сайт', meta.site)}
        ${sidebarField('Задача', meta.task || meta.tasks)}
        ${sidebarField('Инструменты', meta.tools)}
        ${sidebarField('География', meta.geo)}
        ${sidebarField('Период', meta.period)}
        ${sidebarField('Направление', c.categoryName)}
      </dl>`;

    const solutionHtml = solution
      .map((p) => {
        const clean = p.replace(/^[-–•*]\s*/, '');
        const isHeading =
          /^(Шаг \d+|Трудности|Стратегия|Подготов|С чего|Действия|Что сделал|Как шла|Нюансы|Аналитика|Разработка|Проектирование|Масштаб|Запуск|Оптимизация|Тестирование|Глубокая|Решение:|Стек)/i.test(
            p
          );
        if (isHeading) {
          return `<h4 class="text-sm font-semibold text-ink mt-6 first:mt-0">${esc(clean)}</h4>`;
        }
        return `<p class="text-sm text-muted leading-relaxed">${esc(clean)}</p>`;
      })
      .join('');

    const resultsHtml = results.length
      ? `<div class="mt-10 pt-10 border-t border-line">
          <h4 class="text-xs font-medium tracking-wide text-muted mb-5">Результаты</h4>
          <div class="space-y-3">
            ${results
              .map((p) => `<p class="text-sm text-ink/80 leading-relaxed">${esc(p.replace(/^[-–•*]\s*/, ''))}</p>`)
              .join('')}
          </div>
        </div>`
      : '';

    document.getElementById('modal-content').innerHTML = `
      <div>
        <h4 class="text-xs font-medium tracking-wide text-muted mb-5">Решение</h4>
        <div class="space-y-3">${solutionHtml || `<p class="text-sm text-muted">${esc(c.description)}</p>`}</div>
        ${resultsHtml}
      </div>`;

    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.classList.add('modal-open');
    document.getElementById('modal-close').focus();
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    }, 250);
  }

  function initModal() {
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-backdrop').addEventListener('click', closeModal);
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeModal();
      }
    });
  }

  const parsed = parseMain();
  renderHero(parsed);
  renderStats(parsed.stats);
  renderTabs();
  renderCards();
  renderExperience(parsed.experience);
  renderCertificates(parsed.certificates);
  renderContacts(parsed.contacts);
  initModal();
  initReveal();
  initHeaderScroll();
  initNavSpy();
  initMotion();
})();
