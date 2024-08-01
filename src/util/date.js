export default function parseDate(tdate) {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);

  if (diff < 20) {
    return diff + ' 초 전';
  }

  if (diff <= 90) {
    return '1분 전';
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + ' 분 전';
  }
  if (diff <= 5400) {
    return '1 hour ago';
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + ' 시간 전';
  }
  if (diff <= 129600) {
    return '1 day ago';
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + ' 일 전';
  }
  if (diff <= 777600) {
    return '1주일 전';
  }
  const month = created.toLocaleDateString('default', { month: 'long' });
  return `on ${month} ${created.getDate()}`;
}
