# 禁止使用的 API/功能（核心合规）
## 一、微信小程序禁止 API（绝对禁用）
1. 用户隐私类：
   - uni.getPhoneNumber、uni.getUserInfo、uni.getUserProfile
   - uni.getWeRunData、uni.startSoterAuthentication
2. 支付/商业类：
   - uni.requestPayment、uni.createCard、uni.openCard
3. 社交/敏感类：
   - uni.navigateToMiniProgram、uni.shareAppMessage（非合规场景禁用）
   - uni.getLocation（直接调用，需封装后加用户授权）、uni.startLocationUpdateBackground

## 二、技术禁止项
1. 禁止 Vue2 语法、选项式 API、自定义基础组件；
2. 禁止 npm/yarn 命令、package-lock.json/yarn.lock；
3. 禁止未封装的微信原生 API（wx.xxx）；
4. 禁止收集/存储用户敏感数据、跨平台兼容代码（仅微信小程序）；
5. 禁止动态生成样式、复杂动画、覆盖 Woto UI 样式。
