// 카카오톡 채널 관리자에서 복사한 1:1 채팅 URL을 입력하세요.
// 금액은 만원 단위 숫자, 후기와 개별 작품 링크는 공개가 가능한 값만 입력하세요.
window.studio = {
  chat: "https://pf.kakao.com/_HxlxfvX/chat",
  email: "osyoung_88@hanmail.net",
  reel: "https://youtu.be/D97XtKVZrRY", // YouTube 또는 Vimeo 공개 영상 주소
  prices: {"숏폼(릴스·쇼츠)": null, "홍보영상(기획+촬영+편집)": null, "촬영만": null, "편집만": null},
  reviews: [{client:"", quote:""}, {client:"", quote:""}, {client:"", quote:""}],
  faq: [
    ["제작 기간은 얼마나 걸리나요?", "보통 촬영 후 1~2주가 걸립니다."],
    ["수정은 몇 번 가능한가요?", "기본 2회입니다."],
    ["납품은 어떤 형식인가요?", "유튜브·SNS용 MP4로 납품하며, 요청 시 세로형 숏폼 버전도 제공합니다."],
    ["출장 가능한가요?", "시흥을 기반으로 서울·경기·인천 출장이 가능합니다. 지방 촬영은 협의해 주세요."]
  ],
  // 역할은 프로젝트별 실제 담당 범위로 입력하세요.
  works: [
    {title:"병원 영상 콘텐츠", purpose:"환자에게 시술과 진료 정보를 전달하는 콘텐츠 제작", role:"", result:"7개월간 병원 영상 제작", image:"work-hospital.webp", alt:"요양병원 사람들 영상에서 마스크를 쓴 인물이 창가에 서 있는 장면", url:""},
    {title:"대학 학과 CF", purpose:"학과의 분위기와 전공의 매력을 예비 신입생에게 소개", role:"", result:"대학 학과 홍보 CF 제작", image:"work-campus-promo.webp", alt:"백석문화대학교 미디어영상학부 홍보영상 장면", url:""},
    {title:"호텔 홍보영상", purpose:"객실과 공간의 분위기를 영상으로 소개", role:"", result:"호텔 홍보영상 제작", image:"work-signiel.webp", alt:"호텔 홍보영상에 담긴 공간", url:""},
    {title:"공연 스케치 영상", purpose:"한국기술교육대학교 축제의 공연과 관객을 기록", role:"", result:"축제 현장 스케치 영상", image:"work-koreatech-festival-new.webp", alt:"한국기술교육대학교 축제 공연 장면", url:""},
    {title:"라이브 클립", purpose:"보컬의 호흡과 현장의 온도를 담은 퍼포먼스 기록", role:"", result:"라이브 퍼포먼스 영상", image:"work-live-clip.webp", alt:"라이브 클립 속 퍼포먼스 장면", url:""},
    {title:"뮤직 비디오", purpose:"어쿠스틱 퍼포먼스의 감정과 리듬을 시각화", role:"", result:"어쿠스틱 퍼포먼스 뮤직 비디오", image:"work-music-video.webp", alt:"어쿠스틱 퍼포먼스 뮤직비디오 장면", url:""},
    {title:"브랜딩 필름", purpose:"공간의 변화와 기관의 메시지를 인터뷰로 전달", role:"", result:"인터뷰 중심 브랜딩 필름", image:"work-branding-film.webp", alt:"기관 브랜딩 필름의 인터뷰 장면", url:""},
    {title:"다큐멘터리", purpose:"인물과 현장의 시간을 관찰하고 기록", role:"", result:"현장 기록 다큐멘터리", image:"work-documentary.webp", alt:"다큐멘터리 현장 기록 장면", url:""}
  ]
};
