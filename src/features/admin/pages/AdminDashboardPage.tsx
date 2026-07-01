import { useCallback, useState } from 'react';
import { Activity, CalendarDays, DollarSign, Users, TrendingUp, Sparkles, Bell, ArrowUpRight, ArrowDownRight, QrCode } from 'lucide-react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getAdminDashboard } from '@/features/admin/services/adminService';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { centsToUSD } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';

// Sample mock data for sales velocity chart
const SALES_TREND = [
  { day: 'Mon', sales: 4000 },
  { day: 'Tue', sales: 7500 },
  { day: 'Wed', sales: 6200 },
  { day: 'Thu', sales: 11000 },
  { day: 'Fri', sales: 18500 },
  { day: 'Sat', sales: 24000 },
  { day: 'Sun', sales: 22000 },
];

const RECENT_ACTIVITIES = [
  { id: 1, type: 'sale', message: 'John D. purchased VIP Table 5', time: '2 mins ago', amount: '$450.00' },
  { id: 2, type: 'sale', message: 'Sarah M. booked 3x General Admissions', time: '12 mins ago', amount: '$75.00' },
  { id: 3, type: 'checkin', message: 'David K. checked in at Main Gate', time: '20 mins ago', amount: null },
  { id: 4, type: 'sale', message: 'Elena R. purchased VIP Table 2', time: '1 hour ago', amount: '$600.00' },
  { id: 5, type: 'upgrade', message: 'Marcus T. upgraded to VIP Pass', time: '2 hours ago', amount: '$50.00' },
];

export function AdminDashboardPage() {
  const loader = useCallback(() => getAdminDashboard(), []);
  const { data, loading, error } = useAsync(loader);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Formatting revenue
  const revenueUSD = data ? centsToUSD(data.totalRevenueCents) : '$0.00';

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Live Control Center
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display text-foreground md:text-4xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor sales, bookings, and door operations in real time.</p>
        </div>

        {/* Live status badge */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2.5 shadow-sm text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-muted-foreground">System Status:</span>
          <span className="text-foreground">All Systems Operational</span>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive font-semibold">
          {error}
        </div>
      ) : null}

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {loading ? (
          [0, 1, 2, 3].map((i) => <StatSkeleton key={i} />)
        ) : data ? (
          <>
            <Stat 
              icon={<DollarSign />} 
              label="Total Revenue" 
              value={revenueUSD} 
              subtext="+18.4% from last week" 
              trend="up"
            />
            <Stat 
              icon={<Users />} 
              label="Attendees Registered" 
              value={data.totalAttendees} 
              subtext="74% checked in today" 
              trend="up"
            />
            <Stat 
              icon={<Activity />} 
              label="Active Events" 
              value={data.activeEvents} 
              subtext="Across all subdomains" 
              trend="neutral"
            />
            <Stat 
              icon={<CalendarDays />} 
              label="Total Events" 
              value={data.totalEvents} 
              subtext="Lifetime events hosted" 
              trend="neutral"
            />
          </>
        ) : null}
      </div>

      {/* Dashboard Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sales Velocity Chart (SVG) */}
        <Card className="lg:col-span-8 border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-border/20 px-6 py-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
                <TrendingUp className="h-4.5 w-4.5 text-primary" /> Sales Velocity
              </CardTitle>
              <p className="text-[11px] text-muted-foreground">Estimated revenue velocity over the past 7 days</p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
              Weekly view
            </span>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Custom SVG Area Chart */}
            <div className="relative w-full h-64 mt-4">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  {/* Gradient fill */}
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="180" x2="500" y2="180" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />

                {/* Chart Path and Area */}
                <path
                  d="M 10 180 C 80 150, 120 130, 160 140 C 200 150, 240 100, 300 70 C 370 40, 420 20, 480 30"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                <path
                  d="M 10 180 C 80 150, 120 130, 160 140 C 200 150, 240 100, 300 70 C 370 40, 420 20, 480 30 L 480 180 L 10 180 Z"
                  fill="url(#chartGrad)"
                />

                {/* Data Points / Interactive Dots */}
                {[
                  { x: 10, y: 180 },
                  { x: 90, y: 150 },
                  { x: 170, y: 140 },
                  { x: 250, y: 100 },
                  { x: 330, y: 70 },
                  { x: 410, y: 35 },
                  { x: 480, y: 30 },
                ].map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredIndex === idx ? "5" : "3.5"}
                    fill={hoveredIndex === idx ? "var(--marigold)" : "var(--primary)"}
                    stroke="var(--card)"
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer transition-all duration-150"
                  />
                ))}
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold px-2.5 pt-3 border-t border-border/20 mt-2">
                {SALES_TREND.map((item, idx) => (
                  <span 
                    key={idx} 
                    className={cn(
                      "transition-colors",
                      hoveredIndex === idx && "text-primary font-bold"
                    )}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Live Activity Feed */}
        <Card className="lg:col-span-4 border border-border bg-card shadow-lg rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-border/20 px-6 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-marigold" /> Live Activity
            </CardTitle>
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          </CardHeader>
          
          <CardContent className="p-6 flex-1 overflow-y-auto space-y-4">
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex justify-between items-start text-xs border-b border-border/10 pb-3 last:border-b-0 last:pb-0">
                  <div className="space-y-1 pr-3">
                    <p className="font-semibold text-foreground leading-normal">{act.message}</p>
                    <span className="text-[10px] text-muted-foreground block">{act.time}</span>
                  </div>
                  {act.amount && (
                    <span className="shrink-0 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-display">
                      {act.amount}
                    </span>
                  )}
                  {act.type === 'checkin' && (
                    <span className="shrink-0 inline-flex items-center text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      <QrCode className="h-3 w-3 mr-1" /> Scan
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function Stat({ 
  icon, 
  label, 
  value, 
  subtext, 
  trend 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number | string; 
  subtext?: string;
  trend: 'up' | 'down' | 'neutral';
}) {
  return (
    <Card className="border border-border bg-card hover:border-neutral-800 transition-all duration-300 group">
      <CardContent className="space-y-3 p-5">
        <div className="flex justify-between items-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/25 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            {icon}
          </div>
          {trend === 'up' && (
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> +12%
            </span>
          )}
          {trend === 'down' && (
            <span className="inline-flex items-center text-[10px] font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full border border-danger/15">
              <ArrowDownRight className="h-3 w-3 mr-0.5" /> -4%
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight font-display text-foreground tabular-nums md:text-3xl">
            {value}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {subtext && (
            <p className="text-[11px] text-muted-foreground/70 font-medium">
              {subtext}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="space-y-3 p-5">
        <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
        <div className="h-7 w-20 animate-pulse rounded bg-muted" />
        <div className="h-3.5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
