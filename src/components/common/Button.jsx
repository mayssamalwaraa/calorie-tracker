import { memo } from "react";
import styles from "./Button.Module.css";
function Button(props) {
  const { children, varient, ...rest } = props;
  //reeevalute vs rerender
  console.log(`Button ${varient}`);
  return (
    <button {...rest} className={styles[varient]}>
      {children}
    </button>
  );
}

export default memo(Button);
