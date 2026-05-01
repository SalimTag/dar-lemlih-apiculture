import { makeSource, defineDocumentType } from 'contentlayer/source-files';

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    cover: { type: 'string', required: false },
    publishedAt: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, '')
    }
  }
}));

const Recipe = defineDocumentType(() => ({
  name: 'Recipe',
  filePathPattern: 'recipes/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    cover: { type: 'string', required: false },
    difficulty: { type: 'string', required: false },
    duration: { type: 'string', required: false },
    publishedAt: { type: 'date', required: true }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, '')
    }
  }
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Article, Recipe]
});
