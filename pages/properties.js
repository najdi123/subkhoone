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
    // console.log("setSecondary: ", secondary)

    const newStateItem = () => {
        return (
            <div className={styles.estateCard}>
                <div className={styles.cardTop}>
                    <h3 className={styles.card__title}>ملک شماره یک</h3>
                    <div className={styles.imgContainer}>
                        <div className={styles.imgBox}>
                            <span className={styles.imgBox__label}>بازار ثانویه</span>
                            <img
                                className={styles.card__img}
                                src="https://api.subkhoone.com//uploads/users/615959526349045761/assets-615890603958042625-main/4hhoo3hiYf4GyrjMhyUvsrBGMUiqv3_yJEJxvd4RUGl9-l4OitpDpG2PpUm6/xiEY-NVL9RhhomqzX9majxjbE8RkT93QXqis3CkOzdUxECiU34mHpe03aVvU.png"
                            />
                        </div>
                        <span className={styles.card__location}>-</span>
                    </div>
                </div>
                <div className={styles.priceBox}>
                    <span className={styles.label}>نوع ملک</span>
                    <span
                        className={styles.price}>نوع ملک</span>
                </div>
            </div>
        )
    }
    const getList = (market, marketName) => {

        return market.map(item => {
            return (
                <div>
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
                                                    {market == primary && "بازار primary"}
                                                    {market == exit && "بازار exit"}
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
                    className={display.latest && styles.active}
                    onClick={() => setDisplay({latest: true, primary: false, secondary: false, exit: false})}
                >آخرین ملک ها
                </button>
                <button
                    className={display.primary && styles.active}
                    onClick={() => setDisplay({latest: false, primary: true, secondary: false, exit: false})}
                >بازار اولیه
                </button>
                <button
                    className={display.secondary && styles.active}
                    onClick={() => setDisplay({latest: false, primary: false, secondary: true, exit: false})}
                >بازار ثانویه
                </button>
                <button
                    className={display.exit && styles.active}
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
        // Do whatever you want to transform the data
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
