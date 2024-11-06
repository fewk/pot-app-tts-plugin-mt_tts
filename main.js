async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch } = utils;
    let { requestPath } = config;

    // 设置默认请求路径
    requestPath = requestPath || "https://t.leftsite.cn/tts";
    
    // 检查 config.language 是否存在，否则提供默认值
    const languageMap = config.language || {
        "en": "en-US-SerenaMultilingualNeural",
        // 添加其他默认语言映射
    };

    // 确定语言代码
    const voice = languageMap[lang] || "en-US-SerenaMultilingualNeural";
    const url = `${requestPath}?t=${encodeURIComponent(text)}&v=${voice}&r=0&p=0&o=audio-24khz-48kbitrate-mono-mp3`;

    const res = await tauriFetch(url);

    if (res.ok) {
        let result = res.data;
        if (result['audio']) {
            return result['audio'];
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
