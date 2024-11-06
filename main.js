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

    // 发起请求，获取音频流
    const res = await tauriFetch(url, { responseType: 'blob' });

    if (res.ok) {
        // 将音频 blob 直接返回或播放
        const audioBlob = res.data;
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl;  // 可以直接将 URL 返回，用于 HTML 音频播放器播放
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
