import React from 'react'

function useToggle(initialValue=false){
  const [value, setValue]= React.useState(initialValue);
  const toggle = ()=> setValue(prev => !prev);
  return [value, toggle]
}
export default useToggle