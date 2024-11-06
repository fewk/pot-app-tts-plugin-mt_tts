async function tts(text, requestPath = "https://t.leftsite.cn/tts") {
    // 检查 requestPath 是否是有效的 URL，如果不是，抛出错误
    try {
        const url = new URL(requestPath);  // 尝试构造一个 URL 对象
    } catch (e) {
        throw new Error(`Invalid requestPath: ${requestPath}`);
    }

    // 构建 URL 查询字符串
    const url = new URL(requestPath);  // 确保 requestPath 是一个完整的 URL
    url.searchParams.append('t', text);  // 添加文本参数
    url.searchParams.append('v', 'en-US-SerenaMultilingualNeural');  // 设置语音
    url.searchParams.append('r', '0');  // 设置语速
    url.searchParams.append('p', '0');  // 设置音量等其他参数
    url.searchParams.append('o', 'audio-24khz-48kbitrate-mono-mp3');  // 设置音频格式

    // 发送 GET 请求
    const res = await fetch(url, {
        method: "GET",
    });

    // 检查响应状态
    if (res.ok) {
        // 假设返回的是音频文件，获取音频数据
        const audioData = await res.arrayBuffer();
        const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });  // 这里假设返回的是 MP3 格式
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();  // 播放音频
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
