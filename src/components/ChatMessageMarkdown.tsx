import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';

interface ChatMessageMarkdownProps {
  content: string;
  isStreaming?: boolean;
  onActionClick?: (url: string) => void;
}

/**
 * Professional, clean ChatGPT-inspired Markdown renderer for UCP Assistant.
 * Renders headings, bold, italic, bullet/numbered lists, responsive tables, blockquotes,
 * code blocks, and clickable action links safely.
 */
export const ChatMessageMarkdown: React.FC<ChatMessageMarkdownProps> = ({
  content,
  isStreaming = false,
  onActionClick,
}) => {
  if (!content) return null;

  // Pre-process: normalize unicode bullet characters (•, ●) to markdown hyphen lists (- )
  // and preserve clean double-line breaks for readable paragraphs.
  const normalized = content
    .replace(/^[ \t]*[•●][ \t]+/gm, '- ')
    .replace(/([^\n])\n([•●\-\d])/g, '$1\n\n$2');

  return (
    <div className="chat-markdown-root font-sans text-[13.5px] sm:text-[14px] leading-relaxed text-slate-800 break-words select-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0A1931] border-b border-slate-200 pb-1 mt-3.5 mb-2 first:mt-0 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0A1931] border-b border-slate-200/80 pb-1 mt-3 mb-2 first:mt-0 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-[#0A1931] mt-2.5 mb-1.5 first:mt-0 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-[12.5px] sm:text-[13px] font-semibold text-[#0A1931] mt-2 mb-1 first:mt-0">
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-800 mb-2.5 last:mb-0">
              {children}
            </p>
          ),

          // Bold & Emphasis
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 tracking-tight">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-700">
              {children}
            </em>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1 text-[13.5px] sm:text-[14px] text-slate-800 marker:text-[#0A1931]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1 text-[13.5px] sm:text-[14px] text-slate-800 marker:font-semibold marker:text-[#0A1931]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-0.5 leading-relaxed">
              {children}
            </li>
          ),

          // Responsive Tables for Fee Structures, Schedules & Comparison Data
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-slate-200 shadow-2xs bg-white">
              <table className="min-w-full text-left text-xs divide-y divide-slate-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#0A1931] text-white">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-150 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/80 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 font-semibold text-white tracking-wide text-xs whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-slate-700 text-xs whitespace-normal leading-normal">
              {children}
            </td>
          ),

          // Blockquotes for Important Notices & Warnings
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 pl-3.5 py-1.5 border-l-[3px] border-[#0A1931] bg-slate-50 text-slate-700 text-[13px] rounded-r-md">
              {children}
            </blockquote>
          ),

          // Action Links
          a: ({ href, children }) => {
            return (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (href && onActionClick) {
                    onActionClick(href);
                  }
                }}
                className="inline-flex items-center gap-0.5 text-[#0A1931] font-semibold underline underline-offset-2 hover:text-[#1E3A66] cursor-pointer"
              >
                <span>{children}</span>
                <ExternalLink size={11} className="inline ml-0.5 opacity-70" />
              </button>
            );
          },

          // Code blocks and inline code
          code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-mono text-[#0A1931] font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-3 my-2 rounded-lg bg-[#0A1931] text-slate-100 text-xs font-mono overflow-x-auto border border-slate-700">
                <code {...props}>{children}</code>
              </pre>
            );
          },

          // Horizontal rule
          hr: () => <hr className="my-3 border-slate-200" />
        }}
      >
        {normalized}
      </ReactMarkdown>

      {/* Streaming cursor */}
      {isStreaming && (
        <span className="inline-block w-1.5 h-3.5 bg-[#0A1931] ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
};

export default ChatMessageMarkdown;
