import type {RichtextrendererConfig} from './richtextRendererConfig';

import richtextrendererConfig from './richtextRendererConfig';

type SetRichtextRendererConfigInit = RichtextrendererConfig;

export default function setRichtextRendererConfig(
  config: SetRichtextRendererConfigInit,
) {
  const init: SetRichtextRendererConfigInit = richtextrendererConfig;
  Object.keys(config).forEach((_key) => {
    const key = _key as keyof SetRichtextRendererConfigInit;
    if (init[key]) {
      init[key] = config[key];
    }
  });
}
