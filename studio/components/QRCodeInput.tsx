import React, {useCallback, useMemo} from 'react'
import {Card, Stack, Text, TextInput} from '@sanity/ui'
import {PatchEvent, set} from 'sanity'
import type {StringInputProps} from 'sanity'

// Input that saves a URL string and shows a QR preview (uses a public QR image endpoint).
export default function QRCodeInput(props: StringInputProps) {
  const {value, onChange, schemaType} = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(PatchEvent.from(set(event.target.value)))
    },
    [onChange],
  )

  const qrSrc = useMemo(() => {
    if (!value) return ''
    const encoded = encodeURIComponent(value)
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`
  }, [value])

  return (
    <Stack space={3}>
      <TextInput
        value={value || ''}
        onChange={handleChange}
        placeholder={schemaType.placeholder || 'Paste a URL for QR code'}
        spellCheck={false}
      />
      {value ? (
        <Card padding={2} radius={2} border>
          <Text size={1} muted>
            QR preview for this URL:
          </Text>
          <img src={qrSrc} alt="QR code" style={{width: 200, height: 200, marginTop: 8}} />
        </Card>
      ) : (
        <Text size={1} muted>
          Enter a URL to generate a QR code preview.
        </Text>
      )}
    </Stack>
  )
}
