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
      description: 'Main hero title (e.g. “Let’s have a tea break”).',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Short description subtitle below the title.',
    }),
    defineField({
      name: 'teaTypes',
      title: 'Tea Types',
      type: 'array',
      description:
        'Select tea types to display on the homepage. These will be clickable and open the tea type modal.',
      of: [{type: 'reference', to: [{type: 'teaType'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'headerTitle',
    },
  },
})
