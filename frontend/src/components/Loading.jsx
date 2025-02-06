function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="border-surface-100 border-t-primary-600 relative z-10 h-12 w-12 animate-spin rounded-full border-4"
        role="status"
        aria-label="Loading..."
      />
    </div>
  );
}

export default Loading;
