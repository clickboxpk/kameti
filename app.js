/* Committee app - Phase 1 frontend (vanilla JS, no build step) */
(() => {
  const API = ((window.APP_CONFIG && window.APP_CONFIG.API_BASE) || '').replace(/\/$/, '');

  // ---------- translations ----------
  const L = {
    en: {
      appName: 'Committee', signIn: 'Sign in', signOut: 'Sign out', username: 'Username', password: 'Password',
      firstSetup: 'First-time setup', setupTitle: 'Create super admin', setupKey: 'Setup key', createAccount: 'Create account',
      committees: 'Committees', newCommittee: 'New committee', noCommittees: 'No committees yet. Create your first one.',
      name: 'Name', committeeName: 'Committee name', months: 'Number of months', amount: 'Monthly amount (Rs)',
      startDate: 'Start date', payoutOrder: 'Payout order', fixed: 'Fixed order', ballot: 'Ballot (draw)', manual: 'Decided each month',
      notes: 'Notes (optional)', save: 'Save', cancel: 'Cancel', edit: 'Edit', delete: 'Delete', back: 'Back',
      members: 'Members', addMember: 'Add member', editMember: 'Edit member', phoneOptional: 'Phone (optional)',
      turn: 'Turn', turnOptional: 'Turn number', noMembers: 'No members yet. Add the first one.',
      shareLink: 'Link for members', shareHint: 'Anyone with this link can view this committee (read only). It never expires.',
      copyLink: 'Copy link', copied: 'Link copied', newLink: 'Make a new link', newLinkWarn: 'The old link will stop working. Continue?',
      confirmDelete: 'Delete this permanently?', users: 'Organizers', newUser: 'New organizer', editUser: 'Edit organizer',
      active: 'Active', disabled: 'Disabled', newPasswordOpt: 'New password (leave empty to keep)', newPassword: 'New password',
      settings: 'Settings', language: 'Language', profile: 'Profile', currentPassword: 'Current password', changePassword: 'Change password',
      saved: 'Saved', status: 'Status', st_active: 'Active', st_completed: 'Completed', st_archived: 'Archived',
      perMonth: 'per month', monthsUnit: 'months', payoutPerTurn: 'Payout per turn', owner: 'Owner', loading: 'Loading…',
      monthNow: 'Month {n} of {m}', notStarted: 'Not started yet', finished: 'All months finished',
      linkInvalid: 'This link is not valid.', memberView: 'Committee details', genericError: 'Something went wrong. Try again.',
      organizer: 'Organizer', super_admin: 'Super admin', committeesCount: 'committees', role: 'Role', pwHint: 'At least 8 characters',
      ballot: 'Live ballot', fairNote: 'The winner is picked at random by the server the moment you press spin. Nobody, including you, can change it, and every result stays in the log.',
      ballotTime: 'Ballot time (optional)', existingTurns: 'Existing turns',
      keepTurns: 'Keep turns already given (only members without a turn go on the wheel)', resetAll: 'Clear all turns and draw everyone again',
      createBallot: 'Create ballot', startDraw: 'Start the draw', spinNext: 'Spin for the next turn', cancelBallot: 'Cancel ballot',
      cancelBallotAsk: 'Cancel this ballot? Turns already drawn will stay.', changeTime: 'Change time', shareWhatsApp: 'Share on WhatsApp',
      addCalendar: 'Add to calendar', startsIn: 'Ballot starts in', waitingOrganizer: 'Waiting for the organizer to start…',
      getReady: 'Get ready…', spinning: 'Spinning…', congrats: 'Congratulations!', turnNo: 'Turn {n}', turnGoesTo: 'Turn {n}: {name}',
      drawLog: 'Draw log', drawComplete: 'Ballot complete. All turns are drawn.', remaining: '{n} on the wheel', ok: 'OK',
      ballotScheduled: 'Ballot time', noTime: 'No time set',
      waMsg: '{name}: the ballot will be held on {when}. Watch it live on your phone: {link}',
      waMsgNoTime: '{name}: the ballot is coming up. Watch it live on your phone: {link}',
    },
    ur: {
      appName: 'کمیٹی', signIn: 'لاگ اِن', signOut: 'لاگ آؤٹ', username: 'صارف نام', password: 'پاس ورڈ',
      firstSetup: 'پہلی بار سیٹ اپ', setupTitle: 'سپر ایڈمن بنائیں', setupKey: 'سیٹ اپ کی', createAccount: 'اکاؤنٹ بنائیں',
      committees: 'کمیٹیاں', newCommittee: 'نئی کمیٹی', noCommittees: 'ابھی کوئی کمیٹی نہیں۔ اپنی پہلی کمیٹی بنائیں۔',
      name: 'نام', committeeName: 'کمیٹی کا نام', months: 'مہینوں کی تعداد', amount: 'ماہانہ رقم (روپے)',
      startDate: 'شروع ہونے کی تاریخ', payoutOrder: 'وصولی کی ترتیب', fixed: 'مقررہ ترتیب', ballot: 'قرعہ اندازی', manual: 'ہر مہینے طے ہو',
      notes: 'نوٹس (اختیاری)', save: 'محفوظ کریں', cancel: 'منسوخ', edit: 'ترمیم', delete: 'حذف کریں', back: 'واپس',
      members: 'ممبرز', addMember: 'ممبر شامل کریں', editMember: 'ممبر میں ترمیم', phoneOptional: 'فون نمبر (اختیاری)',
      turn: 'باری', turnOptional: 'باری کا نمبر', noMembers: 'ابھی کوئی ممبر نہیں۔ پہلا ممبر شامل کریں۔',
      shareLink: 'ممبرز کے لیے لنک', shareHint: 'یہ لنک جس کے پاس ہو وہ کمیٹی دیکھ سکتا ہے (صرف دیکھنے کے لیے)۔ یہ کبھی ختم نہیں ہوتا۔',
      copyLink: 'لنک کاپی کریں', copied: 'لنک کاپی ہو گیا', newLink: 'نیا لنک بنائیں', newLinkWarn: 'پرانا لنک کام کرنا بند کر دے گا۔ جاری رکھیں؟',
      confirmDelete: 'کیا اسے ہمیشہ کے لیے حذف کریں؟', users: 'آرگنائزرز', newUser: 'نیا آرگنائزر', editUser: 'آرگنائزر میں ترمیم',
      active: 'فعال', disabled: 'بند', newPasswordOpt: 'نیا پاس ورڈ (پرانا رکھنا ہو تو خالی چھوڑیں)', newPassword: 'نیا پاس ورڈ',
      settings: 'سیٹنگز', language: 'زبان', profile: 'پروفائل', currentPassword: 'موجودہ پاس ورڈ', changePassword: 'پاس ورڈ تبدیل کریں',
      saved: 'محفوظ ہو گیا', status: 'حالت', st_active: 'جاری', st_completed: 'مکمل', st_archived: 'آرکائیو',
      perMonth: 'ماہانہ', monthsUnit: 'مہینے', payoutPerTurn: 'ہر باری کی رقم', owner: 'مالک', loading: 'لوڈ ہو رہا ہے…',
      monthNow: '{m} میں سے مہینہ {n}', notStarted: 'ابھی شروع نہیں ہوئی', finished: 'تمام مہینے مکمل',
      linkInvalid: 'یہ لنک درست نہیں۔', memberView: 'کمیٹی کی تفصیل', genericError: 'کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔',
      organizer: 'آرگنائزر', super_admin: 'سپر ایڈمن', committeesCount: 'کمیٹیاں', role: 'کردار', pwHint: 'کم از کم 8 حروف',
      ballot: 'لائیو قرعہ اندازی', fairNote: 'اسپن دباتے ہی سرور رینڈم طریقے سے فاتح چنتا ہے۔ اسے کوئی بھی، آپ بھی، تبدیل نہیں کر سکتا، اور ہر نتیجہ ریکارڈ میں محفوظ رہتا ہے۔',
      ballotTime: 'قرعہ اندازی کا وقت (اختیاری)', existingTurns: 'موجودہ باریاں',
      keepTurns: 'جن کی باری لگ چکی ہے انہیں رہنے دیں (صرف بغیر باری والے پہیے میں ہوں گے)', resetAll: 'تمام باریاں ختم کر کے سب کا دوبارہ قرعہ نکالیں',
      createBallot: 'قرعہ اندازی بنائیں', startDraw: 'قرعہ اندازی شروع کریں', spinNext: 'اگلی باری کے لیے پہیہ گھمائیں', cancelBallot: 'قرعہ اندازی منسوخ کریں',
      cancelBallotAsk: 'یہ قرعہ اندازی منسوخ کریں؟ جو باریاں نکل چکی ہیں وہ برقرار رہیں گی۔', changeTime: 'وقت تبدیل کریں', shareWhatsApp: 'واٹس ایپ پر شیئر کریں',
      addCalendar: 'کیلنڈر میں شامل کریں', startsIn: 'قرعہ اندازی شروع ہونے میں', waitingOrganizer: 'آرگنائزر کے شروع کرنے کا انتظار…',
      getReady: 'تیار ہو جائیں…', spinning: 'پہیہ گھوم رہا ہے…', congrats: 'مبارک ہو!', turnNo: 'باری نمبر {n}', turnGoesTo: 'باری {n}: {name}',
      drawLog: 'قرعہ اندازی کا ریکارڈ', drawComplete: 'قرعہ اندازی مکمل۔ تمام باریاں نکل چکی ہیں۔', remaining: 'پہیے میں {n} نام', ok: 'ٹھیک ہے',
      ballotScheduled: 'قرعہ اندازی کا وقت', noTime: 'وقت مقرر نہیں',
      waMsg: '{name}: قرعہ اندازی {when} کو ہو گی۔ اپنے موبائل پر لائیو دیکھیں: {link}',
      waMsgNoTime: '{name}: قرعہ اندازی جلد ہو گی۔ اپنے موبائل پر لائیو دیکھیں: {link}',
    },
  };

  // ---------- state & helpers ----------
  let lang = localStorage.getItem('lang') || 'ur';
  let token = localStorage.getItem('token') || null;
  let me = null;

  const app = document.getElementById('app');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const t = (k, v) => {
    let s = (L[lang] && L[lang][k]) ?? L.en[k] ?? k;
    if (v) for (const [a, b] of Object.entries(v)) s = s.replace('{' + a + '}', b);
    return s;
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (n) => Number(n || 0).toLocaleString('en-PK');
  const money = (n) => (lang === 'ur' ? `${num(n)} روپے` : `Rs ${num(n)}`);
  const modeLabel = (m) => t(m);

  function applyLang(l) {
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ur' ? 'rtl' : 'ltr';
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  async function api(path, { method = 'GET', body, headers = {} } = {}) {
    const h = { 'Content-Type': 'application/json', ...headers };
    if (token) h.Authorization = 'Bearer ' + token;
    let res;
    try {
      res = await fetch(API + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
    } catch {
      throw new Error(t('genericError'));
    }
    let data = null;
    try { data = await res.json(); } catch { /* empty */ }
    if (res.status === 401 && token && path !== '/api/login') { clearSession(); go('/'); throw new Error(data?.error || ''); }
    if (!res.ok) throw new Error((data && data.error) || t('genericError'));
    return data;
  }

  function clearSession() { token = null; me = null; localStorage.removeItem('token'); }
  function go(h) { if (location.hash === '#' + h) router(); else location.hash = h; }

  function currentMonth(c) {
    if (!c.start_date) return { state: 'unknown', n: 0 };
    const [y, m] = c.start_date.split('-').map(Number);
    const d = new Date();
    const k = (d.getFullYear() - y) * 12 + (d.getMonth() + 1 - m) + 1;
    if (k < 1) return { state: 'notStarted', n: 0 };
    if (k > c.months) return { state: 'finished', n: 0 };
    return { state: 'running', n: k };
  }
  function statusLine(c) {
    const s = currentMonth(c);
    if (s.state === 'running') return t('monthNow', { n: s.n, m: c.months });
    if (s.state === 'notStarted') return t('notStarted');
    if (s.state === 'finished') return t('finished');
    return '';
  }
  function ribbon(c, big) {
    const turns = new Set(c.turns || []);
    const now = currentMonth(c).n;
    let h = '';
    for (let i = 1; i <= c.months; i++) {
      h += `<span class="pip${turns.has(i) ? ' on' : ''}${i === now ? ' now' : ''}">${big ? i : ''}</span>`;
    }
    return `<div class="ribbon${big ? ' big' : ''}" aria-hidden="true">${h}</div>`;
  }

  // ---------- shell ----------
  function shell(inner, nav = true) {
    const hash = location.hash || '#/';
    const link = (href, label) => `<a href="${href}" class="${hash === href ? 'on' : ''}">${esc(label)}</a>`;
    const showNav = nav && me;
    app.innerHTML = `
      <header class="top">
        <a class="brand" href="#/">${esc(t('appName'))}</a>
        ${showNav ? `<nav>${link('#/', t('committees'))}${me.role === 'super_admin' ? link('#/users', t('users')) : ''}${link('#/settings', t('settings'))}</nav>` : ''}
        <div class="tools">
          <button class="lang" data-lang type="button">${lang === 'ur' ? 'English' : 'اردو'}</button>
          ${showNav ? `<button class="ghost" data-out type="button">${esc(t('signOut'))}</button>` : ''}
        </div>
      </header>
      <main>${inner}</main>`;
    $('[data-lang]').onclick = () => {
      applyLang(lang === 'ur' ? 'en' : 'ur');
      if (me) api('/api/me', { method: 'PATCH', body: { language: lang } }).catch(() => {});
      router();
    };
    const out = $('[data-out]');
    if (out) out.onclick = async () => { try { await api('/api/logout', { method: 'POST' }); } catch { /* ignore */ } clearSession(); go('/'); };
  }

  // ---------- dialog form ----------
  function fieldHtml(f, val) {
    const v = val ?? f.default ?? '';
    const id = 'f_' + f.name;
    let input;
    if (f.type === 'select') {
      input = `<select id="${id}" name="${f.name}">${f.options.map(([k, l]) => `<option value="${esc(k)}"${String(k) === String(v) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    } else if (f.type === 'textarea') {
      input = `<textarea id="${id}" name="${f.name}" maxlength="500">${esc(v)}</textarea>`;
    } else {
      input = `<input id="${id}" name="${f.name}" type="${f.type || 'text'}" value="${esc(v)}"${f.required ? ' required' : ''}${f.min != null ? ` min="${f.min}"` : ''}${f.max != null ? ` max="${f.max}"` : ''}${f.minlength ? ` minlength="${f.minlength}"` : ''}${f.type === 'number' ? ' inputmode="numeric"' : ''}${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ''}${f.dir ? ` dir="${f.dir}"` : ''}>`;
    }
    return `<label for="${id}">${esc(f.label)}</label>${input}${f.hint ? `<div class="muted small">${esc(f.hint)}</div>` : ''}`;
  }

  function openForm({ title, fields, values = {}, onSubmit, submitLabel }) {
    const dlg = document.createElement('dialog');
    dlg.innerHTML = `<form><h3>${esc(title)}</h3>${fields.map((f) => fieldHtml(f, values[f.name])).join('')}
      <p class="err" hidden></p>
      <div class="row"><button type="button" class="ghost" data-x>${esc(t('cancel'))}</button><button class="primary">${esc(submitLabel || t('save'))}</button></div></form>`;
    const form = $('form', dlg);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = $('.err', dlg);
      const btn = $('.primary', dlg);
      err.hidden = true; btn.disabled = true;
      try { await onSubmit(Object.fromEntries(new FormData(form))); dlg.close(); }
      catch (ex) { err.textContent = ex.message; err.hidden = false; btn.disabled = false; }
    });
    $('[data-x]', dlg).onclick = () => dlg.close();
    dlg.addEventListener('close', () => dlg.remove());
    document.body.append(dlg);
    dlg.showModal();
  }

  async function safe(fn) {
    try { await fn(); }
    catch (e) { shell(`<p class="err">${esc(e.message || t('genericError'))}</p>`, !!me); }
  }

  // ---------- views ----------
  function viewLogin() {
    me = null;
    shell(`<div class="auth"><h1>${esc(t('signIn'))}</h1>
      <form id="lf">
        ${fieldHtml({ name: 'username', label: t('username'), required: true, autocomplete: 'username', dir: 'ltr' })}
        ${fieldHtml({ name: 'password', label: t('password'), type: 'password', required: true, autocomplete: 'current-password', dir: 'ltr' })}
        <p class="err" hidden></p>
        <button class="primary">${esc(t('signIn'))}</button>
      </form>
      <p><a class="small muted" href="#/setup">${esc(t('firstSetup'))}</a></p></div>`, false);
    $('#lf').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target, err = $('.err', f);
      err.hidden = true;
      try {
        const d = await api('/api/login', { method: 'POST', body: Object.fromEntries(new FormData(f)) });
        token = d.token; me = d.user;
        localStorage.setItem('token', token);
        applyLang(me.language);
        go('/');
      } catch (ex) { err.textContent = ex.message; err.hidden = false; }
    };
  }

  function viewSetup() {
    shell(`<div class="auth"><h1>${esc(t('setupTitle'))}</h1>
      <form id="sf">
        ${fieldHtml({ name: 'name', label: t('name'), required: true })}
        ${fieldHtml({ name: 'username', label: t('username'), required: true, dir: 'ltr', autocomplete: 'username' })}
        ${fieldHtml({ name: 'password', label: t('password'), type: 'password', required: true, minlength: 8, hint: t('pwHint'), dir: 'ltr', autocomplete: 'new-password' })}
        ${fieldHtml({ name: 'key', label: t('setupKey'), type: 'password', required: true, dir: 'ltr' })}
        <p class="err" hidden></p>
        <button class="primary">${esc(t('createAccount'))}</button>
      </form></div>`, false);
    $('#sf').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target, err = $('.err', f), d = Object.fromEntries(new FormData(f));
      err.hidden = true;
      try {
        await api('/api/setup', { method: 'POST', headers: { 'X-Setup-Key': d.key }, body: { name: d.name, username: d.username, password: d.password } });
        toast(t('saved'));
        go('/');
      } catch (ex) { err.textContent = ex.message; err.hidden = false; }
    };
  }

  function committeeFields(owners) {
    const fields = [];
    if (owners) fields.push({ name: 'owner_id', label: t('owner'), type: 'select', options: owners.map((u) => [u.id, u.name]) });
    fields.push(
      { name: 'name', label: t('committeeName'), required: true },
      { name: 'months', label: t('months'), type: 'number', required: true, min: 1, max: 120, default: 10 },
      { name: 'amount', label: t('amount'), type: 'number', required: true, min: 0, default: 1000 },
      { name: 'start_date', label: t('startDate'), type: 'date' },
      { name: 'payout_mode', label: t('payoutOrder'), type: 'select', options: ['fixed', 'ballot', 'manual'].map((m) => [m, modeLabel(m)]) },
      { name: 'notes', label: t('notes'), type: 'textarea' },
    );
    return fields;
  }

  async function viewList() {
    shell(`<p class="muted">${esc(t('loading'))}</p>`);
    const { committees } = await api('/api/committees');
    const rows = committees.map((c) => `
      <a class="item" href="#/c/${c.id}">
        <div class="grow">
          <div class="title">${esc(c.name)} ${c.status !== 'active' ? `<span class="tag">${esc(t('st_' + c.status))}</span>` : ''}</div>
          <div class="facts small"><span>${esc(money(c.amount))} ${esc(t('perMonth'))}</span><span>${c.months} ${esc(t('monthsUnit'))}</span><span>${c.member_count} ${esc(t('members'))}</span>${me.role === 'super_admin' ? `<span>${esc(c.owner_name)}</span>` : ''}</div>
          ${ribbon(c)}
        </div>
      </a>`).join('');
    shell(`<div class="head"><h1>${esc(t('committees'))}</h1><button class="primary" data-new>${esc(t('newCommittee'))}</button></div>
      <div class="list">${rows || `<div class="empty">${esc(t('noCommittees'))}</div>`}</div>`);
    $('[data-new]').onclick = async () => {
      let owners = null;
      if (me.role === 'super_admin') {
        try { owners = (await api('/api/users')).users.filter((u) => u.active); } catch { /* ignore */ }
      }
      openForm({
        title: t('newCommittee'),
        fields: committeeFields(owners),
        values: { owner_id: me.id },
        onSubmit: async (d) => {
          const r = await api('/api/committees', { method: 'POST', body: d });
          go('/c/' + r.id);
        },
      });
    };
  }

  async function viewCommittee(id) {
    shell(`<p class="muted">${esc(t('loading'))}</p>`);
    const d = await api('/api/committees/' + id);
    const c = d.committee;
    c.turns = d.members.map((m) => m.turn_no).filter((n) => n !== null);
    const byId = Object.fromEntries(d.members.map((m) => [m.id, m]));
    const link = location.origin + location.pathname + '#/s/' + c.share_token;
    const reload = () => viewCommittee(id);

    const memberRows = d.members.map((m) => `
      <div class="item">
        <div class="badge${m.turn_no ? ' has' : ''}">${m.turn_no ?? '–'}</div>
        <div class="grow"><div class="title">${esc(m.name)}</div>
          ${m.phone || m.notes ? `<div class="muted small">${m.phone ? `<bdi dir="ltr">${esc(m.phone)}</bdi>` : ''} ${esc(m.notes || '')}</div>` : ''}</div>
        <button class="link-btn" data-em="${m.id}">${esc(t('edit'))}</button>
        <button class="link-btn red" data-dm="${m.id}">${esc(t('delete'))}</button>
      </div>`).join('');

    shell(`
      <a class="small" href="#/">← ${esc(t('back'))}</a>
      <div class="head"><h1>${esc(c.name)} ${c.status !== 'active' ? `<span class="tag">${esc(t('st_' + c.status))}</span>` : ''}</h1>
        <div class="actions"><button class="primary" data-ballot>${esc(t('ballot'))}</button><button class="ghost" data-ec>${esc(t('edit'))}</button><button class="danger" data-dc>${esc(t('delete'))}</button></div></div>
      <div class="facts">
        <span><b>${esc(money(c.amount))}</b> ${esc(t('perMonth'))}</span>
        <span><b>${c.months}</b> ${esc(t('monthsUnit'))}</span>
        <span>${esc(t('payoutPerTurn'))}: <b>${esc(money(c.amount * c.months))}</b></span>
        <span>${esc(t('payoutOrder'))}: <b>${esc(modeLabel(c.payout_mode))}</b></span>
        ${c.start_date ? `<span>${esc(t('startDate'))}: <b><bdi>${esc(c.start_date)}</bdi></b></span>` : ''}
        ${me.role === 'super_admin' ? `<span>${esc(t('owner'))}: <b>${esc(d.owner_name)}</b></span>` : ''}
      </div>
      ${ribbon(c, true)}
      <div class="muted small">${esc(statusLine(c))}</div>
      ${c.notes ? `<p class="muted">${esc(c.notes)}</p>` : ''}

      <section>
        <div class="head"><h2>${esc(t('members'))} (${d.members.length})</h2><button class="primary" data-am>${esc(t('addMember'))}</button></div>
        <div class="list">${memberRows || `<div class="empty">${esc(t('noMembers'))}</div>`}</div>
      </section>

      <section>
        <h2>${esc(t('shareLink'))}</h2>
        <p class="muted small">${esc(t('shareHint'))}</p>
        <div class="share"><input readonly id="sl" value="${esc(link)}" aria-label="${esc(t('shareLink'))}">
          <button class="primary" data-copy>${esc(t('copyLink'))}</button>
          <button class="ghost" data-nl>${esc(t('newLink'))}</button></div>
      </section>`);

    $('[data-ballot]').onclick = () => go('/c/' + id + '/draw');
    $('[data-ec]').onclick = () => openForm({
      title: t('edit'),
      fields: [...committeeFields(null), { name: 'status', label: t('status'), type: 'select', options: ['active', 'completed', 'archived'].map((s) => [s, t('st_' + s)]) }],
      values: c,
      onSubmit: async (v) => { await api('/api/committees/' + id, { method: 'PATCH', body: v }); toast(t('saved')); reload(); },
    });
    $('[data-dc]').onclick = async () => {
      if (!confirm(t('confirmDelete'))) return;
      await api('/api/committees/' + id, { method: 'DELETE' });
      go('/');
    };
    const memberFields = [
      { name: 'name', label: t('name'), required: true },
      { name: 'turn_no', label: t('turnOptional'), type: 'number', min: 1, max: c.months },
      { name: 'phone', label: t('phoneOptional'), type: 'tel', dir: 'ltr' },
      { name: 'notes', label: t('notes'), type: 'textarea' },
    ];
    $('[data-am]').onclick = () => openForm({
      title: t('addMember'), fields: memberFields,
      onSubmit: async (v) => { await api(`/api/committees/${id}/members`, { method: 'POST', body: v }); reload(); },
    });
    $$('[data-em]').forEach((b) => b.onclick = () => openForm({
      title: t('editMember'), fields: memberFields, values: byId[b.dataset.em],
      onSubmit: async (v) => { await api('/api/members/' + b.dataset.em, { method: 'PATCH', body: v }); reload(); },
    }));
    $$('[data-dm]').forEach((b) => b.onclick = async () => {
      if (!confirm(t('confirmDelete'))) return;
      await api('/api/members/' + b.dataset.dm, { method: 'DELETE' });
      reload();
    });
    $('[data-copy]').onclick = async () => {
      try { await navigator.clipboard.writeText(link); } catch { $('#sl').select(); document.execCommand('copy'); }
      toast(t('copied'));
    };
    $('[data-nl]').onclick = async () => {
      if (!confirm(t('newLinkWarn'))) return;
      await api(`/api/committees/${id}/regenerate-link`, { method: 'POST' });
      reload();
    };
  }

  async function viewUsers() {
    shell(`<p class="muted">${esc(t('loading'))}</p>`);
    const { users } = await api('/api/users');
    const rows = users.map((u) => `
      <div class="item">
        <div class="grow"><div class="title">${esc(u.name)} ${u.active ? '' : `<span class="tag off">${esc(t('disabled'))}</span>`}</div>
          <div class="muted small"><bdi dir="ltr">@${esc(u.username)}</bdi> · ${esc(t(u.role))} · ${u.committees} ${esc(t('committeesCount'))}</div></div>
        <button class="link-btn" data-eu="${u.id}">${esc(t('edit'))}</button>
      </div>`).join('');
    shell(`<div class="head"><h1>${esc(t('users'))}</h1><button class="primary" data-nu>${esc(t('newUser'))}</button></div><div class="list">${rows}</div>`);
    const byId = Object.fromEntries(users.map((u) => [u.id, u]));
    $('[data-nu]').onclick = () => openForm({
      title: t('newUser'),
      fields: [
        { name: 'name', label: t('name'), required: true },
        { name: 'username', label: t('username'), required: true, dir: 'ltr' },
        { name: 'phone', label: t('phoneOptional'), type: 'tel', dir: 'ltr' },
        { name: 'password', label: t('password'), type: 'password', required: true, minlength: 8, hint: t('pwHint'), dir: 'ltr', autocomplete: 'new-password' },
      ],
      onSubmit: async (v) => { await api('/api/users', { method: 'POST', body: v }); viewUsers(); },
    });
    $$('[data-eu]').forEach((b) => b.onclick = () => {
      const u = byId[b.dataset.eu];
      openForm({
        title: t('editUser'),
        fields: [
          { name: 'name', label: t('name'), required: true },
          { name: 'phone', label: t('phoneOptional'), type: 'tel', dir: 'ltr' },
          { name: 'active', label: t('status'), type: 'select', options: [['1', t('active')], ['0', t('disabled')]] },
          { name: 'password', label: t('newPasswordOpt'), type: 'password', minlength: 8, dir: 'ltr', autocomplete: 'new-password' },
        ],
        values: { ...u, active: u.active ? '1' : '0' },
        onSubmit: async (v) => {
          const body = { name: v.name, phone: v.phone, active: v.active === '1' };
          if (v.password) body.password = v.password;
          await api('/api/users/' + u.id, { method: 'PATCH', body });
          viewUsers();
        },
      });
    });
  }

  function viewSettings() {
    shell(`<h1>${esc(t('settings'))}</h1>
      <div class="list">
        <div class="item"><div class="grow"><div class="title">${esc(me.name)}</div><div class="muted small"><bdi dir="ltr">@${esc(me.username)}</bdi> · ${esc(t(me.role))}${me.phone ? ` · <bdi dir="ltr">${esc(me.phone)}</bdi>` : ''}</div></div>
          <button class="link-btn" data-prof>${esc(t('edit'))}</button></div>
        <div class="item"><div class="grow"><div class="title">${esc(t('changePassword'))}</div></div>
          <button class="link-btn" data-pw>${esc(t('edit'))}</button></div>
      </div>`);
    $('[data-prof]').onclick = () => openForm({
      title: t('profile'),
      fields: [
        { name: 'name', label: t('name'), required: true },
        { name: 'phone', label: t('phoneOptional'), type: 'tel', dir: 'ltr' },
        { name: 'language', label: t('language'), type: 'select', options: [['ur', 'اردو'], ['en', 'English']] },
      ],
      values: me,
      onSubmit: async (v) => {
        await api('/api/me', { method: 'PATCH', body: v });
        me = await api('/api/me');
        applyLang(me.language);
        toast(t('saved'));
        viewSettings();
      },
    });
    $('[data-pw]').onclick = () => openForm({
      title: t('changePassword'),
      fields: [
        { name: 'current_password', label: t('currentPassword'), type: 'password', required: true, dir: 'ltr', autocomplete: 'current-password' },
        { name: 'new_password', label: t('newPassword'), type: 'password', required: true, minlength: 8, hint: t('pwHint'), dir: 'ltr', autocomplete: 'new-password' },
      ],
      onSubmit: async (v) => { await api('/api/me', { method: 'PATCH', body: v }); toast(t('saved')); },
    });
  }

  // ---------- live ballot (wheel) ----------
  const TAU = Math.PI * 2;
  const TURNS = 6; // full rotations before the wheel lands
  const WHEEL_COLORS = [['#0b6e6e', '#ffffff'], ['#f2c14e', '#14212b'], ['#17595c', '#ffffff'], ['#e9a820', '#14212b'], ['#2f8f83', '#ffffff'], ['#f7d98a', '#14212b']];

  function fmtCountdown(ms) {
    let s = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    const p = (n) => String(n).padStart(2, '0');
    return (d ? d + (lang === 'ur' ? ' دن ' : 'd ') : '') + `${p(h)}:${p(m)}:${p(s)}`;
  }
  const fmtWhen = (ms) => new Date(ms).toLocaleString(lang === 'ur' ? 'ur-PK' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  const fmtTime = (ms) => new Date(ms).toLocaleTimeString(lang === 'ur' ? 'ur-PK' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
  const toLocalInput = (ms) => new Date(ms - new Date(ms).getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  function calendarUrl(name, ms, link) {
    const f = (x) => new Date(x).toISOString().replace(/[-:]|\.\d{3}/g, '');
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(name) +
      '&dates=' + f(ms) + '/' + f(ms + 30 * 60000) + '&details=' + encodeURIComponent(link);
  }

  function drawWheel(canvas, pool, theta) {
    const size = canvas.clientWidth;
    if (!size) return;
    const dpr = window.devicePixelRatio || 1;
    const px = Math.round(size * dpr);
    if (canvas.width !== px) { canvas.width = px; canvas.height = px; }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2, R = size / 2 - 12;
    const n = pool.length;

    ctx.beginPath(); ctx.arc(cx, cy, R + 7, 0, TAU); ctx.fillStyle = '#14212b'; ctx.fill();
    if (!n) {
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = '#e8edf1'; ctx.fill();
    } else {
      const a = TAU / n;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(theta - Math.PI / 2); // angle 0 = top, clockwise
      const fs = Math.max(11, Math.min(22, R * 0.7 * a * 0.5));
      ctx.font = `600 ${fs}px Manrope, 'Noto Naskh Arabic', sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      for (let i = 0; i < n; i++) {
        let ci = i % WHEEL_COLORS.length;
        if (n > 1 && i === n - 1 && ci === 0) ci = 3;
        const [bg, fg] = WHEEL_COLORS[ci];
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R, i * a, (i + 1) * a); ctx.closePath();
        ctx.fillStyle = bg; ctx.fill();
        if (n > 1) { ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.save();
        ctx.rotate(i * a + a / 2);
        ctx.fillStyle = fg;
        const full = pool[i].name;
        let label = full;
        const maxW = R * 0.62;
        while (label.length > 1 && ctx.measureText(label).width > maxW) label = label.slice(0, -1);
        if (label !== full) label += '…';
        ctx.fillText(label, R - 16, 0);
        ctx.restore();
      }
      ctx.restore();
    }
    // hub
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.12, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = '#14212b'; ctx.stroke();
    // pointer (fixed at the top)
    ctx.beginPath(); ctx.moveTo(cx - 15, 0); ctx.lineTo(cx + 15, 0); ctx.lineTo(cx, 38); ctx.closePath();
    ctx.fillStyle = '#e0402a'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  }

  // Shows the ballot. Everything on screen is computed from server timestamps, so every phone shows the same moment.
  function mountStage(root, { fetchState, onFrame, onReveal }) {
    root.innerHTML = `<div class="stage" hidden>
      <div class="stage-note" aria-live="polite"></div>
      <div class="wheel"><canvas aria-hidden="true"></canvas><div class="count" hidden></div></div></div>`;
    const stageEl = $('.stage', root), noteEl = $('.stage-note', root), wheelEl = $('.wheel', root);
    const canvas = $('canvas', root), countEl = $('.count', root);

    const overlay = document.createElement('div');
    overlay.className = 'winner';
    overlay.hidden = true;
    overlay.innerHTML = `<canvas class="confetti" aria-hidden="true"></canvas>
      <div class="winner-card" role="dialog" aria-live="assertive">
        <div class="winner-kicker"></div><div class="winner-name"></div><div class="winner-turn"></div>
        <button class="primary" data-ok type="button"></button></div>`;
    document.body.append(overlay);

    let state = null, skew = 0, destroyed = false, pollTimer = 0, raf = 0, confettiRaf = 0, closeTimer = 0;
    let lastDraw = '', lastNote = '';
    const shown = new Set();

    function nextDelay() {
      if (document.hidden) return 8000;
      const d = state && state.draw;
      if (!d) return 20000;
      const now = Date.now() + skew;
      const last = state.steps[state.steps.length - 1];
      if (d.status === 'done' && last && now > last.reveal_at + 30000) return 30000;
      if (last && now < last.reveal_at + 8000) return 2000;
      if (d.status === 'live') return 3000;
      if (d.scheduled_at && d.scheduled_at - now < 120000) return 2500;
      return 10000;
    }
    async function poll() {
      clearTimeout(pollTimer);
      if (destroyed) return;
      try {
        const s = await fetchState();
        if (destroyed) return;
        skew = s.now - Date.now();
        state = s;
      } catch { /* keep the last known state */ }
      pollTimer = setTimeout(poll, nextDelay());
    }
    const onVis = () => { if (!document.hidden) poll(); };
    document.addEventListener('visibilitychange', onVis);

    function destroy() {
      destroyed = true;
      clearTimeout(pollTimer); clearTimeout(closeTimer);
      cancelAnimationFrame(raf); cancelAnimationFrame(confettiRaf);
      document.removeEventListener('visibilitychange', onVis);
      overlay.remove();
    }

    function closeWinner() {
      clearTimeout(closeTimer);
      cancelAnimationFrame(confettiRaf);
      overlay.hidden = true;
    }
    $('[data-ok]', overlay).onclick = closeWinner;

    function confetti() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const cv = $('.confetti', overlay);
      const dpr = window.devicePixelRatio || 1;
      const W = (cv.width = Math.round(innerWidth * dpr)), H = (cv.height = Math.round(innerHeight * dpr));
      const ctx = cv.getContext('2d');
      const colors = ['#0b6e6e', '#e9a820', '#f2c14e', '#2f8f83', '#ffffff', '#e0402a'];
      const parts = Array.from({ length: 150 }, () => ({
        x: W / 2 + (Math.random() - 0.5) * W * 0.25, y: H * 0.45,
        vx: (Math.random() - 0.5) * 15 * dpr, vy: (-Math.random() * 17 - 6) * dpr, g: 0.38 * dpr,
        s: (6 + Math.random() * 7) * dpr, r: Math.random() * TAU, vr: (Math.random() - 0.5) * 0.4,
        c: colors[(Math.random() * colors.length) | 0],
      }));
      const t0 = performance.now();
      cancelAnimationFrame(confettiRaf);
      const tick = (now) => {
        const el = now - t0;
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.r += p.vr;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.globalAlpha = Math.max(0, 1 - Math.max(0, el - 2600) / 1400);
          ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6);
          ctx.restore();
        }
        if (el < 4000) confettiRaf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
      };
      tick(t0);
    }

    function showWinner(step) {
      $('.winner-kicker', overlay).textContent = t('congrats');
      $('.winner-name', overlay).textContent = step.name;
      $('.winner-turn', overlay).textContent = t('turnNo', { n: step.position });
      $('[data-ok]', overlay).textContent = t('ok');
      overlay.hidden = false;
      confetti();
      if (navigator.vibrate) navigator.vibrate([90, 50, 90]);
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeWinner, 12000);
    }

    function frame() {
      if (destroyed) return;
      if (!root.isConnected) { destroy(); return; }
      raf = requestAnimationFrame(frame);
      if (!state) return;
      const now = Date.now() + skew;
      const d = state.draw;
      if (!d) {
        stageEl.hidden = true;
        if (onFrame) onFrame({ state, now, phase: 'none' });
        return;
      }
      stageEl.hidden = false;
      const last = state.steps[state.steps.length - 1];
      let pool = state.idle_pool, theta = 0, phase = 'waiting', count = null, note = '';
      if (last) {
        pool = last.pool;
        const idx = Math.max(0, pool.findIndex((p) => p.id === last.member_id));
        const a = TAU / pool.length;
        const finalTheta = TURNS * TAU - (idx + 0.5 + last.offset) * a;
        if (now < last.started_at) {
          phase = 'ready'; count = Math.ceil((last.started_at - now) / 1000); note = t('getReady');
        } else if (now < last.reveal_at) {
          phase = 'spinning';
          const p = (now - last.started_at) / (last.reveal_at - last.started_at);
          theta = finalTheta * (1 - Math.pow(1 - p, 4));
          note = t('spinning');
        } else {
          phase = 'revealed'; theta = finalTheta;
          const key = d.id + ':' + last.position;
          if (!shown.has(key)) {
            shown.add(key);
            if (now - last.reveal_at < 20000) showWinner(last);
            if (onReveal) onReveal(last);
          }
          note = t('turnGoesTo', { n: last.position, name: last.name });
        }
      } else if (d.scheduled_at && now < d.scheduled_at) {
        note = t('startsIn') + ' ' + fmtCountdown(d.scheduled_at - now);
      } else {
        note = t('waitingOrganizer');
      }
      const finished = d.status === 'done' && last && now > last.reveal_at + 20000;
      if (finished) note = t('drawComplete');
      wheelEl.hidden = !!finished;

      if (note !== lastNote) { noteEl.textContent = note; lastNote = note; }
      countEl.hidden = count === null;
      if (count !== null) countEl.textContent = count;

      if (!finished) {
        const sig = pool.map((p) => p.id).join(',') + '|' + theta.toFixed(4) + '|' + canvas.clientWidth;
        if (sig !== lastDraw) { lastDraw = sig; drawWheel(canvas, pool, theta); }
      }
      if (onFrame) onFrame({ state, now, phase, finished });
    }

    poll();
    raf = requestAnimationFrame(frame);
    return { refresh: poll, destroy, getState: () => state };
  }

  function logHtml(state, now) {
    const rows = (state && state.steps || []).filter((s) => s.reveal_at <= now)
      .map((s) => `<div class="item"><div class="badge has">${s.position}</div><div class="grow title">${esc(s.name)}</div><div class="muted small"><bdi>${esc(fmtTime(s.reveal_at))}</bdi></div></div>`);
    return rows.join('');
  }

  async function viewDraw(id) {
    shell(`<p class="muted">${esc(t('loading'))}</p>`);
    const d = await api('/api/committees/' + id);
    const c = d.committee;
    const link = location.origin + location.pathname + '#/s/' + c.share_token;
    shell(`
      <a class="small" href="#/c/${id}">← ${esc(c.name)}</a>
      <div class="head"><h1>${esc(t('ballot'))}</h1></div>
      <p class="muted small">${esc(t('fairNote'))}</p>
      <div id="stage"></div>
      <div id="ctl" class="ctl"></div>
      <section id="logbox" hidden><h2>${esc(t('drawLog'))}</h2><div class="list" id="log"></div></section>`);

    let ctlSig = '', logSig = '', busy = false;
    const ctl = $('#ctl');
    let stage;

    const createBallot = (existing) => openForm({
      title: existing ? t('changeTime') : t('createBallot'),
      fields: existing
        ? [{ name: 'scheduled_at', label: t('ballotTime'), type: 'datetime-local', dir: 'ltr' }]
        : [
          { name: 'scheduled_at', label: t('ballotTime'), type: 'datetime-local', dir: 'ltr' },
          { name: 'reset_turns', label: t('existingTurns'), type: 'select', options: [['0', t('keepTurns')], ['1', t('resetAll')]] },
        ],
      values: existing ? { scheduled_at: existing.scheduled_at ? toLocalInput(existing.scheduled_at) : '' } : {},
      onSubmit: async (v) => {
        const when = v.scheduled_at ? new Date(v.scheduled_at).getTime() : null;
        if (existing) await api('/api/draws/' + existing.id, { method: 'PATCH', body: { scheduled_at: when } });
        else await api(`/api/committees/${id}/draws`, { method: 'POST', body: { scheduled_at: when, reset_turns: v.reset_turns === '1' } });
        stage.destroy();
        viewDraw(id);
      },
    });

    function renderCtl(state, now, phase) {
      const dr = state.draw;
      const last = state.steps[state.steps.length - 1];
      const active = dr && (dr.status === 'scheduled' || dr.status === 'live');
      const remaining = last ? last.pool.length - 1 : state.idle_pool.length;
      const canSpin = active && !busy && remaining > 0 && (!last || now >= last.reveal_at + 3000);
      const sig = [dr && dr.id, dr && dr.status, dr && dr.scheduled_at, state.steps.length, canSpin, remaining, lang].join('|');
      if (sig === ctlSig) return;
      ctlSig = sig;
      if (!active) {
        ctl.innerHTML = `<div class="actions"><button class="primary" data-create>${esc(t('createBallot'))}</button></div>`;
        $('[data-create]', ctl).onclick = () => createBallot(null);
        return;
      }
      ctl.innerHTML = `
        <div class="facts"><span>${esc(t('ballotScheduled'))}: <b>${dr.scheduled_at ? esc(fmtWhen(dr.scheduled_at)) : esc(t('noTime'))}</b></span>
          <span>${esc(t('remaining', { n: remaining }))}</span></div>
        <div class="actions big">
          <button class="primary spin" data-spin ${canSpin ? '' : 'disabled'}>${esc(state.steps.length ? t('spinNext') : t('startDraw'))}</button>
        </div>
        <div class="actions">
          ${state.steps.length ? '' : `<button class="ghost" data-time>${esc(t('changeTime'))}</button>`}
          <button class="ghost" data-wa>${esc(t('shareWhatsApp'))}</button>
          <button class="danger" data-cancel>${esc(t('cancelBallot'))}</button>
        </div>`;
      $('[data-spin]', ctl).onclick = async () => {
        busy = true; ctlSig = '';
        try { await api(`/api/draws/${dr.id}/spin`, { method: 'POST' }); await stage.refresh(); }
        catch (e) { toast(e.message); }
        busy = false; ctlSig = '';
      };
      const tb = $('[data-time]', ctl);
      if (tb) tb.onclick = () => createBallot(dr);
      $('[data-wa]', ctl).onclick = () => {
        const msg = dr.scheduled_at
          ? t('waMsg', { name: c.name, when: fmtWhen(dr.scheduled_at), link })
          : t('waMsgNoTime', { name: c.name, link });
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      };
      $('[data-cancel]', ctl).onclick = async () => {
        if (!confirm(t('cancelBallotAsk'))) return;
        try { await api(`/api/draws/${dr.id}/cancel`, { method: 'POST' }); await stage.refresh(); ctlSig = ''; }
        catch (e) { toast(e.message); }
      };
    }

    stage = mountStage($('#stage'), {
      fetchState: () => api(`/api/committees/${id}/draw`),
      onFrame: ({ state, now, phase }) => {
        renderCtl(state, now, phase);
        const html = logHtml(state, now);
        if (html !== logSig) {
          logSig = html;
          $('#log').innerHTML = html;
          $('#logbox').hidden = !html;
        }
      },
    });
  }

  async function viewPublic(tok) {
    shell(`<p class="muted">${esc(t('loading'))}</p>`, false);
    let d;
    try { d = await api('/api/public/' + encodeURIComponent(tok)); }
    catch { shell(`<p class="empty">${esc(t('linkInvalid'))}</p>`, false); return; }
    const c = d.committee;
    const link = location.origin + location.pathname + '#/s/' + tok;
    const rowsOf = (ms) => ms.map((m) => `<div class="item"><div class="badge${m.turn_no ? ' has' : ''}">${m.turn_no ?? '–'}</div><div class="grow"><div class="title">${esc(m.name)}</div></div></div>`).join('')
      || `<div class="empty">${esc(t('noMembers'))}</div>`;
    shell(`<div class="muted small">${esc(t('memberView'))}</div><h1>${esc(c.name)}</h1>
      <div class="facts">
        <span><b>${esc(money(c.amount))}</b> ${esc(t('perMonth'))}</span>
        <span><b>${c.months}</b> ${esc(t('monthsUnit'))}</span>
        <span>${esc(t('payoutPerTurn'))}: <b>${esc(money(c.amount * c.months))}</b></span>
        ${c.start_date ? `<span>${esc(t('startDate'))}: <b><bdi>${esc(c.start_date)}</bdi></b></span>` : ''}
      </div>
      <div id="ribbon"></div><div class="muted small">${esc(statusLine(c))}</div>
      ${c.notes ? `<p class="muted">${esc(c.notes)}</p>` : ''}
      <div id="stage"></div><div id="cal" class="ctl small"></div>
      <section id="logbox" hidden><h2>${esc(t('drawLog'))}</h2><div class="list" id="log"></div></section>
      <section><h2>${esc(t('members'))}</h2><div class="list" id="mlist"></div></section>`, false);

    const paint = (ms) => {
      c.turns = ms.map((m) => m.turn_no).filter((n) => n !== null);
      $('#ribbon').innerHTML = ribbon(c, true);
      $('#mlist').innerHTML = rowsOf(ms);
    };
    paint(d.members);
    const refreshMembers = async () => {
      try { paint((await api('/api/public/' + encodeURIComponent(tok))).members); } catch { /* keep current list */ }
    };
    let calSig = '', logSig = '';
    mountStage($('#stage'), {
      fetchState: () => api('/api/public/' + encodeURIComponent(tok) + '/draw'),
      onReveal: () => setTimeout(refreshMembers, 800),
      onFrame: ({ state, now }) => {
        const dr = state.draw;
        const showCal = !!(dr && dr.status === 'scheduled' && dr.scheduled_at && dr.scheduled_at > now && !state.steps.length);
        const sig = showCal ? String(dr.scheduled_at) : '';
        if (sig !== calSig) {
          calSig = sig;
          $('#cal').innerHTML = showCal ? `<a href="${esc(calendarUrl(c.name, dr.scheduled_at, link))}" target="_blank" rel="noopener">${esc(t('addCalendar'))}</a>` : '';
        }
        const html = logHtml(state, now);
        if (html !== logSig) { logSig = html; $('#log').innerHTML = html; $('#logbox').hidden = !html; }
      },
    });
  }

  // ---------- router ----------
  async function router() {
    const h = location.hash.slice(1) || '/';
    let m;
    await safe(async () => {
      if ((m = h.match(/^\/s\/([\w-]+)$/))) return viewPublic(m[1]);
      if (h === '/setup') return viewSetup();
      if (!token) return viewLogin();
      if (!me) {
        try { me = await api('/api/me'); } catch { return viewLogin(); }
        if (me.language !== lang) applyLang(me.language);
      }
      if ((m = h.match(/^\/c\/(\d+)\/draw$/))) return viewDraw(+m[1]);
      if ((m = h.match(/^\/c\/(\d+)$/))) return viewCommittee(+m[1]);
      if (h === '/users' && me.role === 'super_admin') return viewUsers();
      if (h === '/settings') return viewSettings();
      return viewList();
    });
  }

  applyLang(lang);
  window.addEventListener('hashchange', router);
  router();
})();
