import React, {useState} from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "../styles/ImagePicker.module.css";

const ImagePicker = ({propertyData}) => {

    let image1 = `http://api.subkhoone.com${propertyData.images && propertyData.images.main && propertyData.images.main.original}`
    let image2 = `http://api.subkhoone.com${propertyData.images && propertyData.images["1"] && propertyData.images["1"].original}`
    let image3 = `http://api.subkhoone.com${propertyData.images && propertyData.images["2"] && propertyData.images["2"].original}`
    let image4 = `http://api.subkhoone.com${propertyData.images && propertyData.images["3"] && propertyData.images["3"].original}`
    let image5 = `http://api.subkhoone.com${propertyData.images && propertyData.images["4"] && propertyData.images["4"].original}`

    const [mainImage,setMainImage] = useState(image1)

    return (
        <div >
            <div className={styles.mainImage}>
                <div className={styles.slickRelative}>
                    <img src={mainImage} alt=""/>
                    <span className={styles.slickBadge}>
                    بازار ثانویه
                </span>
                </div>
            </div>
            <div className={styles.slider}>
                <img src={image1} alt=""
                     onClick={()=>setMainImage(image1)}
                />
                {image2 &&
                <img src={image2} alt=""
                    onClick={()=>setMainImage(image2)}
                />
                }
                {image3 &&
                <img src={image3} alt=""
                     onClick={()=>setMainImage(image3)}
                />
                }
                {image4 &&
                <img src={image4} alt=""
                     onClick={()=>setMainImage(image4)}
                />
                }
                {image5 &&
                <img src={image5} alt=""
                     onClick={()=>setMainImage(image5)}
                />
                }
            </div>

            {/*<Carousel>*/}
            {/*    {*/}
            {/*        image1 &&*/}
            {/*        <div>*/}
            {/*            <img*/}
            {/*                src={image1}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        image2 &&*/}
            {/*        <div>*/}
            {/*            <img*/}
            {/*                src={image2}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        image3 &&*/}
            {/*        <div>*/}
            {/*            <img*/}
            {/*                src={image3}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        image4 &&*/}
            {/*        <div>*/}
            {/*            <img*/}
            {/*                src={image4}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        image5 &&*/}
            {/*        <div>*/}
            {/*            <img*/}
            {/*                src={image5}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</Carousel>*/}
        </div>
    );
};

export default ImagePicker;