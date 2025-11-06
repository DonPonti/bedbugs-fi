import React, { useEffect } from 'react';

interface DisqusCommentsProps {
  shortname: string;
  url: string;
  identifier: string;
  title: string;
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({ shortname, url, identifier, title }) => {
  useEffect(() => {
    // @ts-ignore
    window.disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    const script = document.createElement('script');
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const disqusScript = document.querySelector(`script[src*="${shortname}.disqus.com/embed.js"]`);
      if (disqusScript) {
        document.body.removeChild(disqusScript);
      }
      // Reset config
      // @ts-ignore
      delete window.disqus_config;
      
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        while (disqusThread.firstChild) {
            disqusThread.removeChild(disqusThread.firstChild);
        }
      }
    };
  }, [shortname, url, identifier, title]);

  return (
    <div id="disqus_thread" className="min-h-[300px]"></div>
  );
};
