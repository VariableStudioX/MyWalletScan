import {getIcon} from "./utils";

const basicInfo = {
  name: "overview",
  id: "overview",
  tag: "",
  url: "",
  icon: getIcon("overview"),
};
export const Default = {
  getProtocolsState: (transactions, address) => {
    const protocolState = {
      ...basicInfo,
      lastActivity: "",
      volume: 0,
      interactions: 0,
      activeDays: 0,
      approves: 0,
    };

    return protocolState;
  },
  basicInfo,
};
