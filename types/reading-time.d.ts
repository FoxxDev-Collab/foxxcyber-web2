declare module 'reading-time' {
  interface ReadingTimeStats {
    text: string;
    time: number;
    words: number;
    minutes: number;
  }

  function readingTime(text: string): ReadingTimeStats;
  export = readingTime;
} 