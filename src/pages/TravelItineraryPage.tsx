import { useState } from 'react';
import { itineraryData } from '@/mock/itineraryData';
import { ItineraryTimeline } from '@/components/ItineraryTimeline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 为图表准备数据
const chartData = itineraryData.map(day => ({
  date: day.date,
  activities: day.activities.length,
  attractions: day.attractions.length,
  foods: day.foods.length
}));

// Tab类型定义
type DetailTab = 'attractions' | 'foods' | 'hotel' | 'venue' | 'contacts' | 'materials';

export default function TravelItineraryPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>('attractions');

  // 检查当前日期是否有对应tab的数据
  const hasTabData = (tab: DetailTab) => {
    const day = itineraryData[activeDay];
    switch(tab) {
      case 'attractions': return day.attractions.length > 0;
      case 'foods': return day.foods.length > 0;
      case 'hotel': return !!day.hotel.name;
      case 'venue': return !!day.venue;
      case 'contacts': return day.contacts.length > 0;
      case 'materials': return day.materials.length > 0;
      default: return false;
    }
  };

  // 确保默认选中的tab有数据
  useState(() => {
    // 获取所有有数据的tab
    const availableTabs: DetailTab[] = ['attractions', 'foods', 'hotel', 'venue', 'contacts', 'materials'].filter(hasTabData);
    // 如果当前选中的tab没有数据且有其他可用tab，则切换到第一个可用tab
    if (!hasTabData(activeTab) && availableTabs.length > 0) {
      setActiveTab(availableTabs[0]);
    }
  });

  // 渲染选中的tab内容
  const renderTabContent = () => {
    const day = itineraryData[activeDay];
    
    switch(activeTab) {
      case 'attractions':
        return (
          <ul className="list-disc pl-5 space-y-2">
            {day.attractions.map((attraction, index) => (
              <li key={index} className="text-gray-700">{attraction}</li>
            ))}
          </ul>
        );
      
      case 'foods':
        return (
          <ul className="list-disc pl-5 space-y-2">
            {day.foods.map((food, index) => (
              <li key={index} className="text-gray-700">{food}</li>
            ))}
          </ul>
        );
      
      case 'hotel':
        return (
          <div>
            <p className="font-medium text-gray-800">{day.hotel.name}</p>
            {day.hotel.address && (
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <i className="fa-solid fa-location-dot mr-2 text-blue-500"></i>
                {day.hotel.address}
              </p>
            )}
          </div>
        );
      
      case 'venue':
        return (
          <div>
            <p className="font-medium text-gray-800">{day.venue?.name}</p>
            {day.venue?.address && (
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i>
                {day.venue.address}
              </p>
            )}
          </div>
        );
      
      case 'contacts':
        return (
          <ul className="space-y-3">
            {day.contacts.map((contact, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <i className="fa-solid fa-phone mr-3 text-purple-500"></i>
                <div>
                  <span className="font-medium">{contact.name}：</span>
                  <span>{contact.phone}</span>
                </div>
              </li>
            ))}
          </ul>
        );
      
      case 'materials':
        return (
          <ul className="space-y-2">
            {day.materials.map((material, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <i className="fa-solid fa-check-circle mr-3 text-red-500 mt-1"></i>
                <span>{material}</span>
              </li>
            ))}
          </ul>
        );
      
      default:
        return <div className="text-gray-500 text-center py-4">暂无数据</div>;
    }
  };

  // 获取tab的图标
  const getTabIcon = (tab: DetailTab) => {
    switch(tab) {
      case 'attractions': return 'fa-location-dot';
      case 'foods': return 'fa-utensils';
      case 'hotel': return 'fa-hotel';
      case 'venue': return 'fa-flag';
      case 'contacts': return 'fa-address-book';
      case 'materials': return 'fa-suitcase';
      default: return 'fa-info-circle';
    }
  };

  // 获取tab的标题
  const getTabTitle = (tab: DetailTab) => {
    switch(tab) {
      case 'attractions': return '景点';
      case 'foods': return '美食';
      case 'hotel': return '酒店';
      case 'venue': return '赛场';
      case 'contacts': return '联系人';
      case 'materials': return '准备材料';
      default: return '详情';
    }
  };

  // 获取tab的颜色
  const getTabColor = (tab: DetailTab) => {
    switch(tab) {
      case 'attractions': return 'text-orange-600 border-orange-300 bg-orange-50';
      case 'foods': return 'text-green-600 border-green-300 bg-green-50';
      case 'hotel': return 'text-blue-600 border-blue-300 bg-blue-50';
      case 'venue': return 'text-gray-600 border-gray-300 bg-gray-50';
      case 'contacts': return 'text-purple-600 border-purple-300 bg-purple-50';
      case 'materials': return 'text-red-600 border-red-300 bg-red-50';
      default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
  };

  // 获取tab的激活颜色
  const getActiveTabColor = (tab: DetailTab) => {
    switch(tab) {
      case 'attractions': return 'bg-orange-600 text-white';
      case 'foods': return 'bg-green-600 text-white';
      case 'hotel': return 'bg-blue-600 text-white';
      case 'venue': return 'bg-gray-600 text-white';
      case 'contacts': return 'bg-purple-600 text-white';
      case 'materials': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">旅行行程安排</h1>
        <p className="text-gray-600">2026年1月9日-1月11日</p>
      </header>

      {/* 日期选择器 */}
      <div className="flex justify-center mb-8">
        {itineraryData.map((day, index) => (
          <button
            key={day.date}
            onClick={() => setActiveDay(index)}
            className={`mx-2 px-4 py-2 rounded-full transition-all duration-300 transform ${
              activeDay === index
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>
      
      {/* 时间线显示 - 甘特图样式 */}
      <ItineraryTimeline day={itineraryData[activeDay]} />
      
      {/* 详细信息Tab */}
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tab导航 */}
        <div className="flex flex-wrap border-b border-gray-200">
          {(['attractions', 'foods', 'hotel', 'venue', 'contacts', 'materials'] as DetailTab[]).filter(hasTabData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 flex items-center justify-center text-sm font-medium transition-all ${
                activeTab === tab
                  ? getActiveTabColor(tab)
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`fa-solid ${getTabIcon(tab)} mr-2`}></i>
              {getTabTitle(tab)}
            </button>
          ))}
        </div>
        
        {/* Tab内容 */}
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-4 ${getTabColor(activeTab).split(' ')[0]}`}>
            <i className={`fa-solid ${getTabIcon(activeTab)} mr-2`}></i>
            {getTabTitle(activeTab)}
          </h3>
          <div className="min-h-[150px]">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* 行程概览图表 - 移至页面底部 */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <i className="fa-solid fa-chart-bar mr-2 text-blue-600"></i>
          行程概览
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activities" name="活动数量" fill="#3b82f6" />
              <Bar dataKey="attractions" name="景点数量" fill="#f97316" />
              <Bar dataKey="foods" name="美食数量" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}