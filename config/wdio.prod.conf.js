const moment = require("moment");

exports.config = {
  specs: ["./test/**/*.ts"],
  exclude: [],
  suites: {},
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu", "--no-sandbox"]
      }
    },
    {
      maxInstances: 1,
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
        prefs: {
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
  baseUrl: "https://www.saucedemo.com/",
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
  reporters: ["spec"],
  before: function(capabilities, specs) {
    require("ts-node").register({ files: true });
    browser.setWindowSize(1100, 925);
  },
  afterTest: function(test) {
    if (test.error !== undefined) {
      browser.takeScreenshot();
    }
  }
};
