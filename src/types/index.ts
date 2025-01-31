import { z } from "zod";

export const Snippet = z.object({
  value: z.string(),
  language: z.string(),
  highlightLines: z.array(z.number()).optional(),
  fileName: z.string().optional(),
});

export type Snippet = z.infer<typeof Snippet>;
