import axios from "axios";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/marketProperty.module.css"
import React, {useState, useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DataContext} from "../../../../context/DataContext";
import JSONbig from 'json-bigint';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import "react-input-range/lib/css/index.css"
import OffersTable from "../../../../components/OffersTable";
import SubmitOffersTable from "../../../../components/SubmitOffersTable";
import ImagePicker from "../../../../components/ImagePicker";


function Secondary({propertyData, secondaryBuyOffersProps, secondarySellOffersProps}) {
    const {data} = useContext(DataContext);

    const [secondaryBuyOffers, setSecondaryBuyOffers] = useState()
    const [secondarySellOffers, setSecondarySellOffers] = useState()
    useEffect(() => {
        setSecondaryBuyOffers(secondaryBuyOffersProps)
        setSecondarySellOffers(secondarySellOffersProps)
    }, [secondaryBuyOffersProps])
    // console.log("secondary propertyData: ", propertyData)


    return (
        <Layout>
            <div className={styles.property}>
                <div className={styles.topRow}>
                    <div className={styles.wrapper}>
                        <ImagePicker propertyData={propertyData} market={"ثانویه"} images={propertyData.images}/>
                        <div className={`${styles.secondaryDesc} d-none d-lg-block`}>
                            <p className={styles.marketType}>بازار ثانویه</p>
                            <h3 className={styles.propertyName}>{propertyData.name}</h3>
                            <div className={`row ${styles.border}`}>
                                <OffersTable props={secondaryBuyOffers} type={"خرید"}/>
                                <OffersTable props={secondarySellOffers} type={"فروش"}/>
                            </div>
                        </div>
                    </div>
                    <SubmitOffersTable propertyData={propertyData} data={data}/>
                </div>
                <div className={`${styles.secondRow} d-lg-none`}>
                    <div className={styles.secondaryDesc}>
                        <p className={styles.marketType}>بازار ثانویه</p>
                        <h3 className={styles.propertyName}>{propertyData.name}</h3>
                        <div className={`row ${styles.border}`}>
                            <OffersTable props={secondaryBuyOffers} type={"خرید"}/>
                            <OffersTable props={secondarySellOffers} type={"فروش"}/>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Secondary.getInitialProps = async (ctx) => {
    const {id} = ctx.query;
    axios.defaults.transformResponse = [function (config) {
        return JSONbig.parse(config);
    }]
    const res = await axios.get(`http://api.subkhoone.com/api/assets/${id}`);
    let secondaryId = res.data.data["present_secondary_market"].id;
    // console.log("secondaryId", secondaryId)

    const secondaryBuyOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/secondary_markets/${secondaryId}/secondary_buy_offers`);
    const secondarySellOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/secondary_markets/${secondaryId}/secondary_sell_offers`);
    return {
        propertyData: res.data.data,
        secondaryBuyOffersProps: secondaryBuyOffers.data.data,
        secondarySellOffersProps: secondarySellOffers.data.data
    }
};

export default Secondary