import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import GlobalStyle from '../common/global-style';
import { Header1, Image, Button, Text, Spinner, StyledLink } from '../common/common-styles';
import { scenesCropped } from '../data/image-maps';
import scenes from '../data/scenes';
import db from '../firebase';
import PreviousIcon from '../images/icons/previous.svg';
import NextIcon from '../images/icons/next.svg';

const StyledLeaderboard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 5px;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 370px;
  border: 2px solid var(--dark-color);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: var(--light-color);
  background-color: crimson;
`;

const Scenes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  background-color: #333;
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
  justify-content: ${(props) => (props.isLoaded ? 'space-between' : 'center')};
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
`;

const TableBody = styled.tbody`
  border: 2px solid var(--dark-color);
`;

const ColHeader = styled.th`
  text-align: start;
  height: 25px;
`;

const RankCol = styled(ColHeader)`
  width: 50px;
`;

const NameCol = styled(ColHeader)`
  width: 20ch;
`;

const TimeCol = styled(ColHeader)`
  width: 5ch;
`;

const UserRow = styled.tr`
  height: 25px;

  &:nth-child(2n) {
    background-color: #eee;
  }
`;

const RankCell = styled.td`
  padding-left: 5px;
`;

const NameCell = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MainMenuButton = styled(StyledLink)`
  background-color: tomato;

  &:hover {
    background-color: orangered;
  }

  &:active {
    background-color: tomato;
  }
`;

const PageIcon = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: ${(props) => (props.disableIcon ? 'not-allowed' : 'pointer')};
  filter: ${(props) => (props.disableIcon ? 'grayscale(100%)' : 'none')};

  &:hover {
    background-color: ${(props) => (props.disableIcon ? 'initial' : 'lightgray')};
  }

  &:active {
    background-color: ${(props) => (props.disableIcon ? 'initial' : '#c5c5c5')};
  }
`;

//-------------------------------------------------------------------------------------------------

function Leaderboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneVal, setSceneVal] = useState(0);
  const [scores, setScores] = useState([]);
  const [scorePosition, setScorePosition] = useState(0);
  const [currentPage, setCurrentPage] = useState([]);
  const [atFirstPage, setAtFirstPage] = useState(true);
  const [atLastPage, setAtLastPage] = useState(true);

  /**
   * Fetches current user scores for each scene after the component mounts.
   */
  useEffect(() => {
    (async function updateUserScores() {
      const beachScoresSnapshot = await getDocs(
        query(
          collection(db, 'leaderboard', 'beach', 'users'),
          orderBy('minutes'),
          orderBy('seconds')
        )
      );
      const slopesScoresSnapshot = await getDocs(
        query(
          collection(db, 'leaderboard', 'slopes', 'users'),
          orderBy('minutes'),
          orderBy('seconds')
        )
      );
      const stadiumScoresSnapshot = await getDocs(
        query(
          collection(db, 'leaderboard', 'stadium', 'users'),
          orderBy('minutes'),
          orderBy('seconds')
        )
      );
      const beachScoresArr = [];
      const slopesScoresArr = [];
      const stadiumScoresArr = [];
      let rank = 1;

      beachScoresSnapshot.forEach((score) => {
        beachScoresArr.push({ ...score.data(), id: score.id, rank: rank++ });
      });

      rank = 1;
      slopesScoresSnapshot.forEach((score) => {
        slopesScoresArr.push({ ...score.data(), id: score.id, rank: rank++ });
      });

      rank = 1;
      stadiumScoresSnapshot.forEach((score) => {
        stadiumScoresArr.push({ ...score.data(), id: score.id, rank: rank++ });
      });

      setScores([beachScoresArr, slopesScoresArr, stadiumScoresArr]);
      setIsLoaded(true);
    })();
  }, []);

  /**
   * Sets the current score page to at most five scores.
   */
  useEffect(() => {
    if (!scores[sceneVal]) return;
    const page = [];

    for (let i = scorePosition; i < scorePosition + 5; i++) {
      const score = scores[sceneVal][i];
      if (!score) break;
      page.push(score);
    }

    setCurrentPage(page);
  }, [scores, scorePosition, sceneVal]);

  /**
   * Shows the page nav icons as gray when unable to go to next/previous page.
   */
  useEffect(() => {
    if (!scores[sceneVal]) return;

    if (scorePosition + 5 > scores[sceneVal].length) {
      setAtLastPage(true);
    } else {
      setAtLastPage(false);
    }

    if (scorePosition - 5 < 0) {
      setAtFirstPage(true);
    } else {
      setAtFirstPage(false);
    }
  }, [scorePosition, scores, sceneVal]);

  /**
   * Event handler for scene selections.
   * @param {Event} e
   */
  function handleSceneSelection(e) {
    setSceneVal(Number(e.currentTarget.dataset.scene));
    setScorePosition(0);
  }

  /**
   * Increments the score page to display the next five scores.
   */
  function incrementPage() {
    if (scorePosition + 5 > scores[sceneVal].length) return;
    setScorePosition(scorePosition + 5);
  }

  /**
   * Decrements the score page to display the previous five scores.
   */
  function decrementPage() {
    if (scorePosition - 5 < 0) return;
    setScorePosition(scorePosition - 5);
  }

  let tableContent = (
    <>
      <Table>
        <thead>
          <tr>
            <RankCol scope="col">Rank</RankCol>
            <NameCol scope="col">Name</NameCol>
            <TimeCol scope="col">Time</TimeCol>
          </tr>
        </thead>
        <TableBody>
          {currentPage.map((score) => (
            <UserRow key={score.id}>
              <RankCell>{score.rank}</RankCell>
              <NameCell>{score.name}</NameCell>
              <td>
                {String(score.minutes).padStart(2, '0')}:{String(score.seconds).padStart(2, '0')}
              </td>
            </UserRow>
          ))}
        </TableBody>
      </Table>
      <PageControls>
        <PageIcon src={PreviousIcon} onClick={decrementPage} disableIcon={atFirstPage} />
        <Text>Page {scorePosition / 5 + 1}</Text>
        <PageIcon src={NextIcon} onClick={incrementPage} disableIcon={atLastPage} />
      </PageControls>
    </>
  );

  // Text fallback if no scores are available for the selected scene
  if (scores[sceneVal].length === 0) {
    tableContent = <Text>No scores have been submitted for this scene.</Text>;
  }

  return (
    <>
      <GlobalStyle />
      <StyledLeaderboard>
        <LeaderboardWrapper>
          <HeaderWrapper>
            <Header1>Leaderboard</Header1>
          </HeaderWrapper>
          <Scenes>
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
          <Scores isLoaded={isLoaded}>{isLoaded ? tableContent : <Spinner />}</Scores>
        </LeaderboardWrapper>
        <MainMenuButton to="/">Main Menu</MainMenuButton>
      </StyledLeaderboard>
    </>
  );
}

export default Leaderboard;
