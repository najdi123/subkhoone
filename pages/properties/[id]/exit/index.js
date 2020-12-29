import axios from "axios";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/marketProperty.module.css"
import {useState, useContext, useEffect} from 'react'
import {DataContext} from "../../../../context/DataContext";
import JSONbig from 'json-bigint';
import ImagePicker from "../../../../components/ImagePicker";
import OffersTable from "../../../../components/OffersTable";
import SubmitOffersTable from "../../../../components/SubmitOffersTable";


function Exit({propertyData, exitBuyOffersProps}) {
    const {data} = useContext(DataContext);

    const [exitBuyOffers, setExitBuyOffers] = useState()
    useEffect(() => {
        setExitBuyOffers(exitBuyOffersProps)
    }, [exitBuyOffersProps])
    // console.log("exit propertyData: ", propertyData)

    return (
        <Layout>
            <div className={styles.property}>
                <div className={styles.topRow}>
                    <div className={styles.wrapper}>
                        <ImagePicker  propertyData={propertyData} market={"خروج"} />
                        <div className={`${styles.secondaryDesc} d-none d-lg-block`}>
                            <p className={styles.marketType}>بازار خروج</p>
                            <h3 className={styles.propertyName}>{propertyData.name}</h3>
                            <div className={`row ${styles.border}`}>
                                <OffersTable props={exitBuyOffers} type={"خرید"} />
                            </div>
                        </div>
                    </div>
                    <SubmitOffersTable propertyData={propertyData} data={data} marketType={"present_exit_market"}/>
                </div>
                <div className={`${styles.secondRow} d-lg-none`}>
                    <div className={styles.secondaryDesc}>
                        <p className={styles.marketType}>بازار خروج</p>
                        <h3 className={styles.propertyName}>{propertyData.name}</h3>
                        <div className={`row ${styles.border}`}>
                            <OffersTable props={exitBuyOffers} type={"خرید"} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Exit.getInitialProps = async (ctx) => {
    const {id} = ctx.query;
    axios.defaults.transformResponse = [function (config) {
        return JSONbig.parse(config);
    }]
    const res = await axios.get(`http://api.subkhoone.com/api/assets/${id}`);
    let exitId = res.data.data["present_exit_market"].id;
    // console.log("exitId", exitId)

    const exitBuyOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/exit_markets/${exitId}/exit_market_offers`);
    return {
        propertyData: res.data.data,
        exitBuyOffersProps: exitBuyOffers.data.data
    }
};

export default Exit