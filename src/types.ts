export type RoadLayout =
'highway' |
'intersection' |
'crosswalk' |
'fork-road' |
'neighborhood';

export interface PersonGroup {
  count: number;
  type:
  'pedestrian' |
  'cyclist' |
  'driver' |
  'child' |
  'commuter' |
  'resident' |
  'school-child';
  label?: string;
}

export interface SceneConfig {
  layout: RoadLayout;
  topRoad?: PersonGroup;
  bottomRoad?: PersonGroup;
  mainRoad?: PersonGroup;
  sideElement?: PersonGroup;
}

export interface Choice {
  id: 'action' | 'inaction';
  label: string;
  isAction: boolean;
  livesSaved: number;
  livesLost: number;
  outcomeText: string;
  moralCommentary: string;
  communityStat: number; // Percentage of people who chose this
  ethicalTags: string[]; // e.g., 'utilitarian', 'deontological', 'equity', 'efficiency'
  animationPath: 'top' | 'bottom' | 'straight' | 'stop';
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  sceneConfig: SceneConfig;
  choices: {
    action: Choice;
    inaction: Choice;
  };
}

export interface GameState {
  screen: 'title' | 'scenario' | 'outcome' | 'results';
  currentScenarioIndex: number;
  choicesMade: {scenarioId: string;choiceId: 'action' | 'inaction';}[];
  totalLivesSaved: number;
  totalLivesLost: number;
}