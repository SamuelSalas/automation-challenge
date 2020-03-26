const moment = require("moment");
require("dotenv").config();

exports.config = {
  specs: ["./test/**/*.ts"],
  exclude: [],
  suites: {},
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome"
    },
    {
      maxInstances: 1,
      browserName: "firefox",
      "moz:firefoxOptions": {
        prefs: {
          // Prevent opening the extension tabs on startup
          "extensions.enabledScopes": 0
        }
      }
    }
  ],
  runner: "local",
  specFileRetries: 1,
  maxInstances: 1,
  logLevel: "error",
  bail: 0,
  baseUrl: process.env.BASEURL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ["selenium-standalone"],
  framework: "mocha",
  mochaOpts: {
    compilers: ["tsconfig-paths/register"],
    ui: "bdd",
    timeout: 999999
  },
  reporters: [
    "spec",
    [
      "mochawesome",
      {
        outputDir: "./Results",
        outputFileFormat: function(opts) {
          return `results-${opts.cid}-${moment().format()}.json`;
        }
      }
    ]
  ],
  before: function(capabilities, specs) {
    require("ts-node").register({ files: true });
    browser.setWindowSize(1440, 925);
  },
  afterTest: function(test) {
    if (test.error !== undefined) {
      browser.takeScreenshot();
    }
  }
};
