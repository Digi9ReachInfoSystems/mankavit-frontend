import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  GraphWrapper,
  Header,
  Title,
  DateSelector,
  LegendContainer,
  LegendItem,
  LegendDot,
} from "./ApplicationGraph.styles"; // Adjust the path if needed

const MAX = 400;

const rawData = [
  { date: "13 May", Enrolled: 40 },
  { date: "14 May", Enrolled: 120 },
  { date: "15 May", Enrolled: 45 },
  { date: "16 May", Enrolled: 100 },
  { date: "17 May", Enrolled: 50 },
  { date: "18 May", Enrolled: 110 },
];

const data = rawData.map((item) => ({
  ...item,
  NotApplied: MAX, // for full background height
}));

const ApplicationsGraph = () => {
  return (
    <GraphWrapper>
      <Header>
        <Title>Applications</Title>
        <DateSelector>
          <span>📅</span> Today
        </DateSelector>
      </Header>

      <LegendContainer>
        <LegendItem>
          <LegendDot color="#D4D7EA" />
          Not Applied
        </LegendItem>
        <LegendItem>
          <LegendDot color="#007BFF" />
          Enrolled
        </LegendItem>
      </LegendContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={0}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis domain={[0, MAX]}  />
          <Tooltip />
          {/* Background full bar */}
          <Bar
            dataKey="NotApplied"
            barSize={40}
            fill="#D4D7EA"
            radius={[10, 10, 0, 0]}
          />
          {/* Foreground enrolled bar */}
          <Bar
            dataKey="Enrolled"
            barSize={-40}
            fill="#007BFF"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </GraphWrapper>
  );
};

export default ApplicationsGraph;
