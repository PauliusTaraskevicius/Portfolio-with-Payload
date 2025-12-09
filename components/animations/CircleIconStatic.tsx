'use client'



// Static circle for mobile - always full
export const CircleIconStatic = ({
  icon: Icon,
  label,
  size = 140,
  font
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  size?: number;
  font?: string;
}) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="absolute -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Icon className="size-6 text-white" />
          <span
            className={`${font} mt-2 text-xs tracking-widest text-white uppercase`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
