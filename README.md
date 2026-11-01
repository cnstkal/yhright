# YH RIGHT

소설 기반 스마트폰 시뮬레이션 게임.

## 구조
- `chapters/`: 챕터별 스토리와 앱
- `shared/`: 여러 앱이 함께 사용하는 공통 스크립트
- `js/`: 공통 기능 스크립트

각 챕터의 앱은 `chapters/챕터명/apps/` 안에 둡니다. 여러 챕터에서 재사용하는 앱이라도 챕터별 데이터와 진행 상태는 분리합니다.

원본 앱 보관소: https://github.com/cnstkal/ai
