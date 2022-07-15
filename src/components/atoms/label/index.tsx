import React from "react";
import "./label.css";

interface LabelProps {
    label: string;
    weight?: string;
    variant?: string;
    size?: string;
}

const Index: React.FC<LabelProps> = ({label, weight, size, variant,}: LabelProps) => {
    return (
        <div className={`text-${size} font-${weight} ${variant}`}>{label}</div>
    );
};

export default Index;
