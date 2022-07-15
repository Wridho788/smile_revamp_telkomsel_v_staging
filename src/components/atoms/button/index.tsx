import React, {FC, MouseEvent} from "react";
import "./button.css";

interface ButtonProps {
    label: string;
    variant?: string;
    fontSize?: string;
    type?: "submit" | "reset";
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Index: FC<ButtonProps> = ({
                                    variant,
                                    label,
                                    fontSize,
                                    type,
                                    handleClick,
                                }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className={`${
                variant ? variant : "btn-default"
            } px-3 rounded py-1 whitespace-nowrap ${fontSize} w-full`}
        >
            {label}
        </button>
    );
};

export default Index;
