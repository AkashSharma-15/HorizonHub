import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
function UserDashBoard() {
    return (
        <Layout title=' User dashboard-HorizonHub'>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                       
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashBoard
