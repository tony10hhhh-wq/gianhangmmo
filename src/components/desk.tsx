import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  Search,
  Trash2,
} from "lucide-react";
import { categories, jobs, toolById, tools, ZALO, type CategoryId } from "@/data/catalog";
import { emptyMemory, loadMemory, saveMemory, type Memory, type Note } from "@/lib/desk-memory";

const categoryShort: Record<CategoryId, string> = {
  think: "Tư duy",
  create: "Sáng tạo",
  speed: "Hiệu suất",
};

type Filter = "all" | CategoryId;

export function Desk() {
  const [memory, setMemory] = useState<Memory>(emptyMemory);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [jobId, setJobId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [draftTool, setDraftTool] = useState("chatgpt");
  const [draftText, setDraftText] = useState("");

  useEffect(() => {
    const loaded = loadMemory();
    setMemory(loaded);
    if (loaded.pick) setDraftTool(loaded.pick);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveMemory(memory);
  }, [memory, ready]);

  const job = jobs.find((item) => item.id === jobId) ?? null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (filter !== "all" && tool.category !== filter) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.line.toLowerCase().includes(q) ||
        tool.when.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  function toggleSaved(id: string) {
    setMemory((current) => ({
      ...current,
      saved: current.saved.includes(id)
        ? current.saved.filter((item) => item !== id)
        : [...current.saved, id],
    }));
  }

  async function copyPrompt(id: string, prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
    } catch {
      setCopied(null);
    }
  }

  function openTool(id: string) {
    setOpenId(id);
    setFilter("all");
    setQuery("");
    window.setTimeout(() => {
      document.getElementById(`tool-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 40);
  }

  function addNote() {
    const text = draftText.trim();
    if (!text) return;
    const note: Note = {
      id: `${Date.now()}`,
      toolId: draftTool,
      text,
      at: Date.now(),
    };
    setMemory((current) => ({
      ...current,
      pick: draftTool,
      notes: [note, ...current.notes].slice(0, 20),
    }));
    setDraftText("");
  }

  function removeNote(id: string) {
    setMemory((current) => ({
      ...current,
      notes: current.notes.filter((note) => note.id !== id),
    }));
  }

  const savedTools = memory.saved
    .map((id) => toolById(id))
    .filter((tool): tool is NonNullable<typeof tool> => !!tool);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#dau-trang" className="font-display text-xl font-semibold tracking-tight">
            Sổ AI
          </a>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <a href="#cong-cu" className="hover:text-ink">
              Công cụ
            </a>
            <a href="#bo-viec" className="hover:text-ink">
              Bộ việc
            </a>
            <a href="#ghi-chu" className="hover:text-ink">
              Ghi chú
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-28">
        <section id="dau-trang" className="grid gap-10 border-b border-line py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-7">
            <p className="enter text-sm font-medium tracking-wide text-accent uppercase">
              Số 01 · MMO · YouTube · TikTok · Kinh doanh
            </p>
            <h1 className="enter enter-2 mt-4 font-display text-4xl leading-tight font-semibold md:text-6xl">
              12 công cụ AI giúp bạn làm việc thông minh hơn
            </h1>
            <p className="enter enter-3 mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Thay vì mất hàng giờ xử lý thủ công, chọn đúng công cụ cho đúng việc: viết, nghiên cứu, hình,
              video và giọng đọc.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cong-cu"
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Mở sổ 12 công cụ
              </a>
              <a
                href={ZALO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm font-semibold transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Nhóm Zalo
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
            <p className="mt-8 max-w-md border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
              AI không làm thay bạn mọi thứ. Biết dùng đúng cách mới là lợi thế.
            </p>
          </div>

          <ol className="md:col-span-5 md:border-l md:border-line md:pl-8">
            {tools.map((tool, index) => (
              <li key={tool.id} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  onClick={() => openTool(tool.id)}
                  className="flex w-full items-baseline gap-4 py-2.5 text-left transition-colors hover:text-accent"
                >
                  <span className="w-7 font-display text-sm text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{tool.name}</span>
                  <span className="ml-auto hidden text-sm text-muted sm:inline">{categoryShort[tool.category]}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        <section id="bo-viec" className="border-b border-line py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent uppercase">Bộ việc</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Chọn việc, sổ chỉ đường</h2>
            </div>
            {job ? (
              <button
                type="button"
                onClick={() => setJobId(null)}
                className="min-h-11 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Bỏ chọn
              </button>
            ) : null}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {jobs.map((item) => {
              const active = item.id === jobId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setJobId(active ? null : item.id)}
                  aria-pressed={active}
                  className={`rounded-card border px-4 py-4 text-left transition-colors duration-150 active:scale-[0.96] ${
                    active ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-ink"
                  }`}
                >
                  <span className="block font-display text-xl font-semibold">{item.title}</span>
                  <span className={`mt-1 block text-sm ${active ? "text-accent-ink/80" : "text-muted"}`}>
                    {item.blurb}
                  </span>
                </button>
              );
            })}
          </div>
          {job ? (
            <ol className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {job.steps.map((id, index) => {
                const tool = toolById(id);
                if (!tool) return null;
                return (
                  <li key={id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => openTool(id)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium"
                    >
                      <span className="font-display text-accent tabular-nums">{index + 1}</span>
                      {tool.name}
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="mt-5 text-sm text-muted">
              Bốn lối đi thường gặp. Chọn một lối, rồi bấm từng bước để mở prompt.
            </p>
          )}
        </section>

        <section id="cong-cu" className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent uppercase">Sổ công cụ</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Mười hai việc, mười hai chỗ</h2>
            </div>
            <p className="text-sm text-muted tabular-nums">
              {visible.length}/{tools.length}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Tìm công cụ</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm: video, giọng, slide…"
                className="h-11 w-full rounded-full border border-line bg-card pr-4 pl-10 text-sm outline-none focus-visible:border-accent"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                Tất cả
              </FilterChip>
              {categories.map((category) => (
                <FilterChip
                  key={category.id}
                  active={filter === category.id}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                </FilterChip>
              ))}
            </div>
          </div>

          {categories.map((category) => {
            const rows = visible.filter((tool) => tool.category === category.id);
            if (rows.length === 0) return null;
            return (
              <div key={category.id} className="mt-10">
                <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-ink pb-2">
                  <h3 className="font-display text-2xl font-semibold">{category.label}</h3>
                  <p className="hidden text-sm text-muted sm:block">{category.note}</p>
                </div>
                <ul>
                  {rows.map((tool) => {
                    const index = tools.findIndex((item) => item.id === tool.id);
                    const open = openId === tool.id;
                    const saved = memory.saved.includes(tool.id);
                    const dim = job ? !job.steps.includes(tool.id) : false;
                    const Icon = tool.icon;
                    return (
                      <li
                        key={tool.id}
                        id={`tool-${tool.id}`}
                        className={`border-b border-line ${dim ? "opacity-40" : ""}`}
                      >
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() => setOpenId(open ? null : tool.id)}
                          className="flex w-full items-start gap-4 py-4 text-left"
                        >
                          <span className="w-8 pt-1 font-display text-lg text-accent tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <Icon className="size-4 shrink-0" aria-hidden />
                              <span className="font-display text-xl font-semibold">{tool.name}</span>
                              {saved ? (
                                <span className="rounded-full bg-wash px-2 py-0.5 text-xs font-medium">
                                  Đang dùng
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-muted">{tool.line}</span>
                          </span>
                        </button>
                        <div className="fold" data-open={open ? "true" : "false"}>
                          <div className="fold-inner" inert={!open}>
                            <div className="grid gap-4 pb-5 pl-12 sm:grid-cols-5">
                              <div className="sm:col-span-2">
                                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                                  Dùng khi
                                </p>
                                <p className="mt-2 text-sm leading-relaxed">{tool.when}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  <a
                                    href={tool.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex min-h-11 items-center gap-1 rounded-full bg-ink px-4 text-sm font-semibold text-paper"
                                  >
                                    Mở {tool.name}
                                    <ArrowUpRight className="size-4" aria-hidden />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => toggleSaved(tool.id)}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium"
                                  >
                                    <Bookmark className="size-4" aria-hidden />
                                    {saved ? "Bỏ lưu" : "Lưu vào bộ"}
                                  </button>
                                </div>
                              </div>
                              <div className="rounded-card bg-wash p-4 sm:col-span-3">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                                    Prompt gợi ý
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => copyPrompt(tool.id, tool.prompt)}
                                    className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent"
                                  >
                                    {copied === tool.id ? (
                                      <Check className="size-4" aria-hidden />
                                    ) : (
                                      <Copy className="size-4" aria-hidden />
                                    )}
                                    {copied === tool.id ? "Đã chép" : "Chép"}
                                  </button>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{tool.prompt}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {visible.length === 0 ? (
            <p className="mt-10 rounded-card border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
              Không có công cụ khớp. Thử từ khác, hoặc xem lại tất cả.
            </p>
          ) : null}
        </section>

        <section id="ghi-chu" className="border-t border-line py-12">
          <p className="text-sm font-medium tracking-wide text-accent uppercase">Bình chọn của bạn</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold">
            Công cụ nào hiệu quả nhất với bạn?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Ghi trên máy này để lần sau còn nhớ. Không đăng công khai, không cần tài khoản.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tools.map((tool) => {
              const active = draftTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setDraftTool(tool.id)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                    active ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"
                  }`}
                >
                  {tool.name}
                </button>
              );
            })}
          </div>

          <label className="mt-4 block">
            <span className="sr-only">Ghi chú vì sao công cụ này hợp</span>
            <textarea
              value={draftText}
              onChange={(event) => setDraftText(event.target.value)}
              rows={3}
              maxLength={280}
              suppressHydrationWarning
              placeholder={`Vì sao ${toolById(draftTool)?.name ?? "công cụ này"} hợp với việc của bạn?`}
              className="w-full resize-none rounded-card border border-line bg-card p-4 text-sm leading-relaxed outline-none focus-visible:border-accent"
            />
          </label>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-muted tabular-nums">{draftText.length}/280</span>
            <button
              type="button"
              onClick={addNote}
              disabled={!draftText.trim()}
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper disabled:opacity-40"
            >
              Ghi lại
            </button>
          </div>

          {memory.pick ? (
            <p className="mt-6 text-sm">
              Lựa chọn đang giữ:{" "}
              <span className="font-semibold">{toolById(memory.pick)?.name}</span>
            </p>
          ) : null}

          {memory.notes.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Chưa có ghi chú. Một câu cũng đủ.</p>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {memory.notes.map((note) => (
                <li key={note.id} className="flex items-start gap-3 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{toolById(note.toolId)?.name ?? "Công cụ"}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{note.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNote(note.id)}
                    aria-label="Xóa ghi chú"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-ink"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-card bg-ink px-6 py-8 text-paper md:px-10">
          <p className="font-display text-2xl leading-snug font-semibold md:text-3xl">
            Giao lưu, nhận tài nguyên và cập nhật ưu đãi AI Premium.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/75">
            Mình sẽ chia sẻ thêm công cụ, prompt và thủ thuật cho anh em làm MMO, YouTube, TikTok Affiliate
            và kinh doanh online.
          </p>
          <a
            href={ZALO}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink"
          >
            Tham gia cộng đồng Zalo
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </section>

        <footer className="mt-10 flex flex-col gap-2 pb-4 text-xs tracking-wide text-muted uppercase">
          <p>AI · ChatGPT · Gemini · Công cụ AI · MMO · Chia sẻ kiến thức</p>
          <p className="normal-case">Sổ AI · giữ trên trình duyệt của bạn</p>
        </footer>
      </main>

      {savedTools.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 overflow-x-auto px-5 py-3">
            <span className="shrink-0 text-sm font-semibold">Bộ của bạn</span>
            {savedTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => openTool(tool.id)}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-wash px-4 text-sm font-medium"
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium ${
        active ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink"
      }`}
    >
      {children}
    </button>
  );
}
