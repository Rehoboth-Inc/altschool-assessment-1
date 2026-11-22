function deepFreeze(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  for (const value of Object.values(obj)) {
    deepFreeze(value);
  }

  return Object.freeze(obj);
}
const config = deepFreeze({
  api: { baseUrl: "https://x.com", retries: 3 },
  debug: false,
});

try {
  config.api.baseUrl = "https://changed.com"; // should be ignored
} catch {}
8;

try {
  config.debug = true; // should be ignored
} catch {}
console.log(config.api.baseUrl, config.debug); // "https://x.com" false
console.log(Object.isFrozen(config.api)); // true
