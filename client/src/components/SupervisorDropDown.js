import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SupervisorDropdown = ({ supervisorData, selectValue, handleChangeFunction }) => {

  const supervisorInfo = supervisorData.map((supervisor, i) => {
    let superVisorString = `<${supervisor.jurisdiction}> - <${supervisor.lastName}> - <${supervisor.firstName}>`;
    return (
      
      <MenuItem key={i} value={i}>{superVisorString}</MenuItem>
      
    );
  });

  return (
    <FormControl fullWidth required>
      <InputLabel id="supervisorData-select-label">Supervisor</InputLabel>
      <Select
        labelId="supervisorData"
        id="supervisor"
        value={selectValue}
        label="Supervisor"
        name='supervisor'
        
        onChange={(event) => handleChangeFunction(event)}
      >
        {supervisorInfo}
      </Select>
    </FormControl>
  );
};

SupervisorDropdown.propTypes = {
  supervisorData: PropTypes.array.isRequired,
  selectValue: PropTypes.any.isRequired,
  handleChangeFunction: PropTypes.func.isRequired
};

export default SupervisorDropdown;
