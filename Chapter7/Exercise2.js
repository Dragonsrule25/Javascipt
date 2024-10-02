function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  function compareRobots(robots, iterations = 100) {
    for (let i = 0; i < iterations; i++) {
      let state = VillageState.random();
      for (let robot of robots) {
        if ('results' in robot === false) {
          robot.results = [];
        }
        robot.results.push(runRobot(state, robot.robot, []));
      }
    }
    for (let robot of robots) {
      let turns = robot.results.reduce((a, c) => a + c, 0) / robot.results.length;
      console.log(`${robot.name} completed in an average of ${turns} turns.`);
    }
  }
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
  }
  function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return { direction: route[0], memory: route.slice(1) };
  }
  function lazyRobot({ place, parcels }, route) {
    if (route.length == 0) {
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {
            route: findRoute(roadGraph, place, parcel.place),
            pickUp: true
          };
        } else {
          return {
            route: findRoute(roadGraph, place, parcel.address),
            pickUp: false
          };
        }
      });
      function score({ route, pickUp }) {
        return (pickUp ? 0.5 : 0) - route.length;
      }
      route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
    }
    return { direction: route[0], memory: route.slice(1) };
  }
  function superRobot({ place, parcels }, route) {
    if (route.length == 0) {
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {
            route: findRoute(roadGraph, place, parcel.place),
            pickUp: true
          };
        } else {
          return {
            route: findRoute(roadGraph, place, parcel.address),
            pickUp: false
          };
        }
      });
      for (let route of routes) {
        route.includesDropOff = false;
        for (let parcel of parcels) {
          if (route.route.includes(parcel.address)) {
            route.includesDropOff = true;
          }
        }
      }
      function score({ route, pickUp, includesDropOff }) {
        return (pickUp ? 0.75 : 0) - (includesDropOff ? 0.75 : 0) - route.length;
      }
      route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
    }
    return { direction: route[0], memory: route.slice(1) };
  }
  compareRobots(
    [
      {
        name: 'Route Robot',
        robot: routeRobot
      },
      {
        name: 'Goal Oriented Robot',
        robot: goalOrientedRobot
      },
      {
        name: 'Lazy Robot',
        robot: lazyRobot
      },
      {
        name: 'Super Robot',
        robot: superRobot
      }
    ],
    1000
  );
  runRobotAnimation(VillageState.random(), superRobot, []);