import { DayItinerary } from '@/mock/itineraryData';

interface ItineraryTableProps {
  itineraryData: DayItinerary[];
}

export function ItineraryTable({ itineraryData }: ItineraryTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-blue-500 text-white text-center font-bold border border-gray-800 p-2">日期</th>
            <th className="bg-orange-500 text-white text-center font-bold border border-gray-800 p-2">行程</th>
            <th className="bg-white text-black text-center font-bold border border-gray-800 p-2">景点</th>
            <th className="bg-white text-black text-center font-bold border border-gray-800 p-2">美食</th>
            <th className="bg-white text-black text-center font-bold border border-gray-800 p-2">酒店</th>
            <th className="bg-gray-500 text-white text-center font-bold border border-gray-800 p-2">赛场</th>
            <th className="bg-white text-black text-center font-bold border border-gray-800 p-2">联系人</th>
            <th className="bg-red-600 text-white text-center font-bold border border-gray-800 p-2">准备材料</th>
          </tr>
        </thead>
        <tbody>
          {itineraryData.map((day, dayIndex) => {
            // 计算需要渲染的行数，取当天活动数和其他列内容的最大行数
            const maxRows = Math.max(
              day.activities.length,
              Math.max(day.attractions.length, day.foods.length, day.materials.length)
            );
            
            return Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr key={`${day.date}-${rowIndex}`} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {/* 日期列 - 只在第一天的第一行显示，其余合并 */}
                {rowIndex === 0 ? (
                  <td 
                    className="bg-blue-100 text-center font-bold border border-gray-800 p-2" 
                    rowSpan={maxRows}
                  >
                    {day.date}
                  </td>
                ) : null}
                
                {/* 行程列 */}
                <td className="border border-gray-800 p-2">
                  {day.activities[rowIndex] ? (
                    <span className={
                      day.activities[rowIndex].type === 'highlight' 
                        ? 'text-orange-500' 
                        : day.activities[rowIndex].type === 'important'
                          ? 'text-green-600'
                          : ''
                    }>
                      {day.activities[rowIndex].time} {day.activities[rowIndex].activity}
                    </span>
                  ) : ''}
                </td>
                
                {/* 景点列 */}
                <td className="border border-gray-800 p-2">
                  {day.attractions[rowIndex] || ''}
                </td>
                
                {/* 美食列 */}
                <td className="border border-gray-800 p-2">
                  {day.foods[rowIndex] || ''}
                </td>
                
                {/* 酒店列 */}
                <td className="border border-gray-800 p-2">
                  {rowIndex === 0 ? (
                    <>
                      {day.hotel.name && <div>{day.hotel.name}</div>}
                      {day.hotel.address && <div>{day.hotel.address}</div>}
                    </>
                  ) : ''}
                </td>
                
                {/* 赛场列 */}
                <td className="bg-gray-200 border border-gray-800 p-2">
                  {rowIndex === 0 ? (
                    <>
                      {day.venue?.name && <div>{day.venue.name}</div>}
                      {day.venue?.address && <div>{day.venue.address}</div>}
                    </>
                  ) : ''}
                </td>
                
                {/* 联系人列 */}
                <td className="border border-gray-800 p-2">
                  {day.contacts[rowIndex] ? (
                    <>
                      {day.contacts[rowIndex].name}：{day.contacts[rowIndex].phone}
                    </>
                  ) : ''}
                </td>
                
                {/* 准备材料列 */}
                <td className="border border-gray-800 p-2">
                  {day.materials[rowIndex] || ''}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}