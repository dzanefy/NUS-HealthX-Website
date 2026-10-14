// Optimized WebP variants in Supabase Storage. Original photographs are retained.
export type TeamPhotoSource = { src: string; srcSet: string; width: number; height: number };

const teamPhotos: Record<string, TeamPhotoSource> = {
  "lucien-leong-guang-shian.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/lucien-leong-guang-shian-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/lucien-leong-guang-shian-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/lucien-leong-guang-shian-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "ng-chen-meng.png": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ng-chen-meng-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ng-chen-meng-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ng-chen-meng-960.webp 576w",
    "width": 576,
    "height": 864
  },
  "eugene-chua.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/eugene-chua-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/eugene-chua-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/eugene-chua-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "claire-hartawan.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/claire-hartawan-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/claire-hartawan-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/claire-hartawan-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "elkan-chua.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/elkan-chua-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/elkan-chua-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/elkan-chua-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "ning-wanqing.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ning-wanqing-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ning-wanqing-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ning-wanqing-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "ellen-indraputri.png": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ellen-indraputri-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ellen-indraputri-480.webp 321w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/ellen-indraputri-960.webp 577w",
    "width": 577,
    "height": 864
  },
  "vedika-binani.png": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/vedika-binani-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/vedika-binani-480.webp 321w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/vedika-binani-960.webp 577w",
    "width": 577,
    "height": 864
  },
  "hemil-batavia.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hemil-batavia-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hemil-batavia-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hemil-batavia-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "esha-kejriwal.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/esha-kejriwal-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/esha-kejriwal-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/esha-kejriwal-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "jessica-chen.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jessica-chen-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jessica-chen-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jessica-chen-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "danial-zanefy.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/danial-zanefy-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/danial-zanefy-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/danial-zanefy-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "darren-chung.png": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/darren-chung-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/darren-chung-480.webp 480w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/darren-chung-960.webp 924w",
    "width": 924,
    "height": 864
  },
  "jon-yew.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jon-yew-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jon-yew-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/jon-yew-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "hibiki-nishiwaki.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hibiki-nishiwaki-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hibiki-nishiwaki-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/hibiki-nishiwaki-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "kavya-frances-thiagarajan.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/kavya-frances-thiagarajan-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/kavya-frances-thiagarajan-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/kavya-frances-thiagarajan-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "fatimah-rehman.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/fatimah-rehman-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/fatimah-rehman-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/fatimah-rehman-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "filip-tudose.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/filip-tudose-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/filip-tudose-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/filip-tudose-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "mohamad-naufal-hakeem.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/mohamad-naufal-hakeem-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/mohamad-naufal-hakeem-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/mohamad-naufal-hakeem-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "wesley-ong.jpg": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/wesley-ong-480.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/wesley-ong-480.webp 320w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/wesley-ong-960.webp 640w",
    "width": 640,
    "height": 960
  },
  "healthx-team-2026-2027.png": {
    "src": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/healthx-team-2026-2027-960.webp",
    "srcSet": "https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/healthx-team-2026-2027-960.webp 960w, https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/optimized/v1/healthx-team-2026-2027-1920.webp 1920w",
    "width": 1920,
    "height": 1274
  }
};

export default teamPhotos;
