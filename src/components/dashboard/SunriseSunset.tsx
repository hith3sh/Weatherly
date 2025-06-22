import React from 'react';

interface SunriseSunsetProps {
  sunrise?: string;
  sunset?: string;
  localtime?: string;
}

function parseTime(time?: string): number | null {
  if (!time) return null;
  // To handle both 'AM/PM' and 'HH:mm' formats
  const match = time.match(/(\d{1,2}):(\d{2}) ?([AP]M)?/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function getMinutesFromLocaltime(localtime?: string): number | null {
  if (!localtime) return null;
  // Expects 'YYYY-MM-DD HH:mm'
  const timePart = localtime.split(' ')[1];
  if (!timePart) return null;
  return parseTime(timePart);
}

export const SunriseSunset: React.FC<SunriseSunsetProps> = ({
  sunrise,
  sunset,
  localtime,
}) => {
  // Parse times to minutes since midnight
  const sunriseMins = parseTime(sunrise);
  const sunsetMins = parseTime(sunset);
  const nowMins = getMinutesFromLocaltime(localtime);

  // Calculate sun position (0=start, 1=end)
  let sunPos = 0;
  if (
    sunriseMins !== null &&
    sunsetMins !== null &&
    nowMins !== null &&
    sunsetMins > sunriseMins
  ) {
    sunPos = Math.min(
      1,
      Math.max(0, (nowMins - sunriseMins) / (sunsetMins - sunriseMins))
    );
  }

  // Arc dimensions
  const R = 48; // radius
  const arcY = 60;
  const arcX = 60;
  // Sun position along arc
  const angle = Math.PI * sunPos;
  const sunX = arcX + R * Math.cos(Math.PI - angle);
  const sunY = arcY - R * Math.sin(angle);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Sunrise
        </span>
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Sunset
        </span>
      </div>
      <div className="relative flex flex-col items-center">
        <svg
          width={arcX * 2}
          height={arcY + 10}
          viewBox={`0 0 ${arcX * 2} ${arcY + 10}`}
          className="block"
        >
          {/* Dashed half-circle arc */}
          <path
            d={`M${arcX - R},${arcY} A${R},${R} 0 0 1 ${arcX + R},${arcY}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={3}
            strokeDasharray="6,6"
          />
          {/* Sun icon at calculated position */}
          {sunriseMins !== null && sunsetMins !== null && nowMins !== null && (
            <g>
              <circle
                cx={sunX}
                cy={sunY}
                r={5}
                fill="#fde68a"
                stroke="#fbbf24"
                strokeWidth={2}
                filter="url(#sunShadow)"
              />
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => {
                const rayAngle = (Math.PI * i) / 4;
                const x1 = sunX + Math.cos(rayAngle) * 12;
                const y1 = sunY + Math.sin(rayAngle) * 12;
                const x2 = sunX + Math.cos(rayAngle) * 16;
                const y2 = sunY + Math.sin(rayAngle) * 16;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fbbf24"
                    strokeWidth={1}
                  />
                );
              })}
            </g>
          )}
        </svg>
        {/* Sunrise and Sunset times at ends */}
        <div className="flex justify-between w-full mt-2 px-1">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {sunrise || '--:--'}
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {sunset || '--:--'}
          </span>
        </div>
      </div>
    </div>
  );
};
