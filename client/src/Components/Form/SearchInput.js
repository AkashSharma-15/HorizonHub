import React from 'react'
import { useSearch } from '../../Context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function SearchInput() {
    const navigate = useNavigate()
    const [values, setValues] = useSearch()
    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className="d-flex search-form" role='search' onSubmit={handleSearch}>
                <input className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />

                <button
                    className="btn btn-outline-success"
                    type="submit">
                    Search</button>
            </form>
        </div>
    )
}

export default SearchInput
