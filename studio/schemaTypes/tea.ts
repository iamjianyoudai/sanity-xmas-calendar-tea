import {defineField, defineType} from 'sanity'
import {TeaIcon} from '../icons/TeaIcons'

export default defineType({
  name: 'tea',
  title: 'Teas',
  type: 'document',
  icon: TeaIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Tea Name',
      type: 'string',
      description: 'Name of the specific tea',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Tea Type (Category)',
      type: 'reference',
      to: [{type: 'teaType'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Body of the tea',
    }),

    defineField({
      name: 'flavorNotes',
      title: 'Flavor Notes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Flavor notes (e.g., fresh grass, roasted hazelnuts)',
    }),

    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'string',
      description: 'Origin of the tea (e.g., China, Japan, India)',
    }),

    defineField({
      name: 'brewingInstructions',
      title: 'Brewing Instructions',
      type: 'object',
      fields: [
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'string',
          description: 'Tea amount (e.g., ~1g tea per 100ml water)',
        }),

        defineField({
          name: 'temperature',
          title: 'Temperature',
          type: 'string',
          description: 'Brewing temperature (e.g., 75-80°C)',
        }),

        defineField({
          name: 'steepTime',
          title: 'Steep Time',
          type: 'string',
          description: 'Steeping time (e.g., 45s - 2m)',
        }),
      ],
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the tea',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
