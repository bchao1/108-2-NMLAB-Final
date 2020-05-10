import React    from 'react';
import FileCard from './FileCard';
import "./Bookshelf.css";

function Bookshelf(props) {
    return(
        <div className="Bookshelf">
            {
                props.fileInfo.map(info => (
                    <div className="filecard">
                        <FileCard prevHash={info.prevHash} hash={info.hash} name={info.name} />
                    </div>
                ))
            }
        </div>
    )
}

export default Bookshelf;