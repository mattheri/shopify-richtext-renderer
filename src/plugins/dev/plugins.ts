// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import { RegisteredPlugins } from "./types";

const registeredPlugins: RegisteredPlugins = {
  before_data_process: new Set(),
  before_node_creation: new Set(),
  after_node_creation: new Set(),
};

export default registeredPlugins;
