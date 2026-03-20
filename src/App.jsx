import { useState, useRef, useEffect } from "react";

const TOILET_DB = {
  "동대문_1": {toilets:[{gate:"외부",exit:"4",location:"지하1층 4번출입구 부근"}]},
  "동묘앞_1": {toilets:[{gate:"외부",exit:"2",location:"1층 역무실 부근"},{gate:"외부",exit:"3",location:"지하1층 3번출입구 부근"},{gate:"외부",exit:"2",location:"하선승강장 7-3지점"},{gate:"내부",exit:"3",location:"상선승강장 4-3지점"}]},
  "서울역_1": {toilets:[{gate:"외부",exit:"2",location:"지하1층 2번출구 부근"}]},
  "시청_1": {toilets:[{gate:"외부",exit:"5",location:"지하1층 5번출구 부근"}]},
  "신설동_1": {toilets:[{gate:"외부",exit:"1",location:"대합실(지하1층) 역무실 앞"}]},
  "제기동_1": {toilets:[{gate:"외부",exit:"2",location:"2번출구우측"}]},
  "종각_1": {toilets:[{gate:"외부",exit:"1",location:"지하1층 가게이트 부근 (연결통로 부근, 시청측)"},{gate:"외부",exit:"4",location:"지하1층 다게이트 부근 (종로3가측)"}]},
  "종로3가_1": {toilets:[{gate:"외부",exit:"1",location:"지하1층 가게이트 부근"},{gate:"내부",exit:"11",location:"지하1층 라게이트 부근 (역무실앞) [게이트 내]"}]},
  "종로5가_1": {toilets:[{gate:"외부",exit:"8",location:"지하1층 지하상가 연결통로앞"}]},
  "청량리_1": {toilets:[{gate:"외부",exit:"4",location:"4번출구 아래"}]},
  "강남_2": {toilets:[{gate:"내부",exit:"12",location:"대합실 1층 역무실쪽(1,12번출구쪽),게이트내"}]},
  "강변_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 통로 중앙"}]},
  "건대입구_2": {toilets:[{gate:"내부",exit:"2",location:"대합실 1층 통로 중앙"}]},
  "교대_2": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 1,2,3,4,번출구 쪽"}]},
  "구로디지털단지_2": {toilets:[{gate:"내부",exit:"1",location:"지상2층, 역무실 앞 (게이트내)"}]},
  "구의_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 통로 중앙"}]},
  "낙성대_2": {toilets:[{gate:"외부",exit:"5",location:"대합실 1층 고객안내부스앞(3,4,5,6번출구쪽)"}]},
  "당산_2": {toilets:[{gate:"내부",exit:"4",location:"지상2층, 대합실 중앙(게이트내)"}]},
  "대림_2": {toilets:[{gate:"내부",exit:"6",location:"지상2층, 대합실 중앙(게이트내)"}]},
  "도림천_2": {toilets:[{gate:"외부",exit:"1",location:"지상1층, 역무실 옆(게이트외)"}]},
  "동대문역사문화공원_2": {toilets:[{gate:"내부",exit:"1",location:"대합실 1층 역무실 앞"}]},
  "뚝섬_2": {toilets:[{gate:"외부",exit:"6",location:"역무실 옆"}]},
  "문래_2": {toilets:[{gate:"외부",exit:"3",location:"지하1층 대합실(게이트외, 2,3번출구방향)"}]},
  "방배_2": {toilets:[{gate:"외부",exit:"4",location:"서초방면 대합실 끝(1,4번 출구방향),게이트외"}]},
  "봉천_2": {toilets:[{gate:"외부",exit:"2",location:"대합실1층, 안내부스맞은편(1,6번출구쪽)게이트외"}]},
  "사당_2": {toilets:[{gate:"외부",exit:"1",location:"지하1층 대합실 1,2번 출구 쪽(방배측)"},{gate:"외부",exit:"7",location:"지하1층 대합실 7,8번 출구 쪽(낙성대측)"}]},
  "삼성_2": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 통로 중앙"}]},
  "상왕십리_2": {toilets:[{gate:"외부",exit:"5 또는6",location:"대합실 1층 5,6번출구 앞"}]},
  "서울대입구_2": {toilets:[{gate:"외부",exit:"8",location:"대합실 1층 (7,8번출구쪽)"}]},
  "서초_2": {toilets:[{gate:"외부",exit:"1",location:"대합실1층 (1,2,7,8번 출구쪽),게이트외"}]},
  "선릉_2": {toilets:[{gate:"외부",exit:"1",location:"대합실 1층 1번출구 앞"}]},
  "성수_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 2층 2번출구측"}]},
  "시청_2": {toilets:[{gate:"내부",exit:"10",location:"지하1층 9,10번출구 옆"},{gate:"외부",exit:"11",location:"지하2층 환승통로"}]},
  "신답_2": {toilets:[{gate:"내부",exit:"1",location:"1층 대합실"}]},
  "신당_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 22,23번기둥"}]},
  "신대방_2": {toilets:[{gate:"내부",exit:"4",location:"대합실 1층 역무실쪽(1,2번출구쪽), 게이트내"}]},
  "신도림_2": {toilets:[{gate:"내부",exit:"1",location:"지하1층 대합실 (게이트내, 1번출구방향)"},{gate:"외부",exit:"1",location:"지하1층 대합실(게이트외,1번출구방향)"}]},
  "신림_2": {toilets:[{gate:"내부",exit:"4",location:"대합실 1층 역무실 맞은편(3,4번출구쪽),게이트내"}]},
  "신설동_2": {toilets:[{gate:"내부",exit:"7",location:"대합실(지하1층) 역무실 옆"}]},
  "신정네거리_2": {toilets:[{gate:"외부",exit:"3",location:"지하1층 대합실(게이트외, 2번, 3번 출구방향)"}]},
  "신촌_2": {toilets:[{gate:"외부",exit:"5",location:"지하1층대합실, 5번출구 옆"}]},
  "아현_2": {toilets:[{gate:"외부",exit:"4",location:"지하1층 대합실 이대역방면 끝단"}]},
  "양천구청_2": {toilets:[{gate:"내부",exit:"1",location:"지하1층, 대합실(게이트내, 신청자량사업소출구 옆)"}]},
  "역삼_2": {toilets:[{gate:"외부",exit:"3",location:"대합실 2층 통로 중앙"}]},
  "영등포구청_2": {toilets:[{gate:"내부",exit:"2",location:"지하1층 대합실(게이트내, 환승통로입구)"}]},
  "왕십리_2": {toilets:[{gate:"외부",exit:"6-1",location:"지하2층 6-1번 출구 쪽"}]},
  "용답_2": {toilets:[{gate:"외부",exit:"1",location:"대합실"}]},
  "용두_2": {toilets:[{gate:"외부",exit:"5",location:"(내선대합실)5번출구 입구"},{gate:"외부",exit:"2",location:"(외선대합실)1,2번 출구 입구"},{gate:"내부",exit:"5",location:"(내선승강장)3-3 승강장 앞"},{gate:"내부",exit:"2",location:"(외선승강장)2-2 승강장 앞"}]},
  "을지로3가_2": {toilets:[{gate:"외부",exit:"2",location:"지하1층 다게이트 옆"}]},
  "을지로4가_2": {toilets:[{gate:"외부",exit:"2",location:"지하1층 1,2번 출구 옆"}]},
  "을지로입구_2": {toilets:[{gate:"외부",exit:"4",location:"지하1층 다게이트 옆"}]},
  "이대_2": {toilets:[{gate:"외부",exit:"5",location:"지하1층 대합실 5번출구 옆"}]},
  "잠실_2": {toilets:[{gate:"외부",exit:"1",location:"대합실 1층 1,2번출구 앞"}]},
  "잠실나루_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 통로 중앙"}]},
  "잠실새내_2": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 2번출구 앞"}]},
  "종합운동장_2": {toilets:[{gate:"외부",exit:"1",location:"대합실 1층 1,2번출구 앞 (잠실새내측)"},{gate:"외부",exit:"5",location:"대합실 1층 5번출구 앞 (삼성측)"}]},
  "충정로_2": {toilets:[{gate:"외부",exit:"6",location:"지하2층 아현방면 끝단"}]},
  "한양대_2": {toilets:[{gate:"외부",exit:"2",location:"고객센터 맞은편"}]},
  "합정_2": {toilets:[{gate:"내부",exit:"1",location:"지하1층대합실, 1,2번출구"}]},
  "홍대입구_2": {toilets:[{gate:"외부",exit:"2",location:"지하1층대합실, 2번출구 옆"}]},
  "가락시장_3": {toilets:[{gate:"내부",exit:"2",location:"대합실 B2층 고객상담실앞(게이트내)"},{gate:"외부",exit:"2",location:"대합실 B2층 고객상담실앞(게이트외)"}]},
  "경복궁_3": {toilets:[{gate:"내부",exit:"3",location:"지하2층 대합실 가게이트 내부"}]},
  "경찰병원_3": {toilets:[{gate:"내부",exit:"2",location:"대합실 B1층 역무실 앞(게이트내)"},{gate:"외부",exit:"2",location:"대합실 B1층 고객안내부스옆(게이트외)"}]},
  "교대_3": {toilets:[{gate:"외부",exit:"12",location:"대합실1층 역무실 맞은편,게이트외"}]},
  "구파발_3": {toilets:[{gate:"외부",exit:"4",location:"지하1층 대합실 가 게이트 외부"}]},
  "금호_3": {toilets:[{gate:"내부",exit:"4",location:"지하1층 가 게이트 내 대합실"}]},
  "남부터미널_3": {toilets:[{gate:"내부",exit:"1",location:"대합실 B2층 역무실 앞"}]},
  "녹번_3": {toilets:[{gate:"외부",exit:"5",location:"지하1층 대합실 게이트 외부"}]},
  "대청_3": {toilets:[{gate:"내부",exit:"4",location:"대합실 B2층 상선 게이트안"}]},
  "대치_3": {toilets:[{gate:"내부",exit:"6",location:"대합실 B1층 역무실 앞"}]},
  "도곡_3": {toilets:[{gate:"외부",exit:"4",location:"대합실 B2층 게이트 �U"}]},
  "독립문_3": {toilets:[{gate:"내부",exit:"3-1",location:"지하1층 대합실 나게이트 내부"}]},
  "동대입구_3": {toilets:[{gate:"내부",exit:"6",location:"대합실 2층 \"가\" 게이트 앞"}]},
  "매봉_3": {toilets:[{gate:"외부",exit:"2",location:"대합실 B1층 게이트옆"}]},
  "무악재_3": {toilets:[{gate:"내부",exit:"1",location:"지하2층 대합실 가게이트 내부"}]},
  "불광_3": {toilets:[{gate:"외부",exit:"3",location:"지하1층 대합실 나 게이트 외부"}]},
  "수서_3": {toilets:[{gate:"내부",exit:"2",location:"대합실 B1층 역무실좌측(게이트내)"}]},
  "신사_3": {toilets:[{gate:"내부",exit:"4",location:"지하 1층"}]},
  "안국_3": {toilets:[{gate:"외부",exit:"4",location:"지하3층 대합실 A계단 방면"}]},
  "압구정_3": {toilets:[{gate:"외부",exit:"5",location:"지하 1층"}]},
  "약수_3": {toilets:[{gate:"내부",exit:"3",location:"(지하1층 게이트 내 대합실)"}]},
  "양재_3": {toilets:[{gate:"내부",exit:"4",location:"대합실 B1층 상선 방향(9-4), 게이트 내"}]},
  "연신내_3": {toilets:[{gate:"내부",exit:"3",location:"지하 1층 대합실 라 게이트 내부"}]},
  "오금_3": {toilets:[{gate:"내부",exit:"2",location:"대합실 B1층 1,2번출구옆(게이트내)"},{gate:"외부",exit:"2",location:"대합실 B1층 1,2번출구옆(게이트외)"}]},
  "옥수_3": {toilets:[{gate:"내부",exit:"3",location:"3층 환승통로측"},{gate:"내부",exit:"7",location:"3층 금호역측"}]},
  "을지로3가_3": {toilets:[{gate:"내부",exit:"3",location:"가 대합실 역무실 아래 지하 2층"}]},
  "일원_3": {toilets:[{gate:"외부",exit:"7",location:"대합실 B2층 7번출구옆, 역무실 앞"}]},
  "잠원_3": {toilets:[{gate:"내부",exit:"4",location:"지하1층 게이트 내 대합실"}]},
  "종로3가_3": {toilets:[{gate:"내부",exit:"7",location:"지하3층"}]},
  "학여울_3": {toilets:[{gate:"외부",exit:"1",location:"대합실 B4층 외부 E/V 옆 (게이트외)"}]},
  "홍제_3": {toilets:[{gate:"외부",exit:"2",location:"지하2층 대합실 다게이트 앞"},{gate:"외부",exit:"2",location:"지하1층 대합실 상가(다이소) 옆"}]},
  "길음_4": {toilets:[{gate:"외부",exit:"5",location:"지하1층 대합실 가게이트 밖"}]},
  "남태령_4": {toilets:[{gate:"내부",exit:"2",location:"(지하2층 역무실 옆)"}]},
  "노원_4": {toilets:[{gate:"내부",exit:"9",location:"2층 대합실 나게이트 안"}]},
  "당고개_4": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 (1,4 출구방향)"},{gate:"외부",exit:"3",location:"대합실 2층 역무실 앞"}]},
  "동대문_4": {toilets:[{gate:"내부",exit:"9",location:"지하2층"}]},
  "동대문역사문화공원_4": {toilets:[{gate:"외부",exit:"8",location:"지하1층 10,11번 기둥앞"},{gate:"내부",exit:"8",location:"지하2층 내부계단 옆"}]},
  "동작_4": {toilets:[{gate:"내부",exit:"1",location:"대합실 2층 구내식당좌측"}]},
  "명동_4": {toilets:[{gate:"내부",exit:"5",location:"지하1층 2,3,4,5,6,7,8번 출구쪽, 게이트내"}]},
  "미아_4": {toilets:[{gate:"외부",exit:"6",location:"대합실 지하1층 교양휴게실 앞 (3,4번 게이트방향)"}]},
  "미아사거리_4": {toilets:[{gate:"외부",exit:"6",location:"지하1층 역무실 옆"}]},
  "사당_4": {toilets:[{gate:"외부",exit:"12",location:"(지하1층 총신대측)"},{gate:"외부",exit:"3",location:"(지하1층 남태령측)"},{gate:"내부",exit:"12",location:"(지하2층 환승통로)"}]},
  "삼각지_4": {toilets:[{gate:"외부",exit:"3",location:"신용산측"}]},
  "상계_4": {toilets:[{gate:"내부",exit:"4",location:"2층 대합실 나게이트 안"}]},
  "서울역_4": {toilets:[{gate:"외부",exit:"11",location:"14번 출구 옆, 11번 출구 물품보관함 건너편"}]},
  "성신여대입구_4": {toilets:[{gate:"내부",exit:"4",location:"지하1층 고객 안내부스에서 10m 안쪽"}]},
  "수유_4": {toilets:[{gate:"내부",exit:"2",location:"대합실 지하1층 역무실 옆(2,8번 출구방향)"}]},
  "숙대입구_4": {toilets:[{gate:"외부",exit:"9",location:"지하1층 가대합실과 나대합실 연결통로 가운데 위치"}]},
  "신용산_4": {toilets:[{gate:"외부",exit:"4",location:"지하1층 삼각지측"}]},
  "쌍문_4": {toilets:[{gate:"외부",exit:"2",location:"지하1층 나환기실 옆"}]},
  "이촌_4": {toilets:[{gate:"내부",exit:"3",location:"지하1층 3번출구 앞"}]},
  "창동_4": {toilets:[{gate:"내부",exit:"1",location:"2층 대합실 나게이트 안"}]},
  "총신대입구_4": {toilets:[{gate:"내부",exit:"1",location:"지하1층 동작측"}]},
  "충무로_4": {toilets:[{gate:"내부",exit:"3",location:"지하2층 3,4,5,6,7번 출구쪽, 게이트내"}]},
  "한성대입구_4": {toilets:[{gate:"외부",exit:"7",location:"1번출구방향, 가게이트 쪽(게이트외)"}]},
  "혜화_4": {toilets:[{gate:"외부",exit:"3",location:"(지하1층 3번출구 방면)"}]},
  "회현_4": {toilets:[{gate:"내부",exit:"3",location:"게이트내 지하2층"}]},
  "강동_5": {toilets:[{gate:"외부",exit:"2",location:"대합실 지하1층 2번출구 앞"}]},
  "강일_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 지하2층 3번출구측"},{gate:"외부",exit:"4",location:"대합실 지하2층 4번출구측"}]},
  "개롱_5": {toilets:[{gate:"외부",exit:"1 또는4",location:"1,4번호 출구 사이"}]},
  "개화산_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하1층 하선E/L 옆"}]},
  "거여_5": {toilets:[{gate:"외부",exit:"8",location:"대합실 1층 8번출구 앞"}]},
  "고덕_5": {toilets:[{gate:"외부",exit:"1",location:"대합실 지하1층 1번 출구 방향"}]},
  "공덕_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 3번출구 앞"}]},
  "광나루_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"지하1층"}]},
  "광화문_5": {toilets:[{gate:"외부",exit:"7 또는8",location:"세종측 대합실 지하1층"}]},
  "군자_5": {toilets:[{gate:"외부",exit:"7 또는8",location:"지하1층 대합실 5 게이트(가) 앞"}]},
  "굽은다리_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 지하1층 3번출구 앞"}]},
  "길동_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 지하1층 3번 출구 옆"}]},
  "김포공항_5": {toilets:[{gate:"외부",exit:"1",location:"대합실 지하 1층, 1번출구 옆(지하철경찰센터 옆)"},{gate:"외부",exit:"1",location:"대합실 지하 2층,1번출구 아래(국내선 연결통로 방면)"}]},
  "까치산_5": {toilets:[{gate:"외부",exit:"1 또는2 또는3 또는4",location:"대합실(지하1층) 1~4번 출구 앞"}]},
  "답십리_5": {toilets:[{gate:"외부",exit:"5 또는6",location:"B1층 5,6번 출입구 방향"}]},
  "동대문역사문화공원_5": {toilets:[{gate:"외부",exit:"7",location:"지하1층"}]},
  "둔촌동_5": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 지하1층, 3,4번 출구 방향"}]},
  "마곡_5": {toilets:[{gate:"외부",exit:"2",location:"지하1층 대합실 2번출구 하단"}]},
  "마장_5": {toilets:[{gate:"외부",exit:"1 또는2 또는3 또는4",location:"지하2층 대합실"}]},
  "마천_5": {toilets:[{gate:"외부",exit:"1",location:"대합실 지하1층 1번출구 방향에서우측 코너"}]},
  "마포_5": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 토니모리좌측"}]},
  "명일_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 지하1층 3번출구 앞"}]},
  "목동_5": {toilets:[{gate:"외부",exit:"7",location:"대합실 지하1층 7번출구 옆"}]},
  "미사_5": {toilets:[{gate:"외부",exit:"5",location:"대합실 지하1층 5번 출구옆"},{gate:"내부",exit:"2 또는4",location:"대합실 지하1층 승강장 상선 내부계단옆"}]},
  "발산_5": {toilets:[{gate:"외부",exit:"1 또는9",location:"대합실 1층 1, 9번 출구 사이"}]},
  "방이_5": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 지하1층 3,4번 출구방향"}]},
  "방화_5": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 1층 3,4번출구방향 앞"}]},
  "상일동_5": {toilets:[{gate:"외부",exit:"4",location:"대합실 지하1층 4번출구 앞"}]},
  "서대문_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"지하1층 대합실 1, 2번 출구 내려와서 왼쪽편"}]},
  "송정_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 2층 ES 1호기 앞"}]},
  "신금호_5": {toilets:[{gate:"외부",exit:"5",location:"B2 게이트 앞"}]},
  "신길_5": {toilets:[{gate:"외부",exit:"3",location:"대합실(B3) 3번출구 앞"}]},
  "신정_5": {toilets:[{gate:"외부",exit:"2 또는3",location:"2,3번 출구 지하 (가)대합실 운임지역 내"}]},
  "아차산_5": {toilets:[{gate:"외부",exit:"3",location:"지하1층 대합실"}]},
  "애오개_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 게이트 통과 후좌측"}]},
  "양평_5": {toilets:[{gate:"내부",exit:"1 또는2",location:"b1층 고객상담실 옆. 운임지역내"}]},
  "여의나루_5": {toilets:[{gate:"외부",exit:"3",location:"지하1층 대합실 비운임지역 ES옆"}]},
  "여의도_5": {toilets:[{gate:"외부",exit:"6",location:"대합실1층 가게이트 옆"}]},
  "영등포구청_5": {toilets:[{gate:"외부",exit:"7",location:"대합실 지하1층 7번출구 방면"}]},
  "영등포시장_5": {toilets:[{gate:"외부",exit:"2 또는3",location:"대합실 1층 2, 3번출구 앞"}]},
  "오금_5": {toilets:[{gate:"내부",exit:"6 또는7",location:"대합실 지하1층 방이역 방향"}]},
  "오목교_5": {toilets:[{gate:"외부",exit:"3",location:"대합실 B1층 3번 출구 방향 임대상가 옆"}]},
  "올림픽공원_5": {toilets:[{gate:"외부",exit:"2",location:"대합실 지하1층 2번출구 앞"}]},
  "왕십리_5": {toilets:[{gate:"내부",exit:"4",location:"b2 대합실 상가2002호점 옆"}]},
  "우장산_5": {toilets:[{gate:"외부",exit:"2",location:"지하1층 대합실 2번출구 앞"}]},
  "을지로4가_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 B1층, B2층 내려가는 계단 앞"}]},
  "장한평_5": {toilets:[{gate:"외부",exit:"1",location:"지하 1층 1번출구 나가기전좌측방향"}]},
  "종로3가_5": {toilets:[{gate:"내부",exit:"5",location:"(대합실 지하1층 역무실 맞은편)"}]},
  "천호_5": {toilets:[{gate:"외부",exit:"5 또는6",location:"지하1층 대합실(5,6번출구 방향)"}]},
  "충정로_5": {toilets:[{gate:"외부",exit:"8",location:"대합실 B1층 8번출구 방향 i센터 맞은 편"}]},
  "하남검단산_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하1층 #1,2출구 앞"}]},
  "하남시청_5": {toilets:[{gate:"외부",exit:"1 또는2 또는3",location:"대합실 지하1층 #1~3출구 앞"}]},
  "하남풍산_5": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하1층 #1,2출구 앞"}]},
  "행당_5": {toilets:[{gate:"외부",exit:"1 또는2 또는3 또는4",location:"지하3층 E/S 옆(고객상담실 및만남의장소 앞)"}]},
  "화곡_5": {toilets:[{gate:"외부",exit:"7 또는8",location:"대합실 1층 7,8번 출구 앞"}]},
  "고려대_6": {toilets:[{gate:"내부",exit:"2",location:"지하 1층 대합실(게이트 안)"}]},
  "공덕_6": {toilets:[{gate:"외부",exit:"7",location:"대합실 1층 7번출구 앞"}]},
  "광흥창_6": {toilets:[{gate:"외부",exit:"1 또는2 또는5 또는6",location:"대합실 2층 (1256번출구방향)"}]},
  "구산_6": {toilets:[{gate:"외부",exit:"4",location:"대합실 B1층 4번출구 맞은편"}]},
  "녹사평_6": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하1층 1,2번 출구 진입 방향"}]},
  "대흥_6": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 4번출구 앞"}]},
  "독바위_6": {toilets:[{gate:"외부",exit:"1",location:"대합실 B1층 E/S 7호기 옆"}]},
  "돌곶이_6": {toilets:[{gate:"외부",exit:"6 또는7",location:"지하 1층 대합실(6,7번출구 사이)"}]},
  "동묘앞_6": {toilets:[{gate:"외부",exit:"7",location:"대합실 1층 7번출구 앞"}]},
  "디지털미디어시티_6": {toilets:[{gate:"외부",exit:"4",location:"대합실 지하1층 4번출구 옆"},{gate:"내부",exit:"2 또는3",location:"대합실 지하1층 2,3번출구 옆"}]},
  "마포구청_6": {toilets:[{gate:"외부",exit:"8",location:"가대합실 지하2층"},{gate:"외부",exit:"3 또는4",location:"나대합실 지하1층 편의점옆"}]},
  "망원_6": {toilets:[{gate:"외부",exit:"1",location:"B1 대합실 1번출구 옆"}]},
  "버티고개_6": {toilets:[{gate:"외부",exit:"1",location:"대합실 1층 1번출구 앞"}]},
  "보문_6": {toilets:[{gate:"외부",exit:"1 또는2",location:"지하2층 대합실 아이센터 옆"}]},
  "봉화산_6": {toilets:[{gate:"외부",exit:"2 또는3",location:"지하 1층 대합실(고객상담실 옆)"}]},
  "불광_6": {toilets:[{gate:"외부",exit:"6 또는7",location:"지하1층 가 대합실 ( 6,7번출구 아래)"}]},
  "삼각지_6": {toilets:[{gate:"외부",exit:"7 또는8",location:"대합실 1층 7,8번 출구 측면"}]},
  "상수_6": {toilets:[{gate:"외부",exit:"1 또는2 또는3 또는4",location:"B2 대합실 상가 미샤 옆"}]},
  "상월곡_6": {toilets:[{gate:"외부",exit:"1 또는4",location:"지하 2층 대합실(1, 4번출구방면)"}]},
  "새절_6": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 2번 출구 옆"}]},
  "석계_6": {toilets:[{gate:"외부",exit:"7",location:"지하 1층 대합실(7번출구 앞)"},{gate:"내부",exit:"2 또는3",location:"지하 2층 대합실(환승통로)"}]},
  "신당_6": {toilets:[{gate:"외부",exit:"5 또는6 또는7 또는8",location:"대합실 B1층 5~8번출구 나가는 방향 계단 하부"}]},
  "안암_6": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 B1층 3,4번출구 계단 인근"},{gate:"내부",exit:"3 또는4",location:"대합실 B2층 봉화산방면 승강장 계단 인근"}]},
  "약수_6": {toilets:[{gate:"외부",exit:"7 또는8",location:"대합실 B1 7,8번 출구앞"}]},
  "역촌_6": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 3번출구 옆"}]},
  "연신내_6": {toilets:[{gate:"외부",exit:"6 또는7",location:"대합실 B1층 6,7번출구방향"}]},
  "월곡_6": {toilets:[{gate:"외부",exit:"1 또는2 또는3",location:"지하 1층"}]},
  "월드컵경기장_6": {toilets:[{gate:"외부",exit:"2",location:"대합실 (B1 2번출구방향 게이트옆)"},{gate:"내부",exit:"1",location:"대합실 (B1 1번출구방향 게이트안쪽)"}]},
  "응암_6": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 B1층 GS25 편의점 옆"}]},
  "이태원_6": {toilets:[{gate:"외부",exit:"3",location:"B1 대합실 E/S 옆"}]},
  "증산_6": {toilets:[{gate:"외부",exit:"1",location:"대합실 1층 1번출구 옆"}]},
  "창신_6": {toilets:[{gate:"내부",exit:"3 또는4",location:"대합실 1층 E/V1호기 뒷편"}]},
  "청구_6": {toilets:[{gate:"외부",exit:"1",location:"B1 대합실 1번출구 나가는 방향 맞은편 위치"}]},
  "태릉입구_6": {toilets:[{gate:"외부",exit:"1",location:"대합실 지하1층 아이센터 옆"}]},
  "한강진_6": {toilets:[{gate:"내부",exit:"1 또는2 또는3",location:"대합실 B1층 임대상가(gs25)옆"}]},
  "합정_6": {toilets:[{gate:"외부",exit:"8",location:"대합실 1층 8번출구 앞"}]},
  "화랑대_6": {toilets:[{gate:"외부",exit:"6 또는7",location:"지하 1층 대합실(게이트 밖)"}]},
  "효창공원앞_6": {toilets:[{gate:"외부",exit:"3 또는6",location:"대합실 1층 3,6번 출구 앞"}]},
  "가산디지털단지_7": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 4번출구 방향"}]},
  "강남구청_7": {toilets:[{gate:"외부",exit:"1 또는4",location:"B1층 대합실 가아이센터 맞은편"}]},
  "건대입구_7": {toilets:[{gate:"내부",exit:"3",location:"B2층 게이트 옆"}]},
  "고속터미널_7": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 3번출구 왼쪽"}]},
  "공릉_7": {toilets:[{gate:"외부",exit:"1 또는2",location:"지하1층 아이센터 앞"}]},
  "광명사거리_7": {toilets:[{gate:"외부",exit:"4 또는5",location:"대합실 2층 연결통로( 가-ⓘ센터와 나-ⓘ센터 중간지점)"}]},
  "남구로_7": {toilets:[{gate:"외부",exit:"2 또는3 또는4 또는5",location:"대합실 1층 2~5번출구 방향 (E/S 7,8호기 옆)"}]},
  "남성_7": {toilets:[{gate:"내부",exit:"2 또는3",location:"대합실 상선 내부계단 옆"}]},
  "내방_7": {toilets:[{gate:"외부",exit:"5 또는6 또는8",location:"대합실 지하1층 5~8번출구방면"}]},
  "노원_7": {toilets:[{gate:"외부",exit:"6",location:"지하2층대합실, 가아이센터앞"}]},
  "논현_7": {toilets:[{gate:"외부",exit:"7 또는8",location:"대합실 1층 7,8번 출구 근처"},{gate:"외부",exit:"7 또는8",location:"대합실 2층 왓슨스 매장 뒤편"}]},
  "대림_7": {toilets:[{gate:"외부",exit:"9 또는10",location:"대합실 1층"}]},
  "도봉산_7": {toilets:[{gate:"외부",exit:"1-1",location:"지상1층 대합실 앞"},{gate:"내부",exit:"2",location:"지상1층 환승통로"}]},
  "뚝섬유원지_7": {toilets:[{gate:"내부",exit:"1 또는4",location:"지상2층 대합실"}]},
  "마들_7": {toilets:[{gate:"외부",exit:"4 또는5",location:"대합실 B2 에스컬레이터 앞"}]},
  "먹골_7": {toilets:[{gate:"외부",exit:"1 또는2",location:"B1층 대합실"}]},
  "면목_7": {toilets:[{gate:"외부",exit:"3",location:"B1층 아이센터 앞"}]},
  "반포_7": {toilets:[{gate:"외부",exit:"1 또는2 또는5 또는6",location:"대합실 지하2층 계단 옆"}]},
  "보라매_7": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 3번출구 방향"}]},
  "사가정_7": {toilets:[{gate:"외부",exit:"1",location:"B1층 1번출구 앞"}]},
  "상도_7": {toilets:[{gate:"외부",exit:"3 또는4 또는5",location:"지하 2층 대합실 계단좌측"}]},
  "상봉_7": {toilets:[{gate:"내부",exit:"1 또는2 또는5 또는6",location:"B1층 1,2,5,6번출구앞"}]},
  "수락산_7": {toilets:[{gate:"외부",exit:"5",location:"대합실 지하2층 고객상담실 앞"}]},
  "숭실대입구_7": {toilets:[{gate:"외부",exit:"1 또는2 또는3 또는4",location:"대합실2층"}]},
  "신대방삼거리_7": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 2층"}]},
  "신풍_7": {toilets:[{gate:"외부",exit:"5",location:"대합실 1층 5번출구방향"}]},
  "어린이대공원_7": {toilets:[{gate:"외부",exit:"1 또는6",location:"B2층 아이센터 옆"}]},
  "온수_7": {toilets:[{gate:"외부",exit:"4",location:"대합실 1층 4번출구 방향"}]},
  "용마산_7": {toilets:[{gate:"외부",exit:"1",location:"B1층 1번출구 앞"}]},
  "이수_7": {toilets:[{gate:"외부",exit:"7 또는8",location:"지하1층 연결통로"},{gate:"내부",exit:"7 또는8",location:"지하3층 (가)게이트안쪽 상선 내부계단 옆"}]},
  "장승배기_7": {toilets:[{gate:"외부",exit:"5 또는6",location:"지하2층 대합실 5,6번 출구방향 내부계단 옆"}]},
  "장암_7": {toilets:[{gate:"외부",exit:"1",location:"1층 게이트 옆"}]},
  "중계_7": {toilets:[{gate:"외부",exit:"1",location:"지하1층 1번출구 옆"}]},
  "중곡_7": {toilets:[{gate:"외부",exit:"1 또는2 또는3",location:"B2층 게이트 앞"}]},
  "중화_7": {toilets:[{gate:"외부",exit:"2",location:"B1층 2번출구 방향"}]},
  "천왕_7": {toilets:[{gate:"외부",exit:"2",location:"대합실 1층 2번 출구 방향"}]},
  "철산_7": {toilets:[{gate:"외부",exit:"3",location:"대합실 1층 3번 출구 방향"}]},
  "청담_7": {toilets:[{gate:"외부",exit:"3 또는12",location:"B3 대합실 나 I센터 옆"}]},
  "태릉입구_7": {toilets:[{gate:"외부",exit:"2 또는3",location:"대합실 지하3층 고객상담실 앞"}]},
  "하계_7": {toilets:[{gate:"외부",exit:"4",location:"지하1층 4번출구"}]},
  "학동_7": {toilets:[{gate:"외부",exit:"1 또는2",location:"B2 1,2번 출구 계단 옆"}]},
  "가락시장_8": {toilets:[{gate:"외부",exit:"2-1",location:"B1층 대합실과 가락몰 연결통로 사이"}]},
  "강동구청_8": {toilets:[{gate:"외부",exit:"4 또는5",location:"대합실 B2층 게이트 옆"}]},
  "남위례_8": {toilets:[{gate:"외부",exit:"1",location:"대합실 지상2층 주출입구 근처"}]},
  "남한산성입구_8": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하2층 에스컬레이터 근처"}]},
  "단대오거리_8": {toilets:[{gate:"외부",exit:"6 또는7",location:"대합실 지하1층 2호기E/V 옆"}]},
  "모란_8": {toilets:[{gate:"외부",exit:"10 또는11",location:"B2층 대합실 상행 E/S 옆"}]},
  "몽촌토성_8": {toilets:[{gate:"외부",exit:"1 또는2 또는3",location:"대합실 B1층 1,2,3번 출구 방향"}]},
  "문정_8": {toilets:[{gate:"외부",exit:"2",location:"대합실 B1층 2번출구 방향"},{gate:"외부",exit:"4",location:"대합실 B1층 4번출구 방향"}]},
  "복정_8": {toilets:[{gate:"외부",exit:"1",location:"대합실 지하1층 아이센터 근처"}]},
  "산성_8": {toilets:[{gate:"외부",exit:"1 또는2",location:"B1층 1,2번 출구 계단 오른쪽"}]},
  "석촌_8": {toilets:[{gate:"외부",exit:"7 또는8",location:"대합실 B1층 게이트 옆"}]},
  "송파_8": {toilets:[{gate:"외부",exit:"1",location:"대합실 B1층 1번출구 방향"}]},
  "수진_8": {toilets:[{gate:"외부",exit:"1 또는2",location:"대합실 지하1층 편의점 옆"}]},
  "신흥_8": {toilets:[{gate:"외부",exit:"1 또는2",location:"B1층 대합실 1,2번 출구방면"}]},
  "암사_8": {toilets:[{gate:"외부",exit:"2",location:"대합실 B1층 2번 출구 방향"}]},
  "암사역사공원역_8": {toilets:[{gate:"외부",exit:"3",location:"대합실 B1층 3번 출구 방향"}]},
  "잠실_8": {toilets:[{gate:"외부",exit:"11",location:"B1층 11번 출구 옆"}]},
  "장지_8": {toilets:[{gate:"외부",exit:"3 또는4",location:"대합실 B1층 3,4번출구 방면"}]},
  "가양_9": {toilets:[{gate:"외부",exit:"3",location:"(B1) 3번 출입구 옆"}]},
  "개화_9": {toilets:[{gate:"외부",exit:"1",location:"(2F) 표내는 곳 옆"}]},
  "고속터미널_9": {toilets:[{gate:"내부",exit:"8-2",location:"(B2) 표 내는 곳 앞"},{gate:"외부",exit:"1",location:"(B1) 1번 출구 옆"},{gate:"외부",exit:"8-1",location:"(B1) 8-1번 출구 옆"},{gate:"내부",exit:"1",location:"(B2) 표 내는 곳 옆"}]},
  "공항시장_9": {toilets:[{gate:"외부",exit:"1",location:"(B1) 1번/4번 출입구 방향"}]},
  "구반포_9": {toilets:[{gate:"외부",exit:"1",location:"(B1) GS 편의점 옆 통로"}]},
  "국회의사당_9": {toilets:[{gate:"외부",exit:"2",location:"(B2)ㄷ자 형태 표 내는 곳 2번출입구 방향"},{gate:"내부",exit:"2",location:"(B2) 편의점 방향 표 내는 곳 내부 E/L 1호기 주변에 위치"}]},
  "김포공항_9": {toilets:[{gate:"외부",exit:"4",location:"(B1) 4번 출입구 옆"},{gate:"내부",exit:"4",location:"(B1) 공항철도 역무실 옆"}]},
  "노들_9": {toilets:[{gate:"외부",exit:"2",location:"(B1) 편의점 방향 표내는 곳 옆"}]},
  "노량진_9": {toilets:[{gate:"외부",exit:"3",location:"(B1) 3번 출구 옆"},{gate:"외부",exit:"5",location:"(B1) 5 6 번 출구 연결통로"},{gate:"내부",exit:"3-1",location:"(B1) 안전관리실 앞"}]},
  "당산_9": {toilets:[{gate:"외부",exit:"7",location:"(B1) 표내는곳 옆 7번 출입구 방향"},{gate:"내부",exit:"8",location:"(B2) 서울지하철경찰대 옆"}]},
  "동작_9": {toilets:[{gate:"내부",exit:"5",location:"(B2) 표 내는 곳 내 우측 통로 방향"},{gate:"외부",exit:"5",location:"(B2) 대합실 9번 출입구 방향"}]},
  "둔촌오륜_9": {toilets:[{gate:"외부",exit:"2번출구",location:"대합실 B1층 2번출구 부근"}]},
  "등촌_9": {toilets:[{gate:"외부",exit:"2",location:"(B1) 표내는곳 옆 1번/2번 출입구 방향"}]},
  "마곡나루_9": {toilets:[{gate:"외부",exit:"2",location:"(B1) 2번 출입구 옆"}]},
  "봉은사_9": {toilets:[{gate:"외부",exit:"3번출구",location:"대합실 B1층 2,3번출구 사이"}]},
  "사평_9": {toilets:[{gate:"외부",exit:"1",location:"(B1) 1번 출입구 방향"}]},
  "삼성중앙_9": {toilets:[{gate:"외부",exit:"5번출구",location:"대합실 B1층 5,6번출구 사이"}]},
  "삼전_9": {toilets:[{gate:"외부",exit:"3번출구",location:"대합실 B1층 3번출구 부근"}]},
  "샛강_9": {toilets:[{gate:"외부",exit:"3",location:"(B2) 3번 출입구 방향"}]},
  "석촌_9": {toilets:[{gate:"내부",exit:"3번출구",location:"대합실 B1층 고객안전실 부근"},{gate:"외부",exit:"3번출구",location:"대합실 B1층 개찰구(9) 부근"}]},
  "석촌고분_9": {toilets:[{gate:"외부",exit:"3번출구",location:"대합실 B1층 3번출구 부근"}]},
  "선유도_9": {toilets:[{gate:"외부",exit:"7",location:"(B1) 7번 출입구 방향"}]},
  "송파나루_9": {toilets:[{gate:"외부",exit:"1번출구",location:"대합실 B1층 1,2번출구 사이"}]},
  "신논현_9": {toilets:[{gate:"외부",exit:"5",location:"(B2) 5번 출입구 방향"}]},
  "신목동_9": {toilets:[{gate:"외부",exit:"2",location:"(B2) 2번 출입구 근처"}]},
  "신반포_9": {toilets:[{gate:"외부",exit:"1",location:"(B1) 안전관리실 옆 통로"}]},
  "신방화_9": {toilets:[{gate:"외부",exit:"6",location:"(B1) 안전관리실 앞"}]},
  "양천향교_9": {toilets:[{gate:"외부",exit:"3",location:"(B1) 3번 출입구 옆 1번~3번 출입구 방향"}]},
  "언주_9": {toilets:[{gate:"외부",exit:"1번출구",location:"대합실 B1층 2,3번출구 사이"}]},
  "여의도_9": {toilets:[{gate:"외부",exit:"3",location:"(B1) 임대상가 앞 3번/4번 출입구 방향"},{gate:"내부",exit:"",location:"(B2)국회의사당방면(하선) 승강장 3-1 PSD 앞"}]},
  "염창_9": {toilets:[{gate:"외부",exit:"4",location:"(B1) 4번 출입구 방향"}]},
  "올림픽공원_9": {toilets:[{gate:"내부",exit:"5호선 환승통로",location:"대합실 B1층 고객안전실 부근"},{gate:"외부",exit:"3번출구",location:"대합실 B1층 개찰구(9) 부근"}]},
  "종합운동장_9": {toilets:[{gate:"내부",exit:"2호선 환승통로",location:"대합실 B2층 환승통로"},{gate:"외부",exit:"9번출구",location:"대합실 B1층 지하연결통로 반대편"}]},
  "중앙보훈병원_9": {toilets:[{gate:"외부",exit:"1번출구",location:"대합실 B1층 1번출구 부근"}]},
  "증미_9": {toilets:[{gate:"외부",exit:"",location:"(B2) 대합실 E/L 3호기 옆"}]},
  "한성백제_9": {toilets:[{gate:"외부",exit:"1번출구",location:"대합실 B1층 1번출구 부근"}]},
  "흑석_9": {toilets:[{gate:"외부",exit:"1",location:"(B1) 1번출구 하단부 옆 생태공원 부근"}]},
  "천호_8": {toilets:[{gate:"외부",exit:"6",location:"6번 출구 방향 대합실"}]},
  "선정릉_9": {toilets:[{gate:"외부",exit:"3",location:"3번 출구 방향 대합실"}]},
  "청구_5": {toilets:[{gate:"외부",exit:"",location:"개찰구 밖 (6호선 하행 비상게이트 상시 개방)"}]},
  "신내_6": {toilets:[{gate:"외부",exit:"",location:"대합실 밖"}]},
  "고속터미널_3": {toilets:[{gate:"외부",exit:"",location:"9호선 구역으로 이동 (가장 가까움)"}]},
  "충무로_3": {toilets:[{gate:"외부",exit:"",location:"4호선 환승통로 이동 후 화장실"}]},

};

const LINES = {
  "1": { color: "#0052A4", name: "1호선" },
  "2": { color: "#00A84D", name: "2호선" },
  "3": { color: "#EF7C1C", name: "3호선" },
  "4": { color: "#00A5DE", name: "4호선" },
  "5": { color: "#996CAC", name: "5호선" },
  "6": { color: "#CD7C2F", name: "6호선" },
  "7": { color: "#747F00", name: "7호선" },
  "8": { color: "#E6186C", name: "8호선" },
  "9": { color: "#BDB092", name: "9호선" },
  "2성수지선": { color: "#00A84D", name: "2호선 성수지선" },
  "2신정지선": { color: "#00A84D", name: "2호선 신정지선" },
  "5마천지선": { color: "#996CAC", name: "5호선 마천지선" },
  "수인분당": { color: "#F5A200", name: "수인·분당선" },
  "신분당": { color: "#D4003B", name: "신분당선" },
  "경의중앙": { color: "#77C4A3", name: "경의·중앙선" },
  "공항철도": { color: "#4682B4", name: "공항철도" },
  "김포골드": { color: "#AD8B3A", name: "김포골드라인" },
  "우이신설": { color: "#B0CE18", name: "우이신설선" },
  "서해": { color: "#8BC341", name: "서해선" },
  "GTX-A": { color: "#8B0087", name: "GTX-A" },
};

const LINE_STATIONS = {
  "1": ["소요산","동두천","보산","동두천중앙","지행","덕정","덕계","양주","녹양","가능","의정부","회룡","망월사","도봉산","도봉","방학","창동","녹천","월계","광운대","석계","신이문","외대앞","회기","청량리","제기동","신설동","동묘앞","동대문","종로5가","종로3가","종각","시청","서울역","남영","용산","노량진","대방","신길","영등포","신도림","구일","구로","개봉","가산디지털단지","독산","금천구청","석수","관악","안양","명학","금정","군포","당정","의왕","성균관대","화서","수원","세류","병점","세마","오산대","오산","진위","송탄","서정리","지제","평택","성환","직산","두정","천안","봉명","쌍용","아산","배방","온양온천","신창"],
  "2": ["시청","을지로입구","을지로3가","을지로4가","동대문역사문화공원","신당","상왕십리","왕십리","한양대","뚝섬","성수","건대입구","구의","강변","잠실나루","잠실","잠실새내","종합운동장","삼성","선릉","역삼","강남","교대","서초","방배","사당","낙성대","서울대입구","봉천","신림","신대방","구로디지털단지","대림","신도림","문래","영등포구청","당산","합정","홍대입구","신촌","이대","아현","충정로"],
  "3": ["대화","주엽","정발산","마두","백석","대곡","화정","원당","원흥","삼송","지축","구파발","연신내","불광","녹번","홍제","무악재","독립문","경복궁","안국","종로3가","을지로3가","충무로","동대입구","약수","금호","옥수","압구정","신사","잠원","고속터미널","교대","남부터미널","양재","매봉","도곡","대치","학여울","대청","일원","수서","가락시장","경찰병원","오금"],
  "4": ["당고개","상계","노원","창동","쌍문","수유","미아","미아사거리","길음","성신여대입구","한성대입구","혜화","동대문","동대문역사문화공원","충무로","명동","회현","서울역","숙대입구","삼각지","신용산","이촌","동작","총신대입구","사당","남태령","선바위","경마공원","대공원","과천","정부과천청사","인덕원","평촌","범계","금정","산본","수리산","대야미","반월","상록수","한대앞","중앙","고잔","초지","안산","신길온천","정왕","오이도"],
  "5": ["방화","개화산","김포공항","송정","마곡","발산","우장산","화곡","까치산","신정","목동","오목교","양평","영등포구청","영등포시장","신길","여의도","여의나루","마포","공덕","애오개","충정로","서대문","광화문","종로3가","을지로4가","동대문역사문화공원","청구","신금호","행당","왕십리","마장","답십리","장한평","군자","아차산","광나루","천호","강동","길동","굽은다리","명일","고덕","상일동","강일","미사","하남풍산","하남시청","하남검단산"],
  "6": ["응암","역촌","불광","독바위","연신내","구산","새절","증산","디지털미디어시티","월드컵경기장","마포구청","망원","합정","상수","광흥창","대흥","공덕","효창공원앞","삼각지","녹사평","이태원","한강진","버티고개","약수","청구","신당","동묘앞","창신","보문","안암","고려대","월곡","상월곡","돌곶이","석계","태릉입구","화랑대","봉화산","신내"],
  "7": ["장암","도봉산","수락산","마들","노원","중계","하계","공릉","태릉입구","먹골","중화","상봉","면목","사가정","용마산","중곡","군자","어린이대공원","건대입구","뚝섬유원지","청담","강남구청","학동","논현","반포","고속터미널","내방","이수","남성","숭실대입구","상도","장승배기","신대방삼거리","보라매","신풍","대림","남구로","가산디지털단지","철산","광명사거리","천왕","온수","부천종합운동장","춘의","신중동","부천시청","상동","삼산체육관","굴포천","부평구청"],
  "8": ["암사","천호","강동구청","몽촌토성","잠실","석촌","송파","가락시장","문정","장지","복정","산성","남위례","모란","수진","신흥","단대오거리","남한산성입구","암사역사공원역"],
  "9": ["개화","김포공항","공항시장","신방화","마곡나루","양천향교","가양","증미","등촌","염창","신목동","선유도","당산","국회의사당","여의도","샛강","노량진","노들","흑석","동작","구반포","신반포","고속터미널","사평","신논현","언주","선정릉","삼성중앙","봉은사","종합운동장","삼전","석촌고분","석촌","송파나루","한성백제","올림픽공원","둔촌오륜","중앙보훈병원"],
  "수인분당": ["수원","고색","오목천","어천","야목","사리","한대앞","중앙","고잔","초지","안산","신길온천","정왕","오이도","달월","월곶","소래포구","인천논현","호구포","남동인더스파크","원인재","연수","송도","인하대","숭의","신포","인천","수원","매탄권선","수원시청","매교","수원","화서","성균관대","의왕","당정","군포","금정","범계","평촌","인덕원","정부과천청사","과천","대공원","경마공원","선바위","남태령","사당","이수","총신대입구","동작","서빙고","한남","압구정로데오","강남구청","선정릉","선릉","구룡","개포동","대모산입구","수서","복정","모란","태평","신흥","수진","단대오거리","신구대","경원대","야탑","이매","서현","수내","정자","미금","오리","죽전","보정","구성","신갈","기흥","상갈","청명","영통","망포","매탄권선","수원시청","매교","수원"],
  "신분당": ["신사","논현","신논현","강남","양재","양재시민의숲","청계산입구","판교","정자","미금","동천","수지구청","성복","상현","광교중앙","광교"],
  "경의중앙": ["문산","운천","임진강","금촌","금릉","파주","야당","탄현","일산","풍산","백마","곡산","능곡","행신","강매","화전","수색","디지털미디어시티","가좌","신촌","서울역","청파","공덕","서강대","홍대입구","마포","신촌","용산","이촌","서빙고","한남","옥수","응봉","왕십리","청량리","회기","중랑","양원","구리","도농","양정","덕소","도심","팔당","운길산","양수","신원","국수","아신","오빈","양평","원덕","용문","지평"],
  "공항철도": ["인천공항2터미널","인천공항1터미널","공항화물청사","영종","운서","청라국제도시","검암","계양","김포공항","디지털미디어시티","홍대입구","공덕","서울역"],
  "김포골드": ["김포공항","고촌","풍무","사우","마산","장기","운양","걸포북변","김포시청","도시개발","양촌","가현","누산","통진","마송","봉하","걸포"],
  "우이신설": ["북한산우이","솔밭공원","4.19민주묘지","가오리","화계","삼양","삼양사거리","솔샘","북한산보국문","정릉","성신여대입구","보문","신설동"],
  "서해": ["일산","탄현","대곡","능곡","김포공항","원종","부천종합운동장","소사","시흥대야","신천","신현","시흥시청","시흥능곡","달미","선부","초지","안산","어천","야목","사리","원시","팔곡","고잔","중앙","한대앞"],
  "GTX-A": ["수서","성남","구성","동탄"],
  "2성수지선": ["성수","용답","신답","용두","신설동"],
  "2신정지선": ["신도림","도림천","신정네거리","양천구청"],
  "5마천지선": ["강동","둔촌동","올림픽공원","방이","오금","개롱","거여","마천"],
};

// 전체 역 목록 (자동완성용)
const ALL_STATIONS = Object.entries(LINE_STATIONS).flatMap(([line, stations]) =>
  stations.map(s => ({ name: s, line }))
);
const UNIQUE_STATIONS = ALL_STATIONS.reduce((acc, cur) => {
  if (!acc.find(x => x.name === cur.name && x.line === cur.line)) acc.push(cur);
  return acc;
}, []);

function getToiletInfo(lineNum, stationName) {
  const key = `${stationName}_${lineNum}`;
  const entry = TOILET_DB[key];
  if (!entry) return { toilets: [{ gate: "외부", exit: "", location: "대합실 내 (출구 방향)" }] };
  return entry;
}
// 개찰구 안 화장실 있는지 여부
function hasGateIn(info) { return info.toilets?.some(t => t.gate === "내부") ?? false; }
// 개찰구 밖 화장실 있는지 여부
function hasGateOut(info) { return info.toilets?.some(t => t.gate === "외부") ?? false; }
// 개찰구 안 화장실 목록
function getGateInToilets(info) { return info.toilets?.filter(t => t.gate === "내부") ?? []; }
// 개찰구 밖 화장실 목록
function getGateOutToilets(info) { return info.toilets?.filter(t => t.gate === "외부") ?? []; }
function getLineColor(lineNum) { return LINES[lineNum]?.color || "#888"; }
function getLineName(lineNum) { return LINES[lineNum]?.name || `${lineNum}호선`; }
// 노선별 방향 표기 (주요 거점역 기준)
const LINE_DIRECTION = {
  "1": { down: "신창 방향", up: "소요산 방향" },
  "2": { down: "성수·잠실 방향 (외선)", up: "시청·신도림 방향 (내선)" },
  "3": { down: "오금 방향", up: "대화 방향" },
  "4": { down: "오이도 방향", up: "당고개 방향" },
  "5": { down: "하남검단산·마천 방향", up: "방화 방향" },
  "6": { down: "신내 방향", up: "응암 방향" },
  "7": { down: "부평구청 방향", up: "장암 방향" },
  "8": { down: "모란 방향", up: "암사 방향" },
  "9": { down: "중앙보훈병원 방향", up: "개화 방향" },
  "수인분당": { down: "인천·수원 방향", up: "청량리 방향" },
  "신분당": { down: "광교 방향", up: "신사 방향" },
  "경의중앙": { down: "용문·지평 방향", up: "문산 방향" },
  "공항철도": { down: "인천공항2터미널 방향", up: "서울역 방향" },
  "김포골드": { down: "양촌 방향", up: "김포공항 방향" },
  "우이신설": { down: "신설동 방향", up: "북한산우이 방향" },
  "서해": { down: "일산 방향", up: "원시 방향" },
  "GTX-A": { down: "동탄 방향", up: "수서 방향" },
  "2성수지선": { down: "신설동 방향", up: "성수 방향" },
  "2신정지선": { down: "양천구청 방향", up: "신도림 방향" },
  "5마천지선": { down: "마천 방향", up: "강동 방향" },
};

function getDirectionOptions(lineNum) {
  const s = LINE_STATIONS[lineNum];
  if (!s || s.length < 2) return [];
  const d = LINE_DIRECTION[lineNum];
  return [
    { value: "down", label: `▶ ${d ? d.down : s[s.length - 1] + " 방향"}` },
    { value: "up",   label: `◀ ${d ? d.up   : s[0] + " 방향"}` },
  ];
}
function findNearestGateInToilet(lineNum, currentStation, direction, skipCurrent = false) {
  const stations = LINE_STATIONS[lineNum];
  if (!stations) return null;
  const idx = stations.indexOf(currentStation);
  if (idx === -1) return null;
  const step = direction === "down" ? 1 : -1;
  const startIdx = skipCurrent ? idx + step : idx;
  for (let i = startIdx; i >= 0 && i < stations.length; i += step) {
    const info = getToiletInfo(lineNum, stations[i]);
    if (hasGateIn(info)) return { station: stations[i], stops: Math.abs(i - idx), info };
  }
  for (let i = startIdx; i >= 0 && i < stations.length; i += step) {
    const info = getToiletInfo(lineNum, stations[i]);
    if (hasGateOut(info)) return { station: stations[i], stops: Math.abs(i - idx), info, fallback: true };
  }
  return null;
}

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0c10; --surface: #12151c; --surface2: #1a1f2b;
    --border: rgba(255,255,255,0.07); --text: #e8eaf0; --text-dim: #7a8196;
    --accent: #4fffb0; --accent2: #00c8ff; --warn: #ff6b6b; --gold: #ffd166;
  }
  body { background: var(--bg); font-family: 'Noto Sans KR', sans-serif; color: var(--text); min-height: 100vh; }
  .app { max-width: 480px; margin: 0 auto; padding: 0 0 80px 0; }
  .header { padding: 28px 24px 20px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--bg); z-index: 100; }
  .header-tag { font-size: 10px; letter-spacing: 3px; color: var(--accent); font-family: 'JetBrains Mono', monospace; margin-bottom: 6px; }
  .header-title { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
  .header-title span { color: var(--accent); }
  .header-sub { font-size: 12px; color: var(--text-dim); margin-top: 4px; }
  /* Steps */
  .steps { display: flex; align-items: center; padding: 14px 24px 0; }
  .step { display: flex; align-items: center; gap: 5px; font-size: 11px; font-family: 'JetBrains Mono', monospace; }
  .step-num { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; }
  .step.done .step-num { background: var(--accent); color: #0a0c10; }
  .step.active .step-num { background: var(--accent2); color: #0a0c10; }
  .step.pending .step-num { background: var(--surface2); color: var(--text-dim); }
  .step.done .step-label { color: var(--accent); }
  .step.active .step-label { color: var(--accent2); }
  .step.pending .step-label { color: var(--text-dim); }
  .step-arrow { color: var(--border); font-size: 10px; margin: 0 6px; }
  /* Search */
  .search-section { padding: 14px 24px; border-bottom: 1px solid var(--border); }
  .section-label { font-size: 10px; letter-spacing: 2px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; margin-bottom: 10px; text-transform: uppercase; }
  .search-wrap { position: relative; }
  .search-input { width: 100%; background: var(--surface2); border: 1.5px solid var(--border); border-radius: 12px; color: var(--text); font-family: 'Noto Sans KR', sans-serif; font-size: 15px; padding: 13px 44px 13px 16px; outline: none; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: var(--text-dim); font-size: 14px; }
  .search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 17px; pointer-events: none; }
  .search-clear { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: var(--surface); border: 1px solid var(--border); border-radius: 50%; width: 22px; height: 22px; color: var(--text-dim); cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center; }
  /* Dropdown */
  .dropdown { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: var(--surface); border: 1px solid rgba(79,255,176,0.2); border-radius: 12px; z-index: 999; max-height: 220px; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
  .dropdown-item { padding: 11px 14px; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); transition: background 0.1s; }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover, .dropdown-item.hi { background: var(--surface2); }
  .ac-name { font-size: 14px; font-weight: 600; }
  .ac-name em { color: var(--accent); font-style: normal; }
  .line-pill { border-radius: 5px; padding: 2px 7px; font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0; }
  /* Chip */
  .chip { display: flex; align-items: center; gap: 10px; background: rgba(79,255,176,0.06); border: 1px solid rgba(79,255,176,0.25); border-radius: 12px; padding: 11px 14px; margin-top: 10px; }
  .chip-name { font-size: 16px; font-weight: 700; flex: 1; }
  .chip-x { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 16px; padding: 2px 4px; }
  /* Mode */
  .mode-section { padding: 14px 24px; border-bottom: 1px solid var(--border); }
  .mode-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .mode-btn { padding: 13px 6px; border-radius: 11px; border: 1.5px solid var(--border); background: var(--surface2); color: var(--text-dim); cursor: pointer; font-family: 'Noto Sans KR', sans-serif; font-size: 12px; font-weight: 500; text-align: center; transition: all 0.18s; }
  .mode-icon { font-size: 22px; display: block; margin-bottom: 4px; }
  .mode-desc { font-size: 10px; color: var(--text-dim); display: block; margin-top: 2px; }
  .mode-btn.active { border-color: var(--accent); background: rgba(79,255,176,0.07); color: var(--text); }
  .mode-btn.active .mode-desc { color: var(--accent); }
  .mode-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); color: var(--text); }
  /* Dir */
  .dir-section { padding: 12px 24px; border-bottom: 1px solid var(--border); }
  .dir-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .dir-btn { padding: 11px 8px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--surface2); color: var(--text-dim); cursor: pointer; font-family: 'Noto Sans KR', sans-serif; font-size: 12px; text-align: center; transition: all 0.15s; }
  .dir-btn.active { border-color: var(--accent2); background: rgba(0,200,255,0.07); color: var(--text); }
  /* CTA */
  .cta-section { padding: 14px 24px; }
  .btn-primary { width: 100%; padding: 15px; background: var(--accent); color: #0a0c10; border: none; border-radius: 12px; font-family: 'Noto Sans KR', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.15s; }
  .btn-primary:hover { background: #3de89e; transform: translateY(-1px); }
  .btn-primary:disabled { background: var(--surface2); color: var(--text-dim); cursor: not-allowed; transform: none; }
  /* Results */
  .result-section { padding: 18px 24px; }
  .result-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; animation: slideUp 0.28s ease; margin-bottom: 12px; }
  @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .result-header { padding: 13px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 9px; }
  .result-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .result-header-text { font-size: 12px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
  .result-body { padding: 16px 18px; }
  .found-station { font-size: 26px; font-weight: 900; letter-spacing: -1px; margin-bottom: 3px; }
  .station-suffix { font-size: 17px; font-weight: 500; color: var(--text); }
  .status-badge { display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 600; margin-bottom: 12px; margin-top: 5px; }
  .badge-green { background: rgba(79,255,176,0.1); border: 1px solid rgba(79,255,176,0.3); color: var(--accent); }
  .badge-gold  { background: rgba(255,209,102,0.1); border: 1px solid rgba(255,209,102,0.3); color: var(--gold); }
  .badge-red   { background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.3); color: var(--warn); }
  .instruction-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .instruction-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.55; }
  .inst-num { width: 21px; height: 21px; border-radius: 50%; background: var(--surface2); color: var(--accent); font-size: 10px; font-family: 'JetBrains Mono', monospace; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .location-box { margin-top: 12px; padding: 11px 13px; background: rgba(0,200,255,0.05); border: 1px solid rgba(0,200,255,0.2); border-radius: 9px; font-size: 13px; color: var(--accent2); display: flex; gap: 8px; }
  .note-box { margin-top: 9px; padding: 9px 13px; background: rgba(255,209,102,0.07); border: 1px solid rgba(255,209,102,0.2); border-radius: 8px; font-size: 12px; color: var(--gold); display: flex; gap: 7px; }
  .other-lines-title { font-size: 10px; letter-spacing: 1.5px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; margin-bottom: 7px; text-transform: uppercase; }
  .other-line-item { display: flex; align-items: flex-start; gap: 9px; padding: 9px 11px; background: var(--surface2); border-radius: 9px; margin-bottom: 6px; font-size: 12px; }
  .line-badge { display: inline-flex; align-items: center; border-radius: 5px; padding: 2px 7px; font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .reset-btn { width: 100%; padding: 12px; background: none; border: 1px solid var(--border); border-radius: 12px; color: var(--text-dim); cursor: pointer; font-family: 'Noto Sans KR', sans-serif; font-size: 13px; transition: all 0.15s; }
  .reset-btn:hover { border-color: rgba(255,255,255,0.2); color: var(--text); }
  .tips-section { padding: 0 24px 20px; }
  .tip-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; margin-top: 10px; }
  .tip-title { font-size: 10px; letter-spacing: 2px; color: var(--accent2); font-family: 'JetBrains Mono', monospace; margin-bottom: 10px; text-transform: uppercase; }
  .tip-item { display: flex; gap: 8px; font-size: 12px; color: var(--text-dim); line-height: 1.5; margin-bottom: 7px; }
  .tip-item:last-child { margin-bottom: 0; }
  .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; background: var(--bg); border-top: 1px solid var(--border); padding: 10px 24px; display: flex; justify-content: space-around; }
  .nav-btn { background: none; border: none; color: var(--text-dim); font-family: 'Noto Sans KR', sans-serif; font-size: 11px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 4px 16px; border-radius: 8px; }
  .nav-btn.active { color: var(--accent); }
  .nav-btn .nav-icon { font-size: 20px; }
  .dropdown::-webkit-scrollbar { width: 4px; }
  .dropdown::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
`;


export default function App() {
  const [tab, setTab] = useState("search");
  const [query, setQuery] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [hiIdx, setHiIdx] = useState(-1);
  const [selected, setSelected] = useState(null); // { name, line }
  const [mode, setMode] = useState(null); // "outside"|"concourse"|"onboard"
  const [direction, setDirection] = useState("down");
  const [result, setResult] = useState(null);

  // 검색어 기반 자동완성 목록
  const suggestions = query.trim().length > 0 && !selected
    ? UNIQUE_STATIONS.filter(s => s.name.includes(query.trim())).slice(0, 8)
    : [];

  const pickStation = (s) => {
    setSelected(s);
    setQuery(s.name);
    setShowDrop(false);
    setHiIdx(-1);
    setMode(null);
    setResult(null);
  };

  const clearStation = () => {
    setSelected(null);
    setQuery("");
    setShowDrop(false);
    setMode(null);
    setResult(null);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelected(null);
    setShowDrop(true);
    setHiIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (!showDrop || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHiIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHiIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && hiIdx >= 0) pickStation(suggestions[hiIdx]);
    if (e.key === "Escape") setShowDrop(false);
  };

  const handleSearch = () => {
    if (!selected || !mode) return;
    const { name, line } = selected;
    const info = getToiletInfo(line, name);
    if (mode === "outside") {
      setResult({ mode: "outside", station: name, lineNum: line, info });
    } else if (mode === "concourse") {
      setResult({ mode: "concourse", station: name, lineNum: line, info });
    } else {
      const found = findNearestGateInToilet(line, name, direction, true);
      setResult({ mode: "onboard", station: name, lineNum: line, direction, found });
    }
  };

  const reset = () => { setResult(null); setMode(null); };

  const dirOptions = selected ? getDirectionOptions(selected.line) : [];
  const step = !selected ? 1 : !mode ? 2 : 3;

  // 검색어 하이라이트
  const highlight = (text, q) => {
    if (!q) return text;
    const i = text.indexOf(q);
    if (i === -1) return text;
    return <><span>{text.slice(0, i)}</span><em>{text.slice(i, i + q.length)}</em><span>{text.slice(i + q.length)}</span></>;
  };

  const ResultCard = ({ children, dotColor, label }) => (
    <div className="result-card">
      <div className="result-header">
        <div className="result-dot" style={{ background: dotColor }} />
        <div className="result-header-text">{label}</div>
      </div>
      <div className="result-body">{children}</div>
    </div>
  );

  const OtherLines = ({ lines }) => lines?.length > 0 ? (
    <div className="result-card">
      <div className="result-header">
        <div className="result-dot" style={{ background: "var(--accent2)" }} />
        <div className="result-header-text">같은 역 다른 호선 화장실</div>
      </div>
      <div className="result-body">
        <div className="other-lines-title">환승 통로로 이동 가능</div>
        {lines.map((ol, i) => (
          <div key={i} className="other-line-item">
            <span className="line-badge" style={{ background: getLineColor(ol.line) }}>{getLineName(ol.line)}</span>
            <span style={{ color: "var(--text-dim)", lineHeight: 1.5 }}>{ol.direction}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-tag">🚇 Seoul Metro</div>
          <div className="header-title">지하철 <span>화장실</span> 안내</div>
          <div className="header-sub">추가 과금 없이 갈 수 있는 가장 가까운 화장실</div>
        </div>

        {tab === "search" && !result && (
          <>
            {/* Step indicator */}
            <div className="steps">
              <div className={`step ${step > 1 ? "done" : "active"}`}>
                <div className="step-num">{step > 1 ? "✓" : "1"}</div>
                <span className="step-label">역 선택</span>
              </div>
              <span className="step-arrow">›</span>
              <div className={`step ${step > 2 ? "done" : step === 2 ? "active" : "pending"}`}>
                <div className="step-num">{step > 2 ? "✓" : "2"}</div>
                <span className="step-label">상태 선택</span>
              </div>
              <span className="step-arrow">›</span>
              <div className={`step ${step === 3 ? "active" : "pending"}`}>
                <div className="step-num">3</div>
                <span className="step-label">결과 확인</span>
              </div>
            </div>

            {/* STEP 1: 역 검색 */}
            <div className="search-section">
              <div className="section-label">STEP 1 — 역 검색</div>
              <div className="search-wrap">
                <input
                  className="search-input"
                  type="text"
                  placeholder="역 이름을 입력하세요 (예: 강남, 홍대...)"
                  value={query}
                  onChange={handleQueryChange}
                  onFocus={() => query && setShowDrop(true)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                {query
                  ? <button className="search-clear" onClick={clearStation}>✕</button>
                  : <span className="search-icon">🔍</span>
                }

                {/* 자동완성 드롭다운 */}
                {showDrop && suggestions.length > 0 && (
                  <div className="dropdown">
                    {suggestions.map((s, i) => (
                      <div
                        key={`${s.name}_${s.line}`}
                        className={`dropdown-item ${i === hiIdx ? "hi" : ""}`}
                        onMouseDown={(e) => { e.preventDefault(); pickStation(s); }}
                      >
                        <span className="line-pill" style={{ background: getLineColor(s.line) }}>
                          {getLineName(s.line)}
                        </span>
                        <span className="ac-name">{highlight(s.name, query.trim())}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 선택된 역 chip */}
              {selected && (
                <div className="chip">
                  <span className="line-pill" style={{ background: getLineColor(selected.line) }}>
                    {getLineName(selected.line)}
                  </span>
                  <span className="chip-name">{selected.name}역</span>
                  <button className="chip-x" onClick={clearStation}>✕</button>
                </div>
              )}
            </div>

            {/* STEP 2: 상태 선택 */}
            {selected && (
              <div className="mode-section">
                <div className="section-label">STEP 2 — 지금 어디 계세요?</div>
                <div className="mode-grid">
                  <button className={`mode-btn ${mode === "outside" ? "active" : ""}`} onClick={() => setMode("outside")}>
                    <span className="mode-icon">🚶</span>
                    개찰구 밖
                    <span className="mode-desc">하차 후 / 미탑승</span>
                  </button>
                  <button className={`mode-btn ${mode === "concourse" ? "active" : ""}`} onClick={() => setMode("concourse")}>
                    <span className="mode-icon">🎫</span>
                    개찰구 안
                    <span className="mode-desc">대합실 안에 있음</span>
                  </button>
                  <button className={`mode-btn ${mode === "onboard" ? "active" : ""}`} onClick={() => setMode("onboard")}>
                    <span className="mode-icon">🚇</span>
                    탑승 중
                    <span className="mode-desc">열차 안에 있음</span>
                  </button>
                </div>
              </div>
            )}

            {/* 방향 선택 (탑승중만) */}
            {selected && mode === "onboard" && (
              <div className="dir-section">
                <div className="section-label">방향 선택</div>
                <div className="dir-grid">
                  {dirOptions.map(o => (
                    <button key={o.value} className={`dir-btn ${direction === o.value ? "active" : ""}`} onClick={() => setDirection(o.value)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {selected && mode && (
              <div className="cta-section">
                <button className="btn-primary" onClick={handleSearch}>
                  🚽 화장실 찾기
                </button>
              </div>
            )}

            {/* 팁 */}
            {!selected && (
              <div className="tips-section" style={{ paddingTop: 16 }}>
                <div className="tip-card">
                  <div className="tip-title">알아두면 유용한 정보</div>
                  <div className="tip-item"><span>⏱</span><span>서울교통공사 구간 하차 후 <strong>15분 이내 재승차</strong> 시 추가 요금 없음</span></div>
                  <div className="tip-item"><span>🚪</span><span>개찰구 안 화장실 = 탑승 중 무료 / 개찰구 밖 = 15분 규정 적용</span></div>
                  <div className="tip-item"><span>🔄</span><span>환승역은 다른 호선 구역 화장실도 이용 가능</span></div>
                  <div className="tip-item"><span>🆘</span><span>급할 땐 개찰구 옆 <strong>비상게이트 버튼</strong>으로 역무원 요청</span></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── 결과 ── */}
        {tab === "search" && result && (
          <div className="result-section">

            {/* 개찰구 밖 */}
            {result.mode === "outside" && (() => {
              const { info, station, lineNum: ln } = result;
              return (<>
                <ResultCard
                  dotColor={info.gate_out ? "var(--accent)" : "var(--warn)"}
                  label={<><span className="line-badge" style={{ background: getLineColor(ln), marginRight: 6 }}>{getLineName(ln)}</span>{station}역 — 개찰구 밖</>}
                >
                  <div className="found-station" style={{ color: info.gate_out ? "var(--accent)" : "var(--warn)" }}>
                    {station}<span className="station-suffix">역</span>
                  </div>
                  {hasGateOut(info) ? (<>
                    <div className="status-badge badge-green">✅ 개찰구 밖 화장실 있음</div>
                    <ul className="instruction-list">
                      <li className="instruction-item"><span className="inst-num">1</span><span>개찰구를 나온 뒤 아래 위치로 이동</span></li>
                    </ul>
                    {getGateOutToilets(info).map((t, i) => (
                      <div key={i} className="location-box">
                        <span>📍</span>
                        <span>{t.exit ? <><strong>{t.exit}번 출구</strong> — </> : ""}{t.location}</span>
                      </div>
                    ))}
                  </>) : (<>
                    <div className="status-badge badge-red">❌ 개찰구 밖 화장실 없음</div>
                    {hasGateIn(info) && <div className="note-box"><span>💡</span><span>개찰구 안에만 화장실 있음 — 승차 후 이용 또는 역무원 문의</span></div>}
                  </>)}
                </ResultCard>
              </>);
            })()}

            {/* 개찰구 안 */}
            {result.mode === "concourse" && (() => {
              const { info, station, lineNum: ln } = result;
              return (<>
                <ResultCard
                  dotColor={info.gate_in ? "var(--accent)" : "var(--warn)"}
                  label={<><span className="line-badge" style={{ background: getLineColor(ln), marginRight: 6 }}>{getLineName(ln)}</span>{station}역 — 개찰구 안</>}
                >
                  <div className="found-station" style={{ color: info.gate_in ? "var(--accent)" : "var(--warn)" }}>
                    {station}<span className="station-suffix">역</span>
                  </div>
                  {hasGateIn(info) ? (<>
                    <div className="status-badge badge-green">✅ 개찰구 안 화장실 있음</div>
                    <ul className="instruction-list">
                      <li className="instruction-item"><span className="inst-num">1</span><span>현재 위치에서 아래 위치로 이동</span></li>
                    </ul>
                    {getGateInToilets(info).map((t, i) => (
                      <div key={i} className="location-box">
                        <span>📍</span>
                        <span>{t.exit ? <><strong>{t.exit}번 출구</strong> — </> : ""}{t.location}</span>
                      </div>
                    ))}
                  </>) : (<>
                    <div className="status-badge badge-red">❌ 개찰구 안 화장실 없음</div>
                    {hasGateOut(info) && <div className="note-box"><span>💡</span><span>개찰구 밖에 화장실 있음 — 나가서 이용 후 15분 내 재승차</span></div>}
                    {hasGateOut(info) && getGateOutToilets(info).map((t, i) => (
                      <div key={i} className="location-box">
                        <span>📍</span>
                        <span>{t.exit ? <><strong>{t.exit}번 출구</strong> — </> : ""}{t.location}</span>
                      </div>
                    ))}
                  </>)}
                </ResultCard>
              </>);
            })()}

            {/* 탑승 중 */}
            {result.mode === "onboard" && (() => {
              const { found, direction: dir, lineNum: ln, station: cur } = result;
              if (!found) return (
                <div className="result-card">
                  <div className="result-body" style={{ textAlign: "center", padding: 28 }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>😓</div>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>해당 방향에 화장실 있는 역이 없습니다</div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)" }}>반대 방향도 확인해보세요.</div>
                  </div>
                </div>
              );
              const isFree = !found.fallback;
              // 탑승 중이므로 stops=0이어도 "지금 막 지나쳤거나 다음 정차" → 항상 "내려서" 안내
              const isNext = found.stops <= 1;
              return (
                <ResultCard
                  dotColor={isFree ? "var(--accent)" : "var(--gold)"}
                  label={isFree
                    ? `🚇 ${found.stops === 0 ? "지금 이 역" : found.stops + "정거장 후"} — 개찰구 안 화장실 (무료)`
                    : `🚇 ${found.stops === 0 ? "지금 이 역" : found.stops + "정거장 후"} — 개찰구 밖 (하차 필요)`}
                >
                  <div className="found-station" style={{ color: isFree ? "var(--accent)" : getLineColor(ln) }}>
                    {found.station}<span className="station-suffix">역</span>
                  </div>
                  <div className={`status-badge ${isFree ? "badge-green" : "badge-gold"}`}>
                    {found.stops === 0 ? "⚡ 지금 즉시 하차" : `🚇 ${found.stops}정거장 후 하차`}
                    {" — "}
                    {isFree ? "추가 과금 없음 ✅" : "15분 내 재승차 ⚠️"}
                  </div>

                  <ul className="instruction-list">
                    {found.stops === 0 ? (<>
                      <li className="instruction-item"><span className="inst-num">1</span>
                        <span>🔔 <strong>지금 바로 내리세요!</strong> 현재 정차 중인 <strong>{found.station}역</strong></span>
                      </li>
                      {isFree ? (<>
                        <li className="instruction-item"><span className="inst-num">2</span>
                          <span>승강장 내 개찰구 안 화장실 이용</span>
                        </li>
                        <li className="instruction-item"><span className="inst-num">3</span>
                          <span>다음 열차 탑승 — <strong>추가 과금 없음</strong></span>
                        </li>
                      </>) : (<>
                        <li className="instruction-item"><span className="inst-num">2</span>
                          <span>개찰구 밖으로 나가서 화장실 이용</span>
                        </li>
                        <li className="instruction-item"><span className="inst-num">3</span>
                          <span><strong>15분 이내 재승차</strong> 시 추가 요금 없음</span>
                        </li>
                      </>)}
                    </>) : (<>
                      <li className="instruction-item"><span className="inst-num">1</span>
                        <span>현재 방향으로 <strong>{found.stops}정거장</strong> 더 이동</span>
                      </li>
                      <li className="instruction-item"><span className="inst-num">2</span>
                        <span><strong>{found.station}역</strong> 도착 시 하차</span>
                      </li>
                      {isFree ? (<>
                        <li className="instruction-item"><span className="inst-num">3</span>
                          <span>승강장 내 개찰구 안 화장실 이용</span>
                        </li>
                        <li className="instruction-item"><span className="inst-num">4</span>
                          <span>다음 열차 탑승 — <strong>추가 과금 없음</strong></span>
                        </li>
                      </>) : (<>
                        <li className="instruction-item"><span className="inst-num">3</span>
                          <span>개찰구 밖 화장실 이용</span>
                        </li>
                        <li className="instruction-item"><span className="inst-num">4</span>
                          <span><strong>15분 이내 재승차</strong> 시 추가 요금 없음</span>
                        </li>
                      </>)}
                    </>)}
                  </ul>

                  {isFree
                    ? getGateInToilets(found.info).map((t, i) => (
                        <div key={i} className="location-box"><span>📍</span>
                          <span><strong>개찰구 안</strong>{t.exit ? ` — ${t.exit}번 출구` : ""} — {t.location}</span>
                        </div>
                      ))
                    : getGateOutToilets(found.info).map((t, i) => (
                        <div key={i} className="location-box"><span>📍</span>
                          <span><strong>개찰구 밖</strong>{t.exit ? ` — ${t.exit}번 출구` : ""} — {t.location}</span>
                        </div>
                      ))
                  }

                </ResultCard>
              );
            })()}

            <button className="reset-btn" onClick={reset}>↩ 다시 검색</button>
          </div>
        )}

        {/* 앱 정보 */}
        {tab === "info" && (
          <div className="result-section">
            <div className="tip-card">
              <div className="tip-title">📊 데이터 출처</div>
              <div className="tip-item"><span>🏛</span><span>공공데이터포털 (data.go.kr)</span></div>
              <div className="tip-item"><span>🗂</span><span>서울 열린데이터광장</span></div>
              <div className="tip-item"><span>🚇</span><span>서울교통공사 공식 노선도</span></div>
            </div>
            <div className="tip-card" style={{ marginTop: 10 }}>
              <div className="tip-title">🚀 향후 개발 방향</div>
              <div className="tip-item"><span>📍</span><span>GPS 기반 현재 위치 자동 감지</span></div>
              <div className="tip-item"><span>♿</span><span>장애인 화장실 별도 표시</span></div>
              <div className="tip-item"><span>🔴</span><span>실시간 혼잡도 연동</span></div>
              <div className="tip-item"><span>🌐</span><span>9호선·경의중앙선·수인분당선 확대</span></div>
            </div>
          </div>
        )}

        <div className="bottom-nav">
          <button className={`nav-btn ${tab === "search" ? "active" : ""}`} onClick={() => { setTab("search"); reset(); }}>
            <span className="nav-icon">🔍</span><span>재탐색</span>
          </button>
          <button className={`nav-btn ${tab === "info" ? "active" : ""}`} onClick={() => setTab("info")}>
            <span className="nav-icon">ℹ️</span><span>앱 정보</span>
          </button>
        </div>
      </div>
    </>
  );
}
