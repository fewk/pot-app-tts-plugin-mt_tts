async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { http } = utils;
    const { fetch } = http;

    // 设置默认请求路径
    let { requestPath } = config;
    requestPath = requestPath || "https://t.leftsite.cn/tts";  // 默认的 TTS 请求路径

    // 使用语言映射获取语言代码
    const languageMap = config.language || {
        "en": "en-US-SerenaMultilingualNeural",  // 默认语言映射
        // 可以在这里添加其他语言映射
    };
    const voice = languageMap[lang] || "en-US-SerenaMultilingualNeural";  // 根据传入的 lang 选择语音

    // 构建请求 URL
    const url = `${requestPath}?t=${encodeURIComponent(text)}&v=${voice}&r=0&p=0&o=audio-24khz-48kbitrate-mono-mp3`;

    // 打印请求的 URL 进行调试
    console.log("Request URL:", url);

    try {
        // 发送请求
        const res = await fetch(url, {
            method: "GET",  // 假设这是一个 GET 请求，URL 已经包含了所有的查询参数
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob'  // 确保返回 Blob 类型数据
        });

        if (res.ok) {
            // 处理响应，确保返回数据是 Blob 类型
            const result = await res.data;  // 这应该是一个 Blob 类型的音频文件
            if (result instanceof Blob) {
                const audioUrl = URL.createObjectURL(result);  // 创建音频 URL
                return audioUrl;  // 返回音频 URL 用于播放
            } else {
                throw new Error("The response data is not a Blob type.");
            }
        } else {
            throw new Error(`Http Request Error\nHttp Status: ${res.status}\nResponse Data: ${JSON.stringify(res.data)}`);
        }
    } catch (error) {
        // 捕获并打印错误
        console.error("Error during TTS request:", error);
        throw error;  // 将错误抛出，方便上层调用处理
    }
}
