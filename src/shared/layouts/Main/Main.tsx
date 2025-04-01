import * as styles from "./styles.css";

const Main = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.container}>{children}</section>;
};

export default Main;
