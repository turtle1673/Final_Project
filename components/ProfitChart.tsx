'use client';

interface ProfitData {
  date: string;
  profit: number;
}

interface ProfitChartProps {
  data: ProfitData[];
}

export default function ProfitChart({ data }: ProfitChartProps) {
  // Simple chart implementation using CSS
  const maxProfit = Math.max(...data.map(d => d.profit));
  const minProfit = Math.min(...data.map(d => d.profit));
  const range = maxProfit - minProfit;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Profit Trend</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(data[data.length - 1]?.profit || 0)} today
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-600 font-medium">+12.5%</p>
          <p className="text-xs text-gray-500">vs last period</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-4">
          <span>{formatCurrency(maxProfit)}</span>
          <span>{formatCurrency(maxProfit * 0.75)}</span>
          <span>{formatCurrency(maxProfit * 0.5)}</span>
          <span>{formatCurrency(maxProfit * 0.25)}</span>
          <span>{formatCurrency(minProfit)}</span>
        </div>

        {/* Chart bars */}
        <div className="ml-16 h-full flex items-end justify-between gap-1">
          {data.map((item, index) => {
            const height = range > 0 ? ((item.profit - minProfit) / range) * 100 : 50;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Bar */}
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
                
                {/* X-axis label */}
                <div className="mt-2 text-xs text-gray-500 text-center transform -rotate-45 origin-left">
                  {formatDate(item.date)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 ml-16 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Daily Profit</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Target</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <p className="text-sm text-gray-600">Average</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(data.reduce((sum, item) => sum + item.profit, 0) / data.length)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Highest</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(maxProfit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Lowest</p>
          <p className="text-lg font-semibold text-red-600">
            {formatCurrency(minProfit)}
          </p>
        </div>
      </div>
    </div>
  );
}
