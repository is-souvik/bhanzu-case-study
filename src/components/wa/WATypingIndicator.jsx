export default function WATypingIndicator() {
  return (
    <div className="flex justify-start px-3 py-1">
      <div
        className="rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center"
        style={{ background: '#FFFFFF', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}
