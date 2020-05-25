import React    from 'react';
import FileCard from './FileCard';
import "./Bookshelf.css";

function Bookshelf(props) {
    return(
        <div className="Bookshelf">
            {
                props.fileInfo.map((info, idx) => (
                    <FileCard key={idx} prevHash={info.prevHash} hash={info.hash} name={info.name} />
                ))
            }
        </div>
    )
}

export default Bookshelf;