import React    from 'react';
import FileCard from './FileCard';
import "./Bookshelf.css";

function Bookshelf(props) {
    return(
        <div className="Bookshelf">
            {
                props.fileInfo.map(info => (
                    <div className="filecard">
                        <FileCard 
                            // FIXME variable name mismatch
                            prevHash={info.preview_ipfs_hash} 
                            hash={info.main_ipfs_hash} 
                            name={info.filename} 
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Bookshelf;