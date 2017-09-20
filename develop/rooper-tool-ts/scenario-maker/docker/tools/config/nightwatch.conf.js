const args = require('minimist')(process.argv);

let isProduction = args['grid'] === 'true';

// chrome setting
let CHROME_CONFIGURATION = {
	browserName: 'chrome',
	javascriptEnabled: true,
	acceptSslCerts: true
};

// default setting
let DEFAULT_CONFIGURATION = {
	launch_url: "http://hub",
	selenium_port: 4444,
	selenium_host: "hub",
	silent: true,
	screenshots: {
		enabled: true,
		path: "screenshots",
		on_failure: true,
		on_error: true
	},
	desiredCapabilities: CHROME_CONFIGURATION
};

let ENVIRONMENTS = {
	default: DEFAULT_CONFIGURATION,
	"chrome": {
		"desiredCapabilities": CHROME_CONFIGURATION
	}
};

module.exports = {
	src_folders: ['src'],
	output_folder: 'reports',
	globals_path: 'globals_path.js',
	test_settings: ENVIRONMENTS
};
