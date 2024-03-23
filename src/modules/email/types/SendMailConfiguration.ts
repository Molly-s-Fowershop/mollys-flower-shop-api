import React from 'react';

export type SendMailConfiguration = {
  to: string;
  subject: string;
  template: React.ReactElement;
};
