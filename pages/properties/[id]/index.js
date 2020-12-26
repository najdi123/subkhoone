import axios from "axios";
import Layout from "../../../components/layout";
import styles from "../../../styles/secondaryMarketProperty.module.css"
import moment from 'moment-jalaali';
import {useState, useContext, useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {DataContext} from "../../../context/DataContext";
import JSONbig from 'json-bigint';


function Secondary({propertyData, secondaryBuyOffersProps, secondarySellOffersProps}) {
    const {data} = useContext(DataContext);
    // console.log("secondaryBuyOffers: ", secondaryBuyOffers)
    // console.log("secondaryBuyOffers number of shares: ", secondaryBuyOffers[0]["number_of_shares"])
    // console.log("secondarySellOffers: ", secondarySellOffers)
    // console.log("context data: ", data)
    // console.log("context data2: ", data["use_types"] && data["use_types"]["name"])

    const [secondaryBuyOffers, setSecondaryBuyOffers] = useState()
    const [secondarySellOffers, setSecondarySellOffers] = useState()
    useEffect(() => {
        setSecondaryBuyOffers(secondaryBuyOffersProps)
        setSecondarySellOffers(secondarySellOffersProps)
    }, [secondaryBuyOffersProps])
    console.log("setSecondaryBuyOffers: ", secondaryBuyOffers)

    const [showBuy, setShowBuy] = useState(false);
    const [showSell, setShowSell] = useState(false);

    const handleCloseBuy = () => setShowBuy(false);
    const handleShowBuy = () => setShowBuy(true);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);

    console.log("propertyData: ", propertyData)
    // console.log("router: ",router["query"].id)
    const SubmitOffer = (e) => {
        e.preventDefault()

    }

    const BuyOfferModal=()=>{
        return(
            <Modal className="rtl " show={showBuy} onHide={handleCloseBuy}>
                <Modal.Header className={styles.borderBottomNone} closeButton>
                    <Modal.Title className={`r-hands-and-gestures ${styles.modalHeaderIcon}`}>ثبت پیشنهاد خرید</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <h4 className={`text-center ${styles.modalBodyTitle}`}>مشخص کردن ارقام</h4>
                    <div className="d-flex justify-content-center align-items-center mb-4 row ">
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0">
                            <p className={styles.modalText}>ثبت پیشنهاد خرید</p>
                            <div className={styles.autoCalcInputBox}>
                                <input className={styles.numericInput} type="number" id="quantity"
                                       name="quantity" min="1"/>
                            </div>
                            <p className={styles.modalText}>صاب به قیمت هر صاب</p>
                        </div>
                        {/*<label htmlFor="formControlRange">Example Range input</label>*/}
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0" >
                            <div className={styles.popupRange}>
                                <div className={styles.inputRange}>
                                                <span className={`${styles.inputRangeLabel} ${styles.inputRangeLabelMin}`}>
                                                    <span className="input-range__label-container">
                                                        4324
                                                    </span>
                                                </span>
                                    <input type="range" min="20" max="30"
                                           className={`form-control-range ltr mb-2`}
                                           id="formControlRange"/>
                                    <span className={`${styles.inputRangeLabel} ${styles.inputRangeLabelMax}`}>
                                                    <span className="input-range__label-container">
                                                        225550
                                                    </span>
                                                </span>
                                </div>
                            </div>
                            <p className={styles.modalText}>هزار تومان</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center row">
                        <div className="d-flex justify-content-center align-items-center col-md-5 col-12 p-0 pr-2 ">
                            <p className={styles.modalText}>
                                <span className={styles.boldText}>قیمت نهان:  </span>
                                هر صاب
                            </p>
                            <div className={styles.autoCalcInputBox}>

                                <input className={styles.numericInput} type="number" id="quantity"
                                       name="quantity" min="1"/>
                            </div>
                            <p className={styles.modalText}>
                                میلیون تومان
                            </p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center col-md-7 col-12 p-0">
                            <p className={styles.modalTextSmall}> (این قیمت به صورت محرمانه تا زمان پایان بازار ثانویه محفوظ می ماند)</p>

                        </div>
                    </div>
                    <div className="justify-content-center d-flex">
                        <Button className={`btn  ${styles.modalBtn}`}
                                variant="primary" onClick={handleCloseBuy}>
                            ثبت
                        </Button>
                    </div>
                </Modal.Body>

            </Modal>
        )
    }
    const SellOfferModal=()=>{
        return(
            <Modal className="rtl" show={showSell} onHide={handleCloseSell}>
                <Modal.Header closeButton>
                    <Modal.Title>ثبت پیشنهاد فروش</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSell}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseSell}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <Layout>
            <div className={styles.property}>
                <div className={styles.description}>
                    {/*<div className={` sticky-top ${styles.fixed}`}>*/}
                    <div className="position-sticky">
                        <div className={styles.texts}>
                            <div className={styles.line}>
                                <div>
                                    <p className="pl-3">

                                        {moment(propertyData["present_secondary_market"]["start_date_time"]).format('jYYYY/jM/jD')}
                                    </p>
                                </div>
                                <div className={`r-clock rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">شروع دوره سرمایه گذاری</p>
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className="">
                                    {/*<p className="pl-3">{data && data.data && data.data.data[0].id}</p>*/}
                                    <p className="pl-3">{data && data["use_types"] && data["use_types"]["name"]}</p>
                                </div>
                                <div className={`r-building-house-p rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">نوع ملک</p>
                                </div>

                            </div>

                            <div className={styles.line}>
                                <div className="">
                                    <p className="pl-3">{moment(propertyData["end_contract_time"]).format('jYYYY/jM/jD')}</p>
                                </div>
                                <div className={`r-calendar rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">تاریخ پایان سرمایه گذاری</p>
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className="">
                                    <p className="pl-3">6 ماه</p>
                                </div>
                                <div className={`r-clockloop rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">مدت باقی مانده</p>
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className="">
                                    <p className="pl-3">{moment(propertyData["end_contract_time"]).format('jYYYY/jM/jD')}</p>
                                </div>
                                <div className={`r-chart-diagram rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">نرخ بازده مورد انتظار</p>
                                </div>
                            </div>

                            <div className={`${styles.line} border-0`}>
                                <div className="">
                                    <p className="pl-3">{moment(propertyData["end_contract_time"]).format('jYYYY/jM/jD')}</p>
                                </div>
                                <div className={`r-users rtl d-flex align-items-center ${styles.rightPad}`}>
                                    <p className="pr-2">تعداد سرمایه گذاران تا الان</p>
                                </div>
                            </div>
                        </div>


                        <div className={styles.buttons}>
                            <button variant="primary" onClick={handleShowBuy} className={` ${styles.submitBtn} ${styles.buyButton}`}>ثبت
                                پیشنهاد خرید
                            </button>
                            {BuyOfferModal()}


                            <button variant="primary" onClick={handleShowSell} className={` ${styles.submitBtn} ${styles.sellButton}`}>ثبت پیشنهاد فروش</button>

                            {SellOfferModal()}

                        </div>
                    </div>


                </div>
                <div className={styles.rightSide}>
                    <div className="main">
                        <img
                            className={styles.mainImage}
                            src={`http://api.subkhoone.com${propertyData.images && propertyData.images.main && propertyData.images.main.original}`}
                            // src={`http://api.subkhoone.com${propertyData.images.main.original}`}
                            alt=""
                        />

                    </div>
                    <div className="slides">
                        <img
                            className={styles.slideImage}
                            src={`http://api.subkhoone.com${propertyData.images && propertyData.images.main && propertyData.images.main.original}`}
                            // src={`http://api.subkhoone.com${propertyData.images["1"].original}`}
                            alt=""
                        />
                    </div>
                    <div className={styles.secondaryDesc}>
                        <p className={styles.marketType}>بازار ثانویه</p>
                        <h3 className={styles.propertyName}>{propertyData.name}</h3>
                        <div className={`row ${styles.border}`}>
                            <div className={`col-lg-6 col-12 ${styles.buy}`}>
                                <div className="d-flex justify-content-end mt-4 pr-2">

                                    <h2 className={styles.sellTitle}>فروش</h2>
                                    <h2 className="r-money pl-2"></h2>
                                </div>
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                    <tr className={styles.borderNone}>
                                        <th scope="col">قیمت
                                            <div className={styles.tHeader}/>
                                        </th>
                                        <th scope="col">متراژ
                                            <div className={styles.tHeader}/>
                                        </th>
                                        <th scope="col">تعداد افراد
                                            <div className={styles.tHeader}/>
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        secondarySellOffers && secondarySellOffers.map(item => {
                                                return (
                                                    <tr key={item.id} className={styles.tableContent}>
                                                        <td>{item["price"]}</td>
                                                        <td> صاب {item["number_of_shares"]}</td>
                                                        <td>1</td>

                                                    </tr>
                                                )

                                            }
                                        )
                                    }

                                    </tbody>
                                </table>
                            </div>
                            <div className={`col-lg-6 col-12 ${styles.sell}`}>
                                <div className="d-flex justify-content-end mt-4 pr-2">

                                    <h2 className={styles.sellTitle}>خرید</h2>
                                    <h2 className="r-money pl-2"></h2>
                                </div>
                                <table className="table table-striped mt-4 text-center">
                                    <thead>
                                    <tr className={styles.borderNone}>
                                        <th scope="col">قیمت
                                            <div className={styles.tHeader}/>
                                        </th>

                                        <th scope="col">متراژ
                                            <div className={styles.tHeader}/>
                                        </th>
                                        <th scope="col">تعداد افراد
                                            <div className={styles.tHeader}/>
                                        </th>


                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        secondaryBuyOffers && secondaryBuyOffers.map(item => {
                                                return (
                                                    <tr key={item.id} className={styles.tableContent}>
                                                        <td>{item["price"]}</td>
                                                        <td> صاب {item["number_of_shares"]}</td>
                                                        <td>1</td>

                                                    </tr>
                                                )

                                            }
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>

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
        // Do whatever you want to transform the data
        return JSONbig.parse(config);
    }]
    const res = await axios.get(`http://api.subkhoone.com/api/assets/${id}`);
    // if (res && res.data){
    // let secondaryId = res.data["present_secondary_market"]["id"]
    let secondaryId = res.data.data["present_secondary_market"].id;
    console.log("secondaryId", secondaryId)

    const secondaryBuyOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/secondary_markets/${secondaryId}/secondary_buy_offers`);
    const secondarySellOffers = await axios.get(`http://api.subkhoone.com/api/assets/${id}/secondary_markets/${secondaryId}/secondary_sell_offers`);

    // }

    return {
        propertyData: res.data.data,
        secondaryBuyOffersProps: secondaryBuyOffers.data.data,
        secondarySellOffersProps: secondarySellOffers.data.data
    }

};

export default Secondary