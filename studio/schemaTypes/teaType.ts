import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teaType',
  title: 'Tea Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tea Type Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'relatedTeas',
      title: 'Related teas',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tea'}]}],
    }),

    defineField({
      name: 'flavorNotes',
      title: 'Flavor Notes',
      type: 'array',
      of: [{type: 'string'}],
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
        }),

        defineField({
          name: 'temperature',
          title: 'Temperature',
          type: 'string',
        }),

        defineField({
          name: 'steepTime',
          title: 'Steep Time',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'description',
    },
  },
})
