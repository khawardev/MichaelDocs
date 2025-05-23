export default function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ${diffInSeconds > 0 ? 'from now' : 'ago'}`;
        }
    }
    return 'just now';
}