import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'quote', subtitle: 'author'},
  },
})
