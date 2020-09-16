
import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>

            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '250px' }}
                            src={`https://radiant-sands-30411.herokuapp.com/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider