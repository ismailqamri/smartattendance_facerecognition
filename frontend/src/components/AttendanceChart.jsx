import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AttendanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="percentage" fill="#4ade80" />
    </BarChart>
  </ResponsiveContainer>
);
