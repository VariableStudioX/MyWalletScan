import {FC, useEffect, useState} from "react";
import ReactEcharts from "echarts-for-react";
import {getProtocolMethod} from "@utils/stark/protocols/index";
// import { ProtocolState } from './ProtocolsCard';
import Paragraph from "antd/es/typography/Paragraph";
// interface ChartProps {
//   transactionDataList: TransactionData[] | [];
//   protocol: ProtocolType;
// }
// interface Series {
//   name: string;
//   type: string;
//   data: number[];
// }
// interface Legend {
//   data: string[];
//   selected: Record<string, boolean>;
// }
const Chart = ({transactionDataList, protocol = "all"}) => {
  const [xAxisData, setXAxisData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [series, setSeries] = useState([]);
  const [tooltipAddress, setTooltipAddress] = useState("");
  const seriesKeys = protocolMapKeys[protocol] || DefaultKeys;

  useEffect(() => {
    setXAxisData(transactionDataList.map((it) => `${it.address}`));
    const getProtocolsState = getProtocolMethod(protocol, "getProtocolsState");
    const series = seriesKeys.map((key) => {
      return {
        name: key,
        type: "bar",
        data: transactionDataList.map((transactionData) => {
          const {transactions, address} = transactionData;
          const protocolsState = getProtocolsState(transactions, address);
          return getSerieItemData(protocol, key, protocolsState, transactionData);
        }),
      };
    });

    const selected = {};
    seriesKeys.forEach((key, index) => {
      selected[key] = index === 0;
    });
    const nextLegend = {
      data: seriesKeys,
      // selected,
    };
    setLegend(nextLegend);
    setSeries(series);
  }, [transactionDataList, protocol, seriesKeys]);

  const getOption = () => {
    const option = {
      legend: legend,
      tooltip: {
        trigger: "axis",
        enterable: true,
        alwaysShowContent: true,
        axisPointer: {
          type: "cross",
        },
        formatter: (params) => {
          setTooltipAddress(params[0].axisValue);
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: xAxisData,
          scale: true,
          axisLine: {onZero: false},
          axisTick: {show: true, alignWithLabel: true},
          splitLine: {show: false},
          axisLabel: {show: false},
          splitNumber: 20,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series,
    };
    return option;
  };
  const option = getOption();
  return (
    <>
      <div>
        <span className=" font-bold ">当前地址：</span>
        <Paragraph copyable={{text: tooltipAddress}}>{tooltipAddress}</Paragraph>
      </div>
      <ReactEcharts option={option} className="flex  flex-col-reverse" />
    </>
  );
};
export default Chart;

const DefaultKeys = ["interactions", "volume", ];
const protocolMapKeys = {
  overview: ["interactions", "interactions7Change", "volume", "volume7Change", "fees", "fees7Change"],
  // goal3: [],
  // holdstation: [],
  // izumi: [],
  // maverick: [],
  // muteio: [],
  // onchaintrade: [],
  // orbiter: [],
  // syncswap: ['activeDays'],
};

const getProtocolsStateValue = (key, state) => state[key];
const getTransactionDataValue = (key, data) => data[key];
const getSerieItemData = (prorocol, key, state, data) => {
  if (prorocol === "overview") {
    return getTransactionDataValue(key, data);
  }
  return getProtocolsStateValue(key, state);
};
