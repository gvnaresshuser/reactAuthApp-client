import {
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Activity,
  Clock,
  ArrowRightCircle,
} from "lucide-react";
import { useToken } from "../context/TokenContext";
const JwtStatusCard = () => {

  const {
    accessSeconds,
    refreshSeconds,

    accessExpiry,
    refreshExpiry,

    status,
    lastActivity,
    nextAction,
  } = useToken();
  const accessPercentage = Math.max((accessSeconds / accessExpiry) * 100, 0);

  const refreshPercentage = Math.max((refreshSeconds / refreshExpiry) * 100, 0);



  const getColor = (seconds, expiry) => {
    if (seconds > expiry * 0.6) return "bg-green-500";
    if (seconds > expiry * 0.3) return "bg-yellow-500";
    if (seconds > 0) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-8">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-600 p-3 rounded-xl text-white">
          <ShieldCheck size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            JWT Authentication Monitor
          </h2>

          <p className="text-slate-500">Live Token Status</p>
        </div>
      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ACCESS TOKEN */}

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-3">
            <KeyRound className="text-blue-600" size={28} />

            <div>
              <h3 className="font-bold text-lg">Access Token</h3>

              <p className="text-sm text-gray-500">Short-lived JWT</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Remaining</span>

              <span className="font-bold text-xl">{accessSeconds}s</span>
            </div>

            <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-4 transition-all duration-700 ${getColor(accessSeconds, accessExpiry)}`}
                style={{
                  width: `${accessPercentage}%`,
                }}
              />
            </div>

            <div className="mt-4">
              {accessSeconds > 0 ? (
                <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  🟢 ACTIVE
                </span>
              ) : (
                <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  🔴 EXPIRED
                </span>
              )}
            </div>
          </div>
        </div>

        {/* REFRESH TOKEN */}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3">
            <RefreshCw className="text-emerald-600" size={28} />

            <div>
              <h3 className="font-bold text-lg">Refresh Token</h3>

              <p className="text-sm text-gray-500">Long-lived JWT</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Remaining</span>

              <span className="font-bold text-xl">{refreshSeconds}s</span>
            </div>

            <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-4 transition-all duration-700 ${getColor(refreshSeconds, refreshExpiry)}`}
                style={{
                  width: `${refreshPercentage}%`,
                }}
              />
            </div>

            <div className="mt-4">
              {refreshSeconds > 0 ? (
                <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  🟢 VALID
                </span>
              ) : (
                <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  🔴 EXPIRED
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* STATUS */}

        <div className="rounded-2xl bg-indigo-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={20} className="text-indigo-600" />

            <h4 className="font-bold">Current Status</h4>
          </div>

          <p className="font-semibold text-lg">{status}</p>
        </div>

        {/* LAST ACTIVITY */}

        <div className="rounded-2xl bg-orange-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} className="text-orange-600" />

            <h4 className="font-bold">Last Activity</h4>
          </div>

          <p className="font-semibold">{lastActivity}</p>
        </div>

        {/* NEXT ACTION */}

        <div className="rounded-2xl bg-cyan-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ArrowRightCircle size={20} className="text-cyan-600" />

            <h4 className="font-bold">Next Action</h4>
          </div>

          <p className="font-semibold">{nextAction}</p>
        </div>
      </div>
    </div>
  );
};

export default JwtStatusCard;
