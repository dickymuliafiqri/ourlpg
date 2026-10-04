export function formatTimeAgo(date: Date) {
  const now = new Date().getTime();
  const diff = Math.floor((now - date.getTime()) / 1000); // detik

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (days > 0) return `${days} hari`;
  if (hours > 0) return `${hours} jam`;
  if (minutes > 0) return `${minutes} menit`;
  return `${diff} detik`;
}
