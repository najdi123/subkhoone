import axios from "axios";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/marketProperty.module.css"
import {useState, useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DataContext} from "../../../../context/DataContext";
import JSONbig from 'json-bigint';
import ImagePicker from "../../../../components/ImagePicker";
import OffersTable from "../../../../components/OffersTable";
import SubmitOffersTable from "../../../../components/SubmitOffersTable";


function Primary({propertyData, primaryBuyOffersProps}) {
    const {data} = useContext(DataContext);

    const [primaryBuyOffers, setPrimaryBuyOffers] = useState()
    useEffect(() => {
        setPrimaryBuyOffers(primaryBuyOffersProps)
    }, [primaryBuyOffersProps])
    // console.log("primary propertyData: ", propertyData)

    return (
        <Layout>
            <div className={styles.property}>
                <div className={styles.topRow}>
                    <div className={styles.wrapper}>
                        <ImagePicker  propertyData={propertyData} market={"اولیه"}/>
                        <div className={`${styles.secondaryDesc} d-none d-lg-block`}>
                            <p className={styles.marketType}>بازار اولیه</p>
                            <h3 className={styles.propertyName}>{propertyData.name}</h3>
                            <div className={`row ${styles.border}`}>
                                <OffersTable props={primaryBuyOffers} type={"خرید"} />
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
                            <OffersTable props={primaryBuyOffers} type={"خرید"} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Primary.getInitialProps = async (ctx) => {
    const {id} = ctx.query;
    axios.defaults.transformResponse = [function (config) {
        return JSONbig.parse(config);
    }]
    const res = await axios.get(`http://api.subkhoone.com/api/assets/${id}`);
    let primaryId = res.data.data["present_primary_market"].id;
    // console.log("primaryId", primaryId)

    const primaryBuyOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/primary_markets/${primaryId}/primary_offers`);
    return {
        propertyData: res.data.data,
        primaryBuyOffersProps: primaryBuyOffers.data.data,
    }
};

export default Primary