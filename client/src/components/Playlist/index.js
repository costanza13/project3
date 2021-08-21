import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PLAYLIST } from '../../utils/queries';
import { SAVE_PLAYLIST } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Song from '../Song';
import PlaylistMembers from '../PlaylistMembers';
import EasyEdit, { Types } from "react-easy-edit";


const Playlist = ({ playlistId }) => {
  const { loading, data: playlistData } = useQuery(QUERY_PLAYLIST, { variables: { playlistId } });
  const [updatePlaylist] = useMutation(SAVE_PLAYLIST);

  const currentUser = Auth.loggedIn() ? Auth.getProfile().data : {};

  if (loading) {
    return null;
  }

  let playlist;
  const updateMembers = async (updatedMembers) => {
    const { name, visibility } = playlist;
    const updatedPlaylist = await updatePlaylist({
      variables: { playlistId: playlist._id, playlist: { name, visibility, members: updatedMembers } }
    });

    playlist = await updatedPlaylist.data.updatePlaylist;
  }

  const save = value => {};
  const cancel = value => {};

  console.log(playlistData);
  playlist = playlistData.playlist;
  const isOwner = playlist.username === currentUser.username;
  const isMember = playlist.members.indexOf(currentUser.Usename) > -1;

  console.log('orig playlist', playlist);

  return (
    <>
      <h5>{playlist.name}</h5>
      <EasyEdit
        type={Types.TEXT}
        value={playlist.name}
        onSave={save}
        onCancel={cancel}
        hideSaveButton={true}
        hideCancelButton={true}
        saveOnBlur={true}
        attributes={{ className: 'playlist-title' }}
      />

      <PlaylistMembers members={playlist.members} canEdit={isOwner} updateMembers={updateMembers} />
      <div className="song-list">
        {playlist.songs.map((song) => {
          return <Song key={song._id} song={song}></Song>;
        })}
        {
          isMember || isOwner
            ? <Song key={'newsong'} song={null}></Song>
            : ''
        }
      </div>
    </>
  );
};

export default Playlist;