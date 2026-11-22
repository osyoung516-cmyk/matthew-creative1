'use strict';
const config = window.studio;
const el = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
};
function secureURL(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url : null;
  } catch { return null; }
}
const chat = secureURL(config.chat);
const form = document.querySelector('#brief');
const status = document.querySelector('#status');
if (chat) {
  document.querySelectorAll('.chat').forEach(link => {
    link.href = chat.href;
    link.target = '_blank';
    link.rel = 'noopener';
  });
  document.querySelector('#chat-submit').hidden = false;
}
document.querySelector('#channel-state').textContent = chat
  ? '문의 내용을 작성한 뒤 카카오톡 채팅에 붙여넣거나 이메일로 보내주세요.'
  : '카카오톡 채널 연결을 준비하고 있습니다. 지금은 아래 양식으로 이메일 문의를 작성해 주세요.';
const email = document.querySelector('.email');
email.href = 'mailto:' + config.email;
email.textContent = config.email;
function embedLink(raw) {
  const url = secureURL(raw);
  if (!url) return null;
  const parts = url.pathname.split('/').filter(Boolean);
  if (['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(url.hostname)) {
    const id = parts.find(part => /^\d+$/.test(part));
    if (id) {
      const player = new URL('https://player.vimeo.com/video/' + id);
      const hash = url.searchParams.get('h') || parts[parts.indexOf(id)+1];
      if (hash) player.searchParams.set('h',hash);
      return player.href;
    }
  }
  let id;
  if (url.hostname === 'youtu.be') id = parts[0];
  if (['youtube.com','www.youtube.com','m.youtube.com'].includes(url.hostname))
    id = url.searchParams.get('v') || (['embed','shorts','live'].includes(parts[0]) && parts[1]);
  return /^[\w-]{11}$/.test(id || '') ? 'https://www.youtube-nocookie.com/embed/' + id : null;
}
const reel = embedLink(config.reel);
if (reel) {
  const frame = el('iframe');
  frame.src = reel;
  frame.title = '매튜크리에이티브 대표 쇼릴';
  frame.allowFullscreen = true;
  frame.loading = 'lazy';
  document.querySelector('#reel').replaceChildren(frame);
}
for (const work of config.works) {
  const card = el('article', '', 'work');
  const body = el('div', '', 'body');
  if (work.image) {
    const img = el('img');
    img.alt = work.alt;
    img.loading = 'lazy';
    img.src = 'assets/' + work.image;
    card.append(img);
  } else card.append(el('div', 'MEDICAL FILM', 'cover'));
  body.append(el('h3', work.title));
  const details = el('dl', '', 'meta');
  for (const [label, value] of [['의뢰 목적', work.purpose], ['담당 역할', work.role], ['결과', work.result]]) {
    if (!value) continue;
    const row = el('div');
    row.append(el('dt',label), el('dd',value));
    details.append(row);
  }
  body.append(details);
  const link = secureURL(work.url);
  if (link) {
    const anchor = el('a','영상 보기','textlink');
    anchor.href = link.href;
    anchor.setAttribute('aria-label',work.title + ' 영상 보기');
    body.append(anchor);
  }
  card.append(body);
  document.querySelector('#work-grid').append(card);
}
for (const [service,price] of Object.entries(config.prices)) {
  const row = el('div');
  row.append(el('dt',service),el('dd',typeof price === 'number' ? price.toLocaleString('ko-KR')+'만원~' : '별도 문의'));
  document.querySelector('#prices').append(row);
}
for (const review of config.reviews) {
  const card = el('blockquote');
  card.append(el('p',review.quote || '후기 등록 예정'),el('cite',review.client));
  document.querySelector('#reviews').append(card);
}
for (const [question,answer] of config.faq) {
  const details = el('details');
  details.append(el('summary',question),el('p',answer));
  document.querySelector('#questions').append(details);
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const brief = Array.from(new FormData(form), ([key,value]) => key + ': ' + (value.trim() || '미정')).join('\n');
  const output = document.querySelector('#message');
  output.value = brief;
  if (!chat || event.submitter?.value === 'email') {
    status.textContent = '메일 앱에서 수신자와 내용을 확인한 뒤 전송해 주세요. 메일 앱이 열리지 않으면 아래 내용을 복사해 위 이메일 주소로 보내주세요.';
    document.querySelector('#handoff').hidden = false;
    document.querySelector('#handoff a').hidden = !chat;
    location.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent('매튜크리에이티브 프로젝트 문의') + '&body=' + encodeURIComponent(brief);
    return;
  }
  document.querySelector('#handoff').hidden = false;
  try {
    await navigator.clipboard.writeText(brief);
    status.textContent = '문의 내용을 복사했습니다. 아래 채팅 열기를 누르고 붙여넣어 전송해 주세요.';
  } catch {
    output.select();
    status.textContent = '아래 내용을 직접 복사한 뒤 채팅에 붙여넣어 주세요.';
  }
});
