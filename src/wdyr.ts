/*
 * @Descripttion: test
 * @Date: 2021-05-29 18:09:35
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-29 18:11:04
 */
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
