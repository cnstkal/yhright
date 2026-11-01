# YH RIGHT

소설 기반 스마트폰 시뮬레이션 게임.

## 구조
- `chapters/`: 챕터별 스토리와 앱
- `shared/`: 여러 앱에서 실제로 공통 사용하는 시스템 스크립트

각 앱의 전용 CSS와 JS는 해당 앱 폴더 안에 둡니다. 예: `apps/Kakaotalk/css/`, `apps/Kakaotalk/js/`. 앱별 파일을 루트 공용 폴더로 분리하지 않습니다.

각 챕터의 앱은 `chapters/챕터명/apps/` 안에 둡니다. 여러 챕터에서 재사용하는 앱이라도 챕터별 데이터와 진행 상태는 분리합니다.

원본 앱 보관소: https://github.com/cnstkal/ai
