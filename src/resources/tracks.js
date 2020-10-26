import { useMemo } from 'react'

const BASE_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-{{id}}.mp3'

const useTracks = (numTracks) =>
  useMemo(() => Array.from({ length: numTracks }, (_, index, trackId = index + 1) => ({
    id: trackId,
    url: BASE_URL.replace('{{id}}', trackId),
    imageUrl: 'https://picsum.photos/100',
    artist: 'Lorem Ipsum',
    album: 'The best one yet',
    track: `Track #${trackId}`,
  })), [numTracks])

export default useTracks;
