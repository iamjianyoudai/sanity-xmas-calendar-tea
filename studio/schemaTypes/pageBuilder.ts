import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'textModule'}),
    defineArrayMember({type: 'videoModule'}),
    defineArrayMember({type: 'brewingInstructionsModule'}),
  ],
})
