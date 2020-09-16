import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input;

function SearchFeature(props) {
    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (e) => {
        setSearchTerms(e.currentTarget.value)
        props.refreshFunction(e.currentTarget.value)
    }   

    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search here.."
            />

        </div>
    )
}

export default SearchFeature
