import React from 'react'
import { BiLoaderAlt } from "react-icons/bi"

function MyButton(
    {
        children = "hehe, pass children prop",
        type,
        bgColor = "bg-orange",
        textColor = "text-white",
        className = "",
        disabled = false,
        isSubmitting = false,
        ...props

    }
) {
    return (
        <button
            type={type}
            disabled={isSubmitting}
            className={`${className} ${bgColor} ${textColor} px-8 py-2 text-xl rounded-full hover:bg-transparent hover:border-orange border-2 duration-300  `} {...props}
        >{isSubmitting ? <BiLoaderAlt className="animate-spin text-3xl mx-auto" /> : children}</button>
    )
}

export default MyButton