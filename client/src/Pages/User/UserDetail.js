/* eslint-disable react/display-name */
import React from 'react';
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {  useHistory } from "react-router-dom";



const UserDetail = () => {
    let { id } = useParams();
    let history = useHistory();
    const goToEdit = () => {
        console.log();
        history.push({
            pathname: "/users/edit/"+ id,
            state: { id: 10 },
        });
    };
    return (
        <Card
            key={id}
            style={{ width: "50vw" }}
            title="User Details"
            actions={[
                <EditOutlined
                    key="edit"
                    onClick={() => {
                        goToEdit();
                    }}
                />,
            ]}
        >
            <div>
                <p>
                    User Name : Fahim
                </p>
                <p>
                    User Phone Number : 080-878-7878
                </p>
                <p>
                    User Email : fahimforhad@gmail.com
                </p>
            </div>
        </Card>
    );
};

export default UserDetail;
