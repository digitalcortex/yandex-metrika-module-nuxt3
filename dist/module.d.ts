import * as _nuxt_schema from '@nuxt/schema';
import { ModuleOptions } from '@nuxt/schema';

interface YandexMetrikaModuleOptions extends ModuleOptions {
    id?: string;
    metrikaUrl?: string;
    accurateTrackBounce?: boolean | number;
    childIframe?: boolean;
    clickmap?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string | [];
    params?: object | [];
    useRuntimeConfig?: boolean;
    useCDN?: boolean;
    userParams?: object;
    trackHash?: boolean;
    trackLinks?: boolean;
    trustedDomains?: [];
    type?: number;
    webvisor?: boolean;
    triggerEvent?: boolean;
    consoleLog?: boolean;
    partytown?: boolean;
}
declare const _default: _nuxt_schema.NuxtModule<YandexMetrikaModuleOptions>;

export { YandexMetrikaModuleOptions, _default as default };
