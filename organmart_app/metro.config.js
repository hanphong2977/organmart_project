const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './app/global.css' })
// module.exports = (() => {
//     const config = getDefaultConfig(__dirname);
//     // so Metro will also resolve .ts/.tsx in node_modules
//     config.resolver.sourceExts.push('ts','tsx');
//     return config;
// })();

// ✅ Thêm hỗ trợ ảnh & source file .ts/.tsx
config.resolver.assetExts.push("png", "jpg", "jpeg", "svg");
config.resolver.sourceExts.push("ts", "tsx");

module.exports = config;