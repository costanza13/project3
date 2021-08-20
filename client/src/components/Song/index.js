import React, { useState } from 'react';
import Accordion from "react-bootstrap/Accordion";

const Song = ({ song }) => {
   const [editStatus, setEditStatus] = useState(false);

   // const eventKey = () => {
      
   // }

   return (
      <div>
         {editStatus &&
         (<div className="song-form">
            <form>
               <div className="mb-3">
                  <input type="text" className="form-control" id="songTitle" placeholder="song title"></input>
               </div>
               <div className="mb-3">
                  <input type="text" className="form-control" id="songArtist" placeholder="artist"></input>
               </div>
               <div className="mb-3">
                  <input type="url" className="form-control" id="lyrics" placeholder="link to lyrics"></input>
               </div>
               <div className="mb-3">
                  <input type="url" className="form-control" id="youtube" placeholder="link to youtube"></input>
               </div>
               <button type="submit" className="btn btn-primary">add song</button>
            </form>
         </div>)}

         <Accordion flush>
            <Accordion.Item eventKey="0">
               <Accordion.Header>{song.title}</Accordion.Header>
               <Accordion.Body>
                     <p className="song-artist">{song.artist}</p>
                     <p><a href={song.lyricsUrl} target="_blank" rel="noreferrer">lyrics</a>{' - '}
                     <a href={song.videoUrl} target="_blank" rel="noreferrer">video</a></p>
                     <button className="btn btn-primary edit-song" onClick={() => setEditStatus(true)}>edit</button>
                     <button className="btn btn-primary delete-song">delete</button>
               </Accordion.Body>
            </Accordion.Item>
         </Accordion>
      </div>
   );
};

export default Song;