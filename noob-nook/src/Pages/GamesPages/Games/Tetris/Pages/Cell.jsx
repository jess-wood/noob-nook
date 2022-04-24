import React from 'react';
import { TETROMINOS } from './tetrimos';
import { StyledCell } from '../utils/StyledCell';

const Cell = ({ type }) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color} />
    )
}

export default React.memo(Cell);