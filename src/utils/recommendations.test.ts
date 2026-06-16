import { describe, expect, it } from 'vitest';
import { getRelatedBlogs, getRelatedTools } from './recommendations';
import type { BlogMetadata } from '@/types/blog';
import type { ToolWithCategory } from '@/tools/tools.types';

const mockBlogs: BlogMetadata[] = [
  {
    slug: 'security-guide',
    title: 'Security Guide',
    description: 'A guide about security',
    date: '2024-01-01',
    author: 'Author',
    category: 'Security',
    tags: ['hashing', 'encryption'],
  },
  {
    slug: 'web-dev-tips',
    title: 'Web Dev Tips',
    description: 'Tips for web dev',
    date: '2024-01-02',
    author: 'Author',
    category: 'Web',
    tags: ['javascript', 'vue'],
  },
];

const mockTools: ToolWithCategory[] = [
  {
    name: 'Bcrypt',
    path: '/bcrypt',
    description: 'Bcrypt hasher',
    keywords: ['hashing', 'password'],
    category: 'Security',
    isNew: false,
    component: null as any,
    icon: null as any,
  },
  {
    name: 'JSON Viewer',
    path: '/json-viewer',
    description: 'View JSON',
    keywords: ['json', 'format'],
    category: 'Development',
    isNew: false,
    component: null as any,
    icon: null as any,
  },
];

describe('recommendations', () => {
  describe('getRelatedBlogs', () => {
    it('should return blogs in the same category', () => {
      const tool = mockTools[0]; // Security category
      const related = getRelatedBlogs(tool, mockBlogs);
      expect(related.map(b => b.slug)).toContain('security-guide');
    });

    it('should return blogs matching tool keywords', () => {
      const tool = mockTools[0]; // keywords: ['hashing', 'password']
      const related = getRelatedBlogs(tool, mockBlogs);
      expect(related.map(b => b.slug)).toContain('security-guide'); // matches 'hashing' tag
    });

    it('should limit results to the specified count', () => {
      const tool = mockTools[0];
      const related = getRelatedBlogs(tool, mockBlogs, 1);
      expect(related).toHaveLength(1);
    });
  });

  describe('getRelatedTools', () => {
    it('should return tools in the same category', () => {
      const blog = mockBlogs[0]; // Security category
      const related = getRelatedTools(blog, mockTools);
      expect(related.map(t => t.path)).toContain('/bcrypt');
    });

    it('should return tools matching blog tags', () => {
      const blog = mockBlogs[0]; // tags: ['hashing', 'encryption']
      const related = getRelatedTools(blog, mockTools);
      expect(related.map(t => t.path)).toContain('/bcrypt'); // matches 'hashing' keyword
    });

    it('should limit results to the specified count', () => {
      const blog = mockBlogs[0];
      const related = getRelatedTools(blog, mockTools, 1);
      expect(related).toHaveLength(1);
    });
  });
});
