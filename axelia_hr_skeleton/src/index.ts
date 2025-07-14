import { cody } from './services/codyClient';
(async () => {
  const res = await cody.chat('cody-hr-4o', [
    { role: 'user', content: 'Hello! How many vacation days do new employees get?' },
  ]);
  console.log(JSON.stringify(res.choices[0].message, null, 2));
})();
