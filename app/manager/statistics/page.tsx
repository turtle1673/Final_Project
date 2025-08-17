'use client';
import { useState, useEffect } from 'react';
import StatisticsCards from '../../../components/StatisticsCards';
import ProfitChart from '../../../components/ProfitChart';

interface ProfitData {
  date: string;
  profit: number;
}

interface StatisticsData {
  totalProfit: number;
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
  topSellingItem: string;
  totalOrders: number;
  averageOrderValue: number;
  profitData: ProfitData[];
}

// Mock data
const mockStatistics: StatisticsData = {
  totalProfit: 15420.50,
  dailyProfit: 245.75,
  weeklyProfit: 1720.25,
  monthlyProfit: 6850.00,
  topSellingItem: 'Thai Tea',
  totalOrders: 1250,
  averageOrderValue: 12.34,
  profitData: [
    { date: '2024-01-01', profit: 180.50 },
    { date: '2024-01-02', profit: 195.25 },
    { date: '2024-01-03', profit: 210.75 },
    { date: '2024-01-04', profit: 185.00 },
    { date: '2024-01-05', profit: 245.75 },
    { date: '2024-01-06', profit: 280.50 },
    { date: '2024-01-07', profit: 265.25 },
    { date: '2024-01-08', profit: 220.00 },
    { date: '2024-01-09', profit: 235.75 },
    { date: '2024-01-10', profit: 250.50 },
    { date: '2024-01-11', profit: 275.25 },
    { date: '2024-01-12', profit: 290.00 },
    { date: '2024-01-13', profit: 285.75 },
    { date: '2024-01-14', profit: 300.50 },
  ]
};

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        // In real app, this would be: const response = await fetch(`/api/statistics?range=${timeRange}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setStatistics(mockStatistics);
        setError(null);
      } catch (err) {
        setError('Failed to load statistics');
        console.error('Error fetching statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">No statistics available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Statistics Dashboard</h1>
          
          {/* Time Range Selector */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                timeRange === '7d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                timeRange === '30d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
                timeRange === '90d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatisticsCards statistics={statistics} />

        {/* Chart Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profit Trend</h2>
            <ProfitChart data={statistics.profitData} />
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Items</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Thai Tea</span>
                <span className="font-medium">$2,450.75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Green Tea</span>
                <span className="font-medium">$1,890.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Boba Pearls</span>
                <span className="font-medium">$1,245.25</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New order #1251 - $15.50</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Stock updated - Thai Tea</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Low stock alert - Coconut Jelly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
