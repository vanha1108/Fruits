import React from 'react'

const BannerProductDetail = ({nameP}) => {
    return (
        <section id="banner-product-detail" className="position-relative d-flex align-items-center">
            <div className="container">
                <div className="fw-bolder text-white d-inline card px-4 py-2" style={{ fontSize: "5rem",backgroundColor:'#0e0d0d73' }}>{nameP}</div>
            </div>
            
            <div className="cloud-bn"></div>
        </section>
    )
}

export default BannerProductDetail
