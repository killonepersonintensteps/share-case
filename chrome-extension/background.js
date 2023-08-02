// background
const color = '#000'

// 在安装完成之后，执行这样一个代码。相当于插件内部就存储了一个颜色。
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color })
})

// TODO: 右键菜单创建、消息通信

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.from == 'isiframe') {
        sendResponse('我收到了你的消息！')
    }
})
