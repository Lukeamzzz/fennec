import Link from 'next/link';
import React from 'react';

interface BasicLinkProps {
    /**
     * The text to be displayed within the link.
    */
    text: string,
    /**
     * The URL or path that the link should navigate to.
    */
    href: string
}

/**
 * A clean and simple link component that navigates to the specified URL when clicked.
 * It provides a subtle upward hover animation and color change for visual feedback.
*/
const BasicLink: React.FC<BasicLinkProps> = ({ text, href }) => {
    return (
        <Link href={href} className='duration-300 hover:-translate-y-1 hover:text-orange-500'>
            {text}
        </Link>
    );
};

export default BasicLink;