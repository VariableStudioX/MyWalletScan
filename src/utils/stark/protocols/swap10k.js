import {generateGetProtocolsState, getIcon} from "./utils";
const _10KSwapETHUSDTpool = "0x05900cfa2b50d53b097cb305d54e249e31f24f881885aae5639b0cd6af4ed298";
const _10KSwapETHUSDCpool = "0x000023c72abdf49dffc85ae3ede714f2168ad384cc67d08524732acea90df325";
const _10KSwapETHDAIpool = "0x017e9e62c04b50800d7c59454754fe31a2193c9c3c6c92c093f2ab0faadf8c87";
const pools = [_10KSwapETHUSDTpool, _10KSwapETHUSDCpool, _10KSwapETHDAIpool];

const basicInfo = {
  name: "10kSwap",
  id: "swap10k",
  url: "",
  icon: getIcon("swap10k"),
};

export const Swap10k = {
  getProtocolsState: generateGetProtocolsState(pools, basicInfo),
  basicInfo,
};
