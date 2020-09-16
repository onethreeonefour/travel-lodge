import React, { useState } from 'react'
import { Typography, Button, Form, Input,} from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';


const { Title } = Typography;
const { TextArea } = Input;
const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Asia" },
    { key: 3, value: "Australia" },
    { key: 4, value: "Europe" },
    { key: 5, value: "North America" },
    { key: 6, value: "South America" },
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);
    const [Images, setImages] = useState([])

    const onTitleChange = (e) => {
        setTitleValue(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescriptionValue(e.currentTarget.value);
    }

    const onPriceChange = (e) => {
        setPriceValue(e.currentTarget.value);
    }
    const onContinentSelectChange = (e) => {
        setContinentValue(e.currentTarget.value);
    }
    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('You must fill out all of the fields before submitting')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
        }
        Axios.post('/api/product/uploadProduct', variables)
            .then(res => {
                if (res.data.success) {
                    alert('Product has been uploaded!');
                    props.history.push('/');

                } else {
                    alert("Fail to upload product")
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Title level={2}>Upload Travel Product</Title>
            <Form onSubmit={onSubmit}>
                {/*File Upload*/}
                <FileUpload refreshFunction={updateImages} />

                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                    required
                />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                    required
                />
                <label>Price</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                    required
                />
                <select onChange={onContinentSelectChange}>
                    {Continents.map(item =>
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                    )}
                </select>
                <Button onClick={onSubmit}>Submit</Button>
            </Form>
        </div>

    )
}

export default UploadProductPage
