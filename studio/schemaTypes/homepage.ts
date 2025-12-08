import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),

    defineField({
      name: 'teaTypes',
      title: 'Tea Types',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teaType'}]}],
      description: 'Select tea types to display on the homepage.',
    }),
  ],
  preview: {
    select: {
      title: 'headerTitle',
    },
  },
})
