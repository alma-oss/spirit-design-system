import { Button } from '@alma-oss/spirit-web-react';
import { useState } from 'react';

interface PlaygroundCodeProps {
  codeLines: string[];
}

const PlaygroundCode = ({ codeLines }: PlaygroundCodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeLines.join('\n'));
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="ComponentPlayground__code">
      <pre className="ComponentPlayground__snippet typography-code-small-regular">
        <code>{codeLines.join('\n')}</code>
      </pre>
      <div className="ComponentPlayground__copy">
        <Button color="secondary" size="small" onClick={copyCode}>
          {isCopied ? 'Copied' : 'Copy code'}
        </Button>
      </div>
    </div>
  );
};

export default PlaygroundCode;
