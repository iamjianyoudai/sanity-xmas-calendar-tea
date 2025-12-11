import React, {useEffect, useMemo, useState, useCallback} from 'react'
import {Card, Flex, Spinner, Stack, Switch, Text} from '@sanity/ui'
import {useClient} from 'sanity'

type RawTea = {_id: string; name?: string; featured?: boolean}
type TeaEntry = {
  id: string // canonical id (published id)
  publishedId: string
  draftId?: string
  name?: string
  featured?: boolean
}

const apiVersion = '2025-02-07'

export default function TeaFeaturedManagerInput() {
  const client = useClient({apiVersion})
  const [teas, setTeas] = useState<TeaEntry[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  const normalize = useCallback((data: RawTea[] | null | undefined): TeaEntry[] => {
    const byCanonical = new Map<string, TeaEntry>()
    ;(Array.isArray(data) ? data : []).forEach((doc) => {
      const isDraft = doc._id.startsWith('drafts.')
      const canonical = isDraft ? doc._id.replace(/^drafts\./, '') : doc._id
      const existing = byCanonical.get(canonical) || {
        id: canonical,
        publishedId: canonical,
      }
      byCanonical.set(canonical, {
        ...existing,
        name: doc.name ?? existing.name,
        featured: doc.featured ?? existing.featured,
        draftId: isDraft ? doc._id : existing.draftId,
        publishedId: canonical,
      })
    })
    return Array.from(byCanonical.values()).sort((a, b) =>
      (a.name || '').localeCompare(b.name || ''),
    )
  }, [])

  const fetchTeas = useCallback(async () => {
    setLoading(true)
    try {
      const data = await client.fetch<RawTea[]>(`*[_type == "tea"]{_id, name, featured}`)
      setTeas(normalize(data))
    } catch (err) {
      console.error('Failed to fetch teas', err)
      setTeas([])
    } finally {
      setLoading(false)
    }
  }, [client, normalize])

  useEffect(() => {
    fetchTeas()
  }, [fetchTeas])

  const toggleFeatured = useCallback(
    async (entry: TeaEntry, next: boolean) => {
      setSavingId(entry.id)
      try {
        const tx = client.transaction().patch(entry.publishedId, {set: {featured: next}})
        if (entry.draftId) {
          tx.patch(entry.draftId, {set: {featured: next}})
        }
        await tx.commit()
        setTeas((prev) => (prev || []).map((t) => (t.id === entry.id ? {...t, featured: next} : t)))
      } catch (err) {
        console.error('Failed to toggle featured', err)
      } finally {
        setSavingId(null)
      }
    },
    [client],
  )

  const content = useMemo(() => {
    if (loading || !teas) {
      return (
        <Flex align="center" gap={2}>
          <Spinner muted /> <Text size={1}>Loading teas…</Text>
        </Flex>
      )
    }

    if (!teas.length) {
      return <Text size={1}>No teas found.</Text>
    }

    return (
      <Stack space={2}>
        {teas.map((tea) => (
          <Card key={tea.id} padding={2} radius={2} border>
            <Flex align="center" justify="space-between" gap={3}>
              <Text>{tea.name || 'Untitled tea'}</Text>
              <Switch
                checked={!!tea.featured}
                disabled={savingId === tea.id}
                onChange={(e) => toggleFeatured(tea, e.currentTarget.checked)}
              />
            </Flex>
          </Card>
        ))}
      </Stack>
    )
  }, [loading, savingId, teas, toggleFeatured])

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Toggle teas to be featured on the homepage.
      </Text>
      {content}
    </Stack>
  )
}
