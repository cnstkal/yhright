/* Shared UI translations for Hwaho AI. User-created content is intentionally left untouched. */
(function(){
  const LANGS={ko:'ko-KR',en:'en-US',zh:'zh-CN',ja:'ja-JP'};
  const DICT={
    '사진':['Photos','照片','写真'],'인스타':['Instagram','Instagram','Instagram'],
    '카카오톡':['KakaoTalk','KakaoTalk','カカオトーク'],'전화':['Phone','电话','電話'],'메모':['Notes','备忘录','メモ'],
    '설정':['Settings','设置','設定'],'번역':['Translate','翻译','翻訳'],'날씨':['Weather','天气','天気'],
    '캘린더':['Calendar','日历','カレンダー'],'포스타입':['Postype','Postype','Postype'],'홈 화면':['Home Screen','主屏幕','ホーム画面'],
    '위로 밀어서 잠금 해제':['Swipe up to unlock','上滑解锁','上にスワイプしてロック解除'],
    '검색':['Search','搜索','検索'],'취소':['Cancel','取消','キャンセル'],'완료':['Done','完成','完了'],'닫기':['Close','关闭','閉じる'],
    '연결':['Connect','连接','接続'],'연결 해제':['Disconnect','断开连接','接続解除'],'연결 중…':['Connecting…','正在连接…','接続中…'],
    '연결 중...':['Connecting...','正在连接...','接続中...'],'연결됨':['Connected','已连接','接続済み'],'연결 안 됨':['Not Connected','未连接','未接続'],
    'Wi-Fi':['Wi-Fi','Wi-Fi','Wi-Fi'],'Bluetooth':['Bluetooth','蓝牙','Bluetooth'],'에어플레인 모드':['Airplane Mode','飞行模式','機内モード'],
    '셀룰러':['Cellular','蜂窝网络','モバイル通信'],'개인용 핫스팟':['Personal Hotspot','个人热点','インターネット共有'],
    '배터리':['Battery','电池','バッテリー'],'일반':['General','通用','一般'],'손쉬운 사용':['Accessibility','辅助功能','アクセシビリティ'],
    '디스플레이 및 밝기':['Display & Brightness','显示与亮度','画面表示と明るさ'],'배경화면':['Wallpaper','墙纸','壁紙'],
    '제어 센터':['Control Center','控制中心','コントロールセンター'],'카메라':['Camera','相机','カメラ'],
    '홈 화면 및 앱 보관함':['Home Screen & App Library','主屏幕与 App 资源库','ホーム画面とAppライブラリ'],
    '알림':['Notifications','通知','通知'],'사운드 및 햅틱':['Sounds & Haptics','声音与触感','サウンドと触覚'],
    '집중 모드':['Focus','专注模式','集中モード'],'스크린 타임':['Screen Time','屏幕使用时间','スクリーンタイム'],
    'Face ID 및 암호':['Face ID & Passcode','面容 ID 与密码','Face IDとパスコード'],'긴급 구조 요청':['Emergency SOS','紧急 SOS','緊急 SOS'],
    '개인정보 보호 및 보안':['Privacy & Security','隐私与安全性','プライバシーとセキュリティ'],
    '지갑 및 Apple Pay':['Wallet & Apple Pay','钱包与 Apple Pay','ウォレットとApple Pay'],'저장 공간이 부족합니다.':['Storage Almost Full.','储存空间不足。','ストレージの空き領域が不足しています。'],
    'Apple 계정, iCloud+ 등':['Apple Account, iCloud+ and more','Apple 账户、iCloud+ 等','Apple Account、iCloud+など'],
    'Wi-Fi에 연결하고, 사용 가능한 네트워크를 확인하고, 네트워크 연결 및 근처 핫스팟에 대한 설정을 관리할 수 있습니다.':['Connect to Wi-Fi, view available networks, and manage network and nearby hotspot settings.','连接 Wi-Fi、查看可用网络，并管理网络和附近热点设置。','Wi-Fiに接続し、利用可能なネットワークを確認して、ネットワークや近くのホットスポットの設定を管理できます。'],
    '알고 있는 네트워크':['Known Networks','已知网络','既知のネットワーク'],'다른 네트워크':['Other Networks','其他网络','ほかのネットワーク'],
    '기타…':['Other…','其他…','その他…'],'기타...':['Other...','其他...','その他...'],'더 알아보기…':['Learn More…','进一步了解…','詳しくはこちら…'],
    '연결 지원':['Wi-Fi Assist','无线局域网助理','Wi-Fiアシスト'],'데이터 사용량 재설정':['Reset Statistics','还原统计数据','統計情報をリセット'],
    '상태':['Status','状态','状況'],'보안':['Security','安全性','セキュリティ'],'신호 세기':['Signal Strength','信号强度','信号強度'],
    '저장됨':['Saved','已保存','保存済み'],'예':['Yes','是','はい'],'아니요':['No','否','いいえ'],
    '암호 입력':['Enter Password','输入密码','パスワードを入力'],'암호':['Password','密码','パスワード'],
    '암호는 8자 이상이어야 합니다.':['Password must be at least 8 characters.','密码至少需要 8 个字符。','パスワードは8文字以上で入力してください。'],
    '이름을 입력하세요.':['Enter a name.','请输入名称。','名前を入力してください。'],'이미 있는 네트워크입니다.':['This network already exists.','此网络已存在。','このネットワークはすでに存在します。'],
    '네트워크 추가':['Add Network','添加网络','ネットワークを追加'],'이 네트워크 지우기':['Forget This Network','忽略此网络','このネットワーク設定を削除'],
    '이 기기 지우기':['Forget This Device','忽略此设备','このデバイスの登録を解除'],'나의 기기':['My Devices','我的设备','自分のデバイス'],
    '다른 기기':['Other Devices','其他设备','その他のデバイス'],'끔':['Off','关闭','オフ'],'켬':['On','开启','オン'],
    '가상 기기를 사용한 시뮬레이션입니다.':['This is a simulation using virtual devices.','这是使用虚拟设备的模拟。','これは仮想デバイスを使用したシミュレーションです。'],
    '이 화면은 가상 기기를 사용한 시뮬레이션입니다.':['This screen is a simulation using virtual devices.','此屏幕是使用虚拟设备的模拟。','この画面は仮想デバイスを使用したシミュレーションです。'],
    '최근 재설정:':['Last Reset:','上次还原：','前回のリセット：'],'편집':['Edit','编辑','編集'],'Wi-Fi':['Wi-Fi','Wi-Fi','Wi-Fi'],
    '음악 스트리밍, 전화 통화 및 게임과 같은 활동에 사용할 수 있는 액세서리에 연결하십시오.':['Connect to accessories for music streaming, phone calls, gaming, and more.','连接可用于音乐播放、通话和游戏等活动的配件。','音楽のストリーミング、通話、ゲームなどに使えるアクセサリに接続します。'],
    '이 iPhone은 Bluetooth 설정이 열려 있는 동안 ‘iPhone’(으)로 인식 가능합니다.':['This iPhone can be discovered as “iPhone” while Bluetooth settings are open.','打开蓝牙设置时，此 iPhone 可被识别为“iPhone”。','Bluetooth設定を開いている間、このiPhoneは「iPhone」として検出可能です。'],
    'Apple Watch를 iPhone과 페어링하려면,':['To pair Apple Watch with iPhone,','要将 Apple Watch 与 iPhone 配对，','Apple WatchをiPhoneとペアリングするには、'],
    'Apple Watch 앱':['Apple Watch app','Apple Watch App','Apple Watchアプリ'],
    '사진 보관함':['Photo Library','照片图库','フォトライブラリ'],'모두 보기':['See All','查看全部','すべて表示'],'공유':['Share','分享','共有'],'삭제':['Delete','删除','削除'],
    '저장':['Save','保存','保存'],'수정':['Edit','编辑','編集'],'게시':['Post','发布','投稿'],'댓글':['Comments','评论','コメント'],
    '팔로우':['Follow','关注','フォロー'],'팔로잉':['Following','已关注','フォロー中'],'팔로워':['Followers','粉丝','フォロワー'],
    '좋아요':['Like','赞','いいね'],'답글':['Reply','回复','返信'],'더 보기':['More','更多','もっと見る'],
    '메시지':['Messages','消息','メッセージ'],'새 메시지':['New Message','新消息','新規メッセージ'],'보내기':['Send','发送','送信'],
    '통화':['Call','通话','通話'],'최근 통화':['Recents','最近通话','履歴'],'연락처':['Contacts','联系人','連絡先'],
    '즐겨찾기':['Favorites','收藏夹','お気に入り'],'부재중':['Missed','未接来电','不在着信'],
    '오늘':['Today','今天','今日'],'어제':['Yesterday','昨天','昨日'],'월요일':['Monday','星期一','月曜日'],'화요일':['Tuesday','星期二','火曜日'],
    '수요일':['Wednesday','星期三','水曜日'],'목요일':['Thursday','星期四','木曜日'],'금요일':['Friday','星期五','金曜日'],'토요일':['Saturday','星期六','土曜日'],'일요일':['Sunday','星期日','日曜日'],
    '홈':['Home','首页','ホーム'],'뒤로':['Back','返回','戻る'],'다음':['Next','下一步','次へ'],'이전':['Previous','上一步','前へ'],
    '새로 만들기':['Create New','新建','新規作成'],'새 게시물':['New Post','新帖子','新規投稿'],'새 메모':['New Note','新建备忘录','新規メモ'],
    '프로필':['Profile','个人资料','プロフィール'],'계정':['Account','账户','アカウント'],'개인정보':['Privacy','隐私','プライバシー'],
    '오류':['Error','错误','エラー'],'다시 시도':['Try Again','重试','再試行'],'불러오는 중…':['Loading…','正在加载…','読み込み中…'],
    '결과가 없습니다.':['No results.','没有结果。','結果がありません。'],'검색 결과가 없습니다.':['No search results.','没有搜索结果。','検索結果がありません。'],
    '모두 삭제':['Delete All','全部删除','すべて削除'],'선택':['Select','选择','選択'],'선택 취소':['Deselect','取消选择','選択解除'],
    '공유하기':['Share','分享','共有'],'링크 복사':['Copy Link','复制链接','リンクをコピー'],'차단':['Block','屏蔽','ブロック'],
    '신고':['Report','举报','報告'],'로그인':['Log In','登录','ログイン'],'로그아웃':['Log Out','退出登录','ログアウト'],
    '사용자 이름':['Username','用户名','ユーザー名'],'확인':['Confirm','确认','確認'],'적용':['Apply','应用','適用'],'초기화':['Reset','重置','リセット'],
    '음악':['Music','音乐','ミュージック'],'재생':['Play','播放','再生'],'일시 정지':['Pause','暂停','一時停止'],
    '재생 목록':['Playlist','播放列表','プレイリスト'],'앨범':['Album','专辑','アルバム'],'아티스트':['Artist','艺人','アーティスト'],
    '동영상':['Video','视频','動画'],'구독':['Subscribe','订阅','チャンネル登録'],'보관함':['Library','媒体库','ライブラリ'],
    '업로드':['Upload','上传','アップロード'],'최근 항목':['Recents','最近项目','最近の項目'],'저장':['Save','保存','保存'],
    '변경 사항 저장':['Save Changes','保存更改','変更を保存'],'사진 선택':['Choose Photo','选择照片','写真を選択'],
    '기온':['Temperature','气温','気温'],'최고':['High','最高','最高'],'최저':['Low','最低','最低'],'맑음':['Clear','晴','晴れ'],
    '흐림':['Cloudy','多云','曇り'],'비':['Rain','雨','雨'],'눈':['Snow','雪','雪'],'날짜':['Date','日期','日付'],'시간':['Time','时间','時間'],
    '번역할 텍스트':['Text to translate','要翻译的文本','翻訳するテキスト'],'번역 결과':['Translation','翻译结果','翻訳結果'],
    '언어 감지':['Detect language','检测语言','言語を検出'],'언어 선택':['Select language','选择语言','言語を選択'],
    '복사':['Copy','复制','コピー'],'붙여넣기':['Paste','粘贴','貼り付け'],'지우기':['Clear','清除','クリア'],
    '읽지 않음':['Unread','未读','未読'],'읽음':['Read','已读','既読'],'전송됨':['Sent','已发送','送信済み'],
    '일정 추가':['Add Event','添加日程','予定を追加'],'일정 편집':['Edit Event','编辑日程','予定を編集'],'언어':['Language','语言','言語'],
    '화면 모드':['Appearance','外观','外観'],'연결됨(시뮬레이션)':['Connected (Simulation)','已连接（模拟）','接続済み（シミュレーション）'],
    '연결 안 됨(시뮬레이션)':['Not Connected (Simulation)','未连接（模拟）','未接続（シミュレーション）'],'기타':['Other','其他','その他'],
    '이름을 입력하세요':['Enter a name','请输入名称','名前を入力してください'],'네트워크 이름':['Network Name','网络名称','ネットワーク名'],
    '저장 공간':['Storage','储存空间','ストレージ'],'알림 센터':['Notification Center','通知中心','通知センター'],
    '사용 가능한 네트워크':['Available Networks','可用网络','利用可能なネットワーク'],'연결할 수 없음':['Unable to Connect','无法连接','接続できません'],
    '번역하기':['Translate','翻译','翻訳'],'번역 중…':['Translating…','正在翻译…','翻訳中…'],
    '입력하세요':['Enter','请输入','入力してください'],'텍스트 입력':['Enter text','输入文本','テキストを入力'],
    '메시지 입력':['Enter a message','输入消息','メッセージを入力'],'메시지를 입력하세요':['Enter a message','请输入消息','メッセージを入力してください'],
    '게시물 없음':['No posts','暂无帖子','投稿はありません'],'아직 게시물이 없습니다.':['No posts yet.','暂无帖子。','まだ投稿はありません。'],
    '사진이 없습니다.':['No photos.','没有照片。','写真がありません。'],'메모가 없습니다.':['No notes.','没有备忘录。','メモはありません。'],
    '새로고침':['Refresh','刷新','更新'],'업데이트':['Update','更新','アップデート'],
  };
  const originals=new WeakMap();
  let originalTitle=null;
  const attrOriginals=new WeakMap();
  function lang(){try{const v=localStorage.getItem('hwaho-lang');return LANGS[v]?v:'ko';}catch(e){return 'ko';}}
  function translateText(value,l){
    if(l==='ko')return value;
    const exact=DICT[value.trim()];
    if(exact)return value.replace(value.trim(),exact[['en','zh','ja'].indexOf(l)]);
    return value;
  }
  function excluded(node){
    const el=node.nodeType===1?node:node.parentElement;
    return !!(el&&el.closest('script,style,noscript,textarea,input,[contenteditable="true"],[data-no-translate],.post-content,.message-content,.chat-message,.comment-content,.user-content,.tweet-content,.memo-content'));
  }
  function apply(root){
    const l=lang();document.documentElement.lang=LANGS[l]||'ko-KR';
    const titleEl=document.querySelector('title');
    if(titleEl){if(originalTitle===null)originalTitle=titleEl.textContent;const nextTitle=l==='ko'?originalTitle:translateText(originalTitle,l);if(titleEl.textContent!==nextTitle)titleEl.textContent=nextTitle;}
    const walker=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      if(excluded(n))return;
      if(!originals.has(n))originals.set(n,n.nodeValue);
      const original=originals.get(n);
      const next=l==='ko'?original:translateText(original,l);
      if(n.nodeValue!==next)n.nodeValue=next;
    });
    (root||document.body).querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(el=>{
      if(excluded(el))return;
      ['placeholder','aria-label','title'].forEach(a=>{
        if(!el.hasAttribute(a))return;
        let map=attrOriginals.get(el);if(!map){map={};attrOriginals.set(el,map);}
        if(!(a in map))map[a]=el.getAttribute(a);
        const val=map[a],dict=DICT[val.trim()];
        const next=l==='ko'?val:(dict?val.replace(val.trim(),dict[['en','zh','ja'].indexOf(l)]):val);
        if(el.getAttribute(a)!==next)el.setAttribute(a,next);
      });
    });
  }
  window.HwahoI18n={t:(key)=>{const l=lang();const v=DICT[key];return !v||l==='ko'?key:v[['en','zh','ja'].indexOf(l)]||key;},lang,apply};
  let pending=false;
  function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply(document.body);});}
  function init(){apply(document.body);new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,characterData:true});}
  window.addEventListener('storage',e=>{if(e.key==='hwaho-lang')schedule();});
  window.addEventListener('hwaho-language-change',schedule);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();