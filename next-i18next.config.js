const path = require("path");
module.exports = {
	i18n: {
		locales: ["en","tr"],
		defaultLocale: "en",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
//	locales: ["en", "de", "es", "ar", "he", "zh","tr"],