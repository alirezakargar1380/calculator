import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Calculators',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Fitness & health',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'FAQs', path: paths.faqs },
        ],
      },
      {
        subheader: 'Math',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'FAQs', path: paths.faqs },
        ],
      },
      {
        subheader: 'Finacial',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'FAQs', path: paths.faqs },
        ],
      },
    ],
  },
  {
    title: 'Our Team',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
  },
];
