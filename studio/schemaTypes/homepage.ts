import {defineField, defineType} from 'sanity'
import {TeaPotIcon} from '../icons/TeaIcons'
import CharCountInput from '../components/CharCountInput'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: TeaPotIcon,
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      components: {input: CharCountInput},
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
