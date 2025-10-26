import "../styles/ImageHolder.css"
import PhotoUploader from "./Extras/PhotoUploader";

const ImageHolder = () => {
    
    return (
        <div className="main">
            <div className="scroll-buttons">
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
            <div className="content-container">
                <PhotoUploader></PhotoUploader>
            </div>
        </div>
    );
    
    }
    
export default ImageHolder;