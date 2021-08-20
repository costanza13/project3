import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Playlist from '../components/Playlist';
import FriendsList from '../components/FriendList';
import Auth from '../utils/auth';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/esm/Collapse';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const { loading, data: userData } = useQuery(QUERY_ME);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return (
      <div>
        <h2>You must be logged in to see this page.</h2>
        {/* do we want to include the login form here? */}
      </div>
    );
  }

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData);
  const user = userData.me;

  return (
    <Container>
      <Row>
        <Col>
          <h2>{user.username}</h2>
        </Col>
        <Col>
          <p onClick={() => setOpen(!open)} aria-controls="friends-list" aria-expanded={open}>Friends: {user.friendCount}</p>
          <Collapse in={open}>
            <div id="friends-list">
              <FriendsList friends={user.friends} />
            </div>
          </Collapse>
        </Col>
      </Row>
      <Row xs={1} md={2}>
        <Col>
          <div className="playlist-list">
            <h3>Your Playlists</h3>
            <ul>
              {user.playlists.map((playlist) => {
                return (
                  <li>
                    <Link
                      key={playlist._id}
                      to={`/playlist/${playlist._id}`}
                    >{playlist.name}</Link>
                    {playlist.members.length ? ' (party)' : ''}
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col>
          <div className="playlist-list">
            <h3>Party Playlists</h3>
            {user.partyPlaylists.map((playlist) => {
              return (
                <Playlist
                  key={playlist._id}
                  playlistId={playlist._id}
                ></Playlist>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;