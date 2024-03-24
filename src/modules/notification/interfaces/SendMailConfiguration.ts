import React from 'react';

export interface SendMailConfiguration {
  to: string;
  subject: string;
  template: React.ReactElement;
}
