import Head from 'next/head'
import styles from '../styles/properties.module.css'
import Layout from "../components/layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Link from 'next/link'
import Secondary from "./properties/[id]";
import ApiReq from "../helpers/ApiReq";
import login from "./login";

const JSONbig = require('json-bigint');

export default function Properties({properties, ids, secondary, primary, exit}) {

    const [display, setDisplay] = useState({
        latest: true,
        primary: false,
        secondary: false,
        exit: false
    })

    console.log("properties from getInitialProps: ", properties)

    const getList = (market, marketName) => {

        return market.map(item => {
            return (
                // <div className={display[marketName]?'d-block':'d-none'}>
                <div >
                    <Link href={`/properties/${item.id}/${marketName}`}>
                        {/*<Link href={`/properties/${item.id}/${data}`}>*/}
                        <a>
                            <div className={`${styles.wrapper}`}>
                                <div className={` ${styles.estateCard} ${styles.property}`}
                                     key={item.id}
                                >
                                    <div className={` ${styles.cardTop}`}>
                                        <h3 className={styles.card__title}> {`${item.name}`}</h3>
                                        <div className={styles.imgContainer}>
                                            <div className={styles.imgBox}>
                                                <span className={styles.imgBox__label}>
                                                    {market == secondary && "بازار ثانویه"}
                                                    {market == primary && "بازار اولیه"}
                                                    {market == exit && "بازار خروج"}
                                    </span>
                                                <img
                                                    className={styles.card__img}
                                                    src={`https://api.subkhoone.com${item.images && item.images.main && item.images.main.original}`}
                                                />
                                            </div>
                                            <span className={styles.card__location}>-</span>
                                        </div>
                                    </div>
                                    <div className={`${styles.priceBox} d-flex flex-row-reverse`}>
                                        <span className={` r-coins-dollar ${styles.icon}`}></span>
                                        <span className={`${styles.label}`}>نوع ملک</span>
                                        {/*<span*/}
                                        {/*    className={styles.price}>نوع ملک</span>*/}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>

            )
        })
    }

    const getAllLists = (secondary, primary, exit) => {
        return [getList(primary,"primary"), getList(secondary,"secondary"), getList(exit,"exit")]
    }

    const tabList =()=>{
        return(
            <section className={`d-flex flex-row-reverse justify-content-end ${styles.marketsTab}`}>
                <button
                    className={display.latest ? styles.active : ""}
                    onClick={() => setDisplay({latest: true, primary: false, secondary: false, exit: false})}
                >آخرین ملک ها
                </button>
                <button
                    className={display.primary ? styles.active : ""}
                    onClick={() => setDisplay({latest: false, primary: true, secondary: false, exit: false})}
                >بازار اولیه
                </button>
                <button
                    className={display.secondary ? styles.active : ""}
                    onClick={() => setDisplay({latest: false, primary: false, secondary: true, exit: false})}
                >بازار ثانویه
                </button>
                <button
                    className={display.exit ? styles.active : ""}
                    onClick={() => setDisplay({latest: false, primary: false, secondary: false, exit: true})}
                >بازار خروج
                </button>
            </section>
        )
    }


    return (
        <Layout>
            <Head>
                <title>املاک</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <section className={styles.title}>
                    <div>
                        <p className={styles.smallTittle}>فرصت های سرمایه گذاری</p>
                        <h2 className={styles.largeTittle}>فرصت های سرمایه گذاری</h2>
                    </div>
                </section>
                {tabList()}
                <section className={`${styles.properties} d-flex row justify-end`}>


                    {
                        properties &&
                        display.latest &&
                        getAllLists(secondary, primary, exit)

                    }

                    {
                        display.secondary &&
                        secondary &&
                        getList(secondary,"secondary")
                    }

                    {
                        display.primary &&
                        primary &&
                        getList(primary,"primary")
                    }

                    {
                        display.exit &&
                        exit &&
                        getList(exit,"exit")
                    }
                </section>


            </main>
        </Layout>
    )
}

Properties.getInitialProps = async (ctx) => {
    axios.defaults.transformResponse = [function (config) {
        return JSONbig.parse(config);
    }]

    const config = {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: 'https://api.subkhoone.com/api/assets',
    };

    const res = await ApiReq(config)


    let ids;
    if (res && res.data) {
        ids = res.data.data.map((item) => {
                return {
                    params: {
                        id: item.id + ""
                    }
                }
            }
        )
    }


    let secondaryTemp;
    if (res && res.data) {
        secondaryTemp = res.data.data.filter(item => {
                return item["present_secondary_market_id"]
            }
        )
    }

    let primaryTemp;
    if (res && res.data) {
        primaryTemp = res.data.data.filter(item => {
                return item["present_primary_market_id"]
            }
        )
    }

    let exitTemp;
    if (res && res.data) {
        exitTemp = res.data.data.filter(item => {
                return item["present_exit_market_id"]
            }
        )
    }

    return {properties: res.data.data, ids: ids, secondary: secondaryTemp, primary: primaryTemp, exit: exitTemp}

};
