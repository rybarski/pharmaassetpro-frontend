// src/components/AssetChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AssetChart = ({ assets }) => {
  const data = assets.map((asset) => ({ name: asset.serialNumber, Usage: asset.usageHours }));
  return (
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Usage" fill="#8884d8" />
    </BarChart>
  );
};

export default AssetChart;
