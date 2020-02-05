module.exports = supportsSameSiteNone;

// Test browser agents against known safe-list of browser identifiers and version
function supportsSameSiteNone(agent) {
  // Checks against agents
  if (isSafari(agent) && isSafariUnsupported(agent)) return false;
  if (isChrome(agent) && isChromeUnsupported(agent)) return false;
  if (isUCBrowser(agent) && isUCBrowserUnsupported(agent)) return false;

  // Supports SameSite=None cookies
  return true
}

function isSafari(agent) {
  const regexSafari = new RegExp(/Version\/.* Safari\//);
  // Chrome on iOS detection
  const regexChrome = new RegExp(/CriOS\/.* Safari\//);

  if (agent.match(regexSafari) === null && agent.match(regexChrome) === null) {
    return false;
  }

  return true;
}

function isSafariUnsupported(agent) {
  const minSupportedIosVersion = `13`;
  const regexIos = new RegExp(/CPU iPhone OS (\d+)_(\d)/);
  const matchIos = agent.match(regexIos);

  if (matchIos && matchIos[1] < minSupportedIosVersion) {
    return true;
  }
}

function isChrome(agent) {
  const regex = new RegExp(/Chrom(e|ium)/);
  return agent.match(regex) === null ? false : true;
}

function isChromeUnsupported(agent) {
  const minSupportedVersion = `67`;
  const regex = new RegExp(/Chrom[^ /]+\/(\d+)[.\d]* /);
  return agent.match(regex)[1] < minSupportedVersion;
}

function isUCBrowser(agent) {
  const regex = new RegExp(/UCBrowser\//);
  return agent.match(regex) === null ? false : true;
}

function isUCBrowserUnsupported(agent) {
  const minSupportedVersion = `12.13.2`;
  const regex = new RegExp(/UCBrowser\/(\d+)\.(\d+)\.(\d+)[.\d]* /);
  const match = agent.match(regex);
  return match && match[1] < minSupportedVersion;
}

// Agents to test against
const agents = {
  chrome_66_agent: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.4044.5 Safari/537.36",
    expected_result: false
  },
  chrome_81_agent: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.5 Safari/537.36",
    expected_result: true
  },
  jason_iphone_chrome: {
    agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1",
    expected_result: false
  },
  jason_iphone_safari: {
    agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1",
    expected_result: false
  },
  ios_124_Agent: {
    agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1",
    expected_result: false
  },
  ios_133_agent: {
    agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1",
    expected_result: true
  },
  safari_mojave: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15",
    expected_result: true
  },
  safari_catalina: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15",
    expected_result: true
  },
  safari_tech_mojave: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.2 Safari/605.1.15",
    expected_result: true
  },
  safari_tech_catalina: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.2 Safari/605.1.15",
    expected_result: true,
  },
  firefox_agent: {
    agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0",
    expected_result: true
  },
  uc_4_agent: {
    agent: "Mozilla/5.0 (Linux; U; Android 8.1.0; en-US; Pixel XL Build/OPM1.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.0.0.1088 Mobile Safari/537.36",
    expected_result: false
  }
}

Object.keys(agents).forEach((agent) => {
  const agent_string = agents[agent].agent;
  const expected = agents[agent].expected_result;
  const received = supportsSameSiteNone(agent_string);

  if (expected !== received) {
    console.log(`🚫 - ${agent}`);
  }
})
