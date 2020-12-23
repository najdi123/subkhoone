import Head from 'next/head'
import styles from '../styles/home.module.css'
import Layout from "../components/layout";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <section className={styles.IndexFilter_filterSection}>
                    <img className={styles.IndexFilter_svg}  src="/images/index.svg"/>
                    <div className="position-relative h-100 container">
                    </div>
                </section>


            </main>
        </Layout>
    )
}
