import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  AudioLines,
  Feather,
  Film,
  Gem,
  LayoutTemplate,
  Library,
  MessagesSquare,
  Orbit,
  Presentation,
  Scissors,
  Search,
} from "lucide-react";

export type CategoryId = "think" | "create" | "speed";

export type Tool = {
  id: string;
  name: string;
  category: CategoryId;
  line: string;
  when: string;
  prompt: string;
  href: string;
  icon: LucideIcon;
};

export type Job = {
  id: string;
  title: string;
  blurb: string;
  steps: string[];
};

export const categories: { id: CategoryId; label: string; note: string }[] = [
  {
    id: "think",
    label: "Tư duy & công việc",
    note: "Viết, lập trình, đọc tài liệu dài và bắt xu hướng.",
  },
  {
    id: "create",
    label: "Thiết kế & sáng tạo",
    note: "Ảnh, poster, slide và video ngắn.",
  },
  {
    id: "speed",
    label: "Nâng hiệu suất",
    note: "Nghiên cứu có nguồn, thuyết trình và giọng đọc.",
  },
];

export const tools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "think",
    line: "Viết nội dung, lập trình, phân tích và lên ý tưởng.",
    when: "Cần bản nháp nhanh: dàn ý, caption, email, đoạn code.",
    prompt:
      "Viết dàn ý video 8 phút về [chủ đề]. Giọng gần gũi, hook trong 3 giây đầu, 3 ý chính, CTA cuối. Không bịa số liệu.",
    href: "https://chatgpt.com",
    icon: MessagesSquare,
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "think",
    line: "Nghiên cứu, tổng hợp tài liệu và hỗ trợ công việc.",
    when: "Cần gom nhiều nguồn trong hệ sinh thái Google thành một bản tóm.",
    prompt:
      "Tổng hợp 5 ý chính về [chủ đề] cho người bán hàng online. Mỗi ý một câu. Ghi rõ chỗ nào còn chưa chắc.",
    href: "https://gemini.google.com",
    icon: Gem,
  },
  {
    id: "grok",
    name: "Grok",
    category: "think",
    line: "Tìm kiếm thông tin và phân tích xu hướng.",
    when: "Muốn biết người ta đang bàn gì, trước khi viết bài hoặc làm video.",
    prompt:
      "Tuần này người ta đang nói gì về [chủ đề]? Liệt kê 5 góc nhìn khác nhau. Không bịa trích dẫn hay số liệu.",
    href: "https://grok.com",
    icon: Orbit,
  },
  {
    id: "claude",
    name: "Claude",
    category: "think",
    line: "Xử lý tài liệu dài, viết lách và lập trình.",
    when: "Bản thảo dài, hợp đồng, hoặc một file code cần đọc kỹ.",
    prompt:
      "Đọc tài liệu dưới đây. Viết bản tóm tắt 200 từ, giữ nguyên thuật ngữ quan trọng, rồi nêu 3 câu hỏi còn thiếu:\n\n[dán tài liệu]",
    href: "https://claude.ai",
    icon: Feather,
  },
  {
    id: "canva",
    name: "Canva AI",
    category: "create",
    line: "Thiết kế banner, poster và slide chuyên nghiệp.",
    when: "Cần hình đăng bài trong buổi, không cần mở phần mềm thiết kế nặng.",
    prompt:
      "Poster dọc cho [sản phẩm]: nền giấy kem, một tiêu đề ngắn, chỗ để giá, không nhồi chữ.",
    href: "https://www.canva.com",
    icon: LayoutTemplate,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "create",
    line: "Tạo hình ảnh nghệ thuật chất lượng cao.",
    when: "Thumbnail, ảnh bìa, concept hình — khi cần chất lượng hơn tốc độ.",
    prompt:
      "editorial still life of [mô tả sản phẩm], warm paper backdrop, soft side light, no text, no logo --ar 4:5",
    href: "https://www.midjourney.com",
    icon: Aperture,
  },
  {
    id: "muse",
    name: "Muse AI",
    category: "create",
    line: "Sáng tạo nội dung hình ảnh và video.",
    when: "Muốn biến một khung hình thành biến thể ảnh hoặc ý tưởng chuyển động.",
    prompt:
      "Giữ đúng sản phẩm trong ảnh gốc. Đổi nền thành bàn gỗ ấm, ánh sáng cửa sổ, không thêm chữ.",
    href: "https://museai.pro",
    icon: Film,
  },
  {
    id: "capcut",
    name: "CapCut",
    category: "create",
    line: "Chỉnh sửa video và tạo phụ đề tự động.",
    when: "Dựng clip ngắn, cắt nhịp, phụ đề — nhất là TikTok và Shorts.",
    prompt:
      "Cắt mỗi cảnh 0,8–1,2 giây. Phụ đề trắng, viền đậm. Hook phải xong trong 2 giây đầu. Nhạc thấp hơn giọng.",
    href: "https://www.capcut.com",
    icon: Scissors,
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "speed",
    line: "Tóm tắt và nghiên cứu từ tài liệu của bạn.",
    when: "Đã có PDF, ghi chú, link — và chỉ muốn trả lời dựa trên nguồn đó.",
    prompt:
      "Chỉ dùng nguồn đã tải. Tóm tắt 7 ý, rồi liệt kê 3 chỗ tài liệu chưa nói rõ.",
    href: "https://notebooklm.google.com",
    icon: Library,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "speed",
    line: "Tìm kiếm thông tin kèm nguồn tham khảo.",
    when: "Cần câu trả lời có link, để kiểm tra lại trước khi đăng.",
    prompt:
      "So sánh 3 cách [làm việc X] cho người mới. Mỗi cách: một lợi, một hại, và nguồn.",
    href: "https://www.perplexity.ai",
    icon: Search,
  },
  {
    id: "gamma",
    name: "Gamma",
    category: "speed",
    line: "Tạo bài thuyết trình nhanh.",
    when: "Cần slide gửi khách hoặc kịch bản buổi live, không ngồi căn từng khung.",
    prompt:
      "8 trang: vấn đề, giải pháp, 3 bước làm, một ví dụ, câu hỏi thường gặp, CTA. Câu ngắn. Không slide nào quá 30 chữ.",
    href: "https://gamma.app",
    icon: Presentation,
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "speed",
    line: "Tạo giọng đọc AI tự nhiên.",
    when: "Voiceover cho video khi không kịp thu, hoặc muốn nghe thử nhiều giọng.",
    prompt:
      "Đọc chậm, ngắt ở dấu phẩy, không nhấn quá đà. Đoạn:\n\n[dán lời thoại]",
    href: "https://elevenlabs.io",
    icon: AudioLines,
  },
];

export const jobs: Job[] = [
  {
    id: "youtube",
    title: "Kênh YouTube",
    blurb: "Nguồn → kịch bản → ảnh bìa → giọng → dựng.",
    steps: ["perplexity", "chatgpt", "midjourney", "elevenlabs", "capcut"],
  },
  {
    id: "tiktok",
    title: "TikTok Affiliate",
    blurb: "Sản phẩm → hook → hình → clip dọc.",
    steps: ["gemini", "chatgpt", "canva", "capcut", "elevenlabs"],
  },
  {
    id: "mmo",
    title: "Content MMO",
    blurb: "Bắt trend → bài dài → ảnh bìa → lịch nội dung.",
    steps: ["grok", "claude", "canva", "gamma"],
  },
  {
    id: "biz",
    title: "Kinh doanh online",
    blurb: "Tài liệu → xu hướng → slide → poster.",
    steps: ["notebooklm", "grok", "gamma", "canva"],
  },
];

export const ZALO = "https://zalo.me/g/sbdbhc672";

export function toolById(id: string) {
  return tools.find((tool) => tool.id === id);
}
