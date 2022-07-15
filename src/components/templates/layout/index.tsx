import React from "react";
import Navbar from "../../molecules/navbar";


interface Layout {
    children: React.ReactNode
    auth: string;
}

const Index: React.FC<Layout> = ({auth, children}: Layout) => {
    return (
        <>
            <Navbar label={auth}/>
            <div className="container flex flex-wrap justify-between items-center mx-auto mt-5">
                <div id="page-content-wrapper">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Index;
