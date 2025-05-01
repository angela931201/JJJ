


const chat = document.getElementById('chat');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendMsg(sender, text) {
    const div = document.createElement('div');
    div.className = 'msg';
    div.innerHTML = `<span class="${sender}">${sender === 'user' ? '你' : 'AI'}：</span> ${text}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// 改為呼叫本機 proxy server
async function askAI(question) {
    appendMsg('user', question);
    sendBtn.disabled = true;
    userInput.value = '';
    try {
        const res = await fetch('/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: question })
        });
        const data = await res.json();
        let aiText = '發生錯誤，請稍後再試';
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            aiText = data.candidates[0].content.parts.map(p => p.text).join('');
        }
        appendMsg('ai', aiText);
    } catch (e) {
        appendMsg('ai', '無法連線到AI服務，請檢查網路或API金鑰');
    }
    sendBtn.disabled = false;
}

sendBtn.onclick = () => {
    const q = userInput.value.trim();
    if (q) askAI(q);
};

userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.click();
});

// 初始歡迎訊息
appendMsg('ai', '你好！我是AI晚餐推薦助手，請問你今天想吃什麼？或有什麼需求？');
