import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PiCalendarBlank } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import {
  Card,
  Header,
  Title,
  DateSelector,
  Content,
  ChartContainer,
  Total,
  Legend,
  LegendItem,
  ColorDot,
  PieTitle,
  PiePara
} from "./ApplicationByCourses.styles";

const data = [
  { name: "CLAT", value: 120 },
  { name: "CLAT", value: 110 },
  { name: "CLAT", value: 95 },
  { name: "CLAT", value: 85 },
  { name: "CLAT", value: 65 },
  { name: "CLAT", value: 50 },
];

const COLORS = ["#dcdcf4", "#3b82f6", "#06b6d4", "#60a5fa", "#e0f2fe", "#cbd5e1"];

const ApplicationByCourses = () => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card>
      <Header>
        <Title>Application by Courses</Title>
        <DateSelector>
          <PiCalendarBlank size={20} /> Today <IoIosArrowDown size={16} />
        </DateSelector>
      </Header>
      <Content>
        <div style={{ display: "flex", justifyContent: "flex-start", width: "200px", height: "260px", marginTop: "-40px" }}>
        <ChartContainer>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <Total>
            <PieTitle>{total}</PieTitle>
            <PiePara>Total Applications</PiePara>
          </Total>
        </ChartContainer>
        </div>
        <div className="horizotal"></div>
        <div style={{marginTop: "-50px", width: "100%"}}>
        <Legend>
          {data.map((entry, index) => (
            <LegendItem key={index}>
                <div className="legend-item">
              <ColorDot color={COLORS[index % COLORS.length]} />
              <span className="legend-label">CLAT</span>
              </div>
              <strong>{entry.value}</strong>
            </LegendItem>
          ))}
        </Legend>
        </div>
      </Content>
    </Card>
  );
};

export default ApplicationByCourses;
