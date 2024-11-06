async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch } = utils;
    let { requestPath } = config;

    // 设置默认请求路径
    requestPath = requestPath || "https://t.leftsite.cn/tts";

    // 使用语言映射获取语言代码
    const languageMap = config.language || {
        "en": "en-US-SerenaMultilingualNeural",
        // 添加其他默认语言映射
    };
    const voice = languageMap[lang] || "en-US-SerenaMultilingualNeural";

    // 构建请求 URL
    const url = `${requestPath}?t=${encodeURIComponent(text)}&v=${voice}&r=0&p=0&o=audio-24khz-48kbitrate-mono-mp3`;

    try {
        // 发起请求，获取音频流
        const res = await tauriFetch(url, { responseType: 'blob' });

        // 检查响应是否成功
        if (res.ok) {
            // 检查返回的数据是否是 Blob 类型
            if (res.data instanceof Blob) {
                const audioBlob = res.data;
                const audioUrl = URL.createObjectURL(audioBlob);
                return audioUrl;  // 可以直接将 URL 返回，用于 HTML 音频播放器播放
            } else {
                throw new Error("The response data is not a Blob type.");
            }
        } else {
            // 如果请求失败，抛出错误并打印详细信息
            throw new Error(`Http Request Error\nHttp Status: ${res.status}\nResponse Data: ${JSON.stringify(res.data)}`);
        }
    } catch (error) {
        // 捕获并打印错误
        console.error("Error during TTS request:", error);
        throw error; // 抛出错误，方便上层调用处理
    }
}
