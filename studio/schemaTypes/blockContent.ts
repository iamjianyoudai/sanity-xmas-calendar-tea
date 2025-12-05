import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    }),
    defineArrayMember({
      type: 'quoteBlock',
    }),
  ],
})
