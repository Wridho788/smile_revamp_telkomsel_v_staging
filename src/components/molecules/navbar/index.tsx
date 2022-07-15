import React, {FC} from "react";
import Li from "./li";

interface NavbarProps {
    label: string,
}

const Index: FC<NavbarProps> = ({label,}: NavbarProps) => {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-5 rounded dark:bg-red-600">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <Li label="Home" to="/"/>
                        <Li label="Option" to="/option"/>
                        <Li label="Option" to="/option"/>
                        <Li label="Option" to="/option"/>
                        <Li label="Option" to="/option"/>
                        <div className="group inline-block relative">
                            <Li label="My Telkomsel" to="/myTelkomsel"/>
                            <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                                <div className="rounded-t bg-red-600 py-2 px-1 block whitespace-no-wrap">
                                    <Li label="Submenu 1" to="/myTelkomsel" className="hover:bg-red-500/75"/>
                                    <Li label="Submenu 2" to="/myTelkomsel" className="hover:bg-red-500/75"/>
                                    <Li label="Submenu 3" to="/myTelkomsel" className="hover:bg-red-500/75"/>
                                </div>
                              </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Index;
