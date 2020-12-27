import styles from "../styles/marketProperty.module.css";

const OffersTable =({props,type})=>{
    // console.log("props from component: ",type)
    return(
        <div className={`col-lg-6 col-12 ${styles.sell}`}>
            <div className="d-flex justify-content-end mt-4 pr-2">

                <h2 className={styles.sellTitle}>{type}</h2>
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
                    props && props.map(item => {
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
    )
}

export default OffersTable;