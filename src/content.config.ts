import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ 
    schema: docsSchema({
      extend: z.object({
        // 可以在这里添加自定义字段
      }),
    }),
  }),
};
