const KEY = "so-ai-desk-v1";

export type Note = {
  id: string;
  toolId: string;
  text: string;
  at: number;
};

export type Memory = {
  saved: string[];
  pick: string | null;
  notes: Note[];
};

export const emptyMemory: Memory = { saved: [], pick: null, notes: [] };

export function loadMemory(): Memory {
  if (typeof window === "undefined") return emptyMemory;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyMemory;
    const parsed = JSON.parse(raw) as Partial<Memory>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved.filter((id) => typeof id === "string") : [],
      pick: typeof parsed.pick === "string" ? parsed.pick : null,
      notes: Array.isArray(parsed.notes)
        ? parsed.notes.filter(
            (note): note is Note =>
              !!note &&
              typeof note.id === "string" &&
              typeof note.toolId === "string" &&
              typeof note.text === "string" &&
              typeof note.at === "number",
          )
        : [],
    };
  } catch {
    return emptyMemory;
  }
}

export function saveMemory(memory: Memory) {
  window.localStorage.setItem(KEY, JSON.stringify(memory));
}
