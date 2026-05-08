import { Scenario } from '../types';

export const scenarios: Scenario[] = [
{
  id: 'speed-limit',
  title: 'The Speed Limit Tradeoff',
  description:
  'A major highway connects the suburbs to the city. Commuters are frustrated by the 55 mph speed limit. Raising it to 70 mph will significantly reduce commute times and boost economic productivity, but traffic models predict it will cause 5 additional fatal accidents per year due to higher impact speeds.',
  sceneConfig: {
    layout: 'highway',
    mainRoad: { count: 5, type: 'commuter', label: 'Thousands of Commuters' },
    sideElement: {
      count: 5,
      type: 'driver',
      label: '5 Projected Fatalities'
    }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Maintain 55 mph',
      isAction: false,
      livesSaved: 5,
      livesLost: 0,
      outcomeText:
      'The speed limit remains 55 mph. Commutes remain long, but 5 lives are spared this year.',
      moralCommentary:
      'You prioritized absolute safety over collective efficiency, adhering to a Vision Zero philosophy.',
      communityStat: 42,
      ethicalTags: ['deontological', 'passive', 'precautionary'],
      animationPath: 'straight'
    },
    action: {
      id: 'action',
      label: 'Raise to 70 mph',
      isAction: true,
      livesSaved: 0,
      livesLost: 5,
      outcomeText:
      'The speed limit is raised. Traffic flows faster, but 5 additional people die in high-speed collisions.',
      moralCommentary:
      'A utilitarian tradeoff. You accepted a known increase in fatalities as the cost of societal efficiency and convenience.',
      communityStat: 58,
      ethicalTags: ['utilitarian', 'active', 'efficiency'],
      animationPath: 'top'
    }
  }
},
{
  id: 'midblock-crosswalk',
  title: 'The Midblock Crossing',
  description:
  'A busy four-lane arterial road separates a dense residential neighborhood from a supermarket. Pedestrians frequently jaywalk, leading to 3 deaths a year. Adding a signalized midblock crosswalk will save these lives, but it will severely disrupt traffic flow, causing daily gridlock.',
  sceneConfig: {
    layout: 'crosswalk',
    mainRoad: { count: 3, type: 'pedestrian', label: '3 Pedestrians' },
    sideElement: { count: 5, type: 'driver', label: 'Delayed Drivers' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Prioritize Traffic Flow',
      isAction: false,
      livesSaved: 0,
      livesLost: 3,
      outcomeText:
      'No crosswalk is built. Traffic flows smoothly, but 3 pedestrians are struck and killed this year.',
      moralCommentary:
      'You maintained the status quo, valuing the uninterrupted movement of vehicles over the safety of vulnerable road users.',
      communityStat: 15,
      ethicalTags: ['passive', 'efficiency'],
      animationPath: 'straight'
    },
    action: {
      id: 'action',
      label: 'Install Crosswalk',
      isAction: true,
      livesSaved: 3,
      livesLost: 0,
      outcomeText:
      'The crosswalk is installed. Drivers face daily delays, but 3 pedestrian lives are saved.',
      moralCommentary:
      'You actively intervened to protect the vulnerable, asserting that human life outweighs driver convenience.',
      communityStat: 85,
      ethicalTags: ['active', 'rights-based', 'equity'],
      animationPath: 'stop'
    }
  }
},
{
  id: 'highway-routing',
  title: 'The Highway Routing',
  description:
  'A new bypass must be built to relieve severe downtown congestion that causes 10 fatal accidents annually. Route A goes through a low-income, minority neighborhood, displacing 500 families. Route B goes around the city, costing $2 billion more and only preventing 4 of the 10 fatalities.',
  sceneConfig: {
    layout: 'fork-road',
    topRoad: { count: 6, type: 'resident', label: 'Displaced Families' },
    bottomRoad: { count: 4, type: 'driver', label: 'Downtown Fatalities' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Choose Route B (Avoid Neighborhood)',
      isAction: false,
      livesSaved: 4,
      livesLost: 6,
      outcomeText:
      'Route B is built. The neighborhood is spared, but 6 preventable deaths still occur downtown each year.',
      moralCommentary:
      'You prioritized environmental justice and community preservation over maximizing total lives saved.',
      communityStat: 68,
      ethicalTags: ['equity', 'partiality', 'rights-based'],
      animationPath: 'bottom'
    },
    action: {
      id: 'action',
      label: 'Choose Route A (Through Neighborhood)',
      isAction: true,
      livesSaved: 10,
      livesLost: 0,
      outcomeText:
      'Route A is built. 10 lives are saved annually, but a historic community is bulldozed and dispersed.',
      moralCommentary:
      'A strict utilitarian choice. You maximized lives saved, but inflicted severe systemic harm on a marginalized group.',
      communityStat: 32,
      ethicalTags: ['utilitarian', 'active', 'efficiency'],
      animationPath: 'top'
    }
  }
},
{
  id: 'av-ethics',
  title: 'The Autonomous Vehicle',
  description:
  'You are regulating the collision algorithms for self-driving cars. An AV is speeding down a narrow street when 2 children chase a ball into the road. The only way to save the children is for the AV to swerve into a concrete barrier, instantly killing its 1 passenger.',
  sceneConfig: {
    layout: 'fork-road',
    topRoad: { count: 2, type: 'child', label: '2 Children' },
    bottomRoad: { count: 1, type: 'commuter', label: '1 Passenger' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Protect Passenger',
      isAction: false,
      livesSaved: 1,
      livesLost: 2,
      outcomeText:
      'The AV prioritizes its occupant. It brakes but strikes and kills the 2 children.',
      moralCommentary:
      'You ruled that a vehicle has a primary duty of care to its occupant, similar to a consumer product protecting its user.',
      communityStat: 25,
      ethicalTags: ['passive', 'partiality'],
      animationPath: 'top'
    },
    action: {
      id: 'action',
      label: 'Swerve (Sacrifice Passenger)',
      isAction: true,
      livesSaved: 2,
      livesLost: 1,
      outcomeText:
      'The AV swerves into the barrier. The passenger dies, but the 2 children are saved.',
      moralCommentary:
      'You programmed the machine to minimize total loss of life, treating the passenger as a utilitarian sacrifice.',
      communityStat: 75,
      ethicalTags: ['utilitarian', 'active'],
      animationPath: 'bottom'
    }
  }
},
{
  id: 'bike-lanes',
  title: 'The Protected Bike Lane',
  description:
  'A vibrant commercial street sees 4 cyclist fatalities a year due to cars dooring them or drifting into the painted bike lane. You can install a concrete-protected bike lane, but it requires removing all street parking. Local businesses claim this will bankrupt them and destroy 50 livelihoods.',
  sceneConfig: {
    layout: 'neighborhood',
    mainRoad: { count: 4, type: 'cyclist', label: '4 Cyclists' },
    sideElement: { count: 5, type: 'resident', label: 'Local Businesses' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Keep Street Parking',
      isAction: false,
      livesSaved: 0,
      livesLost: 4,
      outcomeText:
      'Parking remains. Businesses thrive, but 4 cyclists are killed by vehicles this year.',
      moralCommentary:
      'You weighed economic survival and community stability against physical safety, choosing the former.',
      communityStat: 30,
      ethicalTags: ['passive', 'efficiency'],
      animationPath: 'straight'
    },
    action: {
      id: 'action',
      label: 'Build Protected Lane',
      isAction: true,
      livesSaved: 4,
      livesLost: 0,
      outcomeText:
      'The protected lane is built. 4 lives are saved, but several legacy businesses close down within the year.',
      moralCommentary:
      'You prioritized bodily safety over economic concerns, asserting that streets are for safe transit first.',
      communityStat: 70,
      ethicalTags: ['active', 'rights-based', 'precautionary'],
      animationPath: 'stop'
    }
  }
},
{
  id: 'school-zone',
  title: 'The Automated Enforcement',
  description:
  'Drivers frequently speed through a school zone, resulting in 2 child fatalities last year. You can install automated speed cameras that issue hefty fines. This will eliminate the fatalities, but it will disproportionately burden low-income drivers who rely on this route for work.',
  sceneConfig: {
    layout: 'crosswalk',
    mainRoad: { count: 2, type: 'school-child', label: '2 School Children' },
    sideElement: { count: 5, type: 'driver', label: 'Fined Drivers' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Rely on Signage Only',
      isAction: false,
      livesSaved: 0,
      livesLost: 2,
      outcomeText:
      'No cameras are installed. Drivers continue to speed, and 2 children are killed.',
      moralCommentary:
      'You avoided implementing a punitive, regressive surveillance system, but failed to protect the children.',
      communityStat: 18,
      ethicalTags: ['passive', 'equity'],
      animationPath: 'straight'
    },
    action: {
      id: 'action',
      label: 'Install Speed Cameras',
      isAction: true,
      livesSaved: 2,
      livesLost: 0,
      outcomeText:
      'Cameras are installed. Fatalities drop to zero, but hundreds of low-income workers face crippling debt.',
      moralCommentary:
      'You achieved absolute safety through strict, automated enforcement, accepting the socioeconomic collateral damage.',
      communityStat: 82,
      ethicalTags: ['active', 'utilitarian', 'precautionary'],
      animationPath: 'stop'
    }
  }
},
{
  id: 'induced-demand',
  title: 'The Widening Paradox',
  description:
  'A congested 2-lane road has a high crash rate, causing 3 deaths a year. Engineers propose widening it to 4 lanes. This will temporarily ease congestion, but "induced demand" means more people will drive, eventually leading to more total crashes and 6 deaths a year in the long run.',
  sceneConfig: {
    layout: 'highway',
    mainRoad: { count: 3, type: 'driver', label: '3 Current Deaths' },
    sideElement: { count: 6, type: 'driver', label: '6 Future Deaths' }
  },
  choices: {
    inaction: {
      id: 'inaction',
      label: 'Do Not Widen',
      isAction: false,
      livesSaved: 3, // Net lives saved in the long run (6 - 3)
      livesLost: 3,
      outcomeText:
      'The road remains congested. 3 people die this year, but the long-term fatality rate does not double.',
      moralCommentary:
      'You resisted the intuitive fix, understanding complex systems and prioritizing long-term harm reduction over short-term relief.',
      communityStat: 65,
      ethicalTags: ['passive', 'precautionary', 'utilitarian'],
      animationPath: 'straight'
    },
    action: {
      id: 'action',
      label: 'Widen to 4 Lanes',
      isAction: true,
      livesSaved: 0,
      livesLost: 6,
      outcomeText:
      'The road is widened. Traffic flows freely for a year, but soon fills up again, resulting in 6 deaths annually.',
      moralCommentary:
      'You chose a short-term political win and immediate congestion relief, ignoring the long-term systemic consequences.',
      communityStat: 35,
      ethicalTags: ['active', 'efficiency'],
      animationPath: 'top'
    }
  }
}];