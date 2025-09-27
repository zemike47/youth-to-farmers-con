// ../types/video.ts
export interface Video {
  video_id: number | string;
  title: string;
  description: string;
  video_url?: string | null;
  thumbnail_url?: string | null;
}
