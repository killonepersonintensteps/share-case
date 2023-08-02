const changeColor = document.getElementById('changeColor')
console.log(changeColor)
chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color // 从内部获取颜色，填充到按钮上，体验更好
})

changeColor.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    // 监听点击事件，如果点击就执行下面的代码，并获取当前激活的tab的id。
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageBackgroundColor,
    })
    // 在当前激活的tab页面中执行setPageBackgroundColor这样一个函数
})

function setPageBackgroundColor() {
    chrome.storage.sync.get('color', ({ color }) => {
        // 值得注意的是该document其实是tab页面的document对象，因为这个函数是在tab页面中执行的。
        document.body.style.backgroundColor = color
    })
}
