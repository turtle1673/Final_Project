'use client';

interface StatisticsData {
  totalProfit: number;
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
  topSellingItem: string;
  totalOrders: number;
  averageOrderValue: number;
}

interface StatisticsCardsProps {
  statistics: StatisticsData;
}

export default function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Profit',
      value: formatCurrency(statistics.totalProfit),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: '💰',
      color: 'bg-green-500'
    },
    {
      title: 'Daily Profit',
      value: formatCurrency(statistics.dailyProfit),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: '📈',
      color: 'bg-blue-500'
    },
    {
      title: 'Weekly Profit',
      value: formatCurrency(statistics.weeklyProfit),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: '📊',
      color: 'bg-purple-500'
    },
    {
      title: 'Monthly Profit',
      value: formatCurrency(statistics.monthlyProfit),
      change: '+22.1%',
      changeType: 'positive' as const,
      icon: '📅',
      color: 'bg-orange-500'
    },
    {
      title: 'Total Orders',
      value: statistics.totalOrders.toLocaleString(),
      change: '+5.7%',
      changeType: 'positive' as const,
      icon: '🛍️',
      color: 'bg-indigo-500'
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(statistics.averageOrderValue),
      change: '+3.2%',
      changeType: 'positive' as const,
      icon: '💳',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-white text-xl`}>
              {card.icon}
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {card.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">from last period</span>
          </div>
        </div>
      ))}
    </div>
  );
}
