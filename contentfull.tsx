import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: '2pxmh4zjucef',
  accessToken: 'JXfsxAXYtlXxW_lBWolOclWE9gl1WbQ0S-OhScuhz10',
});

console.log('Contentful Client:', contentfulClient);

export default contentfulClient;
