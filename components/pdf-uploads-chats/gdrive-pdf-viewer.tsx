import React from 'react';

interface GoogleDrivePDFViewerProps {
    fileId?: string;
    width?: string;
    height?: string;
}

const GoogleDrivePDFViewer: React.FC<GoogleDrivePDFViewerProps> = ({
    fileId,
    width = '100%',
    height = '555px',
}) => {
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
        <iframe
            src={previewUrl}
            width={width}
            height={height}
            allow="autoplay"
            title="Google Drive PDF"
            style={{ border: 'none' }}
        />
    );
};

export default GoogleDrivePDFViewer;
