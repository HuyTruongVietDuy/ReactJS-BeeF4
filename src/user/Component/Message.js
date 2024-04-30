"use client";
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="262708290168837" chatSupport>
      <CustomChat pageId="105011498981016" minimized={true.toString()} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
