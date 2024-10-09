import React from "react";
import * as styles from "../component.module.css";

export default function PrimaryButton({ label, className = '', icon, buttonwhite = false, greenBg = false, ...rest }) {
  const buttonClassName = `${styles.PrimaryButton} button-text1 ${className} ${buttonwhite ? styles.buttonwhite : ''} ${greenBg ? styles.greenBg : ''}`;

  if (rest?.href) {
    return (
      <a className={buttonClassName} {...rest}>
        {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
        <span>{label}</span>
      </a>
    );
  } else {
    return (
      <div className={buttonClassName} {...rest}>
        {icon && <div dangerouslySetInnerHTML={{ __html: icon }} />}
        <span>{label}</span>
      </div>
    );
  }
}
