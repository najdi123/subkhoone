import axios from "axios";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/secondaryMarketProperty.module.css"
import moment from 'moment-jalaali';
import {useState, useContext, useEffect} from 'react'
import React from "react";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {DataContext} from "../../../../context/DataContext";
import JSONbig from 'json-bigint';
import ApiReq from "../../../../helpers/ApiReq";
import {useCookies} from "react-cookie";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"


function Secondary({propertyData, secondaryBuyOffersProps, secondarySellOffersProps}) {
    const {data} = useContext(DataContext);

    const [secondaryBuyOffers, setSecondaryBuyOffers] = useState()
    const [secondarySellOffers, setSecondarySellOffers] = useState()
    useEffect(() => {
        setSecondaryBuyOffers(secondaryBuyOffersProps)
        setSecondarySellOffers(secondarySellOffersProps)
    }, [secondaryBuyOffersProps])
    console.log("secondary propertyData: ", propertyData)

    const [showBuy, setShowBuy] = useState(false);
    const [showSell, setShowSell] = useState(false);

    const handleCloseBuy = () => setShowBuy(false);
    const handleShowBuy = () => setShowBuy(true);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);


    const [cookies, setCookie] = useCookies(['token']);
    const SubmitBuyOffer = async (e) => {
        e.preventDefault()
        const config = {
            body: {
                "secondary_buy_offer": {
                    "number_of_shares": "10",
                    "hidden_price": "43000",
                    "price": 5342
                }
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
            method: 'POST',
            url: `https://api.subkhoone.com/api/assets/${propertyData.id}/secondary_markets/${propertyData["present_secondary_market"].id}/secondary_buy_offers`,
        };

        const res = await ApiReq(config)
        console.log("submit buy offer res: ", res)
    }

    const [inputRange, setInputRange] = useState({
        value: propertyData["present_secondary_market"]["low_price"],
    })
    const [buyOffer, setBuyOffer] = useState({
        subs: 0,
        price: inputRange.value,
        hiddenPrice: 0
    })

    const BuyOfferModal = () => {

        // console.log("buyOffer inputRange: ", inputRange)
        // console.log("buyOffer: ", buyOffer)
       return (
            <Modal className="rtl " show={showBuy} onHide={handleCloseBuy}>
                <Modal.Header className={styles.borderBottomNone} closeButton>
                    <Modal.Title className={`r-hands-and-gestures ${styles.modalHeaderIcon}`}>ثبت پیشنهاد
                        خرید</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <h4 className={`text-center ${styles.modalBodyTitle}`}>مشخص کردن ارقام</h4>
                    <div className="d-flex justify-content-center align-items-center mb-4 row ">
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0">
                            <p className={styles.modalText}>ثبت پیشنهاد خرید</p>
                            <div className={styles.autoCalcInputBox}>
                                <input
                                    className={styles.numericInput}
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    value={buyOffer.subs}
                                    onChange={e => setBuyOffer({...buyOffer, subs: e.target.value})}
                                />

                            </div>
                            <p className={styles.modalText}>صاب به قیمت هر صاب</p>
                        </div>
                        {/*<label htmlFor="formControlRange">Example Range input</label>*/}
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0">
                            <div className={styles.popupRange}>
                                <div className={styles.inputRange}>

                                    <InputRange
                                        className={`form-control-range ltr mb-2`}
                                        maxValue={propertyData["present_secondary_market"]["high_price"]}
                                        minValue={propertyData["present_secondary_market"]["low_price"]}
                                        value={inputRange.value}
                                        // onChange={(e)=>setBuyOffer({...buyOffer,rangeValue: e.target.value})}
                                        onChange={value => setInputRange({value})}
                                    />

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

                                <input
                                    className={styles.numericInput}
                                    type="number" id="quantity"
                                    name="quantity" min="1"
                                    value={buyOffer.hiddenPrice}
                                    onChange={e => setBuyOffer({...buyOffer, hiddenPrice: e.target.value})}
                                />
                            </div>
                            <p className={styles.modalText}>
                                میلیون تومان
                            </p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center col-md-7 col-12 p-0">
                            <p className={styles.modalTextSmall}> (این قیمت به صورت محرمانه تا زمان پایان بازار ثانویه
                                محفوظ می ماند)</p>

                        </div>
                    </div>
                    <div className="justify-content-center d-flex">
                        <div onClick={SubmitBuyOffer}>
                            <Button className={`btn  ${styles.modalBtn}`}
                                    variant="primary" onClick={handleCloseBuy}>
                                ثبت
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        )
    }
    const SellOfferModal = () => {
        return (
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

    let image1 = `http://api.subkhoone.com${propertyData.images && propertyData.images.main && propertyData.images.main.original}`
    let image2 = `http://api.subkhoone.com${propertyData.images && propertyData.images["1"] && propertyData.images["1"].original}`
    let image3 = `http://api.subkhoone.com${propertyData.images && propertyData.images["2"] && propertyData.images["2"].original}`
    let image4 = `http://api.subkhoone.com${propertyData.images && propertyData.images["3"] && propertyData.images["3"].original}`
    let image5 = `http://api.subkhoone.com${propertyData.images && propertyData.images["4"] && propertyData.images["4"].original}`

    return (
        <Layout>
            <div className={styles.property}>
                <div className={styles.description}>
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
                            <button variant="primary" onClick={handleShowBuy}
                                    className={` ${styles.submitBtn} ${styles.buyButton}`}>ثبت
                                پیشنهاد خرید
                            </button>
                            {BuyOfferModal()}


                            <button variant="primary" onClick={handleShowSell}
                                    className={` ${styles.submitBtn} ${styles.sellButton}`}>ثبت پیشنهاد فروش
                            </button>

                            {SellOfferModal()}

                        </div>
                    </div>


                </div>
                <div className={styles.rightSide}>
                    <div className={styles.carousel}>
                        <Carousel>
                            {
                                image1 &&
                                <div>
                                    <img
                                        src={image1}
                                    />
                                </div>
                            }
                            {
                                image2 &&
                                <div>
                                    <img
                                        src={image2}
                                    />
                                </div>
                            }
                            {
                                image3 &&
                                <div>
                                    <img
                                        src={image3}
                                    />
                                </div>
                            }
                            {
                                image4 &&
                                <div>
                                    <img
                                        src={image4}
                                    />
                                </div>
                            }
                            {
                                image5 &&
                                <div>
                                    <img
                                        src={image5}
                                    />
                                </div>
                            }
                        </Carousel>
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