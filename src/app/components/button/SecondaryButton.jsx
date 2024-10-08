import React from "react";
import * as styles from "../component.module.css";

export default function SecondaryButton({ label, className = '', icon, ...rest }) {
    const buttonClassName = `${styles.secondaryButton} button-text1 ${className}`;

    if (rest?.href) {
        return (
            <a className={buttonClassName} {...rest}>
                {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
                <span className="text-8-med">{label}</span>
            </a>
        );
    } else {
        return (
            <div className={buttonClassName} {...rest}>
                {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
                <span className="text-8-med">{label}</span>
            </div>
        );
    }
}
