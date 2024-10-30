function createRobot() {
    let position = { x: 0, y: 0 };
    return {
      getPosition: function() {
        return position;
      },
      move: function(direction) {
        switch (direction) {
          case "north":
            position.y++;
            break;
          case "south":
            position.y--;
            break;
          case "east":
            position.x++;
            break;
          case "west":
            position.x--;
            break;
          default:
            console.log("Invalid direction");
        }
      },
      moveCommands: function(commands) {
        for (let command of commands) {
          this.move(command);
        }
      },
      reset: function() {
        position = { x: 0, y: 0 };
      }
    };
  }
  const robot = createRobot();
  robot.move("north");
  robot.move("east");
  console.log(robot.getPosition());
  robot.moveCommands(["south", "west", "west"]);
  console.log(robot.getPosition());
  robot.reset();
  console.log(robot.getPosition());