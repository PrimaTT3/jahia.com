import type { AnchorHTMLAttributes } from "react";
import classes from "./component.module.css";

export const CTA = ({
  children,
  icon,
  secondary,
  location,
  name,
  ...props
}: {
  icon?: boolean | string;
  secondary?: boolean;
  location: string;
  name: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className={classes.cta}
    data-variant={secondary ? "secondary" : undefined}
    data-element-url={props.href}
    data-element-type="cta"
    data-cta-type={secondary ? "secondary_action" : "primary_action"}
    data-element-text={typeof children === "string" ? children : undefined}
    data-element-location={location}
    data-element-name={name}
  >
    {children}
    {icon && (
      <>
        <span className={classes.line} />
        <span className={icon === true ? "i-ri:arrow-right-wide-line" : icon} />
      </>
    )}
  </a>
);
