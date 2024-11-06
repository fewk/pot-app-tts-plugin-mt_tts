async function tts(text, lang, options = {}) {
  const { config, utils } = options;
  const { http } = utils;
  const { fetch, Body } = http;

  let { requestPath, apiKey } = config;  // 获取配置中的请求地址和 API 密钥

  // 如果没有传入 requestPath，使用默认值
  if (!requestPath) {
    requestPath = "https://t.leftsite.cn/tts";
  }

  // 确保 requestPath 是完整的 URL
  if (!/https?:\/\/.+/.test(requestPath)) {
    requestPath = `https://${requestPath}`;
  }

  // 构建请求的 URL，添加文本和语言等查询参数
  const url = new URL(requestPath);
  url.searchParams.append('t', text);  // 要转换成语音的文本
  url.searchParams.append('v', lang);  // 语言参数，例如 'en'、'zh' 等
  url.searchParams.append('r', '0');  // 设置语速
  url.searchParams.append('p', '0');  // 设置音量等其他参数
  url.searchParams.append('o', 'audio-24khz-48kbitrate-mono-mp3');  // 设置音频格式

  // 发送请求获取语音
  const res = await fetch(url, {
    method: "GET",
  });

  // 检查请求是否成功
  if (res.ok) {
    // 获取音频数据
    const audioData = await res.arrayBuffer();
    return audioData;  // 返回音频字节数组
  } else {
    throw new Error(`Http Request Error\nHttp Status: ${res.status}`);
  }
}
