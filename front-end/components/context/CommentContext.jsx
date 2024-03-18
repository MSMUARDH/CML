// BackgroundContext.js
import React, {createContext, useContext, useState} from 'react';

const CommentContext = createContext();

export const CommentProvider = ({children}) => {
  const [comments, setComments] = useState('this is the test from comment');

  return (
    <CommentContext.Provider value={{backgroundImage, setBackgroundImage}}>
      {children}
    </CommentContext.Provider>
  );
};

export const useBackground = () => {
  return useContext(BackgroundContext);
};
