import React, { useCallback, useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { Searchbar } from 'react-native-paper'

import TrackItem from './components/TrackItem'
import TrackPlayer from './components/TrackPlayer'

import useTracks from './resources/tracks'

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: '#370031',
    marginHorizontal: 24,
    marginVertical: 33,
  },
})

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSearchQuery, setCurrentSearchQuery] = useState('')

  const [numTracks, setNumTracks] = useState(16)
  const [currentTrack, setCurrentTrack] = useState({})

  const tracks = useTracks(numTracks, searchQuery)

  const onIconPress = useCallback(() => {
    setSearchQuery(currentSearchQuery)
  }, [currentSearchQuery])

  const onItemPress = useCallback((item) => {
    setCurrentTrack(item)
  }, [])

  const listHeaderComponent = useMemo(
    () => (
      <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setCurrentSearchQuery}
          onIconPress={onIconPress}
          value={currentSearchQuery}
          style={styles.searchBar}
          theme={{
            colors: { icon: 'grey', placeholder: 'grey', text: 'white' },
          }}
        />
      </SafeAreaView>
    ),
    [currentSearchQuery, onIconPress],
  )

  const listFooterComponent = useMemo(
    () => (
      <SafeAreaView forceInset={{ top: 'never', bottom: 'always' }}>
        {currentTrack.id && <View style={{ height: 130 }} />}
      </SafeAreaView>
    ),
    [currentTrack.id],
  )

  return (
    <PaperProvider>
      <StatusBar style="light" />
      <LinearGradient style={styles.flex} colors={['#0B0033', '#370031']}>
        <FlatList
          data={tracks}
          keyExtractor={(i) => `${i.id}`}
          ListHeaderComponent={listHeaderComponent}
          ListFooterComponent={listFooterComponent}
          renderItem={({ item }) => (
            <TrackItem {...item} onPress={onItemPress} />
          )}
        />
        {currentTrack.id && (
          <TrackPlayer
            currentTrack={currentTrack}
            setCurrentTrack={onItemPress}
          />
        )}
      </LinearGradient>
    </PaperProvider>
  )
}
