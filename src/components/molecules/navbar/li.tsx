import React from "react";
import {NavLink} from "react-router-dom";

interface LabelProps {
    label: string
    to: string
    className?: string
}
const Index: React.FC<LabelProps> = ({label, to, className}: LabelProps) => {
    return (
        <li>
            <NavLink to={to}
                     className={`selected ${className}`}>{label}
            </NavLink>
        </li>
    )
}
export default Index
