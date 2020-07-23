import React, { useState, useEffect } from "react";
import { csv } from "d3";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

import Tabs from "./Tabs.jsx";

// Resolves charts dependancy
charts(FusionCharts);

const App = (props) => {
  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);
  const [chart3Data, setChart3Data] = useState([]);

  useEffect(() => {
    csv("rater.csv").then((data) => {
      setChart1Data(chart1Transform(data));
      setChart2Data(chart2Transform(data));
      setChart3Data(chart3Transform(data));
    });
  }, []);

  const chart1Transform = function (data) {
    // countTally[0] = Sunday
    // countTally[6] = Saturday

    const countTally = [
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
    ];

    data.forEach((el) => {
      const currentDate = new Date(el.Date);
      const currentDay = currentDate.getDay();

      countTally[currentDay].total++;

      if (el.Label_Agreement_3 === "yes") {
        countTally[currentDay].count3++;
      }

      if (el.Label_Agreement_5 === "yes") {
        countTally[currentDay].count5++;
      }
    });

    return countTally;
  };

  const chart2Transform = function (data) {
    // countTally[0] = week 1

    const countTally = [
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
      { count3: 0, count5: 0, total: 0 },
    ];

    data.forEach((el) => {
      const current = new Date(el.Date);
      const currentDate = +current.getDate();

      if (currentDate === 1) {
        countTally[0].total++;
        if (el.Label_Agreement_3 === "yes") countTally[0].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[0].count5++;
      } else if (currentDate > 1 && currentDate <= 8) {
        countTally[1].total++;
        if (el.Label_Agreement_3 === "yes") countTally[1].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[1].count5++;
      } else if (currentDate > 8 && currentDate <= 15) {
        countTally[2].total++;
        if (el.Label_Agreement_3 === "yes") countTally[2].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[2].count5++;
      } else if (currentDate > 15 && currentDate <= 22) {
        countTally[3].total++;
        if (el.Label_Agreement_3 === "yes") countTally[3].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[3].count5++;
      } else if (currentDate > 22 && currentDate <= 29) {
        countTally[4].total++;
        if (el.Label_Agreement_3 === "yes") countTally[4].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[4].count5++;
      } else {
        countTally[5].total++;
        if (el.Label_Agreement_3 === "yes") countTally[5].count3++;
        if (el.Label_Agreement_5 === "yes") countTally[5].count5++;
      }
    });

    return countTally;
  };

  const chart3Transform = function (data) {
    const countTally = [
      { count3: 0, count5: 0, overall: 0, total: 0 },
      { count3: 0, count5: 0, overall: 0, total: 0 },
      { count3: 0, count5: 0, overall: 0, total: 0 },
      { count3: 0, count5: 0, overall: 0, total: 0 },
      { count3: 0, count5: 0, overall: 0, total: 0 },
    ];

    data.forEach((el) => {
      let flag = false;

      switch (el.Rater) {
        case "A":
          countTally[0].total++;
          break;
        case "B":
          countTally[1].total++;
          break;
        case "C":
          countTally[2].total++;
          break;
        case "D":
          countTally[3].total++;
          break;
        case "E":
          countTally[4].total++;
          break;
        default:
          console.log("chart 3 data error");
      }

      if (el.Label_Agreement_3 === "yes") {
        flag = true;
        switch (el.Rater) {
          case "A":
            countTally[0].count3++;
            break;
          case "B":
            countTally[1].count3++;
            break;
          case "C":
            countTally[2].count3++;
            break;
          case "D":
            countTally[3].count3++;
            break;
          case "E":
            countTally[4].count3++;
            break;
          default:
            console.log("chart 3 data error");
        }
      }

      if (el.Label_Agreement_5 === "yes") {
        switch (el.Rater) {
          case "A":
            countTally[0].count5++;
            if (flag) countTally[0].overall++;
            break;
          case "B":
            countTally[1].count5++;
            if (flag) countTally[1].overall++;
            break;
          case "C":
            countTally[2].count5++;
            if (flag) countTally[2].overall++;
            break;
          case "D":
            countTally[3].count5++;
            if (flag) countTally[3].overall++;
            break;
          case "E":
            countTally[4].count5++;
            if (flag) countTally[4].overall++;
            break;
          default:
            console.log("chart 3 data error");
        }
      }
    });

    return countTally;
  };

  const chart1Settings = {
    chart: {
      caption: "Agreement Rate (day of week)",
      yaxisname: "Rate (%)",
      subcaption: "[10/1/2005 - 10/30/2005]",
      showhovereffect: "1",
      numbersuffix: "%",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> on $seriesName",
      theme: "fusion",
    },
    categories: [
      {
        category: [
          {
            label: "Sunday",
          },
          {
            label: "Monday",
          },
          {
            label: "Tuesday",
          },
          {
            label: "Wednesday",
          },
          {
            label: "Thursday",
          },
          {
            label: "Friday",
          },
          {
            label: "Saturday",
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: "3 Label Agreement",
        data: chart1Data.map(function (el, i) {
          return { value: (el.count3 / chart1Data[i].total) * 100 };
        }),
      },
      {
        seriesname: "5 Label Agreement",
        data: chart1Data.map(function (el, i) {
          return { value: (el.count5 / chart1Data[i].total) * 100 };
        }),
      },
    ],
  };

  const chart2Settings = {
    chart: {
      caption: "Agreement Rate (week)",
      yaxisname: "Rate (%)",
      subcaption: "[10/1/2005 - 10/30/2005]",
      showhovereffect: "1",
      numbersuffix: "%",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> on $seriesName",
      theme: "fusion",
    },
    categories: [
      {
        category: [
          {
            label: "W1:1",
          },
          {
            label: "W2:2-8",
          },
          {
            label: "W3:9-15",
          },
          {
            label: "W4:16-22",
          },
          {
            label: "W5:23-29",
          },
          {
            label: "W6:30-31",
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: "3 Label Agreement",
        data: chart2Data.map((el, i) => {
          return {
            value: (el.count3 / chart2Data[i].total) * 100,
          };
        }),
      },
      {
        seriesname: "5 Label Agreement",
        data: chart2Data.map((el, i) => {
          return {
            value: (el.count5 / chart2Data[i].total) * 100,
          };
        }),
      },
    ],
  };

  let chart3Settings = null;
  let chart4Settings = null;

  if (chart3Data.length) {
    chart3Settings = {
      chart: {
        caption: "Agreement Rate by Rater",
        subcaption: "[10/1/2005 - 10/30/2005]",
        xaxisname: "Rater ID",
        yaxisname: "Agreement",
        numbersuffix: "%",
      },
      categories: [
        {
          category: [
            {
              label: "A",
            },
            {
              label: "B",
            },
            {
              label: "C",
            },
            {
              label: "D",
            },
            {
              label: "E",
            },
          ],
        },
      ],
      dataset: [
        {
          seriesname: "3 Label Agreement",
          data: chart3Data.map((el, i) => {
            return { value: (el.count3 / chart3Data[i].total) * 100 };
          }),
        },
        {
          seriesname: "5 Label Agreement",
          data: chart3Data.map((el, i) => {
            return { value: (el.count5 / chart3Data[i].total) * 100 };
          }),
        },
        {
          seriesname: "Overall Agreement",
          data: chart3Data.map((el, i) => {
            return { value: (el.overall / chart3Data[i].total) * 100 };
          }),
        },
      ],
    };

    chart4Settings = {
      chart: {
        caption: "Task Completion by Rater",
        subcaption: "[10/1/2005 - 10/30/2005]",
        xaxisname: "Rater ID",
        yaxisname: "Count",
      },
      data: [
        {
          label: "A",
          value: chart3Data[0].total,
        },
        {
          label: "B",
          value: chart3Data[1].total,
        },
        {
          label: "C",
          value: chart3Data[2].total,
        },
        {
          label: "D",
          value: chart3Data[3].total,
        },
        {
          label: "E",
          value: chart3Data[4].total,
        },
      ],
    };
  }

  let content = (
    <>
      <Tabs>
        <div label="Agreement Rate">
          <table>
            <tbody>
              <tr>
                <td>
                  <ReactFusioncharts
                    type="msline"
                    dataFormat="JSON"
                    dataSource={chart1Settings}
                  />
                </td>
                <td>
                  <ReactFusioncharts
                    type="msline"
                    dataFormat="JSON"
                    dataSource={chart2Settings}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div label="Raters">
          <table>
            <tbody>
              <tr>
                <td>
                  <ReactFusioncharts
                    type="mscolumn2d"
                    dataFormat="JSON"
                    dataSource={chart3Settings}
                  />
                </td>
                <td>
                  <ReactFusioncharts
                    type="column2d"
                    dataFormat="JSON"
                    dataSource={chart4Settings}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Tabs>
    </>
  );

  return content;
};

export default App;
