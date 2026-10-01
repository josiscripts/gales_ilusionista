import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { demoPhotos, demoVideos } from "@/lib/site";

export type VideoItem = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  duration: string | null;
  location: string | null;
  video_url: string;
  thumbnail_url: string | null;
  featured?: boolean;
};

export type PhotoItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
};

export function useVideos() {
  const query = useQuery({
    queryKey: ["videos"],
    queryFn: async (): Promise<VideoItem[]> => {
      const { data, error } = await supabase
        .from("videos")
        .select("id,title,category,description,duration,location,video_url,thumbnail_url,featured")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const items = query.data && query.data.length > 0 ? query.data : (demoVideos as VideoItem[]);
  return { ...query, items, isDemo: !query.data || query.data.length === 0 };
}

export function usePhotos() {
  const query = useQuery({
    queryKey: ["gallery_photos"],
    queryFn: async (): Promise<PhotoItem[]> => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("id,title,category,image_url")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const items = query.data && query.data.length > 0 ? query.data : (demoPhotos as PhotoItem[]);
  return { ...query, items };
}
