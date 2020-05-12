import React, {Fragment} from 'react';
import "./FileCard.css";

// test cid QmW6iyTGihRKwX8xRXyZAD9kY1G4R5rY9QBEeGLTnTwFxp

function FileCard(props) {
    return(
        <Fragment>
            File hash: {props.hash}
        </Fragment>
    )
}

export default FileCard;