import React from 'react';
import { NavigationActions } from '@react-navigation/native'; // Assuming you're using react-navigation

const goBack = () => {
  const dispatch = useDispatch(); // Access navigation dispatch function

  if (dispatch) { // Check if dispatch is available (prevents errors)
    dispatch(NavigationActions.goBack()); // Navigate back
  } else {
    console.warn('Navigation dispatch not found. Ensure you are using a navigation library or implement custom navigation logic.');
  }
};

export default goBack;
