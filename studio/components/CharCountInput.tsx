import React, {useMemo} from 'react'
import {Stack, Text} from '@sanity/ui'
import type {StringInputProps} from 'sanity'

// Simple character-count input that keeps Sanity's default wiring via renderDefault.
export default function CharCountInput(props: StringInputProps) {
  const {renderDefault, value} = props
  const count = useMemo(() => (value ? value.length : 0), [value])

  return (
    <Stack space={2}>
      {renderDefault(props)}
      <Text size={1} muted style={{color: count > 80 ? '#d92d20' : undefined}}>
        Length: {count}
      </Text>
    </Stack>
  )
}
