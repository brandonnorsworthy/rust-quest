import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  markdownFile: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownFile }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(markdownFile);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    };

    loadMarkdown();
  }, [markdownFile]);

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <ReactMarkdown className="prose max-w-none">
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
