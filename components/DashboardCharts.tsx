import React from 'react';

// --- Types ---
export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number; // For multi-bar charts
}

export interface RadarDataPoint {
  subject: string;
  A: number; // Current User
  B: number; // Group Average
  fullMark: number;
}

// --- Helper Functions ---
const getCoordinatesForPercent = (percent: number) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

// --- Components ---

/**
 * Smooth Line Chart with Gradient Fill
 */
export const SmoothLineChart: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => {
  const height = 250;
  const width = 600;
  const padding = 40;
  const maxY = Math.max(...data) * 1.2;
  const minY = 0;

  // Calculate points
  const points = data.map((val, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minY) / (maxY - minY)) * (height - padding * 2);
    return { x, y };
  });

  // Generate Smooth Path (Catmull-Rom / Bezier approx)
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  const fillPath = `${d} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="w-full h-full min-h-[250px] relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = height - padding - t * (height - padding * 2);
            return (
                <line key={t} x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
            )
        })}

        {/* Area Fill */}
        <path d={fillPath} fill="url(#lineGradient)" />

        {/* The Line */}
        <path d={d} fill="none" stroke="var(--primary-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--bg-paper)" stroke="var(--primary-color)" strokeWidth="2" />
        ))}

        {/* Labels X */}
        {labels.map((label, i) => {
           const x = padding + (i / (labels.length - 1)) * (width - padding * 2);
           return (
            <text key={i} x={x} y={height - 10} textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontFamily="sans-serif">
                {label}
            </text>
           )
        })}
      </svg>
    </div>
  );
};

/**
 * Double Bar Chart
 */
export const DoubleBarChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
    const height = 220;
    const width = 500;
    const paddingX = 40;
    const paddingY = 30;
    const barWidth = 12;
    const gap = 6;
    
    const maxVal = Math.max(...data.map(d => Math.max(d.value, d.value2 || 0))) * 1.1;

    return (
        <div className="w-full h-full min-h-[200px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                 {/* Y Axis Grid */}
                 {[0, 0.5, 1].map((t) => {
                    const y = height - paddingY - t * (height - paddingY * 2);
                    return (
                        <g key={t}>
                            <line x1={paddingX} y1={y} x2={width} y2={y} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
                            <text x={paddingX - 10} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize="10">
                                {Math.round(t * maxVal)}
                            </text>
                        </g>
                    )
                })}

                {data.map((d, i) => {
                    const groupWidth = (width - paddingX) / data.length;
                    const x = paddingX + i * groupWidth + groupWidth / 2;
                    
                    const h1 = (d.value / maxVal) * (height - paddingY * 2);
                    const y1 = height - paddingY - h1;

                    const h2 = ((d.value2 || 0) / maxVal) * (height - paddingY * 2);
                    const y2 = height - paddingY - h2;

                    return (
                        <g key={i}>
                            {/* Bar 1 - Cyan */}
                            <rect 
                                x={x - barWidth - gap/2} 
                                y={y1} 
                                width={barWidth} 
                                height={h1} 
                                rx="4"
                                fill="#22d3ee" 
                            />
                            {/* Bar 2 - Purple */}
                            <rect 
                                x={x + gap/2} 
                                y={y2} 
                                width={barWidth} 
                                height={h2} 
                                rx="4"
                                fill="#818cf8" 
                            />
                            
                            <text x={x} y={height - 5} textAnchor="middle" fill="var(--text-muted)" fontSize="11">
                                {d.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    )
}

/**
 * Radar / Spider Chart
 */
export const RadarChart: React.FC<{ data: RadarDataPoint[] }> = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const levels = 4;

  const angleSlice = (Math.PI * 2) / data.length;

  // Helper to get coordinates
  const getPoint = (value: number, index: number, max: number) => {
    const angle = index * angleSlice - Math.PI / 2; // Start from top
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate points for polygons
  const polyA = data.map((d, i) => {
      const p = getPoint(d.A, i, d.fullMark);
      return `${p.x},${p.y}`;
  }).join(" ");

  const polyB = data.map((d, i) => {
      const p = getPoint(d.B, i, d.fullMark);
      return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px]">
        {/* Grid Levels */}
        {[...Array(levels)].map((_, level) => {
            const factor = (level + 1) / levels;
            const points = data.map((d, i) => {
                 const p = getPoint(d.fullMark * factor, i, d.fullMark);
                 return `${p.x},${p.y}`;
            }).join(" ");
            return <polygon key={level} points={points} fill="none" stroke="var(--border-color)" strokeWidth="1" />;
        })}

        {/* Axes */}
        {data.map((d, i) => {
             const p = getPoint(d.fullMark, i, d.fullMark);
             return (
                 <g key={i}>
                    <line x1={center} y1={center} x2={p.x} y2={p.y} stroke="var(--border-color)" strokeWidth="1" />
                    {/* Labels */}
                    <text 
                        x={p.x + (p.x - center) * 0.2} 
                        y={p.y + (p.y - center) * 0.2} 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className="text-[10px] fill-current text-text-muted uppercase font-semibold"
                        style={{ fill: 'var(--text-muted)' }}
                    >
                        {d.subject}
                    </text>
                 </g>
             );
        })}

        {/* Data Polygons */}
        <polygon points={polyB} fill="rgba(244, 114, 182, 0.2)" stroke="#f472b6" strokeWidth="2" />
        <polygon points={polyA} fill="rgba(34, 211, 238, 0.2)" stroke="#22d3ee" strokeWidth="2" />
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 right-0 text-xs flex gap-3">
          <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#22d3ee]"></div>
              <span className="text-text-muted">Я</span>
          </div>
          <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#f472b6]"></div>
              <span className="text-text-muted">Группа</span>
          </div>
      </div>
    </div>
  );
};

/**
 * Donut Progress Chart
 */
export const DonutChart: React.FC<{ percent: number }> = ({ percent }) => {
    const size = 160;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="var(--border-color)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradientDonut)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
                <defs>
                    <linearGradient id="gradientDonut" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-text-main">{percent}%</span>
                <span className="text-xs text-text-muted font-medium">Пройдено</span>
            </div>
        </div>
    )
}