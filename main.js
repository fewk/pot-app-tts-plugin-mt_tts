async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { http } = utils;
    const { fetch, Body } = http;

    let { requestPath } = config;

    // 设置请求地址，若没有提供则使用默认值
    if (!requestPath) {
        requestPath = "https://t.leftsite.cn/tts";
    }

    // 确保请求路径是以 https 开头，并处理尾部的 / 符号
    if (!/https?:\/\/.+/.test(requestPath)) {
        requestPath = `https://${requestPath}`;
    }

    if (requestPath.endsWith('/')) {
        requestPath = requestPath.slice(0, -1);
    }

    // 构建 URL 并附加查询参数
    const url = new URL(requestPath);
    url.searchParams.append('t', text);  // 文本
    url.searchParams.append('v', lang);  // 语言
    url.searchParams.append('r', '0');  // 语速
    url.searchParams.append('p', '0');  // 音量
    url.searchParams.append('o', 'audio-24khz-48kbitrate-mono-mp3');  // 音频格式（MP3）

    // 发起 GET 请求以获取音频数据
    const res = await fetch(url, {
        method: "GET",  // 使用 GET 请求，因为没有提供 body 内容
        headers: {
            'Accept': 'audio/mpeg',  // 请求 MP3 格式的音频
        },
        responseType: 3,  // 设置为 3，表示需要返回二进制数据
    });

    // 检查响应状态
    if (res.ok) {
        // 返回二进制数据
        let result = res.data;
        if (result) {
            return result;  // 返回音频数据的二进制形式
        } else {
            throw JSON.stringify(result);  // 如果没有音频数据，抛出错误
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
