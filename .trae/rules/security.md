# 合规与安全禁止 API（微信小程序）
## 绝对禁用
- uni.getPhoneNumber / uni.getUserProfile
- uni.requestPayment
- uni.navigateToMiniProgram（违规导流）
- 直接裸调用 wx.xxx
- 收集用户隐私信息
- 社交/支付/商业相关 API

## 技术禁止
- 选项式 API
- npm/yarn
- 全局样式污染
- 覆盖 Woto UI 样式
