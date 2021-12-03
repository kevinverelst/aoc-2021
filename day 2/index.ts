import * as fs from 'fs';

enum MovementTypeEnum {
    forward = 'forward',
    down = 'down',
    up = 'up',
}

type Movement = {
    type: MovementTypeEnum,
    amount: number
}

interface Position {
    horizontal: number,
    depth: number,
}

const executeMovement = (movement: Movement, position: Position) => {
    switch (movement.type) {
        case MovementTypeEnum.forward:
            console.log(`Move forward ${movement.amount} steps`);
            return moveForward(movement, position)
        case MovementTypeEnum.down:
            console.log(`Move down ${movement.amount} steps`);
            return moveDown(movement, position);
        case MovementTypeEnum.up:
            console.log(`Move up ${movement.amount} steps`);
            return moveUp(movement, position);
    }
}

const moveUp = (movement, position): Position => {
    return {
        ...position,
        depth: position.depth - movement.amount,
    };
}

const moveDown = (movement, position): Position => {
    return {
        ...position,
        depth: position.depth + movement.amount,
    };
}

const moveForward = (movement, position): Position => {
    return {
        ...position,
        horizontal: position.horizontal + movement.amount,
    };
}

const mapInputToMovement = (input: string): Movement => {
    const splitInput = input.split(' ');
    const movementType = splitInput[0];
    const movementAmount = Number(splitInput[1]);
    return {
        type: movementType as MovementTypeEnum,
        amount: movementAmount,
    }
}

const main = () => {
    let position: Position = {
        horizontal: 0,
        depth: 0,
    }
    const input = fs.readFileSync('input.txt', 'utf8');
    const mappedInput = input.split(/\r?\n/).map(mapInputToMovement);
    mappedInput.forEach((move) => {
        const newPosition = executeMovement(move, position);
        if(!!newPosition){
            console.log('index - newPosition: ', newPosition);
            position = { ...newPosition };
        }
    });
    console.log('index - position: ', position);
    console.log('index - final position: ', position.horizontal * position.depth);
}

main();
