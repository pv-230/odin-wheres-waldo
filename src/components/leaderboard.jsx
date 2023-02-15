import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';

import GlobalStyle from '../common/global-style';
import { Header1, Header2, Image, Button, Text, Spinner } from '../common/common-styles';
import { scenesCropped } from '../data/image-maps';
import scenes from '../data/scenes';
import db from '../firebase';

const StyledLeaderboard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

const Scenes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #333;
  border-radius: 5px;
  padding: 5px;
  color: var(--light-color);
`;

const SceneButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SceneButton = styled(Button)`
  width: 48px;
  height: 24px;
  border: none;
  outline: ${(props) => (props.selected ? '1px solid greenyellow' : '1px solid darkgray')};
  box-shadow: ${(props) => (props.selected ? '0px 0px 20px #dad600;' : 'none')};
  padding: 0;
  overflow: hidden;
  border-radius: 2px;
`;

const SceneImage = styled(Image)`
  width: 100%;
  height: initial;
`;

const SceneTitle = styled(Text)`
  font-style: italic;
  width: 100%;
  text-align: center;
`;

const Scores = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------------------------------------------------

function Leaderboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneVal, setSceneVal] = useState(0);
  const [scores, setScores] = useState([]);

  /**
   * Fetches current user scores after component mounts.
   */
  useEffect(() => {
    (async function updateUserScores() {
      const beachScoresSnapshot = await getDocs(collection(db, 'leaderboard', 'beach', 'users'));
      const slopesScoresSnapshot = await getDocs(collection(db, 'leaderboard', 'slopes', 'users'));
      const stadiumScoresSnapshot = await getDocs(
        collection(db, 'leaderboard', 'stadium', 'users')
      );
      const beachScoresArr = [];
      const slopesScoresArr = [];
      const stadiumScoresArr = [];

      beachScoresSnapshot.forEach((score) => {
        beachScoresArr.push({ ...score.data(), id: score.id });
      });

      slopesScoresSnapshot.forEach((score) => {
        slopesScoresArr.push({ ...score.data(), id: score.id });
      });

      stadiumScoresSnapshot.forEach((score) => {
        stadiumScoresArr.push({ ...score.data(), id: score.id });
      });

      setScores([beachScoresArr, slopesScoresArr, stadiumScoresArr]);
      setIsLoaded(true);
    })();
  }, []);

  /**
   * Event handler for scene selections.
   * @param {Event} e
   */
  function handleSceneSelection(e) {
    setSceneVal(Number(e.currentTarget.dataset.scene));
  }

  return (
    <>
      <GlobalStyle />
      <StyledLeaderboard>
        <Header1>Leaderboard</Header1>
        <Scenes>
          <Header2>Scenes</Header2>
          <SceneButtons>
            <SceneButton data-scene="0" selected={sceneVal === 0} onClick={handleSceneSelection}>
              <SceneImage src={scenesCropped.get('beach')} alt="On the Beach" />
            </SceneButton>
            <SceneButton data-scene="1" selected={sceneVal === 1} onClick={handleSceneSelection}>
              <SceneImage src={scenesCropped.get('slopes')} alt="Ski Slopes" />
            </SceneButton>
            <SceneButton data-scene="2" selected={sceneVal === 2} onClick={handleSceneSelection}>
              <SceneImage src={scenesCropped.get('stadium')} alt="Sports Stadium" />
            </SceneButton>
          </SceneButtons>
          <SceneTitle>{scenes[sceneVal].title}</SceneTitle>
        </Scenes>
        <Scores>
          {isLoaded ? (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {scores[sceneVal].map((score, index) => (
                  <tr key={score.id}>
                    <td>{index + 1}</td>
                    <td>{score.name}</td>
                    <td>
                      {String(score.minutes).padStart(2, '0')}:
                      {String(score.seconds).padStart(2, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </Scores>
      </StyledLeaderboard>
    </>
  );
}

export default Leaderboard;
