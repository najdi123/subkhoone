import styles from "../styles/secondaryMarketProperty.module.css";
import moment from "moment-jalaali";
import Modal from "react-bootstrap/Modal";
import InputRange from "react-input-range";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";


const SubmitOffersTable = ({propertyData,data}) => {
    const [cookies, setCookie] = useCookies(['token']);

    const [showBuy, setShowBuy] = useState(false);
    const [showSell, setShowSell] = useState(false);

    const handleCloseBuy = () => setShowBuy(false);
    const handleShowBuy = () => setShowBuy(true);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);


    const [buyInputRange, setBuyInputRange] = useState({
        value: propertyData["present_secondary_market"]["low_price"],
    })
    const [buyOffer, setBuyOffer] = useState({
        subs: 0,
        price: buyInputRange.value,
        hiddenPrice: 0
    })
    const [sellInputRange, setSellInputRange] = useState({
        value: propertyData["present_secondary_market"]["low_price"],
    })
    const [sellOffer, setSellOffer] = useState({
        subs: 0,
        price: sellInputRange.value,
        hiddenPrice: 0
    })
    const SubmitBuyOffer = async (e) => {
        e.preventDefault()
        const config = {
            data: {
                "secondary_buy_offer": {
                    "number_of_shares": buyOffer.subs+"",
                    "hidden_price": buyOffer.hiddenPrice+"",
                    "price": buyInputRange.value
                }
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
            method: 'POST',
            url: `https://api.subkhoone.com/api/assets/${propertyData.id}/secondary_markets/${propertyData["present_secondary_market"].id}/secondary_buy_offers`,
            // url:'https://api.subkhoone.com/api/assets/615893000762523649/secondary_markets/617046721635713025/secondary_buy_offers'
        };
        console.log("config: ",config)
        // const res = await ApiReq(config)
        let res;
        try {
            res = await axios(config)
            console.log("submit buy offer res: ", res);
            return res
        } catch (error) {
            console.log("error secondary offer", error);
        }
        // console.log("submit buy offer res: ", res)
    }
    const SubmitSellOffer = async (e) => {
        e.preventDefault()
        const config = {
            data: {
                "secondary_sell_offer": {
                    "number_of_shares": sellOffer.subs+"",
                    "hidden_price": sellOffer.hiddenPrice+"",
                    "price": sellInputRange.value
                }
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
            method: 'POST',
            url: `https://api.subkhoone.com/api/assets/${propertyData.id}/secondary_markets/${propertyData["present_secondary_market"].id}/secondary_sell_offers`,

        };
        // console.log("config: ",config)
        // const res = await ApiReq(config)
        let res;
        try {
            res = await axios(config)
            console.log("submit sell offer res: ", res);
            return res
        } catch (error) {
            console.log("error secondary sell offer", error);
        }
        // console.log("submit buy offer res: ", res)
    }
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
                                        value={buyInputRange.value}
                                        // onChange={(e)=>setBuyOffer({...buyOffer,rangeValue: e.target.value})}
                                        onChange={value => setBuyInputRange({value})}
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
                <Modal.Body className={styles.modalBody}>
                    <h4 className={`text-center ${styles.modalBodyTitle}`}>مشخص کردن ارقام</h4>
                    <div className="d-flex justify-content-center align-items-center mb-4 row ">
                        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0">
                            <p className={styles.modalText}>ثبت پیشنهاد فروش</p>
                            <div className={styles.autoCalcInputBox}>
                                <input
                                    className={styles.numericInput}
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    value={sellOffer.subs}
                                    onChange={e => setSellOffer({...sellOffer, subs: e.target.value})}
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
                                        value={sellInputRange.value}
                                        onChange={value => setSellInputRange({value})}
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
                                    value={sellOffer.hiddenPrice}
                                    onChange={e => setSellOffer({...sellOffer, hiddenPrice: e.target.value})}
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
                        <div onClick={SubmitSellOffer}>
                            <Button className={`btn  ${styles.modalBtn}`}
                                    variant="primary" onClick={handleCloseSell}>
                                ثبت
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    return (
        <div className={styles.table}>
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
    );
};

export default SubmitOffersTable;