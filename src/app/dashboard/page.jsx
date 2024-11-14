"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dummy Data 
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Authentication Attempts",
        data: [5, 10, 15, 20, 25, 30, 35],
        borderColor: "#8D33FF",
        backgroundColor: "rgba(141, 51, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Authentication Attempts Over Time",
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar Section */}
      <nav className="bg-primary text-white p-4 flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-gray-200">Manage Account</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200">Settings</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200">Help</a>
          </li>
        </ul>
        <button className="text-sm bg-blue-500 text-white py-1 px-4 rounded">
          Logout
        </button>
      </nav>

      {/* Main Content Section */}
      <div className="flex flex-grow items-center justify-center bg-gray-100 p-6">
        <main className="w-full max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-semibold text-black mb-4">Welcome to TripleGuard</h2>
          <p className="text-gray-700 text-lg mb-6">This is your dashboard. Manage your account, adjust settings, and view authentication data here.</p>

          {/* Dummy Graphs */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <Line data={data} options={options} />
          </div>

          {/* Another Dummy Graph for Authentication Success Rate */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-black mb-4">Authentication Success Rate</h3>
            <div className="text-center">
              <p className="text-lg text-green-500 font-semibold">95%</p>
              <p className="text-gray-500">Successful authentication rate in the last month</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
