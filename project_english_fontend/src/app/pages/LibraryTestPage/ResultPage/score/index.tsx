import React from "react";

interface CircularProgressProps {
    value: number; // Giá trị hiện tại của tiến trình
    max?: number; // Giá trị tối đa (mặc định: 100)
    size?: number; // Kích thước hình tròn (đường kính)
    strokeWidth?: number; // Độ dày của thanh tiến trình
    progressColor?: string; // Màu của tiến trình
    solidColor?: string; // Màu nền
    innerContent?: React.ReactNode; // Nội dung hiển thị bên trong
}

export default function CircularProgress({
    value,
    max = 100,
    size = 100,
    strokeWidth = 8,
    progressColor = "#4CAF50",
    solidColor = "#E0E0E0",
    innerContent = `${value}%`,
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;

    return (
        <div className="flex items-center justify-center">
            <svg width={size} height={size}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={solidColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={progressColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
                {/* Inner content */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize={size / 5}
                    fill={progressColor}
                >
                    {innerContent}
                </text>
            </svg>
        </div>
    );
}
