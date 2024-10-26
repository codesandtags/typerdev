import React from 'react';
import {
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface ResultShareProps {
  url: string;
  message: string;
}

const ResultShare: React.FC<ResultShareProps> = ({ url, message }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Share Your Results</h2>
      <div className="flex space-x-4 mt-2">
        <TwitterShareButton url={url} title={message}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} summary={message}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default ResultShare;
