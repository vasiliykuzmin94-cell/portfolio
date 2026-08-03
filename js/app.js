(function () {
  const { main, cases, categories } = PORTFOLIO_DATA;
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'ru';
  const BASE = typeof window.SITE_BASE === 'string' ? window.SITE_BASE : '';
  const IS_EN = LANG === 'en';

  const UI = IS_EN
    ? {
        defaultHero: 'Digital marketer',
        phone: 'Phone',
        emptyCategory: 'No cases in this category yet',
        openCase: 'Open case',
        readMore: 'Read more',
        emptyExperience: 'Experience will be added later',
        yandex: 'Yandex',
        google: 'Google',
        direction: 'Practice',
        client: 'Client',
        site: 'Site',
        keyResults: 'Key results',
        task: 'Task',
        tools: 'Tools',
        geo: 'Geography',
        period: 'Period',
        context: 'Context',
        solution: 'Solution',
        results: 'Results',
        materials: 'Case materials',
        illustration: 'Illustration',
        close: 'Close',
        landingsTitle: 'Product landing pages: from funnel logic to UX/UI',
        cover: {
          'performance-1': { value: '2×', label: 'cheaper than agencies', sub: 'A/B in-house' },
          'performance-baltlease': { value: '10,280', label: 'qualified leads', sub: 'CPA 4,646 ₽ · CPL 6,179 ₽' },
          'performance-2': { value: '110+', label: 'leads / month', sub: 'CPL 215 ₽' },
          'performance-3': { value: '15', label: 'leads · from zero', sub: 'CPL 466 ₽' },
          'performance-4': { value: '278', label: 'unique leads', sub: 'CPL 253 ₽ · CR 11%' },
          'performance-5': { value: '30+', label: 'leads in month one', sub: 'CPL 433 ₽' },
          'performance-6': { value: '7', label: 'leads · B2B from zero', sub: 'CPL 1,648 ₽' },
          'performance-7': { value: '81', label: 'B2B leads in month one', sub: 'CPL 411 ₽' },
          'performance-8': { value: '99', label: 'renovation leads', sub: 'CPL 836 ₽' },
          'performance-9': { value: '529', label: 'leads for 1C courses', sub: 'CPL 483 ₽' },
          'performance-10': { value: '+333%', label: 'audience growth', sub: '600 → 2,600' },
          'analytics-11': { value: '40%', label: 'attribution restored' },
          'web-seo-12': { value: '+900%', label: 'visit growth' },
          'web-seo-13': { value: 'TOP-3', label: 'in search' },
          'web-seo-14': { value: '+67%', label: 'lead growth' },
          'web-seo-15': { value: 'UX/UI', label: 'landing pages' },
          'crm-email-16': { value: '104M ₽', label: 'new business' },
          'serm-ai-17': { value: '0 ₽', label: 'production budget' },
          'serm-ai-18': { value: 'SERM', label: 'durable asset' },
        },
        coverFallback: {
          performance: { value: 'PPC', label: 'performance' },
          analytics: { value: 'B2B', label: 'analytics' },
          'web-seo': { value: 'SEO', label: 'web & search' },
          'crm-email': { value: 'CRM', label: 'retention' },
          'serm-ai': { value: 'AI', label: 'innovation' },
        },
        metricLabels: { leads: 'leads', cpl: 'CPL', revenue: 'revenue', conversion: 'conversion' },
      }
    : {
        defaultHero: 'Digital-маркетолог',
        phone: 'Телефон',
        emptyCategory: 'В этой категории пока нет кейсов',
        openCase: 'Открыть кейс',
        readMore: 'Подробнее',
        emptyExperience: 'Опыт будет добавлен позже',
        yandex: 'Яндекс',
        google: 'Google',
        direction: 'Направление',
        client: 'Клиент',
        site: 'Сайт',
        keyResults: 'Ключевые результаты',
        task: 'Задача',
        tools: 'Инструменты',
        geo: 'География',
        period: 'Период',
        context: 'Контекст',
        solution: 'Решение',
        results: 'Результаты',
        materials: 'Материалы кейса',
        illustration: 'Иллюстрация',
        close: 'Закрыть',
        landingsTitle: 'Продуктовые лендинги: от воронки до UX/UI',
        cover: {
          'performance-1': { value: '2×', label: 'дешевле агентств', sub: 'A/B in-house' },
          'performance-baltlease': { value: '10 280', label: 'целевых лидов', sub: 'CPA 4 646 ₽ · CPL 6 179 ₽' },
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
        },
        coverFallback: {
          performance: { value: 'PPC', label: 'performance' },
          analytics: { value: 'B2B', label: 'analytics' },
          'web-seo': { value: 'SEO', label: 'web & search' },
          'crm-email': { value: 'CRM', label: 'retention' },
          'serm-ai': { value: 'AI', label: 'innovation' },
        },
        metricLabels: { leads: 'лидов', cpl: 'CPL', revenue: 'оборот', conversion: 'конверсия' },
      };

  function asset(path) {
    if (!path) return path;
    if (/^(https?:|data:|mailto:|tel:|#)/i.test(path)) return path;
    return BASE + String(path).replace(/^\//, '');
  }

  const TABS = (categories || []).map((c) => ({ id: c.id, label: c.name }));
  let activeTab = TABS[0]?.id || 'performance';
  let lastFocusedElement = null;

  const TAG_RULES = [
    { pattern: /яндекс\.?директ|директ|yandex\s*direct/i, tag: IS_EN ? 'Yandex Direct' : 'Яндекс.Директ' },
    { pattern: /google\s*(ads|реклам)/i, tag: 'Google Ads' },
    { pattern: /яндекс\.?метрик|yandex\s*metrica/i, tag: IS_EN ? 'Metrica' : 'Метрика' },
    { pattern: /\bb2b\b/i, tag: 'B2B' },
    { pattern: /\bb2c\b/i, tag: 'B2C' },
    { pattern: /\bseo\b|органик|organic|поисков|search\s*results/i, tag: 'SEO' },
    { pattern: /crm|sap|битрикс|bitrix|mailganer/i, tag: 'CRM' },
    { pattern: /email|рассыл|mailing/i, tag: 'Email' },
    { pattern: /\bai\b|generative|ии|нейрос/i, tag: 'AI' },
    { pattern: /telegram|smm/i, tag: 'SMM' },
    { pattern: /tilda|лендинг|landing|1с|1c/i, tag: 'Web' },
    { pattern: /коллтрекинг|call\s*tracking|callibri/i, tag: 'Calltracking' },
    { pattern: /serm|wikipedia|википед|репутац|reputation/i, tag: 'SERM' },
    { pattern: /аналитик|analytics|сквозн|utm|attribution/i, tag: 'Analytics' },
    { pattern: /рся|yan\b|контекст|paid\s*search|performance/i, tag: 'Performance' },
  ];

  const lines = main.split('\n').map((l) => l.trim()).filter(Boolean);

  function parseMain() {
    const heroTitle = lines[0] || UI.defaultHero;
    const heroSubtitle = lines[1] || '';
    const compIdx = lines.findIndex((l) => /^(Основные компетенции|Core competencies)/i.test(l));
    const statsIdx = lines.findIndex((l) => /^(Я в цифрах|By the numbers)/i.test(l));
    const careerIdx = lines.findIndex((l) => /^(Карьерный путь|Career path)/i.test(l));
    const certIdx = lines.findIndex((l) => /^(Я и мои сертификаты|Certificates)/i.test(l));
    const contactIdx = lines.findIndex((l) => /^(Контакты|Contacts)/i.test(l));

    const competencies =
      compIdx >= 0 && lines[compIdx + 1]
        ? lines[compIdx + 1].split('·').map((s) => s.trim()).filter(Boolean)
        : [];

    const stats = [];
    if (statsIdx >= 0) {
      const end = careerIdx >= 0 ? careerIdx : certIdx >= 0 ? certIdx : lines.length;
      for (let i = statsIdx + 1; i < end; i++) {
        const m = lines[i].match(
          /^(\d[\d,\.\s+]*(?:\+)?(?:\s*(?:млн|млрд|[MB]|bn|mln|лет|years?|проектов|projects?|лидов|leads?))?\s*₽?)(.+)$/i
        );
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
        // Only short section headers ("Яндекс:", "Google:") — not cert titles that start with the brand.
        if (/^(Яндекс|Yandex)\s*:?\s*$/i.test(l)) group = 'yandex';
        else if (/^Google\s*:?\s*$/i.test(l)) group = 'google';
        else if (!/^(Все основные|All core)/i.test(l)) certificates[group].push(l);
      }
    }

    const contacts = [];
    if (contactIdx >= 0) {
      for (let i = contactIdx + 1; i < lines.length; i++) {
        const l = lines[i];
        if (/^(Я всегда|Всегда рад|Always available|Happy to discuss)/i.test(l)) continue;
        if (/^https?:\/\//.test(l)) {
          contacts.push({
            type: 'link',
            value: l,
            label: l.includes('t.me') ? 'Telegram' : 'VK',
          });
        } else if (l.includes('@')) {
          contacts.push({ type: 'email', value: l, label: 'Email' });
        } else if (/[\d()]/.test(l)) {
          contacts.push({ type: 'phone', value: l, label: UI.phone });
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
    const cleanMetaPrefix = (text) =>
      String(text || '')
        .replace(/^[-–•*]\s*/, '')
        .replace(/^(Клиент:|Client:|Ситуация:|Situation:|Проблема:|Problem:|Контекст:|Context:|Задача:|Task:)\s*/i, '')
        .trim();

    const desc = cleanMetaPrefix(c.description);
    if (desc.length > 40) return truncate(desc, 140);

    const paras = c.content.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const p of paras) {
      if (/^(Клиент:|Client:|Сайт:|Site:|Кейс:|Case:|Кейс \d+:|Case \d+:|Landing)/i.test(p)) continue;
      if (/^(Задачи:|Tasks:|Каналы|Channels|География|Ad geography|Geography|Период|Case period|Period|\*|\d+\.)/i.test(p))
        continue;
      const clean = cleanMetaPrefix(p);
      if (clean.length > 40) return truncate(clean, 140);
    }
    return truncate(desc, 140);
  }

  function truncate(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.slice(0, len).replace(/\s+\S*$/, '') + '…';
  }

  function displayTitle(c) {
    if (c.title === 'Landing') {
      return UI.landingsTitle;
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
      'Client:': 'client',
      'Сайт:': 'site',
      'Site:': 'site',
      'Каналы и инструменты:': 'tools',
      'Channels and tools:': 'tools',
      'География показа рекламы:': 'geo',
      'География показа:': 'geo',
      'Ad geography:': 'geo',
      'Geography:': 'geo',
      'Период кейса:': 'period',
      'Case period:': 'period',
      'Period:': 'period',
      'Задача:': 'task',
      'Task:': 'task',
    };

    const isResultsHeading = (line) =>
      /^(результаты(?:\s|$|:| теста| и | за)|результат(?:\s+за\b|:)|итоговые\s+результаты|итог(?:овые)?(?:\s|$|:)|главный бизнес|блок цифр|results(?:\s|$|:| for| of| test)|final\s+results|test\s+results)/i.test(
        line
      );

    const finalizeTasks = () => {
      if (section !== 'tasks') return;
      if (tasksBuffer.length && !meta.tasks) meta.tasks = tasksBuffer.join('\n');
      tasksBuffer = [];
      section = 'solution';
    };

    const isSolutionExitFromTasks = (line) =>
      isResultsHeading(line) ||
      /^(Трудности|Шаг|Стратегия|Подготов|С чего|Проблема|Ситуация|Контекст|Действия|Что сделал|Как шла|Нюансы|Аналитика|Разработка|Проектирование|Масштаб|Запуск|Реализация|Вводные|На старте|Запустил|Новый филиал|В \d{4}|Отказ от|Challenges|Step|Strategy|Preparation|Problem|Situation|Context|Actions|Analytics|Development|Design|Scale|Launch|Implementation|At the start|In \d{4})/i.test(
        line
      );

    for (const p of paras) {
      if (/^(Кейс:|Case:)/i.test(p) || /^(Кейс|Case) \d+:/i.test(p)) continue;

      const bare = p.replace(/^[-–•*]\s*/, '');

      let matched = false;
      for (const [prefix, key] of Object.entries(metaKeys)) {
        if (bare.startsWith(prefix)) {
          // Meta after task list must close tasks, otherwise solution leaks into «Задача».
          finalizeTasks();
          meta[key] = bare.slice(prefix.length).trim();
          matched = true;
          break;
        }
      }
      if (matched) continue;

      if (/^(Задачи:|Tasks:)/i.test(bare)) {
        section = 'tasks';
        tasksBuffer = [];
        continue;
      }

      if (section === 'tasks') {
        if (isSolutionExitFromTasks(bare)) {
          meta.tasks = tasksBuffer.join('\n');
          tasksBuffer = [];
          if (isResultsHeading(bare)) {
            section = 'results';
            results.push(bare);
          } else {
            section = 'solution';
            solution.push(p);
          }
        } else {
          tasksBuffer.push(bare);
        }
        continue;
      }

      if (isResultsHeading(bare)) {
        section = 'results';
        results.push(bare);
      } else if (section === 'results') {
        results.push(bare);
      } else {
        solution.push(p);
      }
    }

    if (tasksBuffer.length && !meta.tasks) meta.tasks = tasksBuffer.join('\n');
    return { meta, solution, results };
  }

  function highlightMetrics(text) {
    // Keep body calm: only gently emphasize the first key metric in a line.
    const escaped = esc(text);
    let used = false;
    return escaped.replace(
      /(\d[\d\s]*[.,]?\d*\s*(?:₽|%)|в\s+\d+(?:[.,]\d+)?\s*раза?|\d+(?:[.,]\d+)?\s*×|\d+\s*x\b)/i,
      (match) => {
        if (used) return match;
        used = true;
        return `<span class="modal-num">${match}</span>`;
      }
    );
  }

  function extractSidebarHighlights(results) {
    const items = [];
    for (const raw of results || []) {
      const clean = String(raw || '')
        .replace(/^[-–•*]\s*/, '')
        .trim();
      if (!clean) continue;
      if (/^(результаты|итог\b|итоговые|results|final results|test results)/i.test(clean) && clean.length < 100)
        continue;

      let label = '';
      let body = clean;
      const dashSplit = clean.match(/^([^—–:]{3,80}?)\s*[—–]\s*(.+)$/);
      const colonSplit = clean.match(/^([^:]{3,80}):\s*(.+)$/s);
      if (dashSplit && /\d/.test(dashSplit[2])) {
        label = dashSplit[1].trim();
        body = dashSplit[2].trim();
      } else if (colonSplit) {
        label = colonSplit[1].trim();
        body = colonSplit[2].trim();
      } else {
        continue;
      }

      const normalizedBody = body.replace(/(\d)\s*руб\.?/gi, '$1 ₽').replace(/(\d)\s*шт\.?/gi, '$1');
      const valueMatch =
        normalizedBody.match(
          /^(топ-?\s*\d+|\d+\s*[–-]\s*\d+|в\s+\d+(?:[.,]\d+)?\s*раза?(?:\s+меньше)?|\d+\s*×|[+\-]?\d[\d\s,]*%|\d[\d\s]*[.,]?\d*\s*(?:млн|млрд)\s*₽|\d[\d\s]*[.,]?\d*\s*₽|\d[\d\s]*(?:\+)?)/i
        ) ||
        normalizedBody.match(
          /(топ-?\s*\d+|\d+\s*[–-]\s*\d+|в\s+\d+(?:[.,]\d+)?\s*раза?(?:\s+меньше)?|\d+\s*×|[+\-]?\d[\d\s,]*%|\d[\d\s]*[.,]?\d*\s*(?:млн|млрд)\s*₽|\d[\d\s]*[.,]?\d*\s*₽)/i
        );
      if (!valueMatch) continue;

      const shortLabel = label
        .replace(/^получил\s+/i, '')
        .replace(/^снижение\s+/i, '')
        .replace(/^повышение\s+/i, '');

      items.push({
        label: shortLabel,
        value: valueMatch[1].replace(/\s+/g, ' ').trim(),
      });
      if (items.length >= 4) break;
    }
    return items;
  }

  function renderSidebarHighlights(results) {
    const items = extractSidebarHighlights(results);
    if (!items.length) return '';
    return `
      <div class="sidebar-highlights">
        <div class="sidebar-highlights-title">${esc(UI.keyResults)}</div>
        <div class="sidebar-highlights-grid">
          ${items
            .map(
              (item) => `
            <div class="sidebar-highlight">
              <div class="sidebar-highlight-value">${esc(item.value)}</div>
              <div class="sidebar-highlight-label">${esc(item.label)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>`;
  }

  function renderResultItem(raw) {
    const clean = String(raw || '')
      .replace(/^[-–•*]\s*/, '')
      .trim();
    if (!clean) return '';

    if (
      /^(результаты теста|итоговые результаты(?:\s+проекта)?|итоговые результаты за|test results|final results(?:\s+for)?)/i.test(
        clean
      ) &&
      clean.length < 100
    ) {
      return `<h4 class="modal-subhead">${esc(clean.replace(/:$/, ''))}</h4>`;
    }

    if (
      /^(результат|итог|итоговые результаты|results|final results)\b/i.test(clean) &&
      clean.length < 48 &&
      !/\d/.test(clean)
    ) {
      return '';
    }

    let label = '';
    let body = clean;
    const dashSplit = clean.match(/^([^—–:]{3,80}?)\s*[—–]\s*(.+)$/);
    const colonSplit = clean.match(/^([^:]{3,80}):\s*(.+)$/s);

    if (dashSplit && /\d/.test(dashSplit[2])) {
      label = dashSplit[1].trim();
      body = dashSplit[2].trim();
    } else if (colonSplit) {
      label = colonSplit[1].trim();
      body = colonSplit[2].trim();
    }

    const normalizedBody = body.replace(/(\d)\s*руб\.?/gi, '$1 ₽').replace(/(\d)\s*шт\.?/gi, '$1');
    const valueMatch = normalizedBody.match(
      /^(топ-?\s*\d+|\d+\s*[–-]\s*\d+|в\s+\d+(?:[.,]\d+)?\s*раза?(?:\s+меньше)?|\d+\s*×|[+\-]?\d[\d\s,]*%|\d[\d\s]*[.,]?\d*\s*(?:млн|млрд)\s*₽|\d[\d\s]*[.,]?\d*\s*₽|\d[\d\s]*(?:\+)?)/i
    );
    if (label && valueMatch) {
      const value = valueMatch[1].replace(/\s+/g, ' ').trim();
      const rest = normalizedBody.slice(valueMatch[0].length).replace(/^[:\s—–-]+/, '');
      return `<article class="result-card">
        <div class="result-card-kicker">${esc(label)}</div>
        <div class="result-card-value">${esc(value)}</div>
        ${rest ? `<p class="result-card-text">${highlightMetrics(rest)}</p>` : ''}
      </article>`;
    }

    if (label) {
      return `<article class="result-card">
        <div class="result-card-kicker">${esc(label)}</div>
        <p class="result-card-text">${highlightMetrics(normalizedBody || body)}</p>
      </article>`;
    }

    return `<p class="modal-body">${highlightMetrics(clean)}</p>`;
  }

  function extractMetrics(text) {
    const metrics = [];
    const seen = new Set();
    const patterns = [
      [/(\d[\d\s,\.+]*)\s*(?:уникальных?\s*|unique\s*)?(?:лидов?|заявок?|заявки|leads?)\b/gi, UI.metricLabels.leads],
      [/(?:CPL|цена за(?:явку| лид)|cost per lead)[:\s]*(\d[\d\s,\.]*)\s*(?:руб\.?|₽)/gi, UI.metricLabels.cpl],
      [/(\d[\d,\.\s]*(?:млн|млрд|mln|bn))\s*₽/gi, UI.metricLabels.revenue],
      [
        /(?:конверси[яи]|conversion|Open Rate|открыти[яй])[:\s]*\+?(\d[\d,\.]*)\s*%/gi,
        UI.metricLabels.conversion,
      ],
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
    if (UI.cover[c.id]) return UI.cover[c.id];

    const metrics = extractMetrics(`${c.title}\n${c.content}`);
    if (metrics.length) {
      const leads = metrics.find((m) => m.label === UI.metricLabels.leads);
      const cpl = metrics.find((m) => m.label === UI.metricLabels.cpl || m.label === 'CPL');
      const conv = metrics.find((m) => m.label === UI.metricLabels.conversion || m.label === '%');
      if (leads && cpl) {
        return {
          value: leads.value,
          label: UI.metricLabels.leads,
          sub: `CPL ${cpl.value} ₽${conv ? ` · CR ${conv.value}%` : ''}`,
        };
      }
      const metric = metrics[0];
      const suffix =
        metric.label === UI.metricLabels.cpl || metric.label === 'CPL'
          ? ' ₽'
          : metric.label === '%' || metric.label === UI.metricLabels.conversion
            ? '%'
            : '';
      return { value: `${metric.value}${suffix}`, label: metric.label };
    }

    return UI.coverFallback[c.category] || { value: '01', label: c.categoryName };
  }

  function coverHTML(c, index) {
    const metric = getCoverMetric(c);
    const variant = (index % 4) + 1;

    return `
      <div class="case-cover-custom" data-tone="${esc(c.category)}" data-variant="${variant}" aria-hidden="true">
        <div class="cover-grid"></div>
        <div class="cover-orb cover-orb-a"></div>
        <div class="cover-orb cover-orb-b"></div>
        <div class="cover-topline">
          <span>${esc(c.categoryName)}</span>
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
          <img src="${esc(asset('assets/signature.png?v=2'))}" alt="" class="cover-signature" aria-hidden="true">
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
    SMM: 'serm-ai',
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
      .map((s) => {
        const valueParts = s.value.match(/^(\d[\d\s,.]*\+?)(.*)$/);
        const number = valueParts ? valueParts[1].trim() : s.value;
        const suffix = valueParts ? valueParts[2].trim() : '';
        return `
      <div class="stat-card">
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
      grid.innerHTML = `<p class="text-muted col-span-full py-12 text-center">${esc(UI.emptyCategory)}</p>`;
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
          aria-label="${esc(UI.openCase)}: ${esc(displayTitle(c))}"
        >
          <div class="card-cover-wrap">
            ${coverHTML(c, i)}
            <div class="card-glow" aria-hidden="true"></div>
          </div>
          <div>
            <div class="card-index">
              <span>${esc(c.categoryName)}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              ${tags.map((t) => `<span class="tag-pill">${esc(t)}</span>`).join('')}
            </div>
            <h3>${esc(displayTitle(c))}</h3>
            <p class="text-sm leading-relaxed line-clamp-2 mb-5">${esc(summary)}</p>
            <div class="card-index">
              <span>${esc(UI.readMore)}</span>
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
      root.innerHTML = `<p class="text-muted">${esc(UI.emptyExperience)}</p>`;
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
      { key: 'yandex', label: UI.yandex },
      { key: 'google', label: UI.google },
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
    const images = (c.images || []).map(asset);
    const labels = c.imageLabels || [];

    document.getElementById('modal-category').textContent = c.categoryName;
    document.getElementById('modal-title').textContent = displayTitle(c);

    const hero = document.getElementById('modal-hero');
    const caseIndex = Math.max(0, cases.findIndex((x) => x.id === c.id));
    hero.innerHTML = coverHTML(c, caseIndex);

    const gallery = document.getElementById('modal-gallery');
    const galleryWrap = document.getElementById('modal-gallery-wrap');
    const galleryTitle = document.querySelector('#modal-gallery-wrap h4');
    if (galleryTitle) galleryTitle.textContent = UI.materials;
    if (images.length) {
      galleryWrap.classList.remove('hidden');
      gallery.innerHTML = images
        .map((src, idx) => {
          const label = labels[idx] || `${UI.illustration} ${idx + 1}`;
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
        ${sidebarField(UI.direction, c.categoryName)}
        ${sidebarField(UI.client, meta.client)}
        ${sidebarField(UI.site, meta.site)}
      </dl>
      ${renderSidebarHighlights(results)}`;

    const briefBlocks = [
      [UI.task, meta.task || meta.tasks],
      [UI.tools, meta.tools],
      [UI.geo, meta.geo],
      [UI.period, meta.period],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => {
        const lines = String(value)
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        const body =
          lines.length > 1
            ? lines.map((l) => `• ${highlightMetrics(l)}`).join('<br>')
            : highlightMetrics(lines[0] || String(value));
        return `
        <h4 class="modal-subhead">${esc(label)}</h4>
        <p class="modal-body">${body}</p>`;
      })
      .join('');

    let lastSolutionHeading = '';
    const solutionHtml = solution
      .map((p) => {
        const clean = p.replace(/^[-–•*]\s*/, '').trim();
        if (!clean) return '';

        if (/^действия и решения\.?$/i.test(clean.replace(/:$/, '').trim())) {
          return '';
        }

        const numbered = clean.match(/^\d+\.\s+([^.]{3,70})\.\s+(.+)$/s);
        if (numbered) {
          const title = numbered[1].trim();
          const body = numbered[2].trim();
          const key = title.toLowerCase();
          const heading =
            key === lastSolutionHeading
              ? ''
              : ((lastSolutionHeading = key), `<h4 class="modal-subhead">${esc(title)}</h4>`);
          return `${heading}<p class="modal-body">${highlightMetrics(body)}</p>`;
        }

        const labeled = clean.match(/^([^:]{3,70}):\s+(.{20,})$/s);
        if (labeled && !/^https?/i.test(labeled[1].trim())) {
          const title = labeled[1].trim().replace(/^\d+\.\s*/, '');
          const body = labeled[2].trim();
          const narrativeStart =
            /^(в рамках|в ходе|после|для|при|из|на основе|также|кроме|однако|чтобы|когда)/i.test(title);
          if (/^действия и решения$/i.test(title) || narrativeStart) {
            return `<p class="modal-body">${highlightMetrics(clean)}</p>`;
          }
          const key = title.toLowerCase();
          const heading =
            key === lastSolutionHeading
              ? ''
              : ((lastSolutionHeading = key), `<h4 class="modal-subhead">${esc(title)}</h4>`);
          return `${heading}<p class="modal-body">${highlightMetrics(body)}</p>`;
        }

        const isHeading =
          /^(Шаг \d+|Трудности|Стратегия|Подготов|С чего|Что сделал|Как шла|Нюансы|Аналитика|Разработка|Проектирование|Масштаб|Запуск|Оптимизация|Тестирование|Глубокая оптимизация|Решение|Реализация|Вводные|Стек)/i.test(
            clean
          ) && clean.length < 90;
        if (isHeading) {
          const key = clean.replace(/:$/, '').toLowerCase();
          if (key === lastSolutionHeading) return '';
          lastSolutionHeading = key;
          return `<h4 class="modal-subhead">${esc(clean.replace(/:$/, ''))}</h4>`;
        }
        return `<p class="modal-body">${highlightMetrics(clean)}</p>`;
      })
      .join('');

    const resultsHtml = results.length
      ? `<div class="modal-results">
          <h3 class="modal-section-title">${esc(UI.results)}</h3>
          <div class="results-grid">
            ${results.map((p) => renderResultItem(p)).join('')}
          </div>
        </div>`
      : '';

    document.getElementById('modal-content').innerHTML = `
      <div class="modal-copy">
        ${
          briefBlocks
            ? `<div class="modal-brief">
                <h3 class="modal-section-title">${esc(UI.context)}</h3>
                <div class="modal-solution">${briefBlocks}</div>
              </div>`
            : ''
        }
        <h3 class="modal-section-title">${esc(UI.solution)}</h3>
        <div class="modal-solution">${solutionHtml || `<p class="modal-body">${esc(c.description)}</p>`}</div>
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
    const modalClose = document.getElementById('modal-close');
    const lightboxClose = document.getElementById('lightbox-close');
    if (modalClose) modalClose.setAttribute('aria-label', UI.close);
    if (lightboxClose) lightboxClose.setAttribute('aria-label', UI.close);
    modalClose.addEventListener('click', closeModal);
    document.getElementById('modal-backdrop').addEventListener('click', closeModal);
    lightboxClose.addEventListener('click', closeLightbox);
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

  function initGrain() {
    const canvas = document.getElementById('grain-canvas');
    const layer = document.querySelector('.noise-layer');
    if (!canvas || !layer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      // Higher buffer ≈ finer grain (less upscaling).
      const scale = Math.min(1, 720 / Math.max(window.innerWidth, 1));
      w = Math.max(320, Math.floor(window.innerWidth * scale));
      h = Math.max(180, Math.floor(window.innerHeight * scale));
      canvas.width = w;
      canvas.height = h;
      paint();
    };

    const paint = () => {
      const image = ctx.createImageData(w, h);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = () => {
      frame += 1;
      // Every other frame keeps it lively without burning CPU.
      if (frame % 2 === 0) paint();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (reduceMotion) {
      paint();
      return;
    }

    raf = requestAnimationFrame(loop);
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          raf = requestAnimationFrame(loop);
        }
      },
      { passive: true }
    );
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
  initGrain();
})();
