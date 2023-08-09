import {generateGetProtocolsState, getIcon} from "./utils";

const pools = ["0x04270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f"];

const basicInfo = {
  name: "Avnu",
  id: "avnu",
  url: "",
  icon: getIcon("avnu"),
};

export const Avnu = {
  getProtocolsState: generateGetProtocolsState(pools, basicInfo),
  basicInfo,
};
