import React from 'react';
import PDF from '../components/PDF';

const styles = {
    image: {
        maxHeight: "100%",
        maxWidth: "100%"
    }
}

function getPreviewContent(buffer, type){
    if(type === 'text') return buffer.toString();
    else if(type === 'image') {
        console.log(buffer);
        let previewContent = 'data:image/jpeg;base64,' + buffer.toString('base64')
        return (
            <img 
                src={previewContent} 
                style={styles.image}
            />
        );
    }
    else if(type === 'pdf') {
        return <PDF file={{data:buffer}} />;
    }
}

export { getPreviewContent };