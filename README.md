# Matthew Creative Website

Matthew Creative portfolio website.

- Website: https://matthewfilm.net/
- Showreel: https://youtu.be/D97XtKVZrRY


- v4.8.4: 모바일 HOW WE WORK 문장 줄바꿈 및 타이포 정리

- v4.8.5: GoatCounter TODAY/TOTAL을 실제 홈 경로(/) 카운터로 수정하고 캐시 방지 처리

- v4.8.6: GoatCounter TOTAL/TODAY CORS 대응 및 실제 사이트 전체 카운트 표시 수정

- v4.8.7: TODAY/TOTAL 공개 카운터 유지 (GoatCounter 캐시 지연 허용)


- v4.9.1: PC/모바일 전체 반응형 타이포, safe-area, 여백, 카드/섹션 리듬, 이미지 로딩 최적화


- v4.9.2: Microsoft Clarity(y7isd6vxdf) + GA4(G-GRNVQK2Z5Y) 추가, GoatCounter 유지

- v4.9.3: Umami Analytics 추가 (website id: 875d513d-4a09-43a6-b967-64c6a76df234)

- v4.9.4: Instagram용 짧은 링크 /ig 추가 → UTM 추적 URL로 자동 이동

## v5.0.0 — Marketing structure / optimization / security
- 메인 구조를 문의 전환형으로 재배치: Hero → Selected Work/Showreel → Services → Why Matthew Creative → Case Study → CTA → Process → Director → Recognition → Contact
- Selected Work는 우선 전체 포트폴리오(YouTube 쇼릴) 단일 링크로 연결. 추후 작품별 상세 링크로 교체 가능
- CTA 클릭을 GA4 / Umami / Clarity 커스텀 이벤트로 동시 기록
- 이미지 width/height, lazy-loading, hero preload, content-visibility 적용
- CSP, referrer policy, noopener+noreferrer 적용 및 inline 추적 스크립트 제거
- robots.txt / sitemap.xml / .well-known/security.txt 추가
- Instagram /ig UTM 리디렉션 유지

- v5.1.0: 사용자가 지정한 히어로 원본 사진 적용. 얼굴/피사체 AI 수정 없음. 데스크톱은 전체 프레임 유지, 모바일은 동일 원본의 크롭만 사용. 작동 확인용 YouTube 포트폴리오 QR 재생성.

- v5.1.1: RECOGNITION을 FESTIVALS & AWARDS로 개편. 영화제 진출/상영/수상 성격을 반영하고 각 기록에 월계수 엠블럼을 추가. 다크 시네마틱 스타일 유지.

- v5.1.3: 디렉터 사진 교체(사용자 원본 그대로), Selected Work 6개를 정적 카드로 변경하여 개별/반복 YouTube 링크 제거, 실제 작동 QR만 전체 포트폴리오 진입점으로 유지, Festivals & Awards를 데스크톱 4+3 중앙 정렬 구조로 재배치.

- v5.1.4: Services / Process / Director 주요 소개 문장의 줄바꿈을 지정된 위치로 고정해 PC·모바일 문장 호흡 정리.

- v5.1.5: 히어로 제목을 '기획부터 촬영, 편집까지 / 한 명의 디렉터가 완성하는 / 영상 제작' 3줄로 고정하고, 전체 포트폴리오 YouTube로 연결되는 단일 CTA 버튼 추가.
