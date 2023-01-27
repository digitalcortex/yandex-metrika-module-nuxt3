import { fileURLToPath } from 'url';
import { resolve } from 'pathe';
import { useLogger, defineNuxtModule, addTemplate, addPlugin } from '@nuxt/kit';
import defu from 'defu';

const logger = useLogger("nuxt:yandex-metrika");
const CONFIG_KEY = "yandexMetrika";
const module = defineNuxtModule({
  meta: {
    name: "yandex-metrika-module-nuxt3",
    configKey: CONFIG_KEY,
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    id: process.env.YANDEX_METRIKA_ID,
    metrikaUrl: "https://mc.yandex.ru/metrika",
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    useRuntimeConfig: true,
    trackHash: false,
    trackLinks: true,
    type: 0,
    webvisor: false,
    triggerEvent: false,
    consoleLog: true,
    partytown: false
  },
  setup(options, nuxt) {
    const isDev = nuxt.options.dev && process.env.NODE_ENV !== "production";
    options.isDev = isDev;
    logger.info(`Initializing Yandex Metrika in ${isDev ? "development" : "production"} mode`);
    if (!options.id) {
      logger.error("No id provided.");
    }
    options.metrikaUrl = (options.useCDN ? "https://cdn.jsdelivr.net/npm/yandex-metrica-watch" : options.metrikaUrl) + "/tag.js";
    if (options.useRuntimeConfig) {
      nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(nuxt.options.runtimeConfig.public[CONFIG_KEY], options);
    }
    addTemplate({
      filename: "yandex-metrika.options.mjs",
      getContents: () => {
        return `export default () => Promise.resolve(${JSON.stringify(options.useRuntimeConfig ? nuxt.options.runtimeConfig.public[CONFIG_KEY] : options || {})})`;
      }
    });
    const head = nuxt.options.app.head;
    head.script = head.script || [];
    logger.debug(`Yandex Metrika script URL: ${options.metrikaUrl}`);
    if (!isDev) {
      const scriptObj = {
        src: options.metrikaUrl,
        async: true,
        tagPosition: "head"
      };
      if (options.partytown) {
        scriptObj.type = "text/partytown";
      }
      head.script.push(scriptObj);
    }
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    addPlugin({
      src: resolve(runtimeDir, "plugin"),
      mode: "client"
    });
  }
});

export { module as default };
