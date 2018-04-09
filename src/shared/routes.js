import GameContainer from './GameContainer'
import Results from './Results'

const routes =  [
  {
    path: '/',
    exact: true,
    component: GameContainer,
  },
  {
    path: '/results/:name',
    component: Results
    // fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes