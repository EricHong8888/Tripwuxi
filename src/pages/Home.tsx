import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">旅行行程规划</h1>
        <p className="text-gray-600 mb-8">欢迎查看您的详细行程安排，包含景点、美食、住宿等信息</p>
        <Link 
          to="/itinerary" 
          className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          查看行程表
        </Link>
      </div>
    </div>
  );
}