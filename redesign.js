'use strict';

const showreel = document.querySelector('#showreel');
const showreelTrigger = document.querySelector('#showreel-trigger');
const player = showreel.querySelector('iframe');
if (typeof showreel.showModal === 'function') {
  showreelTrigger.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    player.src = 'https://www.youtube-nocookie.com/embed/D97XtKVZrRY?autoplay=1';
    showreel.showModal();
  });
  showreel.addEventListener('close', () => {
    player.removeAttribute('src');
    showreelTrigger.focus();
  });
}

const form = document.querySelector('#brief');
const status = document.querySelector('#status');
const output = document.querySelector('#message');
const handoff = document.querySelector('#handoff');
const chatLink = handoff.querySelector('a');

document.querySelector('#chat-submit').hidden = false;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const brief = Array.from(new FormData(form), ([key, value]) =>
    key + ': ' + (value.trim() || '미정')
  ).join('\n');
  output.value = brief;
  handoff.hidden = false;
  chatLink.hidden = false;

  if (event.submitter?.value === 'email') {
    status.textContent = '메일 앱에서 수신자와 내용을 확인한 뒤 전송해 주세요. 메일 앱이 열리지 않으면 아래 내용을 복사해 위 이메일 주소로 보내주세요.';
    location.href = 'mailto:osyoung_88@hanmail.net?subject='
      + encodeURIComponent('매튜크리에이티브 프로젝트 문의') + '&body=' + encodeURIComponent(brief);
    return;
  }

  try {
    await navigator.clipboard.writeText(brief);
    status.textContent = '문의 내용을 복사했습니다. 아래 채팅 열기를 누르고 붙여넣어 전송해 주세요.';
  } catch {
    output.select();
    status.textContent = '아래 내용을 직접 복사한 뒤 채팅에 붙여넣어 주세요.';
  }
});
