import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature'
import { continents, price } from './Sections/Data'
import Logo from './lodge.png'

const { Meta } = Card;
function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")


    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {

        const variable = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variable)
    }, [])

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`}> <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>

    })

    const getProducts = (variable) => {
        Axios.post('api/product/getProducts', variable)
            .then(res => {
                if (res.data.success) {
                    if (variable.loadMore) {
                        setProducts([...Products, ...res.data.products])
                    } else {
                        setProducts(res.data.products)
                    }

                    setPostSize(res.data.postSize);
                    //console.log(res.data.postSize)
                }
                else {
                    alert("Failed to fetch data")
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }


    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {
        //console.log(filters)

        const newFilters = { ...Filters }
        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues;
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto', backgroundColor: '#DCE1DE', padding: '3rem', borderRadius: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
                <img src={Logo} alt="mainLogo"></img>
                <h2>Let's Experience The World! <Icon type="rocket"></Icon></h2>
            </div>
            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox
                        list={continents}
                        handleFilters={filters => handleFilters(filters, "continents")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>


            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "1rem auto" }}>
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Nothing here yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button type="primary" onClick={onLoadMore}>Load More</Button>
                </div>
            }

        </div>
    )
}

export default LandingPage
