async function tts(text, lang, options = {}) {
  const { config, utils } = options;
  const { http } = utils;
  const { fetch, Body } = http;

  let { requestPath } = config;

  if (!requestPath) {
    requestPath = "https://t.leftsite.cn/tts";
  }

  if (!/https?:\/\/.+/.test(requestPath)) {
    requestPath = `https://${requestPath}`;
  }

  // 构建 URL 并附加查询参数
  const url = new URL(requestPath);
  url.searchParams.append('t', text);  // 文本
  url.searchParams.append('v', lang);  // 语言
  url.searchParams.append('r', '0');  // 语速
  url.searchParams.append('p', '0');  // 音量
  url.searchParams.append('o', 'audio-24khz-48kbitrate-mono-mp3');  // 音频格式（MP3）

  // 请求音频数据，确保客户端以二进制形式接收
  const res = await fetch(url, {
    method: "GET",
    responseType: "Binary",  // 关键是设置为 'Binary' 或适当的响应类型
    headers: {
      'Accept': 'audio/mpeg'  // 请求音频文件（MP3格式）
    }
  });

  if (res.ok) {
    // 返回音频的二进制数据
    const audioData = await res.arrayBuffer();  // 获取音频的二进制数据
    return audioData;
  } else {
    throw new Error(`Http Request Error\nHttp Status: ${res.status}`);
  }
}
