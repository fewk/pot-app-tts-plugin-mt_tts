async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch } = utils;
    let { requestPath } = config;

    // 如果未定义 requestPath 或为空，则设置为新 URL
    requestPath = "t.leftsite.cn/tts";

    // 构建 URL，注意 URL 中的参数结构与示例请求一致
    const url = `${requestPath}?t=${encodeURIComponent(text)}&v=${lang}&r=0&p=0&o=audio-24khz-48kbitrate-mono-mp3`;

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
