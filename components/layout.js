import styles from './layout.module.css'
import Navbar from "./navbar";

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <Navbar/>
            {children}
         </div>
)
}