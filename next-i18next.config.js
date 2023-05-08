const path = require("path");
module.exports = {
	i18n: {
		locales: ["tr"],
		defaultLocale: "tr",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
//	locales: ["en", "de", "es", "ar", "he", "zh","tr"],