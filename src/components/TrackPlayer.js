import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { Audio } from 'expo-av'
import LinearGradient from 'react-native-linear-gradient'

import IconButton from './IconButton'
import { TrackItemInfo } from './TrackItem'

Audio.setAudioModeAsync({
  // I would need to detach from Expo to enable this in iOS apparently,
  // even though I think I set up the plist file correctly?
  staysActiveInBackground: true,
}).catch(console.log)

const TrackPlayer = (props) => {
  const [currentTrackStatus, setCurrentTrackStatus] = useState({})
  const currentSound = useRef()
  const { currentTrack: track, tracks, setCurrentTrack } = props

  const onPlayPausePress = useCallback(async () => {
    if (currentTrackStatus.isPlaying) {
      await currentSound.current.sound.pauseAsync()
    } else {
      await currentSound.current.sound.playAsync()
    }
  }, [currentTrackStatus.isPlaying])

  const onRewindPress = useCallback(async () => {
    await currentSound.current.sound.setPositionAsync(
      currentTrackStatus.positionMillis - 30000,
    )
  }, [currentTrackStatus.positionMillis])

  const onForwardPress = useCallback(async () => {
    await currentSound.current.sound.setPositionAsync(
      currentTrackStatus.positionMillis + 30000,
    )
  }, [currentTrackStatus.positionMillis])

  useEffect(() => {
    ;(async () => {
      if (currentSound.current?.sound) {
        try {
          await currentSound.current.sound.unloadAsync()
        } catch (e) {
          console.warn('Error unloading audio', e.message)
        }
      }

      if (track.id) {
        try {
          currentSound.current = await Audio.Sound.createAsync(
            { uri: track.url },
            { shouldPlay: true },
          )

          currentSound.current.sound.setOnPlaybackStatusUpdate(
            setCurrentTrackStatus,
          )
        } catch (e) {
          console.warn('Error playing track', e.message)
        }
      }
    })()

    return () => {
      try {
        currentSound.current?.sound?.unloadAsync()
      } catch (e) {
        console.warn('Error unloading audio', e.message)
      }
    }
  }, [track.id, track.url])

  return (
    <View
      style={{
        backgroundColor: '#370031',
        position: 'absolute',
        height: 140,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <ProgressBar
        progress={
          currentTrackStatus.positionMillis / currentTrackStatus.durationMillis
        }
        color="#CE8964"
      />
      <LinearGradient
        colors={['#370031', '#0B0033']}
        style={{
          flex: 1,
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TrackItemInfo {...track} />
          <PlayerIcons
            isPlaying={currentTrackStatus.isPlaying}
            onRewindPress={onRewindPress}
            onPlayPausePress={onPlayPausePress}
            onForwardPress={onForwardPress}
          />
        </View>
        <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} />
      </LinearGradient>
    </View>
  )
}

const PlayerIcons = ({
  isPlaying,
  onRewindPress,
  onPlayPausePress,
  onForwardPress,
}) => (
  <View
    style={{
      width: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <IconButton
      color="white"
      name="backward"
      size={20}
      onPress={onRewindPress}
    />
    <IconButton
      color="white"
      name={isPlaying ? 'pause' : 'play'}
      size={30}
      onPress={onPlayPausePress}
    />
    <IconButton
      color="white"
      name="forward"
      size={20}
      onPress={onForwardPress}
    />
  </View>
)

export default TrackPlayer
