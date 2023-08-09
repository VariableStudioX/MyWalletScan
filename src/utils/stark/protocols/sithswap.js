import {generateGetProtocolsState, getIcon} from "./utils";
const sithSwapETHUSDCpool = "0x030615bec9c1506bfac97d9dbd3c546307987d467a7f95d5533c2e861eb81f3f";
const sithSwapETHUSDTpool = "0x00691fa7f66d63dc8c89ff4e77732fff5133f282e7dbd41813273692cc595516";
const sithSwapETHDAIpool = "0x0032ebb8e68553620b97b308684babf606d9556d5c0a652450c32e85f40d000d";
const pools = [sithSwapETHUSDCpool, sithSwapETHUSDTpool, sithSwapETHDAIpool];

const basicInfo = {
  name: "sithSwap",
  id: "sithswap",
  url: "",
  icon: getIcon("sithswap"),
};

export const SithSwap = {
  getProtocolsState: generateGetProtocolsState(pools, basicInfo),
  basicInfo,
};
