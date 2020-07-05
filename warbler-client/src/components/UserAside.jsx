import React from "react";
import DefaultProfileImage from "../assets/images/default-profile-image.jpg";
import PropTypes from "prop-types";

const UserAside = ({ profileImage, username }) => {
    return (
        <aside className='col-sm-2'>
            <div className='panel-default'>
                <div className='panel-body'>
                    <img
                        src={profileImage || DefaultProfileImage}
                        alt={`${username}'s Avatar`}
                        className={"img-thumbnail"}
                        width={250}
                        height={250}
                    />
                </div>
            </div>
        </aside>
    );
};

UserAside.propTypes = {
    username: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
};

export default UserAside;
