import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the homepage',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      description: 'Introduction to tea',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Rich text content for the homepage',
    }),
    defineField({
      name: 'featuredTeas',
      title: 'Featured Teas',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tea'}]}],
      description: 'Select teas to feature on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
