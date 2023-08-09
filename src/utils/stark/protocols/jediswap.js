import {generateGetProtocolsState, getIcon} from "./utils";
const jediETHUSDCpool = "0x04d0390b777b424e43839cd1e744799f3de6c176c7e32c1812a41dbd9c19db6a";
const jediETHUSDTpool = "0x045e7131d776dddc137e30bdd490b431c7144677e97bf9369f629ed8d3fb7dd6";
const jediETHDAIpool = "0x07e2a13b40fc1119ec55e0bcf9428eedaa581ab3c924561ad4e955f95da63138";
const pools = [jediETHUSDCpool, jediETHDAIpool, jediETHUSDTpool];

const basicInfo = {
  name: "jediSwap",
  id: "jediswap",
  url: "",
  icon: getIcon("jediswap"),
};

export const JediSwap = {
  getProtocolsState: generateGetProtocolsState(pools, basicInfo),
  basicInfo,
};
