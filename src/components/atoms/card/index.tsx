import React from "react";

interface CardProps {
    title: string;
    description: string;
    weight?: string;
    size?: string;
}

const Index: React.FC<CardProps> = ({title, description, weight, size,}: CardProps) => {
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
                <div className="text-xl font-medium text-black">{title}</div>
                <p className="text-slate-500">{description}</p>
            </div>
        </div>
    )
}
export default Index
