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

  // 请求音频数据
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'audio/mpeg'  // 添加此头部以请求 MP3 格式
    }
  });

  if (res.ok) {
    // 使用 arrayBuffer() 处理音频数据
    const audioData = await res.arrayBuffer();  // 获取音频的二进制数据（如 MP3 格式）
    return audioData;
  } else {
    throw new Error(`Http Request Error\nHttp Status: ${res.status}`);
  }
}
