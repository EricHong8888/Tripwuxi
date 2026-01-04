import { DayItinerary, AttractionDetail } from '@/mock/itineraryData';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ItineraryTimelineProps {
  day: DayItinerary;
}

export function ItineraryTimeline({ day }: ItineraryTimelineProps) {
  // 定义时间线项的动画变体
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // 状态管理
  const [selectedAttraction, setSelectedAttraction] = useState<AttractionDetail | null>(null);
  const [selectedTab, setSelectedTab] = useState<'info' | 'highlights' | 'details'>('info');

  // 格式化时间，提取开始时间
  const getStartTime = (timeString: string) => {
    return timeString.split('-')[0].trim();
  };

  // 提取时间中的小时和分钟
  const getTimeComponents = (timeString: string) => {
    const startTime = getStartTime(timeString);
    const [hours, minutes] = startTime.split(':').map(Number);
    return { hours, minutes };
  };

  // 计算当前活动的相对位置（用于显示一天中的时间分布）
  const getTimePosition = (timeString: string) => {
    const { hours, minutes } = getTimeComponents(timeString);
    // 假设一天的活动时间范围是6:00到22:00（16小时）
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 6 * 60; // 6:00
    const endMinutes = 22 * 60; // 22:00
    const rangeMinutes = endMinutes - startMinutes;
    
    // 计算相对于开始时间的百分比位置
    const positionPercent = Math.max(0, Math.min(100, ((totalMinutes - startMinutes) / rangeMinutes) * 100));
    return `${positionPercent}%`;
  };

  // 获取景点详情
  const getAttractionDetail = (activityName: string): AttractionDetail | undefined => {
    // 从activityName中提取景点名称（去除时间和其他信息）
    const attractionName = activityName.split('（')[0].split('-')[0].trim();
    
    // 在当天的景点详情中查找
    return day.attractionDetails.find(detail => 
      attractionName.includes(detail.name) || detail.name.includes(attractionName)
    );
  };

  // 处理景点点击事件
  const handleAttractionClick = (activity: any) => {
    if (activity.type === 'highlight') {
      const detail = getAttractionDetail(activity.activity);
      setSelectedAttraction(detail || null);
      setSelectedTab('info'); // 重置到默认标签
    }
  };

  // 关闭景点详情弹窗
  const closeAttractionDetail = () => {
    setSelectedAttraction(null);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
        <span className="bg-blue-100 p-2 rounded-lg mr-3">
          <i className="fa-solid fa-calendar text-blue-600"></i>
        </span>
        {day.date} 行程安排
      </h3>

      {/* 甘特图样式的时间线 */}
      <div className="relative">
        {/* 左侧时间刻度 */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 border-r border-gray-200">
          {Array.from({ length: 17 }).map((_, idx) => {
            const hour = 6 + idx;
            if (hour <= 22) {
              return (
                <div key={idx} className="absolute text-xs text-gray-500 font-medium" style={{ top: `${((hour - 6) / 16) * 100}%` }}>
                  <div className="w-full flex justify-center">
                    <div className="h-0.5 w-3 bg-gray-300"></div>
                  </div>
                  {hour % 3 === 0 && <div className="text-center -mt-1">{hour}:00</div>}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* 背景时间线 */}
        <div className="hidden md:block absolute left-16 right-0 top-0 bottom-0 pointer-events-none">
          {Array.from({ length: 17 }).map((_, idx) => {
            const hour = 6 + idx;
            if (hour <= 22) {
              return (
                <div 
                  key={idx} 
                  className={`absolute left-0 right-0 h-px ${hour % 3 === 0 ? 'bg-gray-300' : 'bg-gray-100'}`}
                  style={{ top: `${((hour - 6) / 16) * 100}%` }}
                ></div>
              );
            }
            return null;
          })}
        </div>

        {/* 主要时间线内容 */}
        <div className="ml-0 md:ml-24 space-y-4">
          {day.activities.map((activity, index) => {
            const isAttraction = activity.type === 'highlight';
            
            return (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={timelineItemVariants}
                className="relative"
              >
                {/* 移动端时间显示 */}
                <div className="md:hidden text-sm font-bold text-blue-600 mb-1">
                  {activity.time}
                </div>
                
                {/* 甘特图条形 */}
                <div 
                  className={`
                    p-4 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden
                    ${isAttraction ? 'cursor-pointer hover:scale-[1.01]' : ''}
                    ${activity.type === 'highlight' 
                      ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-white' 
                      : activity.type === 'important'
                        ? 'border-green-200 bg-gradient-to-r from-green-50 to-white'
                        : 'border-gray-200 bg-white'
                    }
                  `}
                  onClick={isAttraction ? () => handleAttractionClick(activity) : undefined}
                >
                  {/* 装饰条 */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                    activity.type === 'highlight' 
                      ? 'bg-orange-500' 
                      : activity.type === 'important'
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                  }`}></div>
                  
                  {/* 桌面端时间和活动内容 */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between pl-2">
                    <div className={`font-medium ${
                      activity.type === 'highlight' 
                        ? 'text-orange-700' 
                        : activity.type === 'important'
                          ? 'text-green-700'
                          : 'text-gray-800'
                    }`}>
                      {activity.activity}
                    </div>
                    <div className="hidden md:block font-mono text-sm text-blue-600 mt-1 md:mt-0">
                      {activity.time}
                    </div>
                  </div>
                  
                  {/* 根据活动类型添加标签和提示 */}
                  {activity.type !== 'default' && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${
                        activity.type === 'highlight' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {activity.type === 'highlight' ? '景点游览' : '重要活动'}
                      </span>
                      
                      {/* 景点点击提示 */}
                      {isAttraction && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <i className="fa-solid fa-mouse-pointer mr-1 text-orange-500"></i>
                          点击查看详情
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* 甘特图样式的时间线指示器 */}
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-full pointer-events-none">
                  {/* 连接线 */}
                  {index < day.activities.length - 1 && (
                    <div 
                      className="absolute top-1/2 w-0.5 bg-gray-200 z-0" 
                      style={{ 
                        left: getTimePosition(activity.time),
                        height: `${(index === day.activities.length - 2 ? 100 : 200)}%`,
                      }}
                    ></div>
                  )}
                  
                  {/* 时间点 */}
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 -left-12 w-4 h-4 rounded-full border-2 border-white shadow z-10 ${
                      activity.type === 'highlight' 
                        ? 'bg-orange-500' 
                        : activity.type === 'important'
                          ? 'bg-green-600'
                          : 'bg-gray-500'
                    }`}
                    style={{ left: getTimePosition(activity.time) }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 景点详情弹窗 */}
      <AnimatePresence>
        {selectedAttraction && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeAttractionDetail}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedAttraction.imageUrl} 
                  alt={selectedAttraction.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button 
                  onClick={closeAttractionDetail}
                  className="absolute top-4 right-4 bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white transition shadow-md"
                  aria-label="关闭"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedAttraction.name}</h3>
                  {selectedAttraction.price && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedAttraction.price}
                    </span>
                  )}
                </div>
                
                {/* 景点详情标签页 */}
                <div className="mb-4 border-b border-gray-200">
                  <nav className="flex space-x-4">
                    <button
                      onClick={() => setSelectedTab('info')}
                      className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                        selectedTab === 'info' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      景点介绍
                    </button>
                    <button
                      onClick={() => setSelectedTab('highlights')}
                      className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                        selectedTab === 'highlights' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      重要看点
                    </button>
                    <button
                      onClick={() => setSelectedTab('details')}
                      className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                        selectedTab === 'details' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      游玩信息
                    </button>
                  </nav>
                </div>
                
                {/* 标签页内容 */}
                <div className="mt-4">
                  {selectedTab === 'info' && (
                    <div>
                      <p className="text-gray-600 leading-relaxed">{selectedAttraction.description}</p>
                    </div>
                  )}
                  
                  {selectedTab === 'highlights' && (
                    <ul className="space-y-3">
                      {selectedAttraction.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <i className="fa-solid fa-star text-yellow-500 mt-1 mr-3"></i>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {selectedTab === 'details' && (
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <i className="fa-regular fa-clock text-blue-500 w-8 text-center"></i>
                        <span>开放时间：{selectedAttraction.openingHours}</span>
                      </div>
                      
                      {selectedAttraction.price && (
                        <div className="flex items-center text-gray-700">
                          <i className="fa-solid fa-ticket text-blue-500 w-8 text-center"></i>
                          <span>门票价格：{selectedAttraction.price}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-gray-700">
                        <i className="fa-solid fa-clock text-blue-500 w-8 text-center"></i>
                        <span>建议游玩时间：2-3小时</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <i className="fa-solid fa-map-location-dot text-blue-500 w-8 text-center"></i>
                        <span>最佳游览季节：春季、秋季</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}