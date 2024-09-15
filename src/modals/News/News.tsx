import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface NewsProps {
  onClose: () => void;
}

const News: React.FC<NewsProps> = ({ onClose }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch('/assets/text/news.md');
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <>
      <ReactMarkdown className="p-4 prose max-w-none text-text bg-secondary-highlight">
        {markdownContent}
      </ReactMarkdown>

      <div className="flex justify-end w-full mt-2">
        <Button onClick={onClose} type='confirm' text='okay' />
      </div>
    </>
  );
};

export default News;