// Profile.jsx
import React from 'react';
import styles from '../Profile/Profile.module.scss';
import avatar from '../../../../assets/imgs/ava.jpg'

function Profile() {
    return (
        <div >
            <div className={styles.column}>
                <div className={styles.profile}>
                    <img src={avatar} alt="avatar" className={styles.avatar} />
                    <hr className={styles.line} /> {/* Thêm đường gạch ngang */}
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;
