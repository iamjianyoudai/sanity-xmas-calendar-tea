import {defineField, defineType} from 'sanity'
import {TeaPotIcon} from '../icons/TeaIcons'
import CharCountInput from '../components/CharCountInput'
import TeaFeaturedManagerInput from '../components/TeaFeaturedManagerInput'

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

    defineField({
      name: 'featuredManager',
      title: 'Featured Teas Manager',
      type: 'string',
      readOnly: true,
      components: {input: TeaFeaturedManagerInput},
    }),
  ],
  preview: {
    select: {
      title: 'headerTitle',
    },
  },
})
