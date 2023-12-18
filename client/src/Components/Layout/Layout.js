import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';
function Layout({ children, description, title, author, keywords }) {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '70vh' }}>  {children}</main>
            <Toaster />
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: 'HorizonHub-Shop Now',
    description: 'MERN STACK',
    keywords: 'MERN REACT NODE',
    author: 'Akash'
}
export default Layout
