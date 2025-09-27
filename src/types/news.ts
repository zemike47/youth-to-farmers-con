// ../types/news.ts

export interface News {
  news_id: number; // primary key (from DB)
  media_url: string | null; // uploaded file path
  title: string; // required
  article: string; // required
  user_id: number; // author (foreign key)
  organization_id?: number; // optional org (foreign key)
  minutes_to_read?: number; // optional, computed or provided
  category_id?: number; // optional category (foreign key)
  status: "draft" | "published" | "archived"; // enforce valid states
  created_at: Date; // DB timestamp
  updated_at: Date;
}
