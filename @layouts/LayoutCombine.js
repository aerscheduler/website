import React from 'react';
import FooterDefault from './footers/FooterDefault';
import HeaderCombine from "./headers/HeaderCombine";

export default function LayoutCombine({children}) {
    
    return (
        <>
            <HeaderCombine />
           {children}
           <FooterDefault/>
        </>
    );
}