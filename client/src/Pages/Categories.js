import React from 'react';
import Layout from '../Components/Layout/Layout';
import useCategory from '../Hooks/useCategory';
import { Link } from 'react-router-dom';
import '../Styles/Categories.css'

function Categories() {
    const categories = useCategory();

    return (
        <Layout title="All Categories">
            <div className="container categories-container">
                <h1 className='text-center' style={{ marginTop: "-70px" }}>All Categories</h1>
            <div className="row">
                {categories.map((c) => (
                    <div className="col-md-4 mt-4" key={c._id}>
                        <div className="card category-card">
                            <Link to={`/category/${c.slug}`} className="btn cat-btn">
                                {c.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
}

export default Categories;
