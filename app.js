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
      startDate: 'Start date', payoutOrder: 'Payout order', mode_fixed: 'Fixed order', mode_ballot: 'Ballot (draw)', mode_manual: 'Decided each month',
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
      payments: 'Payments', stPaid: 'Paid', stPartial: 'Partial', stPending: 'Pending', monthN: 'Month {n}', month: 'Month',
      collected: 'Collected', expected: 'Expected', totalCollected: 'Total collected', outstanding: 'Outstanding so far', payoutsGiven: 'Payouts given',
      amountPaid: 'Amount received (Rs)', paidOn: 'Date', method: 'Method', cash: 'Cash', bank: 'Bank transfer', jazzcash: 'JazzCash', easypaisa: 'Easypaisa', other: 'Other',
      reference: 'Reference no. (optional)', markPaid: 'Mark paid', markAllPaid: 'Mark all paid',
      markAllAsk: 'Mark every member who has no record as paid for month {n}?',
      payoutThisMonth: 'Payout this month', receiver: 'Receiver', recordPayout: 'Record payout', payoutAmount: 'Payout amount (Rs)',
      payoutGiven: 'Given on {d}', payoutNotGiven: 'Not given yet', noReceiver: 'No member has turn {n} yet.', register: 'Full register',
      remind: 'Reminders', remindTitle: 'Pending for month {n}', sendWhatsApp: 'WhatsApp', copyGroupMsg: 'Copy group message', copiedMsg: 'Message copied',
      nobodyPending: 'Everyone has paid for this month.', noPhone: 'No phone saved',
      remMsg: 'Assalam o Alaikum {name}, reminder: the {committee} committee payment of {amount} for month {n} is pending. Please pay and let me know. Thank you.',
      remGroupMsg: '{committee} committee, month {n}: payment is pending from {names}. Please pay soon.',
      reports: 'JPG reports', reportMonth: 'Month sheet', reportMember: 'Member statement', reportPayout: 'Payout slip', payoutSlip: 'Payout slip',
      chooseMember: 'Choose member', downloadJpg: 'Download JPG', shareImage: 'Share', exportCsv: 'Export CSV',
      backup: 'Backup', downloadBackup: 'Download', backupHint: 'A full backup file of your committees. Keep it safe: it contains members and secret links.',
      upcoming: 'Upcoming', payoutRow: 'Payout', close: 'Close', generated: 'Created on {d}', amountShort: 'Amount', date: 'Date', details: 'Details', memberTotalPaid: 'Total paid',
      waMsg: '{name}: the ballot will be held on {when}. Watch it live on your phone: {link}',
      waMsgNoTime: '{name}: the ballot is coming up. Watch it live on your phone: {link}',
    },
    ur: {
      appName: 'کمیٹی', signIn: 'لاگ اِن', signOut: 'لاگ آؤٹ', username: 'صارف نام', password: 'پاس ورڈ',
      firstSetup: 'پہلی بار سیٹ اپ', setupTitle: 'سپر ایڈمن بنائیں', setupKey: 'سیٹ اپ کی', createAccount: 'اکاؤنٹ بنائیں',
      committees: 'کمیٹیاں', newCommittee: 'نئی کمیٹی', noCommittees: 'ابھی کوئی کمیٹی نہیں۔ اپنی پہلی کمیٹی بنائیں۔',
      name: 'نام', committeeName: 'کمیٹی کا نام', months: 'مہینوں کی تعداد', amount: 'ماہانہ رقم (روپے)',
      startDate: 'شروع ہونے کی تاریخ', payoutOrder: 'وصولی کی ترتیب', mode_fixed: 'مقررہ ترتیب', mode_ballot: 'قرعہ اندازی', mode_manual: 'ہر مہینے طے ہو',
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
      payments: 'ادائیگیاں', stPaid: 'ادا', stPartial: 'جزوی', stPending: 'باقی', monthN: 'مہینہ {n}', month: 'مہینہ',
      collected: 'جمع ہوئے', expected: 'متوقع', totalCollected: 'کل جمع شدہ', outstanding: 'اب تک باقی', payoutsGiven: 'دی گئی وصولیاں',
      amountPaid: 'وصول شدہ رقم (روپے)', paidOn: 'تاریخ', method: 'طریقہ', cash: 'نقد', bank: 'بینک ٹرانسفر', jazzcash: 'جاز کیش', easypaisa: 'ایزی پیسہ', other: 'دیگر',
      reference: 'ریفرنس نمبر (اختیاری)', markPaid: 'ادا شدہ کریں', markAllPaid: 'سب کو ادا کریں',
      markAllAsk: 'مہینہ {n} کے جن ممبرز کا کوئی اندراج نہیں انہیں ادا شدہ کریں؟',
      payoutThisMonth: 'اس مہینے کی وصولی', receiver: 'وصول کرنے والا', recordPayout: 'وصولی درج کریں', payoutAmount: 'وصولی کی رقم (روپے)',
      payoutGiven: '{d} کو دی گئی', payoutNotGiven: 'ابھی نہیں دی گئی', noReceiver: 'ابھی کسی ممبر کی باری {n} نہیں۔', register: 'مکمل رجسٹر',
      remind: 'یاد دہانی', remindTitle: 'مہینہ {n} کے باقی ممبرز', sendWhatsApp: 'واٹس ایپ', copyGroupMsg: 'گروپ پیغام کاپی کریں', copiedMsg: 'پیغام کاپی ہو گیا',
      nobodyPending: 'اس مہینے سب نے ادا کر دیا ہے۔', noPhone: 'فون نمبر محفوظ نہیں',
      remMsg: 'السلام علیکم {name}، یاد دہانی: {committee} کمیٹی کی مہینہ {n} کی {amount} کی ادائیگی باقی ہے۔ براہِ کرم ادا کر کے بتا دیں۔ شکریہ۔',
      remGroupMsg: '{committee} کمیٹی، مہینہ {n}: ان کی ادائیگی باقی ہے: {names}۔ براہِ کرم جلد ادا کر دیں۔',
      reports: 'جے پی جی رپورٹ', reportMonth: 'ماہانہ شیٹ', reportMember: 'ممبر کا اسٹیٹمنٹ', reportPayout: 'وصولی کی پرچی', payoutSlip: 'وصولی کی پرچی',
      chooseMember: 'ممبر چنیں', downloadJpg: 'JPG ڈاؤن لوڈ کریں', shareImage: 'شیئر کریں', exportCsv: 'CSV ایکسپورٹ',
      backup: 'بیک اپ', downloadBackup: 'ڈاؤن لوڈ', backupHint: 'آپ کی تمام کمیٹیوں کا مکمل بیک اپ۔ اسے محفوظ رکھیں: اس میں ممبرز اور خفیہ لنک ہیں۔',
      upcoming: 'آئندہ', payoutRow: 'وصولی', close: 'بند کریں', generated: 'تاریخ: {d}', amountShort: 'رقم', date: 'تاریخ', details: 'تفصیل', memberTotalPaid: 'کل ادا شدہ',
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
  const modeLabel = (m) => t('mode_' + m);

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
        <div class="actions"><button class="primary" data-pay>${esc(t('payments'))}</button><button class="ghost" data-ballot>${esc(t('ballot'))}</button><button class="ghost" data-ec>${esc(t('edit'))}</button><button class="danger" data-dc>${esc(t('delete'))}</button></div></div>
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

    $('[data-pay]').onclick = () => go('/c/' + id + '/sheet');
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
        <div class="item"><div class="grow"><div class="title">${esc(t('backup'))}</div><div class="muted small">${esc(t('backupHint'))}</div></div>
          <button class="link-btn" data-bk>${esc(t('downloadBackup'))}</button></div>
      </div>`);
    $('[data-bk]').onclick = async () => {
      try {
        const data = await api('/api/export');
        downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `committee-backup-${todayStr()}.json`);
      } catch (e) { toast(e.message); }
    };
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
        const maxW = R * 0.8 - 16; // from the rim almost to the hub
        let size = fs;
        ctx.font = `600 ${size}px Manrope, 'Noto Naskh Arabic', sans-serif`;
        while (size > 13 && ctx.measureText(full).width > maxW) {
          size -= 1;
          ctx.font = `600 ${size}px Manrope, 'Noto Naskh Arabic', sans-serif`;
        }
        let label = full;
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
      if (last && now < last.reveal_at + 8000) return 2000;      // a spin is happening right now
      if (d.status === 'live') return 2500;                       // between spins
      if (!d.scheduled_at) return 3000;                           // waiting for the organizer to start
      if (d.scheduled_at - now < 10 * 60000) return 2500;         // start time is near (or has passed)
      return 15000;                                               // still far away
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
      <section><h2>${esc(t('members'))}</h2><div class="list" id="mlist"></div></section>
      <section><h2>${esc(t('payments'))}</h2><div id="ledger"></div></section>`, false);

    const paint = (ms) => {
      c.turns = ms.map((m) => m.turn_no).filter((n) => n !== null);
      $('#ribbon').innerHTML = ribbon(c, true);
      $('#mlist').innerHTML = rowsOf(ms);
    };
    paint(d.members);
    mountLedger($('#ledger'), { c, members: d.members, canEdit: false, fetchLedger: () => api('/api/public/' + encodeURIComponent(tok) + '/ledger') });
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

  // ---------- payments, payouts, reports, backup ----------
  const METHOD_KEYS = ['cash', 'bank', 'jazzcash', 'easypaisa', 'other'];
  const STATUS_COLOR = { paid: '#0b6e6e', partial: '#b97a00', pending: '#b3261e' };
  const stLabel = (s) => t(s === 'paid' ? 'stPaid' : s === 'partial' ? 'stPartial' : 'stPending');
  const todayStr = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const fmtDate = (s) => { if (!s) return ''; const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };
  const slug = (s) => String(s).replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'committee';
  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

  function monthLabel(c, n) {
    if (!c.start_date) return '';
    const [y, m] = c.start_date.split('-').map(Number);
    return new Date(y, m - 2 + n, 1).toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-GB', { month: 'long', year: 'numeric' });
  }
  function defaultMonth(c) {
    const s = currentMonth(c);
    return s.state === 'running' ? s.n : s.state === 'finished' ? c.months : 1;
  }
  function waNumber(p) {
    let d = String(p || '').replace(/[^\d+]/g, '');
    if (!d) return '';
    if (d.startsWith('+')) return d.slice(1);
    if (d.startsWith('00')) return d.slice(2);
    if (d.startsWith('0')) return '92' + d.slice(1);
    if (/^3\d{9}$/.test(d)) return '92' + d;
    return d;
  }
  function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  function openDialog(title, html, bind) {
    const dlg = document.createElement('dialog');
    dlg.innerHTML = `<h3>${esc(title)}</h3>${html}<div class="row"><button type="button" class="ghost" data-x>${esc(t('close'))}</button></div>`;
    $('[data-x]', dlg).onclick = () => dlg.close();
    dlg.addEventListener('close', () => dlg.remove());
    document.body.append(dlg);
    dlg.showModal();
    if (bind) bind(dlg);
    return dlg;
  }

  function showImage(blob, name) {
    const url = URL.createObjectURL(blob);
    const file = new File([blob], name, { type: 'image/jpeg' });
    const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
    const dlg = openDialog(t('reports'),
      `<img class="preview" src="${url}" alt=""><div class="actions center"><button class="primary" data-dl type="button">${esc(t('downloadJpg'))}</button>${canShare ? `<button class="ghost" data-sh type="button">${esc(t('shareImage'))}</button>` : ''}</div>`,
      (d) => {
        $('[data-dl]', d).onclick = () => downloadBlob(blob, name);
        const sh = $('[data-sh]', d);
        if (sh) sh.onclick = () => navigator.share({ files: [file] }).catch(() => {});
      });
    dlg.addEventListener('close', () => URL.revokeObjectURL(url));
  }

  function rrPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function rr(ctx, x, y, w, h, r, fill) { rrPath(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); }

  // Draws a report straight onto a canvas (no libraries), in English or Urdu (right-to-left).
  async function renderReport({ title, subtitle, chip, cols, rows, summary = [], footer }) {
    try {
      await Promise.all([
        document.fonts.load('600 28px Manrope', 'Aa1'),
        document.fonts.load('600 28px "Noto Naskh Arabic"', 'ابج'),
      ]);
    } catch { /* fall back to system fonts */ }
    const rtl = lang === 'ur';
    const W = 1080, M = 48, SC = 2, headH = 190, thH = 66, rowH = 74;
    const sumH = summary.length ? summary.length * 54 + 44 : 0;
    const tableTop = headH + 32;
    const tableH = thH + rows.length * rowH;
    const H = tableTop + tableH + 28 + sumH + 100;
    const cv = document.createElement('canvas');
    cv.width = W * SC; cv.height = H * SC;
    const ctx = cv.getContext('2d');
    ctx.scale(SC, SC);
    ctx.direction = rtl ? 'rtl' : 'ltr';
    ctx.textBaseline = 'middle';
    const F = (w, s) => `${w} ${s}px Manrope, 'Noto Naskh Arabic', sans-serif`;
    const fit = (txt, maxW) => {
      let s = String(txt ?? '');
      if (ctx.measureText(s).width <= maxW) return s;
      while (s.length > 1 && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1);
      return s + '…';
    };
    const startX = rtl ? W - M : M, endX = rtl ? M : W - M;
    const startAlign = rtl ? 'right' : 'left', endAlign = rtl ? 'left' : 'right';

    ctx.fillStyle = '#f2f5f7'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#0b6e6e'; ctx.fillRect(0, 0, W, headH);
    for (let i = 0; i < 12; i++) {
      rr(ctx, rtl ? W - M - 18 - i * 26 : M + i * 26, headH - 38, 18, 18, 5, i === 3 ? '#e9a820' : 'rgba(255,255,255,0.25)');
    }
    let chipW = 0;
    if (chip) {
      ctx.font = F(700, 28);
      chipW = ctx.measureText(chip).width + 44;
      const x0 = rtl ? M : W - M - chipW;
      rr(ctx, x0, 36, chipW, 54, 27, '#e9a820');
      ctx.fillStyle = '#14212b'; ctx.textAlign = 'center';
      ctx.fillText(chip, x0 + chipW / 2, 64);
    }
    ctx.textAlign = startAlign; ctx.fillStyle = '#ffffff'; ctx.font = F(700, 44);
    ctx.fillText(fit(title, W - 2 * M - chipW - 24), startX, 64);
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = F(500, 27);
    ctx.fillText(fit(subtitle, W - 2 * M), startX, 122);

    // table panel
    ctx.save();
    rrPath(ctx, M, tableTop, W - 2 * M, tableH, 18);
    ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.clip();
    ctx.fillStyle = '#e8eef1'; ctx.fillRect(M, tableTop, W - 2 * M, thH);
    rows.forEach((_, i) => { if (i % 2) { ctx.fillStyle = '#f7f9fa'; ctx.fillRect(M, tableTop + thH + i * rowH, W - 2 * M, rowH); } });
    ctx.restore();

    const tw = W - 2 * M, totalW = cols.reduce((a, c) => a + c.w, 0);
    let acc = 0;
    const geo = cols.map((c) => {
      const w = (tw * c.w) / totalW;
      const x0 = rtl ? W - M - acc - w : M + acc;
      acc += w;
      return { x0, x1: x0 + w, w };
    });
    const put = (txt, g, align, y) => {
      const pad = 20;
      ctx.textAlign = align === 'center' ? 'center' : align === 'end' ? endAlign : startAlign;
      const x = align === 'center' ? (g.x0 + g.x1) / 2 : ctx.textAlign === 'left' ? g.x0 + pad : g.x1 - pad;
      ctx.fillText(fit(txt, g.w - pad * 2), x, y);
    };
    ctx.font = F(700, 24); ctx.fillStyle = '#66737f';
    cols.forEach((c, i) => put(c.label, geo[i], c.align || 'start', tableTop + thH / 2));
    rows.forEach((row, r) => {
      const y = tableTop + thH + r * rowH + rowH / 2;
      row.forEach((cell, i) => {
        ctx.font = F(cell.bold ? 700 : 500, 28);
        ctx.fillStyle = cell.color || '#14212b';
        put(cell.text, geo[i], cols[i].align || 'start', y);
      });
    });

    let y = tableTop + tableH + 28;
    if (summary.length) {
      rr(ctx, M, y, W - 2 * M, sumH, 18, '#ffffff');
      summary.forEach(([label, value], i) => {
        const cy = y + 22 + i * 54 + 27;
        ctx.textAlign = startAlign; ctx.font = F(500, 26); ctx.fillStyle = '#66737f';
        ctx.fillText(label, startX + (rtl ? -24 : 24), cy);
        ctx.textAlign = endAlign; ctx.font = F(700, 28); ctx.fillStyle = '#14212b';
        ctx.fillText(fit(value, 560), endX + (rtl ? 24 : -24), cy);
      });
      y += sumH;
    }
    ctx.textAlign = 'center'; ctx.font = F(500, 22); ctx.fillStyle = '#66737f';
    ctx.fillText(footer, W / 2, H - 46);
    return cv;
  }

  async function makeJpg(spec, filename) {
    const cv = await renderReport(spec);
    cv.toBlob((b) => { if (b) showImage(b, filename); }, 'image/jpeg', 0.92);
  }

  // The payment sheet. The organizer can edit; members get the same view read-only.
  function mountLedger(el, { c, members, canEdit, committeeId, fetchLedger }) {
    const list = [...members].sort((a, b) => (a.turn_no ?? 1e9) - (b.turn_no ?? 1e9) || a.id - b.id);
    const months = range(c.months);
    let ledger = { payments: [], payouts: [] };
    let month = defaultMonth(c);

    async function load() { ledger = await fetchLedger(); render(); }

    function render() {
      const pm = new Map(ledger.payments.map((p) => [p.member_id + ':' + p.month_no, p]));
      const po = new Map(ledger.payouts.map((p) => [p.month_no, p]));
      const cm = currentMonth(c);
      const nowM = cm.state === 'running' ? cm.n : 0;
      const nameOf = (id) => (list.find((m) => m.id === id) || {}).name || '?';
      const pot = c.amount * c.months;

      const totals = (n) => {
        let collected = 0, paid = 0, partial = 0;
        for (const m of list) {
          const p = pm.get(m.id + ':' + n);
          if (!p) continue;
          collected += p.amount;
          if (p.status === 'paid') paid++; else if (p.status === 'partial') partial++;
        }
        return { collected, expected: c.amount * list.length, paid, partial, pending: list.length - paid - partial };
      };
      const T = totals(month);
      const dueMonths = cm.state === 'running' ? cm.n : cm.state === 'notStarted' ? 0 : c.months;
      let collectedAll = 0, collectedDue = 0;
      for (const p of ledger.payments) { collectedAll += p.amount; if (p.month_no <= dueMonths) collectedDue += p.amount; }
      const outstanding = Math.max(0, c.amount * list.length * dueMonths - collectedDue);
      const pct = T.expected ? Math.min(100, Math.round((T.collected * 100) / T.expected)) : 0;
      const ml = monthLabel(c, month);

      const rows = list.map((m) => {
        const p = pm.get(m.id + ':' + month);
        const st = p ? p.status : 'pending';
        const bits = [];
        if (p && p.paid_on) bits.push(fmtDate(p.paid_on));
        if (p && p.method) bits.push(t(p.method));
        if (p && (st === 'partial' || p.amount !== c.amount)) bits.push(money(p.amount));
        return `<div class="item">
          <div class="badge${m.turn_no ? ' has' : ''}">${m.turn_no ?? '–'}</div>
          <div class="grow"><div class="title">${esc(m.name)}</div>${bits.length ? `<div class="facts small">${bits.map((x) => `<span><bdi>${esc(x)}</bdi></span>`).join('')}</div>` : ''}</div>
          <span class="chip ${st}">${esc(stLabel(st))}</span>
          ${canEdit ? `${st === 'paid' ? '' : `<button class="link-btn" data-quick="${m.id}" title="${esc(t('markPaid'))}" aria-label="${esc(t('markPaid'))}">✓</button>`}<button class="link-btn" data-edit="${m.id}">${esc(t('edit'))}</button>` : ''}
        </div>`;
      }).join('') || `<div class="empty">${esc(t('noMembers'))}</div>`;

      const payout = po.get(month);
      const receiver = list.find((m) => m.turn_no === month);
      const payoutHtml = `<div class="payout">
        <div class="muted small">${esc(t('payoutThisMonth'))}</div>
        ${payout
          ? `<div class="title">${esc(nameOf(payout.member_id))} <span class="chip paid">${esc(t('payoutGiven', { d: fmtDate(payout.paid_on) }))}</span></div><div class="muted small"><bdi>${esc(money(payout.amount))}</bdi></div>`
          : receiver
            ? `<div class="title">${esc(receiver.name)} <span class="chip pending">${esc(t('payoutNotGiven'))}</span></div><div class="muted small"><bdi>${esc(money(pot))}</bdi></div>`
            : `<div class="muted">${esc(t('noReceiver', { n: month }))}</div>`}
        ${canEdit ? `<div class="actions"><button class="ghost" data-payout>${esc(payout ? t('edit') : t('recordPayout'))}</button>${payout ? `<button class="danger" data-delpayout>${esc(t('delete'))}</button>` : ''}</div>` : ''}
      </div>`;

      const reg = `<div class="reg-wrap"><table class="reg"><thead><tr><th class="sticky">${esc(t('name'))}</th>${months.map((n) =>
        `<th><button class="rh${n === month ? ' on' : ''}${n === nowM ? ' now' : ''}" data-m="${n}">${n}</button></th>`).join('')}</tr></thead><tbody>${list.map((m) =>
        `<tr><th class="sticky">${esc(m.name)}</th>${months.map((n) => {
          const p = pm.get(m.id + ':' + n);
          const st = p ? p.status : 'pending';
          return `<td class="${n === month ? 'sel' : ''}"><span class="dot ${st}${m.turn_no === n ? ' turn' : ''}" title="${esc(stLabel(st))}"></span></td>`;
        }).join('')}</tr>`).join('')}<tr class="po"><th class="sticky">${esc(t('payoutRow'))}</th>${months.map((n) =>
        `<td class="${n === month ? 'sel' : ''}">${po.has(n) ? '<span class="star">★</span>' : ''}</td>`).join('')}</tr></tbody></table></div>`;

      el.innerHTML = `
        <div class="dash">
          <div>
            <div class="muted small">${esc(t('monthN', { n: month }))}${ml ? ' — ' + esc(ml) : ''}</div>
            <div class="big"><bdi>${esc(money(T.collected))}</bdi> <span class="muted">/ <bdi>${esc(money(T.expected))}</bdi></span></div>
            <div class="bar"><i style="width:${pct}%"></i></div>
            <div class="facts small"><span class="ok">${esc(t('stPaid'))}: <b>${T.paid}</b></span><span class="mid">${esc(t('stPartial'))}: <b>${T.partial}</b></span><span class="bad">${esc(t('stPending'))}: <b>${T.pending}</b></span></div>
          </div>
          <div class="facts side">
            <span>${esc(t('totalCollected'))}: <b>${esc(money(collectedAll))}</b></span>
            <span>${esc(t('outstanding'))}: <b>${esc(money(outstanding))}</b></span>
            <span>${esc(t('payoutsGiven'))}: <b>${ledger.payouts.length}/${c.months}</b></span>
          </div>
        </div>
        <div class="pills" role="group">${months.map((n) =>
          `<button class="pill${n === month ? ' on' : ''}${n === nowM ? ' now' : ''}${po.has(n) ? ' given' : ''}" data-m="${n}">${n}</button>`).join('')}</div>
        <section class="tight">
          <div class="head"><h2>${esc(t('monthN', { n: month }))}</h2>
            ${canEdit ? `<div class="actions"><button class="ghost" data-markall>${esc(t('markAllPaid'))}</button><button class="ghost" data-remind>${esc(t('remind'))}</button><button class="ghost" data-reports>${esc(t('reports'))}</button><button class="ghost" data-csv>${esc(t('exportCsv'))}</button></div>` : ''}</div>
          <div class="list">${rows}</div>
        </section>
        <section>${payoutHtml}</section>
        <section><h2>${esc(t('register'))}</h2>${reg}</section>`;

      $$('[data-m]', el).forEach((b) => { b.onclick = () => { month = +b.dataset.m; render(); }; });
      if (!canEdit) return;

      const base = `/api/committees/${committeeId}`;
      const act = async (fn) => { try { await fn(); await load(); } catch (e) { toast(e.message); } };

      $$('[data-quick]', el).forEach((b) => { b.onclick = () => act(() => api(base + '/payments', { method: 'PUT', body: { member_id: +b.dataset.quick, month_no: month, status: 'paid', paid_on: todayStr() } })); });
      $$('[data-edit]', el).forEach((b) => { b.onclick = () => editPayment(+b.dataset.edit); });
      $('[data-markall]', el).onclick = () => {
        if (!confirm(t('markAllAsk', { n: month }))) return;
        act(() => api(base + '/payments/bulk', { method: 'POST', body: { month_no: month, paid_on: todayStr() } }));
      };
      $('[data-payout]', el).onclick = () => payoutForm();
      const dp = $('[data-delpayout]', el);
      if (dp) dp.onclick = () => { if (confirm(t('confirmDelete'))) act(() => api(`${base}/payouts/${month}`, { method: 'DELETE' })); };
      $('[data-remind]', el).onclick = () => reminders();
      $('[data-reports]', el).onclick = () => reportsMenu();
      $('[data-csv]', el).onclick = () => exportCsv();

      function editPayment(mid) {
        const m = list.find((x) => x.id === mid);
        const p = pm.get(mid + ':' + month);
        openForm({
          title: `${m.name} — ${t('monthN', { n: month })}`,
          fields: [
            { name: 'status', label: t('status'), type: 'select', options: [['paid', t('stPaid')], ['partial', t('stPartial')], ['pending', t('stPending')]] },
            { name: 'amount', label: t('amountPaid'), type: 'number', min: 0 },
            { name: 'paid_on', label: t('paidOn'), type: 'date', dir: 'ltr' },
            { name: 'method', label: t('method'), type: 'select', options: [['', '—'], ...METHOD_KEYS.map((k) => [k, t(k)])] },
            { name: 'reference', label: t('reference') },
            { name: 'notes', label: t('notes'), type: 'textarea' },
          ],
          values: { status: p ? p.status : 'paid', amount: p ? p.amount : c.amount, paid_on: p ? p.paid_on : todayStr(), method: p ? p.method || '' : '', reference: p ? p.reference || '' : '', notes: p ? p.notes || '' : '' },
          onSubmit: async (v) => { await api(base + '/payments', { method: 'PUT', body: { ...v, member_id: mid, month_no: month } }); await load(); },
        });
      }

      function payoutForm() {
        const cur = po.get(month);
        openForm({
          title: t('recordPayout') + ' — ' + t('monthN', { n: month }),
          fields: [
            { name: 'member_id', label: t('receiver'), type: 'select', options: list.map((m) => [m.id, m.name]) },
            { name: 'amount', label: t('payoutAmount'), type: 'number', min: 0 },
            { name: 'paid_on', label: t('paidOn'), type: 'date', dir: 'ltr' },
            { name: 'notes', label: t('notes'), type: 'textarea' },
          ],
          values: { member_id: cur ? cur.member_id : receiver ? receiver.id : list[0] && list[0].id, amount: cur ? cur.amount : pot, paid_on: cur ? cur.paid_on : todayStr(), notes: cur ? cur.notes || '' : '' },
          onSubmit: async (v) => { await api(base + '/payouts', { method: 'PUT', body: { ...v, month_no: month } }); await load(); },
        });
      }

      function reminders() {
        const pend = list.filter((m) => { const p = pm.get(m.id + ':' + month); return !p || p.status !== 'paid'; });
        const sep = lang === 'ur' ? '، ' : ', ';
        const items = pend.map((m) => {
          const p = pm.get(m.id + ':' + month);
          const due = c.amount - (p ? p.amount : 0);
          const msg = t('remMsg', { name: m.name, committee: c.name, amount: money(due), n: month });
          const href = `https://wa.me/${waNumber(m.phone)}?text=${encodeURIComponent(msg)}`;
          return `<div class="item"><div class="grow"><div class="title">${esc(m.name)}</div>
            <div class="muted small">${m.phone ? `<bdi dir="ltr">${esc(m.phone)}</bdi>` : esc(t('noPhone'))} — <bdi>${esc(money(due))}</bdi></div></div>
            <a class="primary" target="_blank" rel="noopener" href="${esc(href)}">${esc(t('sendWhatsApp'))}</a></div>`;
        }).join('');
        const groupMsg = t('remGroupMsg', { committee: c.name, n: month, names: pend.map((m) => m.name).join(sep) });
        openDialog(t('remindTitle', { n: month }),
          pend.length
            ? `<div class="list">${items}</div><div class="actions center"><button class="ghost" data-copy type="button">${esc(t('copyGroupMsg'))}</button></div>`
            : `<p class="muted">${esc(t('nobodyPending'))}</p>`,
          (d) => {
            const cb = $('[data-copy]', d);
            if (cb) cb.onclick = async () => { try { await navigator.clipboard.writeText(groupMsg); toast(t('copiedMsg')); } catch { toast(groupMsg); } };
          });
      }

      function reportsMenu() {
        openDialog(t('reports'),
          `<div class="menu"><button class="ghost" data-r="month">${esc(t('reportMonth'))}</button><button class="ghost" data-r="member">${esc(t('reportMember'))}</button>${po.has(month) ? `<button class="ghost" data-r="slip">${esc(t('reportPayout'))}</button>` : ''}</div>`,
          (d) => { $$('[data-r]', d).forEach((b) => { b.onclick = () => { d.close(); runReport(b.dataset.r); }; }); });
      }

      function runReport(kind) {
        const footer = t('generated', { d: fmtDate(todayStr()) });
        if (kind === 'month') {
          const data = list.map((m) => {
            const p = pm.get(m.id + ':' + month);
            const st = p ? p.status : 'pending';
            return [{ text: String(m.turn_no ?? '–') }, { text: m.name, bold: true }, { text: stLabel(st), color: STATUS_COLOR[st], bold: true },
              { text: p ? num(p.amount) : '–' }, { text: p && p.paid_on ? fmtDate(p.paid_on) : '–' }];
          });
          const summary = [[t('collected'), money(T.collected)], [t('expected'), money(T.expected)], [`${t('stPaid')} / ${t('stPartial')} / ${t('stPending')}`, `${T.paid} / ${T.partial} / ${T.pending}`]];
          if (payout) summary.push([t('payoutThisMonth'), `${nameOf(payout.member_id)} — ${money(payout.amount)}`]);
          makeJpg({
            title: c.name, subtitle: `${t('monthN', { n: month })}${ml ? ' — ' + ml : ''}`, chip: t('monthN', { n: month }),
            cols: [{ label: t('turn'), w: 1.1 }, { label: t('name'), w: 4 }, { label: t('status'), w: 2.2 }, { label: t('amountShort'), w: 2, align: 'end' }, { label: t('date'), w: 2.2 }],
            rows: data, summary, footer,
          }, `${slug(c.name)}-month-${month}.jpg`);
        } else if (kind === 'member') {
          openForm({
            title: t('chooseMember'),
            fields: [{ name: 'member_id', label: t('name'), type: 'select', options: list.map((m) => [m.id, m.name]) }],
            values: { member_id: list[0] && list[0].id },
            submitLabel: t('reportMember'),
            onSubmit: async (v) => {
              const m = list.find((x) => x.id === +v.member_id);
              let paidAll = 0, paidDue = 0;
              const data = months.map((n) => {
                const p = pm.get(m.id + ':' + n);
                const st = p ? p.status : 'pending';
                if (p) { paidAll += p.amount; if (n <= dueMonths) paidDue += p.amount; }
                const upcoming = !p && n > dueMonths;
                return [{ text: String(n) + (m.turn_no === n ? ' ★' : '') }, { text: monthLabel(c, n) || '–' },
                  upcoming ? { text: t('upcoming'), color: '#66737f' } : { text: stLabel(st), color: STATUS_COLOR[st], bold: true },
                  { text: p ? num(p.amount) : '–' }, { text: p && p.paid_on ? fmtDate(p.paid_on) : '–' }];
              });
              const got = ledger.payouts.find((x) => x.member_id === m.id);
              const summary = [[t('memberTotalPaid'), money(paidAll)], [t('outstanding'), money(Math.max(0, c.amount * dueMonths - paidDue))]];
              if (got) summary.push([t('reportPayout'), `${t('monthN', { n: got.month_no })} — ${money(got.amount)}`]);
              await makeJpg({
                title: m.name, subtitle: c.name, chip: m.turn_no ? `${t('turn')} ${m.turn_no}` : '',
                cols: [{ label: t('month'), w: 1.3 }, { label: '', w: 3 }, { label: t('status'), w: 2.2 }, { label: t('amountShort'), w: 2, align: 'end' }, { label: t('date'), w: 2.2 }],
                rows: data, summary, footer,
              }, `${slug(c.name)}-${slug(m.name)}.jpg`);
            },
          });
        } else if (kind === 'slip' && payout) {
          const data = [
            [{ text: t('receiver') }, { text: nameOf(payout.member_id), bold: true }],
            [{ text: t('month') }, { text: t('monthN', { n: month }) + (ml ? ' — ' + ml : '') }],
            [{ text: t('payoutAmount') }, { text: money(payout.amount), bold: true, color: '#0b6e6e' }],
            [{ text: t('date') }, { text: fmtDate(payout.paid_on) }],
          ];
          if (payout.notes) data.push([{ text: t('notes') }, { text: payout.notes }]);
          makeJpg({
            title: t('payoutSlip'), subtitle: c.name, chip: t('monthN', { n: month }),
            cols: [{ label: t('details'), w: 2.2 }, { label: '', w: 3.6 }], rows: data, footer,
          }, `${slug(c.name)}-payout-${month}.jpg`);
        }
      }

      function exportCsv() {
        const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
        const lines = [[t('name'), t('turn'), ...months.map((n) => t('monthN', { n })), t('totalCollected')].map(q).join(',')];
        for (const m of list) {
          let sum = 0;
          const cells = months.map((n) => {
            const p = pm.get(m.id + ':' + n);
            if (!p) return '';
            sum += p.amount;
            return p.amount + (p.status === 'partial' ? ' (' + t('stPartial') + ')' : '');
          });
          lines.push([m.name, m.turn_no ?? '', ...cells, sum].map(q).join(','));
        }
        downloadBlob(new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' }), slug(c.name) + '-register.csv');
      }
    }

    el.innerHTML = `<p class="muted">${esc(t('loading'))}</p>`;
    load().catch((e) => { el.innerHTML = `<p class="err">${esc(e.message || t('genericError'))}</p>`; });
  }

  async function viewSheet(id) {
    shell(`<p class="muted">${esc(t('loading'))}</p>`);
    const d = await api('/api/committees/' + id);
    const c = d.committee;
    shell(`<a class="small" href="#/c/${id}">← ${esc(c.name)}</a>
      <div class="head"><h1>${esc(t('payments'))}</h1></div><div id="ledger"></div>`);
    mountLedger($('#ledger'), { c, members: d.members, canEdit: true, committeeId: id, fetchLedger: () => api(`/api/committees/${id}/ledger`) });
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
      if ((m = h.match(/^\/c\/(\d+)\/sheet$/))) return viewSheet(+m[1]);
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
