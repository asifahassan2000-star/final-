import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageMarkdownProps {
  content: string;
  isStreaming?: boolean;
  onActionClick?: (url: string) => void;
}

export const ChatMessageMarkdown: React.FC<ChatMessageMarkdownProps> = ({
  content,
  isStreaming,
  onActionClick,
}) => {
  return (
    <div className="prose prose-sm max-w-none text-slate-800 break-words leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const isActionLink = href && (href.startsWith('#') || href.startsWith('/'));
            return (
              <a
                href={href}
                onClick={(e) => {
                  if (isActionLink && onActionClick && href) {
                    e.preventDefault();
                    onActionClick(href);
                  }
                }}
                className="text-[#0A1931] font-semibold underline decoration-amber-400 hover:text-amber-600 transition-colors cursor-pointer"
                target={isActionLink ? undefined : '_blank'}
                rel={isActionLink ? undefined : 'noopener noreferrer'}
              >
                {children}
              </a>
            );
          },
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-[13.5px] sm:text-[14px]">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 pl-3 my-2 text-slate-600 italic bg-amber-50/50 py-1 rounded-r">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-slate-100 px-3 py-2 text-left font-semibold text-slate-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-t border-slate-100 text-slate-700">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ) : (
              <pre className="bg-slate-900 text-white p-3 rounded-lg overflow-x-auto my-2 text-xs font-mono">
                <code>{children}</code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse align-middle" />
      )}
    </div>
  );
};
