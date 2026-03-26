import React from 'react';
import { Activity, Heart, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl font-handwritten font-bold text-foreground">
          Welcome back, <span className="text-pastel-pink">{user?.name || 'Guest'}</span>! 🐾
        </h1>
        <p className="text-gray-500 mt-2">Here is what is happening in your community today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pastel-blue/20 rounded-2xl text-pastel-blue">
              <Activity size={24} />
            </div>
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-border/50">
              <p className="text-sm font-medium">You commented on "Lost Golden Retriever in Park area"</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-border/50">
              <p className="text-sm font-medium">Dr. Smith replied to your vet query.</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>

        {/* Adoption Requests Card */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pastel-pink/20 rounded-2xl text-pastel-pink">
              <Heart size={24} />
            </div>
            <h2 className="text-xl font-bold">Adoptions</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-2xl text-gray-400">
            <Heart size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No active applications.</p>
            <button className="mt-4 text-pastel-pink font-medium hover:underline">Browse pets</button>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pastel-yellow/30 rounded-2xl text-yellow-600">
              <Bell size={24} />
            </div>
            <h2 className="text-xl font-bold">Alerts</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 hover:bg-red-50 rounded-2xl transition-colors cursor-pointer text-red-600">
              <span className="text-xl">🚨</span>
              <div>
                <p className="text-sm font-bold">Lost Cat reported</p>
                <p className="text-xs mt-1">Within 2 miles of your location.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 hover:bg-pastel-blue/10 rounded-2xl transition-colors cursor-pointer text-pastel-blue">
              <span className="text-xl">🏥</span>
              <div>
                <p className="text-sm font-bold text-pastel-blue">New Clinic Open</p>
                <p className="text-xs text-gray-600 mt-1">A 24/7 clinic just registered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
