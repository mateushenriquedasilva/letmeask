import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

// type element html
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
    return(
        <button className="button" {...props} />
    );
}